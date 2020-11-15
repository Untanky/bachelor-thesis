# System tests

This folder contains the system test

## System-Test

System tests can be executed with the script: `./system_test_all.sh`. The result can be found in the terminal window.

## Benchmark-Test

Benchmark tests can be executed with the script: `./benchmark_test_all.sh`. The results can be found in the directory: `./results`. These are raw `.csv` files containing the measurements generated.

The number of measurements can be changed through two variables: `warmup` and `repition`. The first `warmup` execution will not be stored.

## Starting without Docker

It is not possible to run the system tests without Docker. The memory benchmark requires Docker utitilties. Also docker provides a convient method starting, stopping and restarting all the applications.

To run the system tests without docker, it would be required to rewrite the Bash-Scripts in this directory and the sub-directories.
