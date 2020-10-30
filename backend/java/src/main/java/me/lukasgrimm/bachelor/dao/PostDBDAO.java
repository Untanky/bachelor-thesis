package me.lukasgrimm.bachelor.dao;

import me.lukasgrimm.bachelor.models.Post;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceException;
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
            List<Post> list = query.getResultList();
            list.sort((postA, postB) -> (int)(postA.getId() - postB.getId()));
            return list;
        } finally {
            if (entityManager != null) {
                entityManager.close();
            }
        }
    }

    public void create(Post post) {

        EntityManager entityManager = null;
        try {
            entityManager = entityManagerFactory.createEntityManager();
            entityManager.getTransaction().begin();
            entityManager.persist(post);
            entityManager.getTransaction().commit();
        } catch (PersistenceException e) {
            throw new IllegalArgumentException("id may not be specified");
        } finally {
            if (entityManager != null) {
                entityManager.close();
            }
        }
    }

    public void update(Post post) {

        EntityManager entityManager = null;
        try {
            entityManager = entityManagerFactory.createEntityManager();

            if (entityManager.find(Post.class, post.getId()) == null) {
                throw new IllegalArgumentException("no post found");
            }

            entityManager.getTransaction().begin();
            entityManager.merge(post);
            entityManager.getTransaction().commit();
        } finally {
            if (entityManager != null) {
                entityManager.close();
            }
        }
    }

    public void delete(long postId) {

        EntityManager entityManager = null;
        try {
            entityManager = entityManagerFactory.createEntityManager();
            entityManager.getTransaction().begin();
            Post post = entityManager.find(Post.class, postId);

            if (post == null) {
                throw new IllegalArgumentException("post not found");
            }

            entityManager.remove(post);
            entityManager.getTransaction().commit();
        } finally {
            if (entityManager != null) {
                entityManager.close();
            }
        }
    }
}
