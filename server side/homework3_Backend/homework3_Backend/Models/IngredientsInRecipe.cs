using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace homework3_Backend.Models
{
    public class IngredientsInRecipe
    {
        public int recipeId { get; set; }
        public Ingredient[] selectedIngredients { get; set; }
    }
}