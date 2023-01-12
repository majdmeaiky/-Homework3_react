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
    public class RecipesController : ApiController
    {
        [EnableCors("*", "*", "*")]
        public IHttpActionResult Get()
        {
            try
            {
                List<Recipe> tmp = DataServices.getRecipes();
                return Ok(tmp);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [EnableCors("*", "*", "*")]
        public IHttpActionResult Post([FromBody] Recipe recipe)
        {
            try
            {
                int tmp = DataServices.InsertRecipe(recipe);
                return Created(new Uri(Request.RequestUri.AbsoluteUri + recipe.id), recipe);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }


    }
}
