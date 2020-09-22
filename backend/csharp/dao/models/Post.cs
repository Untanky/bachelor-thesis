namespace dao.models {
  class Post
  {
    private int id;

    private string title;

    private string description;

    public Post(string title, string description) {
      this.title = title;
      this.description = description;
    }
  }
}
