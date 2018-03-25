const { fromJS } = require('immutable');
const { expect } = require('chai');
const assert = require('assert');

const transformErrors = require('../lib/transformErrors');

describe('Given examples', () => {
  describe('deep = false', () => {
    it('Should handle first given scenario', () => {
      const error = fromJS({
        name: ['This field is required', 'Another error'],
        age: ['Only numeric characters are allowed'],
      });

      const transformed = fromJS({
        name: 'This field is required. Another error.',
        age: 'Only numeric characters are allowed.'
      });

      expect(transformErrors(error).equals(transformed)).to.equal(true)
    });

    it('Should handle second given scenario', () => {
      const error = fromJS({
        name: {
          first: ['Only alphanumeric characters are allowed'],
          last: ['Only alphanumeric characters are allowed'],
        },
        names: [{}, {
          first: ['Only alphanumeric characters are allowed'],
          last: ['Only alphanumeric characters are allowed'],
        }, {}],
      });

      const transformed = fromJS({
        name: 'Only alphanumeric characters are allowed.',
        names: 'Only alphanumeric characters are allowed.',
      });

      expect(transformErrors(error).equals(transformed)).to.equal(true)
    });

    it('Should handle custom scenario', () => {
      const error = fromJS({
        name: {
          first: ['Only alphanumeric characters are allowed', 'Another Error'],
          last: ['Only alphanumeric characters are allowed'],
        },
        names: [{}, {
          first: ['Only alphanumeric characters are allowed'],
          last: ['Only alphanumeric characters are allowed'],
        }, {}],
      });

      const transformed = fromJS({
        name: 'Only alphanumeric characters are allowed. Another Error.',
        names: 'Only alphanumeric characters are allowed.',
      });

      expect(transformErrors(error).equals(transformed)).to.equal(true)
    });
  })

  describe('deep = true', () => {
    it('Should handle first deep given scenario', () => {
      const error = fromJS({
        name: {
          first: ['Only alphanumeric characters are allowed'],
          last: ['Only alphanumeric characters are allowed'],
        },
        names: [{}, {
          first: ['Only alphanumeric characters are allowed'],
          last: ['Only alphanumeric characters are allowed'],
        }, {}],
      })

      const transformed = fromJS({
        name: 'Only alphanumeric characters are allowed.',
        names: [{}, {
          first: 'Only alphanumeric characters are allowed.',
          last: 'Only alphanumeric characters are allowed.',
        }, {}],
      })

      const deepKeys = fromJS(['names']);

      expect(
        transformErrors(error, deepKeys).equals(transformed)
      ).to.equal(true);
    })

    it('Should transform large error w/ deep', () => {
      const error = fromJS({
        name: ['This field is required'],
        age: ['This field is required', 'Only numeric characters are allowed'],
        urls: [{}, {}, {
          site: {
            code: ['This site code is invalid'],
            id: ['Unsupported id'],
          }
        }],
        url: {
          site: {
            code: ['This site code is invalid'],
            id: ['Unsupported id'],
          }
        },
        tags: [{}, {
          non_field_errors: ['Only alphanumeric characters are allowed'],
          another_error: ['Only alphanumeric characters are allowed'],
          third_error: ['Third error']
        }, {}, {
          non_field_errors: [
            'Minumum length of 10 characters is required',
            'Only alphanumeric characters are allowed',
          ],
        }],
        tag: {
          nested: {
            non_field_errors: ['Only alphanumeric characters are allowed'],
          },
        },
      });

      const transformed = fromJS({
        name: 'This field is required.',
        age: 'This field is required. Only numeric characters are allowed.',
        urls: [{}, {}, {
          site: {
            code: 'This site code is invalid.',
            id: 'Unsupported id.',
          },
        }],
        url: {
          site: {
            code: 'This site code is invalid.',
            id: 'Unsupported id.',
          },
        },
        tags: 'Only alphanumeric characters are allowed. Third error. ' +
          'Minumum length of 10 characters is required.',
        tag: 'Only alphanumeric characters are allowed.',
      });

      const deepKeys = fromJS(['url', 'urls']);
      // example error object returned from API converted to Immutable.Map

      // in this specific case,
      // errors for `url` and `urls` keys should be nested
      // see expected object below
      expect(
        transformErrors(error, deepKeys).equals(transformed)
      ).to.eql(true);
    });
  });
});
