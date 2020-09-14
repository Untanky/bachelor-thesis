import restify from 'restify';
import router from 'restify-router-config';
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

router(server, true)([
  {
    group: 'api/blog',
    routes: [
      {
        match: 'post',
        method: 'get',
        action: fetchAllPosts,
      },
      {
        match: 'post',
        method: 'post',
        action: createPost,
      },
      {
        match: 'post/:postId',
        method: 'put',
        action: updatePost,
      },
      {
        match: 'post/:postId',
        method: 'delete',
        action: deletePost,
      },
    ],
  },
]);

export default server;
