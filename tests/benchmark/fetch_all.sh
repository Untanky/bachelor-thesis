#!/bin/bash

expectedStatus=200
benchmarkRepititions=$1
warmupRepititions=$2
repititions=$(($benchmarkRepititions + $warmupRepititions))
container=$3

timeString="$container"

for x in $(seq 1 $repititions);
do
  if [ $x = $warmupRepititions ]; then
    docker stats --format "\t{{.MemUsage}}" $container >> benchmark/results/fetch_all_memory_$container.csv &
    pid=$!
  fi;
  result=( $(curl --silent -o /dev/null -w "%{time_total} %{http_code}" http://localhost:8080/api/blog/post) )
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
echo $timeString >> benchmark/results/fetch_all_time.csv
