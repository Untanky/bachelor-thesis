import restify from 'restify';
import corsMiddleware from 'restify-cors-middleware';
import {
  fetchAllPosts,
  createPost,
  updatePost,
  deletePost,
} from './blog/handler';

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0',
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const cors = corsMiddleware({
  origins: ['*'],
  allowHeaders: ['*'],
  exposeHeaders: ['*'],
});

server.pre(cors.preflight);
server.use(cors.actual);

server.get('/api/blog/post', fetchAllPosts);
server.post('/api/blog/post', createPost);
server.put('/api/blog/post/:postId', updatePost);
server.del('/api/blog/post/:postId', deletePost);

export default server;
