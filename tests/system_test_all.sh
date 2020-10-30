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

totalTestsFailed=0
totalSuitsFailed=0

for service in "${services[@]}"; do
  testsFailed=0
  echo "System test for $service"
  /bin/bash ./system/system_test.sh $service
  testsFailed=$?
  totalTestsFailed=$(($totalTestsFailed + $testsFailed))
  echo "$service complete: "
  if [ $testsFailed -ne 0 ]; then
    echo -e "\033[0;31m$testsFailed errors\033[0m"
    totalSuitsFailed=$(($totalSuitsFailed+1))
  else
    echo -e "\033[0;32m0 errors \033[0m"
  fi
done

echo "$totalTestsFailed Tests failed ($totalSuitsFailed Suites had errors)"
exit $totalTestsFailed
