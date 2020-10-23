from rest_framework import serializers
import sys, os
sys.path.append(os.path.realpath(os.path.dirname(__file__)+"/../../../dao/src"))
from Post import Post


class PostSerializer(serializers.BaseSerializer):
    def to_representation(self, instance):
        return {
            'id': instance.id,
            'title': instance.title,
            'description': instance.description
        }
    
    def to_internal_value(self, instance):
        if 'id' in instance.keys():
            return Post(id = instance['id'], title = instance['title'], description = instance['description'])
        else:
            return Post(title = instance['title'], description = instance['description'])