import express from 'express';
import {
  fetchAllPosts,
  createPost,
  updatePost,
  deletePost,
} from './handler';

const router = express.Router();

router.get('/post', fetchAllPosts);

router.post('/post', createPost);

router.put('/post/:postId', updatePost);

router.delete('/post/:postId', deletePost);

export default router;
