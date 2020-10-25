from rest_framework.response import Response
from serializer import PostSerializer

class PostController:
    def __init__(self, postDAO):
        self.postDAO = postDAO

    def fetchAllPosts(self, request):
        posts = self.postDAO.findAll()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def createPost(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            try:
                self.postDAO.create(serializer.validated_data)
            except Exception as identifier:
                return Response(status = 400)
            return Response(status = 204)
        else:
            return Response(status = 400)

    def updatePost(self, id, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            post = serializer.validated_data
            if id != post.id:
                return Response(status = 400)
            try:
                self.postDAO.update(post)
            except Exception as identifier:
                return Response(status = 404)
            return Response(status = 204)
        else:
            return Response(status = 400)

    def deletePost(self, id, request):
        try:
            self.postDAO.delete(id)
            return Response(status = 204)
        except:
            return Response(status = 404)
