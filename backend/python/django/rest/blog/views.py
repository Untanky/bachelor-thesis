from rest_framework.decorators import api_view
from sqlalchemy import create_engine
from handlers import PostController
import sys, os
sys.path.append(os.path.realpath(os.path.dirname(__file__)+"/../../../dao/src"))
from PostDAO import PostDAO

postDAO = PostDAO(create_engine("postgres://root:root@localhost:5432/blog"))
postController = PostController(postDAO)

@api_view(['GET', 'POST'])
def post(request):
    if request.method == 'GET':
        return postController.fetchAllPosts(request)
    if request.method == 'POST':
        return postController.createPost(request)

@api_view(['PUT', 'DELETE'])
def post_by_id(request, id):
    if request.method == 'PUT':
        return postController.updatePost(id, request)
    if request.method == 'DELETE':
        return postController.deletePost(id, request)
