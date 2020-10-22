from sqlalchemy.orm import sessionmaker
import Post

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
    self.session.add(post)
    self.session.flush()

  def update(self, post):
    self.session.merge(post)
    self.session.flush()

  def delete(self, post):
    self.session.delete(post)
    self.session.flush()