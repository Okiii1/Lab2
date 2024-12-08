import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Home.css"; // File për stilizimin

const Home = () => {
  const [showMessage, setShowMessage] = useState(false);

  const handleExploreClick = () => {
    setShowMessage((prevShowMessage) => !prevShowMessage);
  };

  return (
    <div className="home-container">
      <Navbar />
      <section className="hero-section">
        <div className="hero-content">
          <h1>Mirë se vini në Menaxhimin e Shpenzimeve Tuaja!</h1>
          <p>Organizoni, monitoroni dhe kontrolloni shpenzimet tuaja për një të ardhme më të qëndrueshme financiare. Menaxhoni çdo shpenzim me lehtësi dhe siguri.</p>
          <button className="explore-button" onClick={handleExploreClick}>
            {showMessage ? "Mbyll" : "Eksploroni Më Shumë"}
          </button>
          {showMessage && (
            <p className="additional-message">
              Me platformën tonë, ju do të fitoni kontroll të plotë mbi financat tuaja dhe do të përmirësoni mirëqenien tuaj financiare.
            </p>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;