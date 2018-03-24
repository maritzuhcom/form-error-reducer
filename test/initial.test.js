const Immutable = require('immutable');
const { expect } = require('chai');
const assert = require('assert');

const { transformErrors } = require('../lib/transformErrors');

describe('Given examples', () => {
  it('Should transform largest error', () => {
    const error = Immutable.fromJS({
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

    const transformed = Immutable.fromJS({
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
    // example error object returned from API converted to Immutable.Map

    // in this specific case,
    // errors for `url` and `urls` keys should be nested
    // see expected object below
    expect(transformErrors(error)).to.eql(transformed);
  })
});
