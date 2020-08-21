package me.lukasgrimm.bachelor.dao;

import me.lukasgrimm.bachelor.models.Post;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import java.util.List;

public class PostDBDAO implements PostDAO {

    private EntityManagerFactory entityManagerFactory;

    public PostDBDAO(EntityManagerFactory entityManagerFactory) {
        this.entityManagerFactory = entityManagerFactory;
    }

    public List<Post> findAll() {

        EntityManager entityManager = null;
        try {
            entityManager = entityManagerFactory.createEntityManager();
            Query query = entityManager.createQuery("SELECT p FROM Post p");
            return query.getResultList();
        } finally {
            if (entityManager != null) {
                entityManager.close();
            }
        }
    }

    public void create(Post post) {

    }

    public void update(Post post) {

    }

    public void delete(long postId) {

    }
}
