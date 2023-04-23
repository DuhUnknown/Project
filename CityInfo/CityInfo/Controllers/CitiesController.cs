using AutoMapper;
using CityInfo.Contexts;
using CityInfo.Entities;
using CityInfo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace CityInfo.Controllers
{
  [ApiController]
  [Route("api/cities")]
  public class CitiesController : Controller
  {
    private readonly CityInfoContext _ctx;
    private readonly IMapper _mapper;
    public CitiesController(CityInfoContext ctx, IMapper mapper)
    {
      _ctx = ctx;
      _mapper = mapper;
    }
    [HttpGet]
    public IActionResult GetCities()
    {
      //var CityDataStore = new CitiesDataStore();
      //List<CityDto> Cities = CityDataStore.Cities;

      DbSet<City> Cities = _ctx.Cities;
      return Json(Cities);
    }

    [HttpGet]
    [Route("{id}")]
    public IActionResult GetCity(int id)
    {
      //DbSet<City> Cities = _ctx.Cities;
      //City city = Cities.Where(el => el.Id == id).FirstOrDefault();

      City city = _ctx.Cities.Where(el => el.Id == id).FirstOrDefault();

      CityDto cityDto = _mapper.Map<CityDto>(city);

      //cityDto.PointsOfInterest = city.PointOfInterests;

      if (cityDto == null)
      {
        return BadRequest("Ilyen nincs!");
      }

      return Json(cityDto);
    }

    [HttpPost]
    public IActionResult CreateCity([FromBody] CityDto cityDto)
    {
      City city = _mapper.Map<City>(cityDto);

      _ctx.Cities.Add(city);
      _ctx.SaveChanges();

      return Ok(_mapper.Map<List<CityDto>>(_ctx.Cities));
    }
    [HttpPost]
    [Route("{id}/modify")]

        public IActionResult ModifyCity(int id, [FromBody] CityDto cityDto)
        {
            // Find the city with the given ID
            City city = _ctx.Cities.Where(el => el.Id == id).FirstOrDefault();
            if (city == null)
            {
                return BadRequest("City not found");
            }

            // Update the city properties
            city.Name = cityDto.Name;
            city.Description = cityDto.Description;
            city.Population = cityDto.Pop;
            city.url = cityDto.url;


            // Save the changes to the database
            _ctx.SaveChanges();

            // Return the updated city data
            CityDto updatedCityDto = _mapper.Map<CityDto>(city);
            return Ok(updatedCityDto);
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteCity(int id)
        {
            // Find the city with the given ID
            City city = _ctx.Cities.FirstOrDefault(c => c.Id == id);
            if (city == null)
            {
                return NotFound();
            }

            // Remove the city from the database
            _ctx.Cities.Remove(city);
            _ctx.SaveChanges();

            return NoContent();
        }
    }

}
