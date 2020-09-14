/* eslint-disable no-unused-expressions */
/* global describe, it */
import { expect, use as chaiUse } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import mock from 'mock-require';

chaiUse(sinonChai);

const pathToDAO = 'dao/dao/PostDAO';
const pathToHandlers = '../src/blog/handler';

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

      const { fetchAllPosts } = mock.reRequire(pathToHandlers);

      await fetchAllPosts(null, responseMock);

      expect(findAllSpy).to.have.been.calledOnce;
      expect(responseMock.status).to.have.been.calledOnceWith(200);
      expect(responseMock.send).to.have.been.calledOnceWith(postlist);
    });
  });

  describe('create a new post', () => {
    it('should create new post', async () => {
      const createSpy = sinon.spy();
      mock(pathToDAO, {
        create: createSpy,
      });

      const requestMock = {
        body: post4,
      };

      const responseMock = {
        sendStatus: sinon.spy(),
      };

      const { createPost } = mock.reRequire(pathToHandlers);

      await createPost(requestMock, responseMock);

      expect(createSpy).to.have.been.calledOnce;
      expect(responseMock.sendStatus).to.have.been.calledOnceWith(204);
    });

    it('should send status 400 when id is given', async () => {
      const createSpy = sinon.spy(() => { throw new Error(); });
      mock(pathToDAO, {
        create: createSpy,
      });

      const requestMock = {
        body: post4,
      };

      const responseMock = {
        status: sinon.spy(),
        send: sinon.spy(),
      };

      const { createPost } = mock.reRequire(pathToHandlers);

      await createPost(requestMock, responseMock);

      expect(createSpy).to.have.been.calledOnce;
      expect(responseMock.status).to.have.been.calledOnceWith(400);
      expect(responseMock.send).to.have.been.calledOnce;
    });
  });

  describe('update a post', () => {
    it('should update an existing post', async () => {
      const updateSpy = sinon.spy();
      mock(pathToDAO, {
        update: updateSpy,
      });

      const postId = 4;

      post4.id = postId;

      const requestMock = {
        body: post4,
        params: { postId },
      };

      const responseMock = {
        sendStatus: sinon.spy(),
      };

      const { updatePost } = mock.reRequire(pathToHandlers);

      await updatePost(requestMock, responseMock);

      expect(updateSpy).to.have.been.calledOnceWith(post4);
      expect(responseMock.sendStatus).to.have.been.calledOnceWith(204);
    });

    it('should send status 400 when id in path and body don\'t match', async () => {
      const updateSpy = sinon.spy();
      mock(pathToDAO, {
        update: updateSpy,
      });

      const postId = 4;

      post4.id = postId;

      const requestMock = {
        body: post4,
        params: { postId: postId + 1 },
      };

      const responseMock = {
        status: sinon.spy(),
        send: sinon.spy(),
      };

      const { updatePost } = mock.reRequire(pathToHandlers);

      await updatePost(requestMock, responseMock);

      expect(updateSpy).to.not.have.been.called;
      expect(responseMock.status).to.have.been.calledOnceWith(400);
      expect(responseMock.send).to.have.been.calledOnce;
    });

    it('should send status 404 when post with id doesn\'t exist', async () => {
      const updateSpy = sinon.spy(() => { throw new Error(); });
      mock(pathToDAO, {
        update: updateSpy,
      });

      const postId = 4;

      post4.id = postId;

      const requestMock = {
        body: post4,
        params: { postId },
      };

      const responseMock = {
        status: sinon.spy(),
        send: sinon.spy(),
      };

      const { updatePost } = mock.reRequire(pathToHandlers);

      await updatePost(requestMock, responseMock);

      expect(updateSpy).to.have.been.calledOnceWith(post4);
      expect(responseMock.status).to.have.been.calledOnceWith(404);
      expect(responseMock.send).to.have.been.calledOnce;
    });
  });

  describe('delete a post', () => {
    it('should delete an existing post', async () => {
      const deleteSpy = sinon.spy();
      mock(pathToDAO, {
        delete: deleteSpy,
      });

      const postId = 3;

      const requestMock = {
        params: { postId },
      };

      const responseMock = {
        sendStatus: sinon.spy(),
      };

      const { deletePost } = mock.reRequire(pathToHandlers);

      await deletePost(requestMock, responseMock);

      expect(deleteSpy).to.have.been.calledOnceWith(postId);
      expect(responseMock.sendStatus).to.have.been.calledOnceWith(204);
    });

    it('should send status 404 when post with id doesn\'t exist', async () => {
      const deleteSpy = sinon.spy(() => { throw new Error(); });
      mock(pathToDAO, {
        delete: deleteSpy,
      });

      const postId = 3;

      const requestMock = {
        params: { postId },
      };

      const responseMock = {
        status: sinon.spy(),
        send: sinon.spy(),
      };

      const { deletePost } = mock.reRequire(pathToHandlers);

      await deletePost(requestMock, responseMock);

      expect(deleteSpy).to.have.been.calledOnceWith(postId);
      expect(responseMock.status).to.have.been.calledOnceWith(404);
      expect(responseMock.send).to.have.been.calledOnce;
    });
  });
});
