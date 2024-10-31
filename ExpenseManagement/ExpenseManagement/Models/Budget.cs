namespace ExpenseManagement.Models
{
	public class Budget
	{
		public int BudgetID { get; set; }
		public int UserID { get; set; }
		public int CategoryID { get; set; }
		public decimal Amount { get; set; }
		public string StartDate { get; set; } 
		public string EndDate { get; set; }  
	}
}
