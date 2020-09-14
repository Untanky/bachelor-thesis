/* global describe, it */
import { expect, use as chaiUse } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import mock from 'mock-require';
import { createPost } from '../src/blog/handler';

chaiUse(sinonChai);

const pathToDAO = 'dao/dao/PostDAO';

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
    it('should return all posts', async () => {
      const findAllSpy = sinon.spy(() => postlist);
      mock(pathToDAO, {
        findAll: findAllSpy,
      });

      const responseMock = {
        status: sinon.spy(),
        send: sinon.spy(),
      };

      const { fetchAllPosts } = mock.reRequire('../src/blog/handler');

      await fetchAllPosts(null, responseMock);

      expect(responseMock.status).to.have.been.calledOnceWith(200);
      expect(responseMock.send).to.have.been.calledOnceWith(postlist);
    });
  });

  describe('create a new post', () => {
    it('should creates new post', () => {

    });

    it('should send status 400 when id is given', () => {

    });
  });

  describe('update a post', () => {
    it('should update an existing post', () => {

    });

    it('should send status 400 when id in path and body don\'t match', () => {

    });

    it('should send status 404 when post with id doesn\'t exist', () => {

    });
  });

  describe('delete a post', () => {
    it('should delete an existing post', () => {

    });

    it('should send status 404 when post with id doesn\'t exist', () => {

    });
  });
});
