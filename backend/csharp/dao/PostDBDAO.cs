using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dao.models;
using System;

namespace dao {

  public class PostDBDAO : PostDAO
  {
    public class PostContext : DbContext {
      public DbSet<Post> Posts { get; set; }
    }

    private PostContext db;

    public PostDBDAO(PostContext db) {
      this.db = db;
      this.db.Database.EnsureCreated();
    }

    public async Task<List<Post>> FindAll() {
      var list = await db.Posts.ToListAsync<Post>();
      list.Sort((postA, postB) => postA.Id - postB.Id);
      return list;
    }

    public void Create(Post post) {
      if (post.Id != 0) {
        throw new ArgumentException();
      }
      db.Add(post);
      db.SaveChanges();
    }

    public void Update(Post post) {
      var fetchedPost = db.Find<Post>(post.Id);

      if (fetchedPost == null) {
        throw new ArgumentException();
      }

      fetchedPost.Title = post.Title;
      fetchedPost.Description = post.Description;
      
      db.Update(fetchedPost);
      db.SaveChanges();
    }

    public void Delete(int id) {
      var entityToBeDeleted = db.Find<Post>(id);
      if (entityToBeDeleted == null) {
        throw new ArgumentException();
      }

      db.Remove(entityToBeDeleted);
      db.SaveChanges();
    }
  }
}
