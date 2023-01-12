using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace homework3_Backend.Models
{
    public class Recipe
    {
        public int id { get; set; }
        public string name { get; set; }
        public string imageUrl { get; set; }
        public string cookingMethod { get; set; }
        public int time { get; set; }

    }
}