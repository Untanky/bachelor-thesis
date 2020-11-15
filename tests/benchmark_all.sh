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

warmup=20
repitions=1000

for service in "${services[@]}"; do
  echo "Fetch all for $service"
  ./benchmark/fetch_all.sh $repitions $warmup $service
  echo "Create for $service"
  ./benchmark/create.sh $repitions $warmup $service
  echo "Update for $service"
  ./benchmark/update.sh $repitions $warmup $service
  echo "Delete for $service"
  ./benchmark/delete.sh $repitions $warmup $service
  echo "$service complete"
done