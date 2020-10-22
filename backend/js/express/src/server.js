import express from 'express';
import bodyParser from 'body-parser';

import blog from './blog';

const server = express();

server.use(bodyParser.json());

server.use('/api/blog', blog);

export default server;
