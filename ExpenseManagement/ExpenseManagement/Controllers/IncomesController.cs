using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ExpenseManagement.Models;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace ExpenseManagement.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class IncomesController : Controller
	{
		private readonly IConfiguration _configuration;

		public IncomesController(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		[HttpGet]
		[Route("GetAllIncomes")]
		public List<Income> GetAllIncomes()
		{
			List<Income> incomesList = new List<Income>();

			using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("ExpenseManagement")))
			{
				con.Open();

				using (SqlCommand cmd = new SqlCommand("SELECT * FROM Income", con))
				{
					using (SqlDataReader reader = cmd.ExecuteReader())
					{
						while (reader.Read())
						{
							Income income = new Income
							{
								IncomeID = Convert.ToInt32(reader["IncomeID"]),
								UserID = Convert.ToInt32(reader["UserID"]),
								Amount = Convert.ToDecimal(reader["Amount"]),
								IncomeDate = Convert.ToString(reader["IncomeDate"]),
								Description = Convert.ToString(reader["Description"])
							};

							incomesList.Add(income);
						}
					}
				}
			}

			return incomesList;
		}

		[HttpPost]
		[Route("AddIncome")]
		public string AddIncome(Income income)
		{
			using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("ExpenseManagement")))
			{
				con.Open();

				using (SqlCommand cmd = new SqlCommand("INSERT INTO Income (UserID, Amount, IncomeDate, Description) VALUES (@UserID, @Amount, @IncomeDate, @Description)", con))
				{
					cmd.Parameters.AddWithValue("@UserID", income.UserID);
					cmd.Parameters.AddWithValue("@Amount", income.Amount);
					cmd.Parameters.AddWithValue("@IncomeDate", income.IncomeDate);
					cmd.Parameters.AddWithValue("@Description", income.Description ?? (object)DBNull.Value);

					int i = cmd.ExecuteNonQuery();

					return i > 0 ? "Income inserted" : "Error inserting income";
				}
			}
		}

		[HttpPut]
		[Route("UpdateIncome")]
		public string UpdateIncome(Income income)
		{
			using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("ExpenseManagement")))
			{
				con.Open();

				using (SqlCommand cmd = new SqlCommand("UPDATE Income SET UserID = @UserID, Amount = @Amount, IncomeDate = @IncomeDate, Description = @Description WHERE IncomeID = @IncomeID", con))
				{
					cmd.Parameters.AddWithValue("@IncomeID", income.IncomeID);
					cmd.Parameters.AddWithValue("@UserID", income.UserID);
					cmd.Parameters.AddWithValue("@Amount", income.Amount);
					cmd.Parameters.AddWithValue("@IncomeDate", income.IncomeDate);
					cmd.Parameters.AddWithValue("@Description", income.Description ?? (object)DBNull.Value);

					int i = cmd.ExecuteNonQuery();

					return i > 0 ? "Income updated" : "No income found with the given IncomeID";
				}
			}
		}

		[HttpDelete]
		[Route("DeleteIncome/{incomeId}")]
		public string DeleteIncome(int incomeId)
		{
			using (SqlConnection con = new SqlConnection(_configuration.GetConnectionString("ExpenseManagement")))
			{
				con.Open();

				using (SqlCommand cmd = new SqlCommand("DELETE FROM Income WHERE IncomeID = @IncomeID", con))
				{
					cmd.Parameters.AddWithValue("@IncomeID", incomeId);

					int i = cmd.ExecuteNonQuery();

					return i > 0 ? "Income deleted" : "Error deleting income";
				}
			}
		}
	}
}
