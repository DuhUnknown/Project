using CityInfo.Entities;
using Microsoft.EntityFrameworkCore;

namespace CityInfo.Contexts
{
  public class CityInfoContext : DbContext
  {
    public DbSet<City> Cities { get; set; }
    public DbSet<PointOfInterest> PointOfInterests { get; set; }
        public DbSet<UserPassword> Users { get; set; }

        public CityInfoContext(DbContextOptions<CityInfoContext> options)
       : base(options)
    {
      Database.EnsureCreated();
    }

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
            modelBuilder.Entity<City>()
           .HasData(
          new City()
          {
            Id = 1,
            Name = "New York City",
            Description = "The one with that big park.",
            url = "https://www.google.com/maps/place/New+York,+Egyes%C3%BClt+%C3%81llamok/@40.6793332,-74.3179602,10.5z/data=!4m6!3m5!1s0x89c24fa5d33f083b:0xc80b8f06e177fe62!8m2!3d40.7127753!4d-74.0059728!16zL20vMDJfMjg2"
          },
          new City()
          {
            Id = 2,
            Name = "Antwerp",
            Description = "The one with the cathedral that was never really finished.",
            url = "Url"
          },
          new City()
          {
            Id = 3,
            Name = "Paris",
            Description = "The one with that big tower.",
            url = "Url"
          });


      modelBuilder.Entity<PointOfInterest>()
        .HasData(
          new PointOfInterest()
          {
            Id = 1,
            CityId = 1,
            Name = "Central Park",
            Description = "The most visited urban park in the United States.",
            Url= "https://www.google.com/maps/d/u/0/viewer?mid=1X_JjPMGJ9G-jYQ70k_3Ko9Eq2M8&hl=en_US&ll=40.782881%2C-73.965454&z=17"

          },
          new PointOfInterest()
          {
            Id = 2,
            CityId = 1,
            Name = "Empire State Building",
            Description = "A 102-story skyscraper located in Midtown Manhattan.",
            Url = "Url"
          },
            new PointOfInterest()
            {
              Id = 3,
              CityId = 2,
              Name = "Cathedral",
              Description = "A Gothic style cathedral, conceived by architects Jan and Pieter Appelmans.",
                          Url = "Url"

            },
          new PointOfInterest()
          {
            Id = 4,
            CityId = 2,
            Name = "Antwerp Central Station",
            Description = "The the finest example of railway architecture in Belgium.",
                        Url = "Url"

          },
          new PointOfInterest()
          {
            Id = 5,
            CityId = 3,
            Name = "Eiffel Tower",
            Description = "A wrought iron lattice tower on the Champ de Mars, named after engineer Gustave Eiffel.",
                        Url = "Url"

          },
          new PointOfInterest()
          {
            Id = 6,
            CityId = 3,
            Name = "The Louvre",
            Description = "The world's largest museum.",
                        Url = "Url"

          }
          );

      base.OnModelCreating(modelBuilder);
    }
  }
}
