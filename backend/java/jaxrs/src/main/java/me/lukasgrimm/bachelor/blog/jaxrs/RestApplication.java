package me.lukasgrimm.bachelor.blog.jaxrs;

import me.lukasgrimm.bachelor.blog.jaxrs.di.DependencyBinder;
import org.glassfish.jersey.server.ResourceConfig;

import javax.ws.rs.ApplicationPath;

@ApplicationPath("/api")
public class RestApplication extends ResourceConfig {

    public RestApplication() {
        
        register(new DependencyBinder());
        packages("me.lukasgrimm.bachelor.blog.jaxrs.controller");
    }
}
