#!/bin/bash

port=$2
postId=3

status=$(curl -s -w "%{http_code}" --request DELETE localhost:$port/api/blog/post/$postId)

expectedStatus=204

./common/check_status_code.sh "$status" "$expectedStatus"
[[ $? -ne 0 ]] && exit 1

source ./system/fetch_all.sh $1 $port
