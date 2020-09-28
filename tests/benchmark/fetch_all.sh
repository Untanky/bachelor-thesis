#!/bin/bash

expectedStatus=200
benchmarkRepititions=$1
warmupRepititions=$2
repititions=$(($benchmarkRepititions + $warmupRepititions))
outFile=$3
name=$4

printf "$name," >> $outFile

for x in $(seq 1 $repititions);
do
  result=( $(curl --silent -o /dev/null -w "%{time_total} %{http_code}" http://localhost:8080/api/blog/post) )
  time=${result[0]}
  status=${result[1]}
  if [ $status = $expectedStatus ]; then
    printf "$time," >> $outFile;
  else
    echo wrong status; got $status, expected $expectedStatus
  fi;
done

printf "\n" >> $outFile
