const { Immutable } = require('immutable');
const { expect } = require('chai');
const assert = require('assert');

const { flattenArray } = require('../lib/transformErrors');

describe('flattenArray helper', () => {
  it('Should flatten an array into strings with correct puctuation', () => {
    const inputArr = ['This field is required', 'Another error'];
    const ans = 'This field is required. Another error.';
    expect(flattenArray(inputArr)).to.equal(ans);
  });


  it('Should flatten a single element array into a string with correct puctuation', () => {
    const inputArr = ['Only numeric characters are allowed'];
    const ans = 'Only numeric characters are allowed.';
    expect(flattenArray(inputArr)).to.equal(ans);
  });

  it('Should flatten a duplicate array into a string with correct puctuation', () => {
    const inputArr = [
      'Only alphanumeric characters are allowed',
      'Only alphanumeric characters are allowed'
    ];
    const ans = 'Only alphanumeric characters are allowed.';
    expect(flattenArray(inputArr)).to.equal(ans);
  });

  it('Should throw an error when passes nothing or an empty array', (done) => {
    try {
      flattenArray();
    } catch (e) {
      expect(e.message).to.eql('Cannot reduce an empty array');
      done();
    }
  });
});
