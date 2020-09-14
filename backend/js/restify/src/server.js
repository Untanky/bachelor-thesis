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

server.get('/api/blog/post', fetchAllPosts);
server.post('/api/blog/post', createPost);
server.put('/api/blog/post/:postId', updatePost);
server.del('/api/blog/post/:postId', deletePost);

// router(server, true)([
//   {
//     group: 'api/blog/post',
//     routes: [
//       {
//         match: ':postId',
//         method: 'put',
//         action: updatePost,
//       },
//       {
//         match: ':postId',
//         method: 'delete',
//         action: deletePost,
//       },
//       {
//         match: '',
//         method: 'get',
//         action: fetchAllPosts,
//       },
//       {
//         match: '',
//         method: 'post',
//         action: createPost,
//       },
//     ],
//   },
// ]);

export default server;
