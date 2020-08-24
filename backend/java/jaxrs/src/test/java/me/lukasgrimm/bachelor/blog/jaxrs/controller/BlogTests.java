package me.lukasgrimm.bachelor.blog.jaxrs.controller;

import me.lukasgrimm.bachelor.dao.PostDAO;
import me.lukasgrimm.bachelor.models.Post;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import javax.ws.rs.core.Response;
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

        Response response = blog.fetchAllPosts();

        Assertions.assertEquals(expectedPostList, response.getEntity());
        Assertions.assertEquals(Response.Status.OK, response.getStatusInfo());
        Assertions.assertEquals("application/json", response.getHeaderString("Content-Type"));
        verify(mockedDao, atLeastOnce()).findAll();
    }

    @Test
    void createPostShouldReturnNoContentStatusWhenEverythingFine() {

        Post post = new Post();

        PostDAO mockedDao = mock(PostDAO.class);

        Blog blog = new Blog(mockedDao);

        Response response = blog.createPost(post);

        Assertions.assertEquals(Response.Status.NO_CONTENT, response.getStatusInfo());
        verify(mockedDao, atLeastOnce()).create(post);
    }

    @Test
    void createPostShouldReturnBadRequestStatusWhenPostContainsId() throws Exception {

        Post post = new Post();

        PostDAO mockedDao = mock(PostDAO.class);
        doThrow(new IllegalArgumentException()).when(mockedDao).create(post);

        Blog blog = new Blog(mockedDao);

        Response response = blog.createPost(post);

        Assertions.assertEquals(Response.Status.BAD_REQUEST, response.getStatusInfo());
        verify(mockedDao, atLeastOnce()).create(post);
    }

    @Test
    void updatePostShouldReturnNoContentStatusWhenEverythingFine() {

        final int postId = 0;
        Post post = new Post();

        PostDAO mockedDao = mock(PostDAO.class);

        Blog blog = new Blog(mockedDao);

        Response response = blog.updatePost(postId, post);

        Assertions.assertEquals(Response.Status.NO_CONTENT, response.getStatusInfo());
        verify(mockedDao, atLeastOnce()).update(post);
    }

    @Test
    void updatePostShouldReturnBadRequestStatusWhenIdsDoNotMatch() throws Exception {

        final int postId = 5;
        Post post = new Post();
        PostDAO mockedDao = mock(PostDAO.class);

        Blog blog = new Blog(mockedDao);

        Response response = blog.updatePost(postId, post);

        Assertions.assertEquals(Response.Status.BAD_REQUEST, response.getStatusInfo());
        verify(mockedDao, never()).update(post);
    }

    @Test
    void updatePostShouldReturnNotFoundStatusWhenIdDoesNotExist() throws Exception {

        final int postId = 0;
        Post post = new Post();

        PostDAO mockedDao = mock(PostDAO.class);
        doThrow(new IllegalArgumentException()).when(mockedDao).update(post);

        Blog blog = new Blog(mockedDao);

        Response response = blog.updatePost(postId, post);

        Assertions.assertEquals(Response.Status.NOT_FOUND, response.getStatusInfo());
        verify(mockedDao, atLeastOnce()).update(post);
    }

    @Test
    void deletePostShouldReturnNoContentStatusWhenEverythingFine() {

        final int postId = 0;

        PostDAO mockedDao = mock(PostDAO.class);

        Blog blog = new Blog(mockedDao);

        Response response = blog.deletePost(postId);

        Assertions.assertEquals(Response.Status.NO_CONTENT, response.getStatusInfo());
        verify(mockedDao, atLeastOnce()).delete(postId);
    }

    @Test
    void deletePostShouldReturnNotFoundStatusWhenIdDoesNotExist() throws Exception {

        final int postId = 5;

        PostDAO mockedDao = mock(PostDAO.class);
        doThrow(new IllegalArgumentException()).when(mockedDao).delete(postId);

        Blog blog = new Blog(mockedDao);

        Response response = blog.deletePost(postId);

        Assertions.assertEquals(Response.Status.NOT_FOUND, response.getStatusInfo());
        verify(mockedDao, atLeastOnce()).delete(postId);
    }
}
