package me.lukasgrimm.bachelor.blog.spring.config;

import me.lukasgrimm.bachelor.dao.PostDBDAO;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

@Configuration
public class DAOConfig {

    @Bean
    public PostDBDAO dao() {
        EntityManagerFactory entityManagerFactory =  Persistence.createEntityManagerFactory("PostDB");
        PostDBDAO dao = new PostDBDAO(entityManagerFactory);
        return dao;
    }
}
