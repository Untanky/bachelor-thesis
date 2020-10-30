#!/bin/bash

updatePost=`cat $1`
port=$3
postId=100

status=$(curl -s -w "%{http_code}" --request PUT localhost:$port/api/blog/post/$postId --header 'Content-Type: application/json' --data-raw "$updatePost")

expectedStatus=404

./common/check_status_code.sh "$status" "$expectedStatus"
[[ $? -ne 0 ]] && exit 1

source ./system/fetch_all.sh $2 $port
