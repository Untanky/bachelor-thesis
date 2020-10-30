from sqlalchemy.orm import sessionmaker
import Post
from Exception import IllegalArgumentException, UnknownElementException

def takeId(elem):
  return elem.id

class PostDAO(object):
  def __init__(self, engine, schema = None):
    self.engine = engine
    Session = sessionmaker(bind = engine)
    self.session = Session()
  
  def findAll(self):
    return sorted(self.session.query(Post.Post).all(), key=takeId)

  def create(self, post):
    if (post.id is not None):
      raise IllegalArgumentException()
    self.session.add(post)
    self.session.flush()

  def update(self, post):
    fetchedPost = self.session.query(Post.Post).get(post.id)
    if (fetchedPost is None):
      raise UnknownElementException()
    self.session.merge(post)
    self.session.commit()
    self.session.flush()
    fetchedPost3 = self.session.query(Post.Post).get(post.id)

  def delete(self, postId):
    fetchedPost = self.session.query(Post.Post).get(postId)
    if (fetchedPost is None):
      raise UnknownElementException()
    self.session.delete(fetchedPost)
    self.session.commit()
    self.session.flush()