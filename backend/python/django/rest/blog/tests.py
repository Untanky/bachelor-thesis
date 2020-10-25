from django.test import TestCase
from rest_framework.test import APIRequestFactory
from unittest.mock import MagicMock
import sys, os
sys.path.append(os.path.realpath(os.path.dirname(__file__)))
from handlers import PostController
sys.path.append(os.path.realpath(os.path.dirname(__file__)+"/../../../dao/src"))
from Post import Post
from PostDAO import PostDAO

factory = APIRequestFactory()

# Create your tests here.
class HandlerTest(TestCase):
  def setUp(self):
    self.post1 = Post(title = "Post 1", description = "Test description")
    self.post2 = Post(title = "Post 2", description = "Test description")
    self.post3 = Post(title = "Post 3", description = "Test description")
    self.updatedPost3 = Post(title = "Post Drei", description = "Test Beschreibung")
    self.post4 = Post(title = "Post 4", description = "Test description")
    self.postList = [ self.post1, self.post2, self.post3 ]

  def test_FetchAllPosts(self):
    postDAO = PostDAO(None)
    postDAO.findAll = MagicMock(return_value = self.postList)
    postController = PostController(postDAO)
    request = factory.get('/api/blog/post')

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