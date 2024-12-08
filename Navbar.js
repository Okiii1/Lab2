import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const userRoleId = localStorage.getItem('userRoleId');
  const navigate = useNavigate();

  const handleLogout = async () => {
    const url = 'https://localhost:7033/api/Account/Logout';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        console.log('Logout successful');
        localStorage.setItem('userRoleId', 0);
        navigate('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const adminNavItems = [
    { path: '/Home', label: 'Home' },
    { path: '/CategoriesA', label: 'Categories' },
    { path: '/ExpensesA', label: 'Expenses' },
    { path: '/BudgetsA', label: 'Budgets' },
    { path: '/IncomesA', label: 'Incomes' },
    { path: '/Contact', label: 'Contact' },
    { path: '/Users', label: 'Users' },
    { path: '/Liga', label: 'Liga' },  
    { path: '/Ekipi', label: 'Ekipi' },
    { path: '/Departament', label: 'Departament' },
    

  ];

  const userNavItems = [
    { path: '/Home', label: 'Home' },
    { path: '/Categories', label: 'Categories' },
    { path: '/Expenses', label: 'Expenses' },
    { path: '/Budgets', label: 'Budgets' },
    { path: '/Incomes', label: 'Incomes' },
    { path: '/Contact', label: 'Contact' },


  ];

  const navItems = userRoleId === '1' ? adminNavItems : userNavItems;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/Home">MySchool</a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {navItems.map((item, index) => (
              <li key={index} className="nav-item">
                <a href={item.path} className="nav-link">
                  {item.label}
                </a>
              </li>
            ))}
            <li className="nav-item">
              <a href="/Login" className="nav-link" onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
