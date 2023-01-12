using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace homework3_Backend.Models.DAL
{
    public class DataServices
    {
        public static List<Recipe> Recipeslist = new List<Recipe>();
        public static List<Ingredient> Ingredientlist = new List<Ingredient>();
        public static List<IngredientInRecipe> IngredientsInRecipelist = new List<IngredientInRecipe>();

        private static SqlConnection Connect()
        {
            // read the connection string from the web.config file
            string connectionString = WebConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;

            // create the connection to the db
            SqlConnection con = new SqlConnection(connectionString);

            // open the database connection
            con.Open();

            return con;

        }

        private static SqlCommand CreateSelectRecipesCommand(SqlConnection con)
        {

            SqlCommand command = new SqlCommand();


            command.CommandText = "selectRecipes";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }
        public static List<Recipe> getRecipes()
        {
            SqlConnection con = Connect();
            SqlCommand command = CreateSelectRecipesCommand(con);
            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
            Recipeslist.Clear();
            while (dr.Read())
            {

                int id = Int32.Parse(dr["id"].ToString());
                string name = dr["name"].ToString();
                string imageUrl = dr["imageUrl"].ToString();
                string cookingMethod = dr["cookingMethod"].ToString();
                int time = Int32.Parse(dr["time"].ToString());
                Recipeslist.Add(new Recipe() { id= id, name=name, imageUrl=imageUrl, cookingMethod=cookingMethod, time=time });
            }
            return Recipeslist;
        }

        private static SqlCommand CreateInsertIngredientCommand(SqlConnection con, Ingredient ingredient)
        {
            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@ingredientid", ingredient.id);
            command.Parameters.AddWithValue("@ingredientname", ingredient.name);
            command.Parameters.AddWithValue("@imageUrl", ingredient.imageUrl);
            command.Parameters.AddWithValue("@ingredientcalories", ingredient.calories);




            command.CommandText = "AddNewIngredient";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            //   command.CommandTimeout = 10; // in seconds

            return command;
        }

        public static int InsertIngredient(Ingredient ingredient)
        {
            try
            {
                SqlConnection con = Connect();

                // Create Command
                SqlCommand command = CreateInsertIngredientCommand(con, ingredient);

                // Execute
                int numAffected = command.ExecuteNonQuery();

                // Close Connection

                con.Close();
                return numAffected;
            }

            catch
            {
                return -10;
            }
        }

        private static SqlCommand CreateInsertRecipeCommand(SqlConnection con, Recipe recipe)
        {
            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@recipeid", recipe.id);
            command.Parameters.AddWithValue("@recipename", recipe.name);
            command.Parameters.AddWithValue("@imageUrl", recipe.imageUrl);
            command.Parameters.AddWithValue("@cookingMethod", recipe.cookingMethod);
            command.Parameters.AddWithValue("@time", recipe.time);




            command.CommandText = "AddNewRecipe";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            //   command.CommandTimeout = 10; // in seconds

            return command;
        }

        public static int InsertRecipe(Recipe recipe)
        {
            try
            {
                SqlConnection con = Connect();

                // Create Command
                SqlCommand command = CreateInsertRecipeCommand(con, recipe);

                // Execute
                int numAffected = command.ExecuteNonQuery();

                // Close Connection

                con.Close();
                return numAffected;
            }

            catch
            {
                return -10;
            }
        }

        

        private static SqlCommand CreateSelectIngredientsCommand(SqlConnection con)
        {

            SqlCommand command = new SqlCommand();


            command.CommandText = "SelectIngredients";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

        public static List<Ingredient> getIngredents()
        {
            SqlConnection con = Connect();
            SqlCommand command = CreateSelectIngredientsCommand(con);
            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
            Ingredientlist.Clear();
            while (dr.Read())
            {

                int id = Int32.Parse(dr["id"].ToString());
                string name = dr["name"].ToString();
                string imageUrl = dr["imageUrl"].ToString();
                int calories = Int32.Parse(dr["calories"].ToString());
                Ingredientlist.Add(new Ingredient() { id = id, name = name, imageUrl = imageUrl, calories = calories});
            }
            return Ingredientlist;
        }

        private static SqlCommand CreateInsertIngredientInRecipeCommand(SqlConnection con, int recipeId, Ingredient ingredient)
        {


            // Insert the ingredients into the database

            SqlCommand command = new SqlCommand();
            command.Parameters.AddWithValue("@recipeId", recipeId);
            command.Parameters.AddWithValue("@ingredientId", ingredient.id);
            command.CommandText = "AddIngredientInRecipe";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
             command.CommandTimeout = 1000; // in seconds

            return command;

        }

        

        public static int InsertIngredientInRecipe(int recipeId, Ingredient ingredient)
        {
            try
            {
                SqlConnection con = Connect();

                // Create Command
                SqlCommand command = CreateInsertIngredientInRecipeCommand(con, recipeId, ingredient);

                // Execute
                int numAffected = command.ExecuteNonQuery();

                // Close Connection

                con.Close();
                return numAffected;
            }

            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return -10;
            }
        }

        private static SqlCommand CreateSelectIngredientsinRecipeCommand(SqlConnection con)
        {
            try
            {
                SqlCommand command = new SqlCommand();


                command.CommandText = "selectIngredientsInRecipe";
                command.Connection = con;
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.CommandTimeout = 1000; // in seconds

                return command;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }

        }

    

        public static List<IngredientInRecipe> getIngredientsinRecipe()
        {
            SqlConnection con = Connect();
            SqlCommand command = CreateSelectIngredientsinRecipeCommand(con);
            SqlDataReader dr = command.ExecuteReader(CommandBehavior.CloseConnection);
            IngredientsInRecipelist.Clear();
            while (dr.Read())
            {

                int recipeId = Int32.Parse(dr["recipeId"].ToString());
                int ingredientId = Int32.Parse(dr["ingredientId"].ToString());

                IngredientsInRecipelist.Add(new IngredientInRecipe() { recipeId = recipeId, ingrdientId = ingredientId});

            }
            return IngredientsInRecipelist;
        }


    }
}