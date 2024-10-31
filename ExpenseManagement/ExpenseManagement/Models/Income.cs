namespace ExpenseManagement.Models
{
	public class Income
	{
		public int IncomeID { get; set; }
		public int UserID { get; set; }
		public decimal Amount { get; set; }
		public string IncomeDate { get; set; } // Stored as string
		public string Description { get; set; } // Optional
	}
}
