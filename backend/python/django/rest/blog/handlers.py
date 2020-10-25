from rest_framework.response import Response
from sqlalchemy import create_engine
from serializer import PostSerializer
import sys, os
sys.path.append(os.path.realpath(os.path.dirname(__file__)+"/../../../dao/src"))
from PostDAO import PostDAO

postDAO = PostDAO(create_engine("postgres://root:root@localhost:5432/blog"))

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
