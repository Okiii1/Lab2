namespace ExpenseManagement.Models
{
	public class Expense
	{
		public int ExpenseID { get; set; }
		public int UserID { get; set; }
		public int CategoryID { get; set; }
		public decimal Amount { get; set; }
		public string ExpenseDate { get; set; }
		public string Description { get; set; }
	}
}
