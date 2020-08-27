package me.lukasgrimm.bachelor.dao;

import me.lukasgrimm.bachelor.models.Post;

import java.util.List;

public interface PostDAO {

    List<Post> findAll();

    void create(Post post);

    void update(Post post);

    void delete(long postId);
}
