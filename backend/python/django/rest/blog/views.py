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


@api_view(['GET'])
def post_collection(request):
    if request.method == 'GET':
        posts = postDAO.findAll()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)


# @api_view(['GET'])
# def post_element(request, pk):
#     try:
#         post = Post.objects.get(pk=pk)
#     except Post.DoesNotExist:
#         return HttpResponse(status=404)

#     if request.method == 'GET':
#         serializer = PostSerializer(post)
#         return Response(serializer.data)