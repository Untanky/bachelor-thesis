# Web-Frontend

The Web-Frontend accesses the backend server

## Unit Tests

Unit tests can be executed by the command `yarn test`.

## Starting with docker

Node.js is required to start the system without Docker.

0. Adjust conifiguration:
  * in `./src/service.conf.json` change the ports the respective ports of the applications
1. Open a terminal located at this directory (`~/frontend`).
2. Execute `yarn install`. Depenedency will be installed.
3. Execute `yarn start`. Starts development server with this application.
