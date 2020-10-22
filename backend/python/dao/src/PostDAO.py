from sqlalchemy.orm import sessionmaker
import Post
from Exception import IllegalArgumentException, UnknownElementException

class PostDAO(object):
  def __init__(self, engine, schema = None):
    if engine is None:
      raise EnvironmentError("Database Engine not specified")

    self.engine = engine
    Session = sessionmaker(bind = engine)
    self.session = Session()
  
  def findAll(self):
    return self.session.query(Post.Post).all()

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
    print(fetchedPost3.id, fetchedPost3.title, fetchedPost3.description)

  def delete(self, postId):
    fetchedPost = self.session.query(Post.Post).get(postId)
    if (fetchedPost is None):
      raise UnknownElementException()
    self.session.delete(fetchedPost)
    self.session.flush()