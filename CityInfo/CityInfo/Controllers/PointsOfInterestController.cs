using CityInfo.Contexts;
using CityInfo.Entities;
using CityInfo.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace CityInfo.Controllers
{
  [ApiController]
  [Route("api/cities/{cityId}/pointsofinterest")]
  public class PointsOfInterestController : Controller
  {
    private readonly CityInfoContext _ctx;
    private readonly IMailService _mailService;
    public PointsOfInterestController(CityInfoContext ctx, IMailService mailService)
    {
      _ctx = ctx;
      _mailService = mailService;
    }
    [HttpGet(Name = "GetPointsOfInterest")]
    public IActionResult GetPointsOfInterest(int cityId)
    {
      City city = _ctx.Cities.Where(el => el.Id == cityId).FirstOrDefault();

      if (city == null) { return NotFound("City not found"); }

      List<PointOfInterest> pointsOfInterests = _ctx.PointOfInterests.Where(el => el.CityId == city.Id).ToList();

      return Json(pointsOfInterests);
    }

    [HttpGet("{id}", Name = "GetPointOfInterest")]
    public IActionResult GetPointOfInterestById(int cityId, int id)
    {
      City city = _ctx.Cities.Where(el => el.Id == cityId).FirstOrDefault();

      if (city == null) { return NotFound("City not found"); }

      PointOfInterest pointOfInterest = _ctx.PointOfInterests.FirstOrDefault(el => el.CityId == city.Id && el.Id == id);

      if (pointOfInterest == null)
      {
        return NotFound("Point of Interest not found");
      }

      return Json(pointOfInterest);
    }

        [HttpPost]
        [Route("add")]
        public IActionResult CreatePointOfInterest(int cityId, [FromBody] PointOfInterest pointOfInterest)
        {
            var city = _ctx.Cities.FirstOrDefault(c => c.Id == cityId);
            if (city == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            pointOfInterest.CityId = city.Id; // Set CityId property of pointOfInterest

            _ctx.PointOfInterests.Add(pointOfInterest);
            _ctx.SaveChanges();

            return CreatedAtRoute("GetPointOfInterest",
                new { cityId = city.Id, id = pointOfInterest.Id }, pointOfInterest);
        }

    [HttpPut("{id}")]
    public IActionResult UpdatePointOfInterest(int cityId, int id,
    [FromBody] PointOfInterestDto pointOfInterest)
    {
      if (pointOfInterest.Description == pointOfInterest.Name)
      {
        ModelState.AddModelError(
            "Description",
            "The provided description should be different from the name.");
      }

      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var city = _ctx.Cities.FirstOrDefault(c => c.Id == cityId);
      if (city == null)
      {
        return NotFound();
      }

      var pointOfInterestFromStore = _ctx.PointOfInterests
          .FirstOrDefault(p => p.CityId == city.Id && p.Id == id);
            if (pointOfInterestFromStore == null || pointOfInterest == null)
            {
                return NotFound();
            }

            pointOfInterestFromStore.Name = pointOfInterest.Name;
      pointOfInterestFromStore.Description = pointOfInterest.Description;
            pointOfInterestFromStore.Url = pointOfInterest.Url;


            _ctx.SaveChanges();

      return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeletePointOfInterest(int cityId, int id)
    {
      var city = _ctx.Cities
          .FirstOrDefault(c => c.Id == cityId);

      if (city == null)
      {
        return NotFound();
      }

      var pointOfInterestFromStore = _ctx.PointOfInterests
          .FirstOrDefault(p => p.CityId == city.Id && p.Id == id);
      if (pointOfInterestFromStore == null)
      {
        return NotFound();
      }

      _ctx.Remove(pointOfInterestFromStore);

      _ctx.SaveChanges();

      _mailService.Send("DELETED!", "Point Of interest has been deleted");

      return NoContent();
    }
  }
}
