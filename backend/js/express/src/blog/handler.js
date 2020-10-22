import * as PostDAO from 'dao/dao/PostDAO';

export const fetchAllPosts = async (req, res) => {
  res.status(200);
  res.send(await PostDAO.findAll());
};

export const createPost = async (req, res) => {
  try {
    const post = req.body;
    await PostDAO.create(post);
    res.sendStatus(204);
  } catch (error) {
    res.status(400);
    res.send('');
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = req.body;
    const { postId } = req.params;

    if (post.id !== postId) {
      res.status(400);
      res.send('');
      return;
    }

    await PostDAO.update(post);
    res.sendStatus(204);
  } catch (error) {
    res.status(404);
    res.send('');
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    console.log(postId);
    await PostDAO.remove(postId);
    res.sendStatus(204);
  } catch (error) {
    res.status(404);
    res.send('');
  }
};
