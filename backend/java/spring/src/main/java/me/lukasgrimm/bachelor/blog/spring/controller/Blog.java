package me.lukasgrimm.bachelor.blog.spring.controller;

import me.lukasgrimm.bachelor.dao.PostDAO;
import me.lukasgrimm.bachelor.models.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/blog")
@CrossOrigin(origins = "*")
public class Blog {

    PostDAO dao;

    @Autowired
    public Blog(PostDAO dao) {
        this.dao = dao;
    }

    @GetMapping("/post")
    List<Post> fetchAllPosts() {
        return dao.findAll();
    }

    @PostMapping("/post")
    ResponseEntity<Void> createPost(@RequestBody Post post) {
        try {
            dao.create(post);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/post/{postId}")
    ResponseEntity<Void> updatePost(@PathVariable("postId") int postId, @RequestBody Post post) {

        if (postId != post.getId()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        try {
            dao.update(post);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/post/{postId}")
    ResponseEntity<Void> deletePost(@PathVariable("postId") int postId) {

        try {
            dao.delete(postId);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
