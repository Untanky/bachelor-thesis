using System;
using System.Collections.Generic;
using dao.models;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace dao.Tests
{
    public class PostDBDAOTest
    {
        public class TestPostContext : PostDBDAO.PostContext {
            protected override void OnConfiguring(DbContextOptionsBuilder options) 
                =>  options.UseSqlite("Data Source=blogging.db");
        }

        private TestPostContext db;

        private PostDBDAO postDBDAO;

        private Post post1, post2, post3, post4, updatedPost3;

        private List<Post> postList;

        [SetUp]
        public void Setup()
        {
            db = new TestPostContext();
            postDBDAO = new PostDBDAO(db);

            setupPosts();
            setupPostList();
            setupDB();
        }

        private void setupPosts() {
            post1 = new Post("First Post", "Test description");
            post2 = new Post("Second Post", "Test description");
            post3 = new Post("Third Post", "Test description");
            post4 = new Post("Fourth Post", "Test description");
            updatedPost3 = new Post("Dritter Post", "Test Beschreibung");
            updatedPost3.Id = 3;
        }

        private void setupPostList() {
            postList = new List<Post>();
            postList.Add(post1);
            postList.Add(post2);
            postList.Add(post3);
        }

        private void setupDB() {
            db.Database.EnsureDeleted();
            db.Database.EnsureCreated();

            db.Add(post1);
            db.Add(post2);
            db.Add(post3);
            db.SaveChanges();
        }

        [Test]
        public void TestFindAll()
        {
            var actualPostList = postDBDAO.FindAll().Result;
            Assert.AreEqual(postList, actualPostList);
        }

        [Test]
        public void TestCreate() {
            postDBDAO.Create(post4);
            
            var fetchedPost4 = db.Find<Post>(post4.Id);
            Assert.AreEqual(post4, fetchedPost4);
        }

        [Test]
        public void TestCreateWithIdSet() {
            post4.Id = 4;

            Assert.Throws(typeof(ArgumentException), delegate { postDBDAO.Create(post4); });
        }

        [Test]
        public void TestUpdate() {
            postDBDAO.Update(updatedPost3);
            
            var fetchedPost3 = db.Find<Post>(post3.Id);
            Assert.AreEqual(updatedPost3, fetchedPost3);
        }

        [Test]
        public void TestUpdateWithUnknownId() {
            updatedPost3.Id = 5;

            Assert.Throws(typeof(ArgumentException), delegate { postDBDAO.Update(updatedPost3); });
        }

        [Test]
        public void TestDelete() {
            var deleteId = 3;

            postDBDAO.Delete(deleteId);
            
            var fetchedPost3 = db.Find<Post>(post3.Id);
            Assert.Null(fetchedPost3);
        }

        [Test]
        public void TestDeleteWithUnknownId() {
            var deleteId = 5;

            Assert.Throws(typeof(ArgumentException), delegate { postDBDAO.Delete(deleteId); });
        }
    }
}