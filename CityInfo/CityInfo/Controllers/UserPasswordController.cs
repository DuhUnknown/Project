using AutoMapper;
using CityInfo.Contexts;
using CityInfo.Entities;
using CityInfo.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace CityInfo.Controllers
{
    [ApiController]
    [Route("api/users")]

    public class UserPasswordController : Controller
    {

        private readonly UserPasswordContext _ctx;
        private readonly IMapper _mapper;

        public UserPasswordController(UserPasswordContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
            _mapper = new MapperConfiguration(cfg => {
                cfg.CreateMap<UserPassword, UserPasswordDto>();
            }).CreateMapper();

        }
        [HttpGet]
        public IActionResult GetUsers()
        {
            //var CityDataStore = new CitiesDataStore();
            //List<CityDto> Cities = CityDataStore.Cities;

            DbSet<UserPassword> Users = _ctx.Users;
            return Json(Users);
        }
        [HttpGet]
        [Route("{id}")]
        public IActionResult Login(int id)
        {
            UserPassword user = _ctx.Users.Where(el => el.Id == id).FirstOrDefault();

            UserPasswordDto userDto = _mapper.Map<UserPasswordDto>(user);
            if (user == null)
            {
                return NotFound();
            }
            return Json(userDto);

        }
        [HttpGet("login")]
        public IActionResult Login([FromQuery] string user, [FromQuery] string password)
        {
            UserPassword foundUser = _ctx.Users.FirstOrDefault(u => u.Name == user && u.Password == password);

            if (foundUser != null)
            {
                UserPasswordDto userDto = _mapper.Map<UserPasswordDto>(foundUser);
                return Json(userDto);
            }

            return NotFound("UserNotFound");
        }
    }


}

