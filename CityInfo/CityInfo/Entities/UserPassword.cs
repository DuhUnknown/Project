using CityInfo.Models;
using System.Collections.Generic;
namespace CityInfo.Entities

{
    public class UserPassword
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public int Id { get; set; }
        public bool IsAdmin { get; set; }

    }
}
