from rest_framework.decorators import api_view
from handlers import fetchAllPosts, createPost, updatePost, deletePost

@api_view(['GET', 'POST'])
def post(request):
    if request.method == 'GET':
        return fetchAllPosts(request)
    if request.method == 'POST':
        return createPost(request)

@api_view(['PUT', 'DELETE'])
def post_by_id(request, id):
    if request.method == 'PUT':
        return updatePost(id, request)
    if request.method == 'DELETE':
        return deletePost(id, request)
