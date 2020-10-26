from flask import Flask, request, make_response, jsonify
from sqlalchemy import create_engine
from controller import PostController, response_with_status_code
import sys, os
sys.path.append(os.path.realpath(os.path.dirname(__file__)+"/../dao/src"))
from Exception import IllegalArgumentException, UnknownElementException
from PostDAO import PostDAO
from Post import Post

app = Flask(__name__)

postDAO = PostDAO(create_engine("postgres://root:root@database:5432/blog"))
controller = PostController(postDAO)

@app.route("/api/blog/post", methods=['GET', 'POST'])
def post():
  if request.method == 'GET':
    return controller.fetchAllPost()
  elif request.method == 'POST':
    return controller.createPost()
  else:
    return response_with_status_code(404)

@app.route("/api/blog/post/<int:postId>", methods=['PUT', 'DELETE'])
def post_by_id(postId):
  if request.method == 'PUT':
    return controller.updatePost(postId)
  elif request.method == 'DELETE':
    return controller.deletePost(postId)
  else:
    return response_with_status_code(404)

if __name__ == "__main__":
  app.run(host = '0.0.0.0')