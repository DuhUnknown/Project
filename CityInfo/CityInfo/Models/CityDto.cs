using System.Collections.Generic;

namespace CityInfo.Models
{
  public class CityDto
  {
    public string Name { get; set; }
    public string Description { get; set; }
    public string url { get; set; }
    public int id { get; set; }

        public int Pop { get; set; }

    public int NumberOfPointsOfInterest
    {
      get
      {
        return PointsOfInterest.Count;
      }
    }

    public ICollection<PointOfInterestDto> PointsOfInterest { get; set; }
       = new List<PointOfInterestDto>();
  }
}
