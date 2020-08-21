package me.lukasgrimm.bachelor.dao;

import me.lukasgrimm.bachelor.models.Post;

import javax.persistence.EntityManagerFactory;
import java.util.ArrayList;
import java.util.List;

public class PostDBDAO implements PostDAO {

    private EntityManagerFactory entityManagerFactory;

    public PostDBDAO(EntityManagerFactory entityManagerFactory) {
        this.entityManagerFactory = entityManagerFactory;
    }

    public List<Post> findAll() {
        return new ArrayList<>();
    }

    public void create(Post post) {

    }

    public void update(Post post) {

    }

    public void delete(long postId) {

    }
}
