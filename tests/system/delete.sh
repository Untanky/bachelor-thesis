#!/bin/bash

postId=3

status=$(curl -s -w "%{http_code}" --request DELETE 'localhost:8080/api/blog/post/'$postId)

expectedStatus=204

if [ $status != $expectedStatus ]; then
  echo status code incorrect: $status supposed to be $expectedStatus
  exit 1
fi;

source ./system/fetch_all.sh $2
