/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* global describe, it */
import { expect, use as chaiUse } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import mock from 'mock-require';

chaiUse(sinonChai);

const pathToDAO = '../src/dao/PostDAO';
const pathToModel = '../src/models/Post';

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

describe('PostDAO', () => {
  describe('#findAll', () => {
    it('should fetch all posts', async () => {
      mock(pathToModel, {
        findAll: () => postlist,
      });

      const PostDAO = mock.reRequire(pathToDAO);

      const actualPostlist = await PostDAO.findAll();
      const actual = JSON.stringify(actualPostlist);
      const expectedPostlist = postlist.map(({ id, title, description }) => ({
        id,
        title,
        description,
        url: `/post/${id}`,
      }));
      const expected = JSON.stringify(expectedPostlist);
      expect(expected).to.equal(actual);
    });
  });

  describe('#create', () => {
    it('should create a new post', async () => {
      const createSpy = sinon.spy();
      mock(pathToModel, {
        create: createSpy,
      });

      const PostDAO = mock.reRequire(pathToDAO);

      await PostDAO.create(post4);
      expect(createSpy).to.have.been.calledOnceWith(post4);
    });

    it('should throw error when the id is set', async () => {
      const createSpy = sinon.spy();
      mock(pathToModel, {
        create: createSpy,
      });

      const PostDAO = mock.reRequire(pathToDAO);

      post4.id = 4;
      try {
        await PostDAO.create(post4);
      } catch (error) {
        expect(error).to.be.ok;
        expect(createSpy).to.not.have.been.called;
      }
    });
  });

  describe('#update', () => {
    it('should update an existing post', async () => {
      const updateSpy = sinon.spy();
      const findOneSpy = sinon.spy(() => ({ ...post3, update: updateSpy }));
      mock(pathToModel, {
        findOne: findOneSpy,
      });

      const PostDAO = mock.reRequire(pathToDAO);

      const updatePost = {
        id: 3,
        title: 'Not my last post',
        description: 'This is not my last past.',
      };

      await PostDAO.update(updatePost);
      expect(findOneSpy).to.have.been.calledOnceWith({ where: { id: updatePost.id } });
      expect(updateSpy).to.have.been.calledOnceWith(updatePost);
    });

    it('should throw error when post does not exist', async () => {
      const findOneSpy = sinon.spy(() => null);
      mock(pathToModel, {
        findOne: findOneSpy,
      });

      const PostDAO = mock.reRequire(pathToDAO);

      const updatePost = {
        id: 5,
        title: 'Not my last post',
        description: 'This is not my last past.',
      };

      try {
        await PostDAO.update(updatePost);
      } catch (error) {
        expect(error).to.be.ok;
        expect(findOneSpy).to.have.been.calledOnceWith({ where: { id: updatePost.id } });
      }
    });
  });

  describe('#delete', () => {
    it('should delete an existing post', async () => {
      const destroySpy = sinon.spy();
      const findOneSpy = sinon.spy(() => ({ ...post3, destroy: destroySpy }));
      mock(pathToModel, {
        findOne: findOneSpy,
      });

      const PostDAO = mock.reRequire(pathToDAO);

      const deletePostId = 3;

      await PostDAO.remove(deletePostId);
      expect(findOneSpy).to.have.been.calledOnceWith({ where: { id: deletePostId } });
      expect(destroySpy).to.have.been.calledOnce;
    });

    it('should throw error when post does not exists', async () => {
      const findOneSpy = sinon.spy(() => null);
      mock(pathToModel, {
        findOne: findOneSpy,
      });

      const PostDAO = mock.reRequire(pathToDAO);

      const deletePostId = 5;
      try {
        await PostDAO.remove(deletePostId);
      } catch (error) {
        expect(error).to.be.ok;
        expect(findOneSpy).to.have.been.calledOnceWith({ where: { id: deletePostId } });
      }
    });
  });
});
