#!/bin/bash

expectedStatus=204
benchmarkRepititions=$1
warmupRepititions=$2
repititions=$(($benchmarkRepititions + $warmupRepititions))
outFile=$3
name=$4

newPost=`cat ./data/update_post_3.json`

printf "$name," >> $outFile

for x in $(seq 1 $repititions);
do
  result=( $(curl --silent -o /dev/null -w "%{time_total} %{http_code}" --request PUT http://localhost:8080/api/blog/post/3 --header 'Content-Type: application/json' --data-raw "$newPost") )
  time=${result[0]}
  status=${result[1]}
  if [ $status = $expectedStatus ]; then
    printf "$time," >> $outFile;
  else
    echo "wrong status; got $status, expected $expectedStatus"
  fi;
done

printf "\n" >> $outFile
