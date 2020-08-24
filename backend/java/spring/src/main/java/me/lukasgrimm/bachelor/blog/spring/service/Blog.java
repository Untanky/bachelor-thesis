package me.lukasgrimm.bachelor.blog.spring.service;

import me.lukasgrimm.bachelor.dao.PostDAO;
import me.lukasgrimm.bachelor.dao.PostDBDAO;
import me.lukasgrimm.bachelor.models.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Blog {

    @Autowired
    PostDAO dao;

    @GetMapping("/")
    List<Post> fetchAllPosts() {
        return dao.findAll();
    }

    @PostMapping("/")
    ResponseEntity<Void> createPost(@RequestBody Post post) {
        dao.create(post);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{postId}")
    ResponseEntity<Void> updatePost(@PathVariable("postId") int postId, @RequestBody Post post) {

        if (postId != post.getId()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        dao.update(post);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{postId}")
    ResponseEntity<Void> deletePost(@PathVariable("postId") int postId) {

        dao.delete(postId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
