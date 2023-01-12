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
    public class IngredientController : ApiController
    {
        [EnableCors("*", "*", "*")]
        public IHttpActionResult Get()
        {
            try
            {
                List<Ingredient> tmp = DataServices.getIngredents();
                return Ok(tmp);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [EnableCors("*", "*", "*")]
        public IHttpActionResult Post([FromBody] Ingredient ingredient)
        {
            try
            {
              int tmp=  DataServices.InsertIngredient(ingredient);
                return Created(new Uri(Request.RequestUri.AbsoluteUri + ingredient.id ),ingredient);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }
    }
}
