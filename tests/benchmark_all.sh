#!/bin/bash

services=(
  spring
  jersey
  laravel
  code-igniter
  express
  restify
  asp-net
  django
  flask
)

for service in "${services[@]}"; do
  echo "Fetch all for $service"
  ./benchmark/fetch_all.sh 1000 20 $service
  echo "Create for $service"
  ./benchmark/create.sh 1000 20 $service
  echo "Update for $service"
  ./benchmark/update.sh 1000 20 $service
  echo "Delete for $service"
  ./benchmark/delete.sh 1000 20 $service
  echo "$service complete"
done