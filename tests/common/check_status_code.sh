#!/bin/bash

actualStatus=$1
expectedStatus=$2

if [ ${actualStatus: -3} != $expectedStatus ]; then
  echo -e "\033[0;31merror:\033[0m status code incorrect: $actualStatus supposed to be $expectedStatus"
  exit 1
fi;