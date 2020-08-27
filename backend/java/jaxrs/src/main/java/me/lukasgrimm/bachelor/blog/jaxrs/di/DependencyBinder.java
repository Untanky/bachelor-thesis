package me.lukasgrimm.bachelor.blog.jaxrs.di;

import me.lukasgrimm.bachelor.dao.PostDAO;
import me.lukasgrimm.bachelor.dao.PostDBDAO;
import org.glassfish.jersey.internal.inject.AbstractBinder;

import javax.inject.Singleton;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class DependencyBinder extends AbstractBinder {

    @Override
    protected void configure() {

        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("PostDB");
        bind(new PostDBDAO(entityManagerFactory))
                .to(PostDAO.class)
                .in(Singleton.class);
    }
}
