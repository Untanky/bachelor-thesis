package me.lukasgrimm.bachelor.dao;

import me.lukasgrimm.bachelor.models.Post;
import org.hibernate.SessionFactory;

import javax.persistence.EntityManager;
import java.util.List;

public class PostDBDAO implements PostDAO {

    private EntityManager entityManager;

    public PostDBDAO(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<Post> findAll() {
        return null;
    }

    public void create(Post post) {

    }

    public void update(Post post) {

    }

    public void delete(Post post) {

    }
}
