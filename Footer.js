import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section bg-dark text-light py-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-6 col-lg-3">
            <h2 className="footer-heading">Have a Question?</h2>
            <ul className="contact-info list-unstyled">
              <li>
                <span className="icon icon-map-marker"></span>
                <span className="text">28 Nentori, Pristina</span>
              </li>
              <li>
                <a href="tel:+38343905854">
                  <span className="icon icon-phone"></span>
                  <span className="text">+383 43 905 854</span>
                </a>
              </li>
              <li>
                <a href="mailto:support@expense.com">
                  <span className="icon icon-envelope"></span>
                  <span className="text">support@expense.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Empty column for additional info or social links */}
          <div className="col-md-6 col-lg-3">
            {/* Additional content can go here */}
          </div>

          {/* Links Section */}
          <div className="col-md-6 col-lg-3">
            <h2 className="footer-heading">Quick Links</h2>
            <ul className="footer-links list-unstyled">
              <li>
                <a href="Home">
                  <span className="icon ion-ios-arrow-round-forward mr-2"></span>Home
                </a>
              </li>
              <li>
                <a href="Budgets">
                  <span className="icon ion-ios-arrow-round-forward mr-2"></span>Budgets
                </a>
              </li>
              <li>
                <a href="Categories">
                  <span className="icon ion-ios-arrow-round-forward mr-2"></span>Categories
                </a>
              </li>
              <li>
                <a href="Expenses">
                  <span className="icon ion-ios-arrow-round-forward mr-2"></span>Expenses
                </a>
              </li>
              <li>
                <a href="Incomes">
                  <span className="icon ion-ios-arrow-round-forward mr-2"></span>Incomes
                </a>
              </li>
              <li>
                <a href="Contact">
                  <span className="icon ion-ios-arrow-round-forward mr-2"></span>Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Subscription Section */}
          <div className="col-md-6 col-lg-3">
            <h2 className="footer-heading">Subscribe to our Newsletter</h2>
            <form action="#" className="subscribe-form">
              <div className="form-group d-flex">
                <input type="email" className="form-control text-center" placeholder="Enter email address" />
                <button type="submit" className="btn btn-primary ml-2 px-4">Subscribe</button>
              </div>
            </form>
          </div>
        </div>

        <div className="row pt-4 border-top">
          <div className="col-md-6 text-left">
            <p>&copy; {new Date().getFullYear()} Expense. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-right">
            <p>
              <a href="/privacy" className="text-light">Privacy Policy</a> |{' '}
              <a href="/terms" className="text-light">Terms & Conditions</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
