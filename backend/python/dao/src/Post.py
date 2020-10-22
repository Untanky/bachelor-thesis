from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

class Post(Base):
  __tablename__ = 'post'

  id = Column(Integer, primary_key = True)
  title = Column(String)
  description = Column(String)