#!/bin/bash

postId=100
port=$2

status=$(curl -s -w "%{http_code}" --request DELETE localhost:$port/api/blog/post/$postId)

expectedStatus=404

if [ $status != $expectedStatus ]; then
  echo status code incorrect: $status supposed to be $expectedStatus
  exit 1
fi;

source ./system/fetch_all.sh $1 $port
