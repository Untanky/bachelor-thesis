#!/bin/bash

expectedStatus=204
benchmarkRepititions=$1
warmupRepititions=$2
repititions=$(($benchmarkRepititions + $warmupRepititions))
container=$3

timeString="$container"

newPost=`cat ./data/new_post.json`

for x in $(seq 1 $repititions);
do
  if [ $x = $warmupRepititions ]; then
    docker stats --format "\t{{.MemUsage}}" $container >> benchmark/results/create_memory_$container.csv &
    pid=$!
  fi;
  result=( $(curl --silent -o /dev/null -w "%{time_total} %{http_code}" --request POST http://localhost:8080/api/blog/post --header 'Content-Type: application/json' --data-raw "$newPost") )
  time=${result[0]}
  status=${result[1]}
  if [ $status = $expectedStatus ]; then
    if [ $x > $warmupRepititions ]; then
      timeString="$timeString,$time"
    fi;
  else
    echo wrong status; got $status, expected $expectedStatus
    exit 1
  fi;
done

kill $pid
echo $timeString >> benchmark/results/create_time.csv
