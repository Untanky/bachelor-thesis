from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from sqlalchemy import create_engine
import sys, os
# sys.path.append(os.path.realpath(os.path.dirname(__file__))
from serializer import PostSerializer
sys.path.append(os.path.realpath(os.path.dirname(__file__)+"/../../../dao/src"))
from PostDAO import PostDAO


postDAO = PostDAO(create_engine("postgres://root:root@localhost:5432/blog"))

# def home(request):
#     tmpl_vars = {'form': PostForm()}
#     return render(request, 'talk/index.html', tmpl_vars)


@api_view(['GET', 'POST'])
def post(request):
    if request.method == 'GET':
        return fetchAllPosts(request)
    if request.method == 'POST':
        return createPost(request)

def fetchAllPosts(request):
    posts = postDAO.findAll()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

def createPost(request):
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        try:
            postDAO.create(serializer.validated_data)
        except Exception as identifier:
            return Response(status = 400)
        return Response(status = 204)
    else:
        return Response(status = 400)

@api_view(['PUT', 'DELETE'])
def post_by_id(request, id):
    if request.method == 'PUT':
        return updatePost(id, request)
    if request.method == 'DELETE':
        return deletePost(id, request)

def updatePost(id, request):
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        post = serializer.validated_data
        if id != post.id:
            return Response(status = 400)
        try:
            postDAO.update(post)
        except Exception as identifier:
            return Response(status = 404)
        return Response(status = 204)
    else:
        return Response(status = 400)

def deletePost(id, request):
    try:
        postDAO.delete(id)
        return Response(status = 204)
    except:
        return Response(status = 404)

# @api_view(['GET'])
# def post_element(request, pk):
#     try:
#         post = Post.objects.get(pk=pk)
#     except Post.DoesNotExist:
#         return HttpResponse(status=404)

#     if request.method == 'GET':
#         serializer = PostSerializer(post)
#         return Response(serializer.data)