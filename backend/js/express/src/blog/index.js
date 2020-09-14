import express from 'express';
import {
  fetchAllPosts,
  createPost,
  updatePost,
  deletePost,
} from './handler';

const router = express.Router();

router.get('/post', fetchAllPosts);

router.post('/post', (req, res) => {

});

router.put('/post/:postId', (req, res) => {

});

router.delete('/post/:postId', (req, res) => {

});

export default router;
