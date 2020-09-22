using System.Collections.Generic;
using System.Threading.Tasks;
using dao.models;

namespace dao {
  public interface PostDAO
  {
    Task<List<Post>> FindAll();
    void Create(Post post);
    void Update(Post post);
    void Delete(int id);
  }
}