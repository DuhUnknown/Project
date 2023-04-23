using CityInfo.Models;
using System.Collections.Generic;
namespace CityInfo
{
    public class CitiesDataStore
    {
        public static CitiesDataStore Current { get; } = new CitiesDataStore();
        public List<CityDto> Cities { get; set; }

        public CitiesDataStore()
        {
            Cities = new List<CityDto>()
                 {
               new CityDto()
                {
                     id = 1,
                     Name = "new york city",
                     Description = "the one with that big park.",
                                 url = "Url",
                     PointsOfInterest = new List<PointOfInterestDto>()
                     {
                         new PointOfInterestDto() {
                             Id = 1,
                             Name = "central park",
                             Description = "the most visited urban park in the united states." },
                          new PointOfInterestDto() {
                             Id = 2,
                             Name = "empire state building",
                             Description = "a 102-story skyscraper located in midtown manhattan." },
                     }
                },
                new CityDto()
                {
                     id = 2,
                     Name = "Amsterdam",
                     Description = "Weed",
                                 url = "Url",
                     PointsOfInterest = new List<PointOfInterestDto>()
                     {
                         new PointOfInterestDto() {
                             Id = 3,
                             Name = "Lsd",
                             Description = "the most visited urban park in the united states." },
                          new PointOfInterestDto() {
                             Id = 4,
                             Name = "empire state building",
                             Description = "a 102-story skyscraper located in midtown manhattan." },
                     }
                },

                 };
        }
    }
}
