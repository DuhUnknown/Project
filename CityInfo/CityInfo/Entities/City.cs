using CityInfo.Models;
using System.Collections.Generic;

namespace CityInfo.Entities
{
  public class City
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int Population { get; set; }
    public string url { get; set; }
  }
}
