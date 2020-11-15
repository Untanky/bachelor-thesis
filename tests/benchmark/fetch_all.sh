#!/bin/bash

expectedStatus=200
benchmarkRepititions=$1
warmupRepititions=$2
repititions=$(($benchmarkRepititions+$warmupRepititions))
container=$3

port=`./benchmark/bring_up_container.sh $container`

timeString="$container"

for x in $(seq 1 $repititions);
do
  if [ $x = $warmupRepititions ]; then
    docker stats --format "\t{{.MemUsage}}" test_$container >> ./results/fetch_all_memory_$container.csv &
    pid=$!
  fi;
  result=( $(curl --silent -o /dev/null -w "%{time_total} %{http_code}" http://localhost:$port/api/blog/post) )
  time=${result[0]}
  status=${result[1]}
  if [ $status -eq $expectedStatus ]; then
    if [ $x -gt $warmupRepititions ]; then
      timeString="$timeString,$time"
    fi;
  else
    echo "wrong status; got $status, expected $expectedStatus"
    kill $pid
    docker-compose down
    exit 1
  fi;
done

kill $pid

docker-compose down

echo $timeString >> ./results/fetch_all_time.csv
