using CityInfo.Entities;
using Microsoft.EntityFrameworkCore;

namespace CityInfo.Contexts
{
    public class UserPasswordContext : DbContext
    {
        public UserPasswordContext(DbContextOptions<UserPasswordContext> options)
      : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<UserPassword> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserPassword>()
               .HasData(
         new UserPassword()
         {
             Id = 1,
             Name = "Admin",
             Password = "Admin",
             IsAdmin = true,

         });
        }
    }
}
