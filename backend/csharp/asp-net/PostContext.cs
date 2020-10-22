using dao;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;

namespace asp_net
{
  internal class PostContext : PostDBDAO.PostContext
  {
    protected override void OnConfiguring(DbContextOptionsBuilder options)
      =>  options.UseNpgsql("Host=database;Database=blog;Username=root;Password=root");
  }
}