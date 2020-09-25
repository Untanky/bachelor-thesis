using System.Collections.Generic;
using System.Threading.Tasks;
using NUnit.Framework;
using Moq;
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
            System.Console.WriteLine("HELLO WORLD!");
            var mock = new Mock<PostDAO>();
            mock
                .Setup(dao => dao.FindAll())
                .Returns(new Task<List<Post>>(() => postList));
            var postController = new PostController(mock.Object);
            
            var actualPostList = postController.FetchAllPosts();

            Assert.AreEqual(postList, actualPostList);
        }
    }
}