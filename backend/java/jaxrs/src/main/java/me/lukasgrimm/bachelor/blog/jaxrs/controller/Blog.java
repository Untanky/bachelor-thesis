package me.lukasgrimm.bachelor.blog.jaxrs.controller;

import me.lukasgrimm.bachelor.dao.PostDAO;
import me.lukasgrimm.bachelor.models.Post;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/blog")
public class Blog {

    PostDAO dao;

    @Inject
    Blog(PostDAO dao) {
        this.dao = dao;
    }

    @GET
    @Path("/post")
    @Produces(MediaType.APPLICATION_JSON)
    public Response fetchAllPosts() {
        List<Post> posts = dao.findAll();

        return Response
                .status(Response.Status.OK)
                .entity(posts)
                .build();
    }

    @POST
    @Path("/post")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createPost(Post post) {
        try {
            dao.create(post);
        } catch (IllegalArgumentException e) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .build();
        }

        return Response
                .status(Response.Status.NO_CONTENT)
                .build();
    }

    @PUT
    @Path("/post/{postId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updatePost(@PathParam("postId") int postId, Post post) {

        if (postId != post.getId()) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .build();
        }

        try {
            dao.update(post);
        } catch (IllegalArgumentException e) {
            return Response
                    .status(Response.Status.NOT_FOUND)
                    .build();
        }

        return Response
                .status(Response.Status.NO_CONTENT)
                .build();
    }

    @DELETE
    @Path("/post/{postId}")
    public Response deletePost(@PathParam("postId") int postId) {
        try {
            dao.delete(postId);
        } catch (IllegalArgumentException e) {
            return Response
                    .status(Response.Status.NOT_FOUND)
                    .build();
        }

        return Response
                .status(Response.Status.NO_CONTENT)
                .build();
    }
}
