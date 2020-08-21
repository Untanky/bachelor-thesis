package me.lukasgrimm.bachelor.dao;

import me.lukasgrimm.bachelor.models.Post;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.ArrayList;
import java.util.List;

public class PostDBDAOTests {

    private EntityManagerFactory entityManagerFactory;

    private PostDBDAO dao;

    private Post post1;
    private Post post2;
    private Post post3;

    @BeforeEach
    void setup() {

        entityManagerFactory = Persistence.createEntityManagerFactory("Test-PostDB");

        EntityManager entityManager = entityManagerFactory.createEntityManager();
        entityManager.getTransaction().begin();

        post1 = new Post();
        post1.setTitle("First post");
        post1.setDescription("This is my first post in this blog");
        entityManager.persist(post1);

        post2 = new Post();
        post2.setTitle("Post #2");
        post2.setDescription("My second post ever. My momma says she is so proud");
        entityManager.persist(post2);

        post3 = new Post();
        post3.setTitle("My last post");
        post3.setDescription("I have to quit posting, so this my last post");
        entityManager.persist(post3);

        entityManager.getTransaction().commit();

        dao = new PostDBDAO(entityManagerFactory);
    }

    @Test
    void findAllShouldReturnListOfPosts() {

        List<Post> actualRes = dao.findAll();

        List<Post> expectedRes = new ArrayList<>();
        expectedRes.add(post1);
        expectedRes.add(post2);
        expectedRes.add(post3);

        Assertions.assertEquals(expectedRes.size(), actualRes.size());

        for (int i = 0; i < expectedRes.size(); i++) {
            Post expectedPost = expectedRes.get(i);
            Post actualPost = actualRes.get(i);

            Assertions.assertEquals(expectedPost.getId(), actualPost.getId());
            Assertions.assertEquals(expectedPost.getTitle(), actualPost.getTitle());
            Assertions.assertEquals(expectedPost.getDescription(), actualPost.getDescription());
        }
    }

    @Test
    void createShouldCreateRecipeInDB() {

        Post expectedPost = new Post();
        expectedPost.setTitle("I'm back and posting again");
        expectedPost.setDescription("I have decided that I need to continue posting.");

        dao.create(expectedPost);

        EntityManager entityManager = entityManagerFactory.createEntityManager();
        Post actualPost = entityManager.find(Post.class, expectedPost.getId());

        Assertions.assertEquals(expectedPost.getId(), actualPost.getId());
        Assertions.assertEquals(expectedPost.getTitle(), actualPost.getTitle());
        Assertions.assertEquals(expectedPost.getDescription(), actualPost.getDescription());
    }

    @Test
    void updateShouldUpdateRecipeInDB() {

        final long POST_ID = 3;
        EntityManager entityManager = entityManagerFactory.createEntityManager();

        Post expectedPost = entityManager.find(Post.class, POST_ID);
        expectedPost.setTitle("Post #3");
        expectedPost.setDescription("Third post in a row, I'm on a roll.");

        dao.update(expectedPost);

        Post actualPost = entityManager.find(Post.class, POST_ID);

        Assertions.assertEquals(expectedPost.getId(), actualPost.getId());
        Assertions.assertEquals(expectedPost.getTitle(), actualPost.getTitle());
        Assertions.assertEquals(expectedPost.getDescription(), actualPost.getDescription());
    }

    @Test
    void deleteShouldDeleteRecipeInDB() {

        final long POST_ID = 3;
        EntityManager entityManager = entityManagerFactory.createEntityManager();

        dao.delete(POST_ID);

        Post actualPost = entityManager.find(Post.class, POST_ID);

        Assertions.assertNull(actualPost);
    }
}
