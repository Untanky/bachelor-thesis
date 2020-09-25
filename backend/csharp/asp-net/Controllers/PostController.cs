using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dao;
using dao.models;

namespace asp_net.Controllers {
  [ApiController]
  [Route("post")]
  public class PostController : ControllerBase {
    private PostDAO dao;

    public PostController(PostDAO dao) {
      this.dao = dao;
    }

    public IEnumerable<Post> FetchAllPosts() {
      var findAllTask = this.dao.FindAll();
      findAllTask.Start();
      findAllTask.Wait();
      return findAllTask.Result;
    }
  }
}
