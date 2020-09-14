/* global describe, it */
import { expect, use as chaiUse } from 'chai';
import sinon from 'sinon';
import chaiSinon from 'chai-sinon';

chaiUse(chaiSinon);

const post1 = {
  id: 1,
  title: 'First Post',
  description: 'Test description',
};

const post2 = {
  id: 2,
  title: 'My second post',
  description: 'Test description',
};

const post3 = {
  id: 3,
  title: 'Last post ever',
  description: 'Test description',
};

const post4 = {
  title: 'I\'m back',
  description: 'I will be posting again',
};

const postlist = [post1, post2, post3];

describe('blog post handler', () => {
  describe('find all posts', () => {
    it('should return all posts', () => {

    });
  });
});
