import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import blog from './blog';

const server = express();

server.use(bodyParser.json());
server.use(cors({ origin: '*' }));

server.use('/api/blog', blog);

export default server;
