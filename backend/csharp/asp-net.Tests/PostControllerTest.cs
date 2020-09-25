using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NUnit.Framework;
using Moq;
using Microsoft.AspNetCore.Mvc;
using dao;
using dao.models;
using asp_net.Controllers;

namespace asp_net.Tests
{
    public class PostControllerTest
    {    
        private Post post1, post2, post3, post4, updatedPost3;

        private List<Post> postList;

        [SetUp]
        public void Setup()
        {
            setupPosts();
            setupPostList();
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

        [Test]
        public void TestFetchAllPosts()
        {
            var mock = new Mock<PostDAO>();
            mock
                .Setup(dao => dao.FindAll())
                .Returns(new Task<List<Post>>(() => postList));
            var postController = new PostController(mock.Object);
            
            var actualPostList = postController.FetchAllPosts();

            mock.Verify((dao) => dao.FindAll());
            Assert.AreEqual(postList, actualPostList);
        }

        [Test]
        public void TestCreatePost()
        {
            var mock = new Mock<PostDAO>();
            mock.Setup(dao => dao.Create(It.IsAny<Post>()));
            var postController = new PostController(mock.Object);
            
            var actionResult = postController.CreatePost(post4);

            mock.Verify((dao) => dao.Create(post4));
            Assert.IsInstanceOf<NoContentResult>(actionResult);
        }

        [Test]
        public void TestCreatePostWhenIdIsSet()
        {
            var mock = new Mock<PostDAO>();
            mock
                .Setup(dao => dao.Create(It.IsAny<Post>()))
                .Throws<ArgumentException>();

            var postController = new PostController(mock.Object);
            
            var actionResult = postController.CreatePost(post4);

            mock.Verify((dao) => dao.Create(post4));
            Assert.IsInstanceOf<BadRequestResult>(actionResult);
        }

        [Test]
        public void TestUpdatePost()
        {
            var postId = updatedPost3.Id;
            var mock = new Mock<PostDAO>();
            mock.Setup(dao => dao.Update(It.IsAny<Post>()));
            var postController = new PostController(mock.Object);
            
            var actionResult = postController.UpdatePost(postId, updatedPost3);

            mock.Verify((dao) => dao.Update(updatedPost3));
            Assert.IsInstanceOf<NoContentResult>(actionResult);
        }

        [Test]
        public void TestUpdatePostWhenIdsDoNotMatch()
        {
            var postId = 2;
            var mock = new Mock<PostDAO>();
            mock.Setup(dao => dao.Update(It.IsAny<Post>()));

            var postController = new PostController(mock.Object);
            
            var actionResult = postController.UpdatePost(postId, updatedPost3);

            Assert.IsInstanceOf<BadRequestResult>(actionResult);
        }

        [Test]
        public void TestUpdatePostWhenIdIsUnknown()
        {
            var postId = updatedPost3.Id;
            var mock = new Mock<PostDAO>();
            mock
                .Setup(dao => dao.Update(It.IsAny<Post>()))
                .Throws<ArgumentException>();

            var postController = new PostController(mock.Object);
            
            var actionResult = postController.UpdatePost(postId, updatedPost3);

            mock.Verify((dao) => dao.Update(updatedPost3));
            Assert.IsInstanceOf<NotFoundResult>(actionResult);
        }

        [Test]
        public void TestDeletePost()
        {
            var postId = post3.Id;
            var mock = new Mock<PostDAO>();
            mock.Setup(dao => dao.Delete(It.IsAny<int>()));
            var postController = new PostController(mock.Object);
            
            var actionResult = postController.DeletePost(postId);

            mock.Verify((dao) => dao.Delete(postId));
            Assert.IsInstanceOf<NoContentResult>(actionResult);
        }
        [Test]
        public void TestDeletePostWhenIdIsUnknown()
        {
            var postId = post3.Id;
            var mock = new Mock<PostDAO>();
            mock
                .Setup(dao => dao.Delete(It.IsAny<int>()))
                .Throws<ArgumentException>();

            var postController = new PostController(mock.Object);
            
            var actionResult = postController.DeletePost(postId);

            mock.Verify((dao) => dao.Delete(postId));
            Assert.IsInstanceOf<NotFoundResult>(actionResult);
        }
    }
}