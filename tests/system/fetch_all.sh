#!/bin/bash

data=`cat $1`
outputfile=./response.txt

# Get all posts
status=$(curl -s -o "$outputfile" -w "%{http_code}" http://localhost:8080/api/blog/post)
response=$(cat "$outputfile")
rm $outputfile

if [ "$status" != 200 ]; then
  echo status code incorrect: $status supposed to be 204
  exit 1
fi;

if [ "$response" != "$data" ]; then
  echo data incorrect: 
  echo $response
  echo does not match:
  echo $data
  exit 1
fi;

echo success
exit 0
