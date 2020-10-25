from django.test import TestCase
from unittest.mock import MagicMock
import sys, os
sys.path.append(os.path.realpath(os.path.dirname(__file__)))
from handlers import PostController
sys.path.append(os.path.realpath(os.path.dirname(__file__)+"/../../../dao/src"))
from Post import Post
from PostDAO import PostDAO
from Exception import IllegalArgumentException, UnknownElementException

class Request:
  def __init__(self, data):
    self.data = data

# Create your tests here.
class HandlerTest(TestCase):
  def setUp(self):
    self.post1 = Post(title = "Post 1", description = "Test description")
    self.post2 = Post(title = "Post 2", description = "Test description")
    self.post3 = Post(title = "Post 3", description = "Test description")
    self.updatedPost3 = Post(id = 3, title = "Post Drei", description = "Test Beschreibung")
    self.post4 = Post(title = "Post 4", description = "Test description")
    self.postList = [ self.post1, self.post2, self.post3 ]

  def test_FetchAllPosts(self):
    postDAO = PostDAO(None)
    postDAO.findAll = MagicMock(return_value = self.postList)
    postController = PostController(postDAO)
    request = Request(None)

    response = postController.fetchAllPosts(request)
    actual = [
      {
        'id': None,
        'title': "Post 1",
        'description': "Test description"
      },
      {
        'id': None,
        'title': "Post 2",
        'description': "Test description"
      },
      {
        'id': None,
        'title': "Post 3",
        'description': "Test description"
      }
    ]

    self.assertEqual(200, response.status_code)
    self.assertEquals(actual, response.data)
    postDAO.findAll.assert_called_with()
    
  def test_CreatePost(self):
    postDAO = PostDAO(None)
    postDAO.create = MagicMock()
    postController = PostController(postDAO)
    request = Request({ 'title': self.post4.title, 'description': self.post4.description })

    response = postController.createPost(request)

    self.assertEqual(204, response.status_code)
    postDAO.create.assert_called_with(self.post4)
    
  def test_CreatePostWhenPostDAOThrows(self):
    postDAO = PostDAO(None)
    postDAO.create = MagicMock(side_effect=IllegalArgumentException())
    postController = PostController(postDAO)
    request = Request({ 'id': 4, 'title': self.post4.title, 'description': self.post4.description })

    response = postController.createPost(request)

    self.assertEqual(400, response.status_code)
    postDAO.create.assert_called_with(self.post4)
    
  def test_UpdatePost(self):
    postDAO = PostDAO(None)
    postDAO.update = MagicMock()
    postController = PostController(postDAO)
    request = Request({'id': self.updatedPost3.id, 'title': self.updatedPost3.title, 'description': self.updatedPost3.description })
    updateId = self.updatedPost3.id

    response = postController.updatePost(updateId, request)

    self.assertEqual(204, response.status_code)
    postDAO.update.assert_called_with(self.updatedPost3)
    
  def test_UpdatePostWithMismatchedIds(self):
    postDAO = PostDAO(None)
    postDAO.update = MagicMock()
    postController = PostController(postDAO)
    request = Request({'id': self.updatedPost3.id, 'title': self.updatedPost3.title, 'description': self.updatedPost3.description })
    updateId = self.updatedPost3.id + 1

    response = postController.updatePost(updateId, request)

    self.assertEqual(400, response.status_code)
    postDAO.update.assert_not_called()
    
  def test_UpdatePostWhenPostDAOThrows(self):
    postDAO = PostDAO(None)
    postDAO.update = MagicMock(side_effect=UnknownElementException())
    postController = PostController(postDAO)
    request = Request({'id': self.updatedPost3.id, 'title': self.updatedPost3.title, 'description': self.updatedPost3.description })
    updateId = 3

    response = postController.updatePost(updateId, request)

    self.assertEqual(404, response.status_code)
    postDAO.update.assert_called_with(self.updatedPost3)

  def test_DeletePost(self):
    postDAO = PostDAO(None)
    postDAO.delete = MagicMock()
    postController = PostController(postDAO)
    request = Request(None)
    deleteId = 3

    response = postController.deletePost(deleteId, request)

    self.assertEqual(204, response.status_code)
    postDAO.delete.assert_called_with(deleteId)

  def test_DeletePostWhenPostDAOThrows(self):
    postDAO = PostDAO(None)
    postDAO.delete = MagicMock(side_effect=UnknownElementException())
    postController = PostController(postDAO)
    request = Request(None)
    deleteId = 3

    response = postController.deletePost(deleteId, request)

    self.assertEqual(404, response.status_code)
    postDAO.delete.assert_called_with(deleteId)