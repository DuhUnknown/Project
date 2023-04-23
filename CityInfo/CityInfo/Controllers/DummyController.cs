using CityInfo.Contexts;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace CityInfo.Controllers
{
  [ApiController]
  [Route("api/testdatabase")]
  public class DummyController : Controller
  {
    private readonly CityInfoContext _ctx;

    public DummyController(CityInfoContext ctx)
    {
      _ctx = ctx;
    }

    [HttpGet]
    public IActionResult TestDatabase()
    {
      return Ok(_ctx.Cities);
    }
  }
}
