using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ExpenseManagement.Models; // Importoni modelin tuaj për shpenzimet
using System.Data.SqlClient;
using System.Collections.Generic;

namespace ExpenseManagement.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ExpensesController : Controller
	{
		private readonly IConfiguration _configuration;
		public ExpensesController(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		[HttpGet]
		[Route("GetAllExpenses")]
		public List<Expense> GetAllExpenses()
		{
			List<Expense> expensesList = new List<Expense>();

			using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("ExpenseManagement")))
			{
				con.Open();

				using (SqlCommand cmd = new SqlCommand("SELECT * FROM Expenses", con))
				{
					using (SqlDataReader reader = cmd.ExecuteReader())
					{
						while (reader.Read())
						{
							Expense expense = new Expense
							{
								ExpenseID = Convert.ToInt32(reader["ExpenseID"]),
								UserID = Convert.ToInt32(reader["UserID"]),
								CategoryID = Convert.ToInt32(reader["CategoryID"]),
								Amount = Convert.ToDecimal(reader["Amount"]),
								ExpenseDate = Convert.ToString(reader["ExpenseDate"]),
								Description = Convert.ToString(reader["Description"])
							};

							expensesList.Add(expense);
						}
					}
				}
			}

			return expensesList;
		}

		[HttpPost]
		[Route("AddExpense")]
		public string AddExpense(Expense expense)
		{
			using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("ExpenseManagement")))
			{
				con.Open();

				using (SqlCommand cmd = new SqlCommand("INSERT INTO Expenses (UserID, CategoryID, Amount, ExpenseDate, Description) VALUES (@UserID, @CategoryID, @Amount, @ExpenseDate, @Description)", con))
				{
					cmd.Parameters.AddWithValue("@UserID", expense.UserID);
					cmd.Parameters.AddWithValue("@CategoryID", expense.CategoryID);
					cmd.Parameters.AddWithValue("@Amount", expense.Amount);
					cmd.Parameters.AddWithValue("@ExpenseDate", expense.ExpenseDate);
					cmd.Parameters.AddWithValue("@Description", expense.Description ?? (object)DBNull.Value); // Përshkrimi mund të jetë opsional

					int i = cmd.ExecuteNonQuery();

					if (i > 0)
					{
						return "Expense inserted";
					}
					else
					{
						return "Error inserting expense";
					}
				}
			}
		}

		[HttpPut]
		[Route("UpdateExpense")]
		public string UpdateExpense(Expense expense)
		{
			using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("ExpenseManagement")))
			{
				con.Open();

				using (SqlCommand cmd = new SqlCommand("UPDATE Expenses SET UserID = @UserID, CategoryID = @CategoryID, Amount = @Amount, ExpenseDate = @ExpenseDate, Description = @Description WHERE ExpenseID = @ExpenseID", con))
				{
					cmd.Parameters.AddWithValue("@ExpenseID", expense.ExpenseID);
					cmd.Parameters.AddWithValue("@UserID", expense.UserID);
					cmd.Parameters.AddWithValue("@CategoryID", expense.CategoryID);
					cmd.Parameters.AddWithValue("@Amount", expense.Amount);
					cmd.Parameters.AddWithValue("@ExpenseDate", expense.ExpenseDate);
					cmd.Parameters.AddWithValue("@Description", expense.Description ?? (object)DBNull.Value);

					int i = cmd.ExecuteNonQuery();

					if (i > 0)
					{
						return "Expense updated";
					}
					else
					{
						return "Error updating expense";
					}
				}
			}
		}

		[HttpDelete]
		[Route("DeleteExpense/{expenseId}")]
		public string DeleteExpense(int expenseId)
		{
			using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("ExpenseManagement")))
			{
				con.Open();

				using (SqlCommand cmd = new SqlCommand("DELETE FROM Expenses WHERE ExpenseID = @ExpenseID", con))
				{
					cmd.Parameters.AddWithValue("@ExpenseID", expenseId);

					int i = cmd.ExecuteNonQuery();

					if (i > 0)
					{
						return "Expense deleted";
					}
					else
					{
						return "Error deleting expense";
					}
				}
			}
		}
	}
}
