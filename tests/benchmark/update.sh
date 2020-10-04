#!/bin/bash

expectedStatus=204
benchmarkRepititions=$1
warmupRepititions=$2
repititions=$(($benchmarkRepititions+$warmupRepititions))
container=$3

port=$(./benchmark/bring_up_container.sh $container)

timeString="$container"

newPost=`cat ./data/update_post_3.json`

for x in $(seq 1 $repititions);
do
  if [ $x = $warmupRepititions ]; then
    docker stats --format "\t{{.MemUsage}}" test_$container >> benchmark/results/update_memory_$container.csv &
    pid=$!
  fi;
  result=( $(curl --silent -o /dev/null -w "%{time_total} %{http_code}" --request PUT http://localhost:$port/api/blog/post/3 --header 'Content-Type: application/json' --data-raw "$newPost") )
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

docker-compose down

echo $timeString >> benchmark/results/update_time.csv
