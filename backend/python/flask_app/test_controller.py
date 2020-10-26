import pytest
from flask import jsonify
from unittest.mock import MagicMock, patch
import sys, os
from flask_app import controller
sys.path.append(os.path.realpath(os.path.dirname(__file__)+"/../../../dao/src"))
from Post import Post
from PostDAO import PostDAO
from Exception import IllegalArgumentException, UnknownElementException

PostController = controller.PostController

class Response:
  def __init__(self, status):
    self.status_code = status

mocked_response_with_status_code = patch.object(controller, 'response_with_status_code')

# Create your tests here.
class TestPostController():
  def __before__(self):
    self.post1 = Post(title = "Post 1", description = "Test description")
    self.post2 = Post(title = "Post 2", description = "Test description")
    self.post3 = Post(title = "Post 3", description = "Test description")
    self.updatedPost3 = Post(id = 3, title = "Post Drei", description = "Test Beschreibung")
    self.post4 = Post(title = "Post 4", description = "Test description")
    self.postList = [ self.post1, self.post2, self.post3 ]

  def test_FetchAllPosts(self):
    self.__before__()
    postDAO = PostDAO(None)
    postDAO.findAll = MagicMock(return_value = self.postList)
    postController = PostController(postDAO)
    with patch('flask_app.controller.jsonify') as mocked_jsonify:
      response = postController.fetchAllPost()
      postDAO.findAll.assert_called_with()
      mocked_jsonify.assert_called_with([e.serialize() for e in self.postList])

  def test_CreatePost(self):
    self.__before__()
    postDAO = PostDAO(None)
    postDAO.create = MagicMock()
    postController = PostController(postDAO)

    with patch.object(controller, 'post_from_request', return_value = self.post4) as mocked_post_from_request:
      with patch.object(controller, 'response_with_status_code') as mocked_response_with_status_code:
        response = postController.createPost()
        mocked_post_from_request.assert_called(),
        postDAO.create.assert_called_with(self.post4)
        mocked_response_with_status_code.assert_called_with(204)
    
  def test_CreatePostWhenPostDAOThrows(self):
    self.__before__()
    postDAO = PostDAO(None)
    postDAO.create = MagicMock(side_effect = IllegalArgumentException())
    postController = PostController(postDAO)

    with patch.object(controller, 'post_from_request', return_value = self.post4) as mocked_post_from_request:
      with patch.object(controller, 'response_with_status_code') as mocked_response_with_status_code:
        response = postController.createPost()
        mocked_post_from_request.assert_called(),
        postDAO.create.assert_called_with(self.post4)
        mocked_response_with_status_code.assert_called_with(400)
    
  def test_UpdatePost(self):
    self.__before__()
    postDAO = PostDAO(None)
    postDAO.update = MagicMock()
    postController = PostController(postDAO)
    postId = self.updatedPost3.id

    with patch.object(controller, 'post_from_request', return_value = self.updatedPost3) as mocked_post_from_request:
      with patch.object(controller, 'response_with_status_code') as mocked_response_with_status_code:
        response = postController.updatePost(postId)
        mocked_post_from_request.assert_called(),
        postDAO.update.assert_called_with(self.updatedPost3)
        mocked_response_with_status_code.assert_called_with(204)
    
  def test_UpdatePostWithMismatchedIds(self):
    self.__before__()
    postDAO = PostDAO(None)
    postDAO.update = MagicMock()
    postController = PostController(postDAO)
    postId = self.updatedPost3.id + 1

    with patch.object(controller, 'post_from_request', return_value = self.updatedPost3) as mocked_post_from_request:
      with patch.object(controller, 'response_with_status_code') as mocked_response_with_status_code:
        response = postController.updatePost(postId)
        mocked_post_from_request.assert_called(),
        postDAO.update.assert_not_called()
        mocked_response_with_status_code.assert_called_with(400)
    
  def test_UpdatePostWhenPostDAOThrows(self):
    self.__before__()
    postDAO = PostDAO(None)
    postDAO.update = MagicMock(side_effect = UnknownElementException)
    postController = PostController(postDAO)
    postId = self.updatedPost3.id

    with patch.object(controller, 'post_from_request', return_value = self.updatedPost3) as mocked_post_from_request:
      with patch.object(controller, 'response_with_status_code') as mocked_response_with_status_code:
        response = postController.updatePost(postId)
        mocked_post_from_request.assert_called(),
        postDAO.update.assert_called_with(self.updatedPost3)
        mocked_response_with_status_code.assert_called_with(404)

  def test_DeletePost(self):
    self.__before__()
    postDAO = PostDAO(None)
    postDAO.delete = MagicMock()
    postController = PostController(postDAO)
    postId = self.post3.id

    with patch.object(controller, 'response_with_status_code') as mocked_response_with_status_code:
      response = postController.deletePost(postId)
      postDAO.delete.assert_called_with(postId)
      mocked_response_with_status_code.assert_called_with(204)

  def test_DeletePostWhenPostDAOThrows(self):
    self.__before__()
    postDAO = PostDAO(None)
    postDAO.delete = MagicMock(side_effect = UnknownElementException)
    postController = PostController(postDAO)
    postId = self.post3.id

    with patch.object(controller, 'response_with_status_code') as mocked_response_with_status_code:
      response = postController.deletePost(postId)
      postDAO.delete.assert_called_with(postId)
      mocked_response_with_status_code.assert_called_with(404)