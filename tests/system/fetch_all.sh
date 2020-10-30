#!/bin/bash

data=`cat $1`
port=$2
outputfile=./response.txt

# Get all posts
status=$(curl -s -o "$outputfile" -w "%{http_code}" http://localhost:"$port"/api/blog/post)
response=$(cat "$outputfile")
# status=$(curl http://localhost:$port/api/blog/post)
rm $outputfile
touch $outputfile

expectedStatus=200

./common/check_status_code.sh "$status" "$expectedStatus"
[[ $? -ne 0 ]] && exit 1


if [ "$response" != "$data" ]; then
  echo -e "\033[0;31merror: \033[0m"
  echo data incorrect: 
  echo $response
  echo does not match:
  echo $data
  exit 1
fi;

echo -e "\033[0;32msuccess \033[0m"
exit 0
