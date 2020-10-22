import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import time
import sys, os
sys.path.append(os.path.realpath(os.path.dirname(__file__)+"/../src"))
from PostDAO import PostDAO
from Post import Post
from Exception import IllegalArgumentException, UnknownElementException

class TestPostDAO:
  def __before__(self):
    self._setupComponents()
    self._setupData()

  def _setupComponents(self):
    self._createEngine()
    self._createDAO()
    self._createSession()

  def _createEngine(self):
    self.engine = create_engine('sqlite://')
    Post.metadata.create_all(self.engine)

  def _createDAO(self):
    self.dao = PostDAO(self.engine)
  
  def _createSession(self):
    Session = sessionmaker(bind = self.engine)
    self.session = Session()

  def _setupData(self):
    self._createData()
    self._createDataList()
    self._addDataToDatabase()

  def _createData(self):
    self.post1 = Post(title = "Title 1", description = "Description")
    self.post2 = Post(title = "Title 2", description = "Longer Description")
    self.post3 = Post(title = "Title 3", description = "Test Description")
    self.post4 = Post(title = "Title 4", description = "Description very long")
    self.updatedPost3 = Post(id = 3, title = "Titel Drei", description = "Beschreibung")

  def _createDataList(self):
    self.postList = [ self.post1, self.post2, self.post3 ]

  def _addDataToDatabase(self):
    self.session.add(self.post1)
    self.session.add(self.post2)
    self.session.add(self.post3)
    self.session.flush()

  def test_findAll(self):
    self.__before__()

    actual = self.dao.findAll()
    expected = self.postList

    assert expected == actual

  def test_create(self):
    self.__before__()

    self.dao.create(self.post4)

    assert self.post4.id == 4
    assert self.post4 == self.session.query(Post).get(self.post4.id)

  def test_createWithSetId(self):
    self.__before__()
    self.post4.id = 4

    with pytest.raises(IllegalArgumentException):
      self.dao.create(self.post4)

  def test_update(self):
    self.__before__()

    self.dao.update(self.updatedPost3)

    self.session.expire(self.post3)
    assert self.updatedPost3 == self.session.query(Post).get(self.updatedPost3.id)

  def test_updateWithUnknownId(self):
    self.__before__()
    self.updatedPost3.id = 5

    with pytest.raises(UnknownElementException):
      self.dao.update(self.updatedPost3)

  def test_delete(self):
    self.__before__()
    deleteId = 3

    self.dao.delete(deleteId)

    self.session.expire(self.post3)
    assert self.session.query(Post).get(self.updatedPost3.id) is None
  
  def test_deleteWithUnknownId(self):
    self.__before__()
    deleteId = 5

    with pytest.raises(UnknownElementException):
      self.dao.delete(deleteId)