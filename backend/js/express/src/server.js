import express from 'express';

import blog from './blog';

const server = express();

server.use('/api/blog', blog);

server.get('/hello', (req, res) => res.send('Hello'));

export default server;
