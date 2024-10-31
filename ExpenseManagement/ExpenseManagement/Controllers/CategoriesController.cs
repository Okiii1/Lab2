using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ExpenseManagement.Models; // Import your model for categories
using System.Data.SqlClient;
using System.Collections.Generic;

namespace ExpenseManagement.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CategoriesController : Controller
	{
		private readonly IConfiguration _configuration;

		public CategoriesController(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		[HttpGet]
		[Route("GetAllCategories")]
		public List<Category> GetAllCategories()
		{
			List<Category> categoriesList = new List<Category>();

			using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("ExpenseManagement")))
			{
				con.Open();

				using (SqlCommand cmd = new SqlCommand("SELECT * FROM Categories", con))
				{
					using (SqlDataReader reader = cmd.ExecuteReader())
					{
						while (reader.Read())
						{
							Category category = new Category
							{
								CategoryID = Convert.ToInt32(reader["CategoryID"]),
								CategoryName = Convert.ToString(reader["CategoryName"]),
								Description = Convert.ToString(reader["Description"])
								// Removed UserID from here
							};

							categoriesList.Add(category);
						}
					}
				}
			}

			return categoriesList;
		}

		[HttpPost]
		[Route("AddCategory")]
		public string AddCategory(Category category)
		{
			using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("ExpenseManagement")))
			{
				con.Open();

				using (SqlCommand cmd = new SqlCommand("INSERT INTO Categories (CategoryName, Description) VALUES (@CategoryName, @Description)", con))
				{
					cmd.Parameters.AddWithValue("@CategoryName", category.CategoryName);
					cmd.Parameters.AddWithValue("@Description", category.Description);
					// Removed UserID from here

					int i = cmd.ExecuteNonQuery();

					if (i > 0)
					{
						return "Category inserted";
					}
					else
					{
						return "Error inserting category";
					}
				}
			}
		}

		[HttpPut]
		[Route("UpdateCategory")]
		public string UpdateCategory(Category category)
		{
			using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("ExpenseManagement")))
			{
				con.Open();

				using (SqlCommand cmd = new SqlCommand("UPDATE Categories SET CategoryName = @CategoryName, Description = @Description WHERE CategoryID = @CategoryID", con))
				{
					cmd.Parameters.AddWithValue("@CategoryID", category.CategoryID);
					cmd.Parameters.AddWithValue("@CategoryName", category.CategoryName);
					cmd.Parameters.AddWithValue("@Description", category.Description);
					// Removed UserID from here

					int i = cmd.ExecuteNonQuery();

					if (i > 0)
					{
						return "Category updated";
					}
					else
					{
						return "Error updating category";
					}
				}
			}
		}

		[HttpDelete]
		[Route("DeleteCategory/{categoryId}")]
		public string DeleteCategory(int categoryId)
		{
			using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("ExpenseManagement")))
			{
				con.Open();

				using (SqlCommand cmd = new SqlCommand("DELETE FROM Categories WHERE CategoryID = @CategoryID", con))
				{
					cmd.Parameters.AddWithValue("@CategoryID", categoryId);

					int i = cmd.ExecuteNonQuery();

					if (i > 0)
					{
						return "Category deleted";
					}
					else
					{
						return "Error deleting category";
					}
				}
			}
		}
	}
}
