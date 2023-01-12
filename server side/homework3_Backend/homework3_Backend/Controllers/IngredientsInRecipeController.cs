using homework3_Backend.Models;
using homework3_Backend.Models.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace homework3_Backend.Controllers
{
    public class IngredientsInRecipeController : ApiController
    {

        [EnableCors("*", "*", "*")]
        public IHttpActionResult Post([FromBody] IngredientsInRecipe ingredientsInRecipe)
        {
            try
            {

                int count = 0;
                foreach (var ingredient in ingredientsInRecipe.selectedIngredients)
                {
                    int tmp = DataServices.InsertIngredientInRecipe(ingredientsInRecipe.recipeId, ingredient);
                    count++;
                }
                return Created(new Uri(Request.RequestUri.AbsoluteUri + "?count=" + count), ingredientsInRecipe.selectedIngredients);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [EnableCors("*", "*", "*")]
        public IHttpActionResult Get()
        {
            try
            {
                List<IngredientInRecipe> tmp = DataServices.getIngredientsinRecipe();
                return Ok(tmp);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }
    }
}
