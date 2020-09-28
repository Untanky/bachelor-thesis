#!/bin/bash

outputfile=./response.txt

status=$(curl -s -w "%{http_code}" --request POST 'localhost:8080/api/blog/post' --header 'Content-Type: application/json' --data-raw '{"title":"Blog continued","description":"Next entry in my blog"}')

if [ $status != 204 ]; then
  echo status code incorrect: $status supposed to be 204
  exit 1
fi;

source ./system/fetch_all.sh $2
