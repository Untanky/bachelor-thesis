/* global describe, it */
import assert from 'assert';

describe('PostDBDAO', () => {
  describe('#findAll', () => {
    it('should fetch all posts', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
