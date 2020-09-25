using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dao;
using dao.models;
using System.Net.Http;

namespace asp_net.Controllers {
  [ApiController]
  [Route("post")]
  public class PostController : ControllerBase {
    private PostDAO dao;

    public PostController(PostDAO dao) {
      this.dao = dao;
    }

    [HttpGet]
    public IEnumerable<Post> FetchAllPosts() {
      var findAllTask = this.dao.FindAll();
      findAllTask.Start();
      findAllTask.Wait();
      return findAllTask.Result;
    }

    [HttpPost]
    public ActionResult CreatePost([FromBody]Post post) {
      try {
        this.dao.Create(post);
        return NoContent();
      } catch (Exception e) {
        return BadRequest();
      }
    }
  }
}
