package me.lukasgrimm.bachelor.jaxrs.blog.controller;

import me.lukasgrimm.bachelor.models.Post;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.xml.ws.Response;
import java.util.List;

@Path("/blog")
public class Blog {

    @GET
    @Path("/post")
    @Produces(MediaType.APPLICATION_JSON)
    public Response<List<Post>> fetchAllPosts() {
        return null;
    }

    @POST
    @Path("/post")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response<Void> createPost(Post post) {
        return null;
    }

    @PUT
    @Path("/post/{postId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response<Void> updatePost(@PathParam("postId") int postId, Post post) {
        return null;
    }

    @PUT
    @Path("/post/{postId}")
    public Response<Void> deletePost(@PathParam("postId") int postId) {
        return null;
    }
}
