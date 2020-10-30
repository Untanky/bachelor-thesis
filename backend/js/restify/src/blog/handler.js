import * as PostDAO from 'dao/dao/PostDAO';

export const fetchAllPosts = async (req, res) => {
  res.send(200, await PostDAO.findAll());
};

export const createPost = async (req, res) => {
  try {
    const post = req.body;
    await PostDAO.create(post);
    res.send(204);
  } catch (error) {
    res.send(400, '');
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = req.body;
    const { postId } = req.params;

    if (post.id !== Number.parseInt(postId, 10)) {
      res.send(400, '');
      return;
    }

    await PostDAO.update(post);
    res.send(204);
  } catch (error) {
    res.send(404, '');
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    await PostDAO.remove(postId);
    res.send(204);
  } catch (error) {
    res.send(404, '');
  }
};
