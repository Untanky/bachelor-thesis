#!/bin/bash

updatePost=`cat $1`
postId=3

status=$(curl -s -w "%{http_code}" --request PUT 'localhost:8080/api/blog/post/'$postId --header 'Content-Type: application/json' --data-raw "$updatePost")

echo $status

if [ $status != 204 ]; then
  echo status code incorrect: $status supposed to be 204
  exit 1
fi;

source ./system/fetch_all.sh $2
