import Post from '../models/Post';

export const findAll = async () => Post.findAll();

export const create = async (post) => {
  if (post.id) {
    throw new Error();
  }

  await Post.create(post);
};

export const update = async (post) => {
  const fetchedPost = await Post.findOne({ where: { id: post.id } });

  if (!fetchedPost) {
    throw new Error();
  }

  await fetchedPost.update(post);
};

export const remove = async (postId) => {
  const fetchedPost = await Post.findOne({ where: { id: postId } });

  if (!fetchedPost) {
    throw new Error();
  }

  await fetchedPost.destroy();
};
