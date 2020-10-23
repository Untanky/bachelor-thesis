from rest_framework import serializers
import sys, os
sys.path.append(os.path.realpath(os.path.dirname(__file__)+"/../../../dao/src"))
from Post import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'titel', 'description')