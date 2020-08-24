package me.lukasgrimm.bachelor.dao;

import me.lukasgrimm.bachelor.models.Post;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.accessibility.AccessibilityProvider;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.lang.reflect.AccessibleObject;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
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

        System.out.println(expectedPost.getId());

        EntityManager entityManager = entityManagerFactory.createEntityManager();
        Post actualPost = entityManager.<Post>find(Post.class, expectedPost.getId());

        Assertions.assertEquals(expectedPost.getId(), actualPost.getId());
        Assertions.assertEquals(expectedPost.getTitle(), actualPost.getTitle());
        Assertions.assertEquals(expectedPost.getDescription(), actualPost.getDescription());
    }

    @Test
    void createShouldThrowIllegalArgumentExceptionWhenElementNotFound() throws Exception {

        final long POST_ID = 1;

        Assumptions.assumeFalse(post1.getId() == POST_ID);
        Assumptions.assumeFalse(post2.getId() == POST_ID);
        Assumptions.assumeFalse(post3.getId() == POST_ID);

        Post createPost = new Post();
        createPost.setTitle("Test");
        createPost.setDescription("Description");
        Field idField = createPost.getClass().getDeclaredField("id");
        idField.setAccessible(true);
        idField.setLong(createPost, POST_ID);

        Assertions.assertThrows(IllegalArgumentException.class, () -> dao.create(createPost));
    }

    @Test
    void updateShouldUpdateRecipeInDB() {

        final long POST_ID = post3.getId();
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
    void updateShouldThrowIllegalArgumentExceptionWhenElementNotFound() throws Exception {

        final long POST_ID = 1251252142;

        Assumptions.assumeFalse(post1.getId() == POST_ID);
        Assumptions.assumeFalse(post2.getId() == POST_ID);
        Assumptions.assumeFalse(post3.getId() == POST_ID);

        Post updatePost = new Post();
        updatePost.setTitle("Test");
        updatePost.setDescription("Description");
        Field idField = updatePost.getClass().getDeclaredField("id");
        idField.setAccessible(true);
        idField.setLong(updatePost, POST_ID);

        Assertions.assertThrows(IllegalArgumentException.class, () -> dao.update(updatePost));
    }

    @Test
    void deleteShouldDeleteRecipeInDB() {

        final long POST_ID = post3.getId();
        EntityManager entityManager = entityManagerFactory.createEntityManager();

        dao.delete(POST_ID);

        Post actualPost = entityManager.find(Post.class, POST_ID);

        Assertions.assertNull(actualPost);
    }

    @Test
    void deleteShouldThrowIllegalArgumentExceptionWhenElementNotFound() {

        final long POST_ID = 1251252142;

        Assumptions.assumeFalse(post1.getId() == POST_ID);
        Assumptions.assumeFalse(post2.getId() == POST_ID);
        Assumptions.assumeFalse(post3.getId() == POST_ID);

        Assertions.assertThrows(IllegalArgumentException.class, () -> dao.delete(POST_ID));
    }
}
