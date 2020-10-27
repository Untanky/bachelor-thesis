using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dao.models {
  [Table("post")]
  public class Post
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("id")]
    public int Id { get; set; }


    [Column("title")]
    public string Title { get; set; }


    [Column("description")]
    public string Description { get; set; }

    public string Url { get { return "/post/" + Id; } }

    public Post() {

    }

    public Post(string title, string description) {
      this.Title = title;
      this.Description = description;
    }

    // override object.Equals
    public override bool Equals(object obj)
    {
        //
        // See the full list of guidelines at
        //   http://go.microsoft.com/fwlink/?LinkID=85237
        // and also the guidance for operator== at
        //   http://go.microsoft.com/fwlink/?LinkId=85238
        //
        
        if (obj == null || GetType() != obj.GetType())
        {
            return false;
        }

        var other = (Post)obj;
        
        return this.Id == other.Id 
          && this.Title.Equals(other.Title)
          && this.Description.Equals(other.Description);
    }
  }
}
