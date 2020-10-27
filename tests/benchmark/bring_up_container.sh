#!/bin/bash

serviceName=$1

docker-compose up -d database $serviceName

sleep 5

case $serviceName in
spring)
  echo 8081
  ;;
jersey)
  echo 8082
  ;;
laravel)
  echo 8083
  ;;
code-igniter)
  echo 8084
  ;;
express)
  echo 8085
  ;;
restify)
  echo 8086
  ;;
asp-net)
  echo 8087
  ;;
flask)
  echo 8088
  ;;
django)
  echo 8089
  ;;
esac;
