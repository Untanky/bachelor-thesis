package me.lukasgrimm.bachelor.blog.spring.controller;

import me.lukasgrimm.bachelor.dao.PostDAO;
import me.lukasgrimm.bachelor.models.Post;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;

public class BlogTests {

    @Test
    void findAllShouldReturnListOfPosts() {

        List<Post> expectedPostList = new ArrayList<>();

        Post post1 = new Post();
        post1.setTitle("First post");
        post1.setDescription("This is my first post in this blog");
        expectedPostList.add(post1);

        Post post2 = new Post();
        post2.setTitle("Post #2");
        post2.setDescription("My second post ever. My momma says she is so proud");
        expectedPostList.add(post2);

        PostDAO mockedDao = mock(PostDAO.class);
        when(mockedDao.findAll()).thenReturn(expectedPostList);

        Blog blog = new Blog(mockedDao);

        List<Post> actualPostList = blog.fetchAllPosts();

        Assertions.assertEquals(expectedPostList, actualPostList);
        verify(mockedDao, atLeastOnce()).findAll();
    }

    @Test
    void createPostShouldReturnNoContentStatusWhenEverythingFine() {

        Post post = new Post();

        PostDAO mockedDao = mock(PostDAO.class);

        Blog blog = new Blog(mockedDao);

        ResponseEntity<Void> responseEntity = blog.createPost(post);

        Assertions.assertEquals(responseEntity.getStatusCode(), HttpStatus.NO_CONTENT);
        verify(mockedDao, atLeastOnce()).create(post);
    }

    @Test
    void createPostShouldReturnBadContentStatusWhenPostContainsId() throws Exception {

        Post post = new Post();

        PostDAO mockedDao = mock(PostDAO.class);
        doThrow(new IllegalArgumentException()).when(mockedDao).create(post);

        Blog blog = new Blog(mockedDao);

        ResponseEntity<Void> responseEntity = blog.createPost(post);

        Assertions.assertEquals(responseEntity.getStatusCode(), HttpStatus.BAD_REQUEST);
        verify(mockedDao, atLeastOnce()).create(post);
    }

    @Test
    void updatePostShouldReturnNoContentStatusWhenEverythingFine() {

        final int postId = 0;
        Post post = new Post();

        PostDAO mockedDao = mock(PostDAO.class);

        Blog blog = new Blog(mockedDao);

        ResponseEntity<Void> responseEntity = blog.updatePost(postId, post);

        Assertions.assertEquals(responseEntity.getStatusCode(), HttpStatus.NO_CONTENT);
        verify(mockedDao, atLeastOnce()).update(post);
    }

    @Test
    void updatePostShouldReturnBadRequestStatusWhenIdsDoNotMatch() throws Exception {

        final int postId = 5;
        Post post = new Post();
        PostDAO mockedDao = mock(PostDAO.class);

        Blog blog = new Blog(mockedDao);

        ResponseEntity<Void> responseEntity = blog.updatePost(postId, post);

        Assertions.assertEquals(responseEntity.getStatusCode(), HttpStatus.BAD_REQUEST);
        verify(mockedDao, never()).update(post);
    }

    @Test
    void updatePostShouldReturnNotFoundStatusWhenIdDoesNotExist() throws Exception {

        final int postId = 0;
        Post post = new Post();

        PostDAO mockedDao = mock(PostDAO.class);
        doThrow(new IllegalArgumentException()).when(mockedDao).update(post);

        Blog blog = new Blog(mockedDao);

        ResponseEntity<Void> responseEntity = blog.updatePost(postId, post);

        Assertions.assertEquals(responseEntity.getStatusCode(), HttpStatus.NOT_FOUND);
        verify(mockedDao, atLeastOnce()).update(post);
    }

    @Test
    void deletePostShouldReturnNoContentStatusWhenEverythingFine() {

        final int postId = 0;

        PostDAO mockedDao = mock(PostDAO.class);

        Blog blog = new Blog(mockedDao);

        ResponseEntity<Void> responseEntity = blog.deletePost(postId);

        Assertions.assertEquals(responseEntity.getStatusCode(), HttpStatus.NO_CONTENT);
        verify(mockedDao, atLeastOnce()).delete(postId);
    }

    @Test
    void deletePostShouldReturnNotFoundStatusWhenIdDoesNotExist() throws Exception {

        final int postId = 5;

        PostDAO mockedDao = mock(PostDAO.class);
        doThrow(new IllegalArgumentException()).when(mockedDao).delete(postId);

        Blog blog = new Blog(mockedDao);

        ResponseEntity<Void> responseEntity = blog.deletePost(postId);

        Assertions.assertEquals(responseEntity.getStatusCode(), HttpStatus.NOT_FOUND);
        verify(mockedDao, atLeastOnce()).delete(postId);
    }
}
