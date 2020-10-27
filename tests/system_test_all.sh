#!/bin/bash

services=(
  # spring
  # jersey
  laravel
  code-igniter
  # express
  # restify
  # asp-net
)

for service in "${services[@]}"; do
  echo "System test for $service"
  /bin/bash ./system/system_test.sh $service
  echo "$service complete"
done