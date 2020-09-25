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
  [Route("blog")]
  public class PostController : ControllerBase {
    private PostDAO dao;

    public PostController(PostDAO dao) {
      this.dao = dao;
    }

    [HttpGet]
    [Route("post")]
    public async Task<IEnumerable<Post>> FetchAllPosts() {
      return await this.dao.FindAll();
    }

    [HttpPost]
    [Route("post")]
    public ActionResult CreatePost([FromBody]Post post) {
      try {
        this.dao.Create(post);
        return NoContent();
      } catch (Exception e) {
        return BadRequest();
      }
    }

    [HttpPut]
    [Route("post/{postId}")]
    public ActionResult UpdatePost([FromRoute]int postId, [FromBody]Post post) {
      if (postId != post.Id) {
        return BadRequest();
      }

      try {
        this.dao.Update(post);
        return NoContent();
      } catch (Exception e) {
        return NotFound();
      }
    }

    [HttpDelete]
    [Route("post/{postId}")]
    public ActionResult DeletePost([FromRoute]int postId) {
      try {
        this.dao.Delete(postId);
        return NoContent();
      } catch (Exception e) {
        return NotFound();
      }
    }

  }
}
