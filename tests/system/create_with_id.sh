#!/bin/bash 

newPost=`cat "$1"`
port=$3

status=$(curl -s -w "%{http_code}" --request POST localhost:"$port"/api/blog/post --header 'Content-Type: application/json' --data-raw "$newPost")

expectedStatus=400

if [ $status != $expectedStatus ]; then
  echo status code incorrect: $status supposed to be $expectedStatus
  exit 1
fi;

source ./system/fetch_all.sh $2 $port