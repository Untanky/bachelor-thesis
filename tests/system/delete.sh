#!/bin/bash

port=$2
postId=3

status=$(curl -s -w "%{http_code}" --request DELETE localhost:$port/api/blog/post/$postId)

expectedStatus=204

if [ $status != $expectedStatus ]; then
  echo status code incorrect: $status supposed to be $expectedStatus
  exit 1
fi;

source ./system/fetch_all.sh $1 $port
