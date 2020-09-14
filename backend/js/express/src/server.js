import express from 'express';

import blog from './blog';

const server = express();

server.use('api', blog);

export default server;
