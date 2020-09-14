import * as PostDAO from 'dao/dao/PostDAO';

export const fetchAllPosts = async (req, res) => {
  res.status(200);
  res.send(await PostDAO.findAll());
};

export const createPost = (req, res) => {

};

export const updatePost = (req, res) => {

};

export const deletePost = (req, res) => {

};
