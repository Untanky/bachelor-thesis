package me.lukasgrimm.bachelor.models;

import javax.persistence.*;

@Entity
@Table(name = "post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "post_generator")
    @SequenceGenerator(name = "post_generator", sequenceName = "post_id_seq", schema = "public", allocationSize = 1)
    @Column(name = "id", unique = true)
    private long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl() {
        return String.format("/post/%d", id);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Post post = (Post) o;

        if (id != post.id) return false;
        if (!title.equals(post.title)) return false;
        return description.equals(post.description);
    }
}
