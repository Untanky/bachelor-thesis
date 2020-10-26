import sys, os
from flask import request, make_response, jsonify
sys.path.append(os.path.realpath(os.path.dirname(__file__)+"/../dao/src"))
from Exception import IllegalArgumentException, UnknownElementException
from Post import Post

def post_from_request():
  data = request.json
  if 'id' in data.keys():
    post = Post(id = int(data['id']), title = data['title'], description = data['description'])
  else:
    post = Post(title = data['title'], description = data['description'])
  return post

def response_with_status_code(status_code):
  resp = make_response()
  resp.status_code = status_code
  return resp

class PostController:
  def __init__(self, postDAO):
    self.postDAO = postDAO

  def fetchAllPost(self):
    postList = self.postDAO.findAll()
    return jsonify([e.serialize() for e in postList])

  def createPost(self):
    post = post_from_request()
    try:
      self.postDAO.create(post)
      return response_with_status_code(204)
    except IllegalArgumentException as exception:
      return response_with_status_code(400)

  def updatePost(self, id):
    post = post_from_request()
    try:
      if id != post.id:
        return response_with_status_code(400)
      self.postDAO.update(post)
      return response_with_status_code(204)
    except UnknownElementException as exception:
      return response_with_status_code(404)
    except:
      print('HELLO WORLD')
    

  def deletePost(self, id):
    try:
      self.postDAO.delete(id)
      return response_with_status_code(204)
    except UnknownElementException as exception:
      return response_with_status_code(404)