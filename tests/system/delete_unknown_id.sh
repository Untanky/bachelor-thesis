#!/bin/bash

postId=100
port=$2

status=$(curl -s -w "%{http_code}" --request DELETE localhost:$port/api/blog/post/$postId)

expectedStatus=404

./common/check_status_code.sh "$status" "$expectedStatus"
[[ $? -ne 0 ]] && exit 1

source ./system/fetch_all.sh $1 $port
