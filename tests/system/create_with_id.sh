#!/bin/bash 

newPost=`cat "$1"`
port=$3

status=$(curl -s -w "%{http_code}" --request POST localhost:"$port"/api/blog/post --header 'Content-Type: application/json' --data-raw "$newPost")

expectedStatus=400

./common/check_status_code.sh "$status" "$expectedStatus"
[[ $? -ne 0 ]] && exit 1

source ./system/fetch_all.sh $2 $port