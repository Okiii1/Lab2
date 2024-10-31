using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ExpenseManagement.Models;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace ExpenseManagement.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class BudgetsController : Controller
	{
		private readonly IConfiguration _configuration;

		public BudgetsController(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		[HttpGet]
		[Route("GetAllBudgets")]
		public List<Budget> GetAllBudgets()
		{
			List<Budget> budgetsList = new List<Budget>();

			using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("ExpenseManagement")))
			{
				con.Open();

				using (SqlCommand cmd = new SqlCommand("SELECT * FROM Budgets", con))
				{
					using (SqlDataReader reader = cmd.ExecuteReader())
					{
						while (reader.Read())
						{
							Budget budget = new Budget
							{
								BudgetID = Convert.ToInt32(reader["BudgetID"]),
								UserID = Convert.ToInt32(reader["UserID"]),
								CategoryID = Convert.ToInt32(reader["CategoryID"]),
								Amount = Convert.ToDecimal(reader["Amount"]),
								StartDate = Convert.ToString(reader["StartDate"]),
								EndDate = Convert.ToString(reader["EndDate"])
							};

							budgetsList.Add(budget);
						}
					}
				}
			}

			return budgetsList;
		}

		[HttpPost]
		[Route("AddBudget")]
		public string AddBudget(Budget budget)
		{
			using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("ExpenseManagement")))
			{
				con.Open();

				using (SqlCommand cmd = new SqlCommand("INSERT INTO Budgets (UserID, CategoryID, Amount, StartDate, EndDate) VALUES (@UserID, @CategoryID, @Amount, @StartDate, @EndDate)", con))
				{
					cmd.Parameters.AddWithValue("@UserID", budget.UserID);
					cmd.Parameters.AddWithValue("@CategoryID", budget.CategoryID);
					cmd.Parameters.AddWithValue("@Amount", budget.Amount);
					cmd.Parameters.AddWithValue("@StartDate", budget.StartDate);
					cmd.Parameters.AddWithValue("@EndDate", budget.EndDate);

					int i = cmd.ExecuteNonQuery();

					return i > 0 ? "Budget inserted" : "Error inserting budget";
				}
			}
		}

		[HttpPut]
		[Route("UpdateBudget")]
		public string UpdateBudget(Budget budget)
		{
			using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("ExpenseManagement")))
			{
				con.Open();

				using (SqlCommand cmd = new SqlCommand("UPDATE Budgets SET UserID = @UserID, CategoryID = @CategoryID, Amount = @Amount, StartDate = @StartDate, EndDate = @EndDate WHERE BudgetID = @BudgetID", con))
				{
					cmd.Parameters.AddWithValue("@BudgetID", budget.BudgetID);
					cmd.Parameters.AddWithValue("@UserID", budget.UserID);
					cmd.Parameters.AddWithValue("@CategoryID", budget.CategoryID);
					cmd.Parameters.AddWithValue("@Amount", budget.Amount);
					cmd.Parameters.AddWithValue("@StartDate", budget.StartDate);
					cmd.Parameters.AddWithValue("@EndDate", budget.EndDate);

					int i = cmd.ExecuteNonQuery();

					return i > 0 ? "Budget updated" : "No budget found with the given BudgetID";
				}
			}
		}

		[HttpDelete]
		[Route("DeleteBudget/{budgetId}")]
		public string DeleteBudget(int budgetId)
		{
			using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("ExpenseManagement")))
			{
				con.Open();

				using (SqlCommand cmd = new SqlCommand("DELETE FROM Budgets WHERE BudgetID = @BudgetID", con))
				{
					cmd.Parameters.AddWithValue("@BudgetID", budgetId);

					int i = cmd.ExecuteNonQuery();

					return i > 0 ? "Budget deleted" : "Error deleting budget";
				}
			}
		}
	}
}
