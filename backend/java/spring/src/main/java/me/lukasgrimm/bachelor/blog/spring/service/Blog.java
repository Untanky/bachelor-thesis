package me.lukasgrimm.bachelor.blog.spring.service;

import me.lukasgrimm.bachelor.dao.PostDAO;
import me.lukasgrimm.bachelor.dao.PostDBDAO;
import me.lukasgrimm.bachelor.models.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Blog {

    @Autowired
    PostDAO dao;

    @GetMapping("/")
    List<Post> fetchAllPosts() {

    }

    @PostMapping("/")
    void createPost(@RequestBody Post post) {

    }

    @PutMapping("/{postId}")
    void updatePost(@PathVariable("postId") int postId, @RequestBody Post post) {

    }

    @DeleteMapping("/{postId}")
    void deletePost(@PathVariable("postId") int post) {

    }
}
