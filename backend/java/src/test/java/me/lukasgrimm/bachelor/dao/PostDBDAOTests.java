package me.lukasgrimm.bachelor.dao;

import me.lukasgrimm.bachelor.models.Post;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.ArrayList;
import java.util.List;

public class PostDBDAOTests {

    private static EntityManagerFactory entityManagerFactory =
            Persistence.createEntityManagerFactory("Test-PostDB");

    private EntityManager entityManager;

    private Post post1;
    private Post post2;
    private Post post3;

    @BeforeEach
    void setup() {

        entityManager = entityManagerFactory.createEntityManager();
    }

    @Test
    void findAllShouldReturnListOfPosts() {

        PostDBDAO dao = new PostDBDAO(entityManager);

        List<Post> actualRes = dao.findAll();

        List<Post> expectedRes = new ArrayList<>();
        expectedRes.add(post1);
        expectedRes.add(post2);
        expectedRes.add(post3);

        Assertions.assertEquals(expectedRes, actualRes);
    }

    @Test
    void createShouldCreateRecipeInDB() {

    }

    @Test
    void updateShouldUpdateRecipeInDB() {

    }

    @Test
    void deleteShouldDeleteRecipeInDB() {

    }
}
