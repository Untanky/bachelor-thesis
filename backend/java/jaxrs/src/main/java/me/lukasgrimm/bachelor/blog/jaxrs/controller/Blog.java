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
        return null;
    }

    @POST
    @Path("/post")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createPost(Post post) {
        return null;
    }

    @PUT
    @Path("/post/{postId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updatePost(@PathParam("postId") int postId, Post post) {
        return null;
    }

    @PUT
    @Path("/post/{postId}")
    public Response deletePost(@PathParam("postId") int postId) {
        return null;
    }
}
