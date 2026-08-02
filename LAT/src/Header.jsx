import { useState, useEffect } from "react";
import logoImg from "./assets/logo.png";
import "./App.css";

export default function Header({ page, navigateTo }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleNav = (e, targetPage) => {
    e.preventDefault();
    closeMenu();
    if (navigateTo) {
      navigateTo(targetPage);
    }
  };

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="nav">
      <div className="brand" onClick={(e) => handleNav(e, "home")} style={{ cursor: "pointer" }}>
        <img src={logoImg} alt="Laksha Agro Tech logo" className="brand-logo" />
      </div>

      {menuOpen && <div className="nav-backdrop open" onClick={closeMenu} />}

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <a href="#home" className={page === "home" ? "active" : ""} onClick={(e) => handleNav(e, "home")}>Home</a>
        <a href="#about" className={page === "about" ? "active" : ""} onClick={(e) => handleNav(e, "about")}>About Us</a>
        <a href="#products" className={page === "products" ? "active" : ""} onClick={(e) => handleNav(e, "products")}>Products</a>
        <a href="#techsha" className={page === "techsha" ? "active" : ""} onClick={(e) => handleNav(e, "techsha")}>Techsha</a>
        <a href="#contact" className={page === "contact" ? "active" : ""} onClick={(e) => handleNav(e, "contact")}>Contact Us</a>
      </nav>

      <a 
        href="#contact" 
        className="nav-cta" 
        onClick={(e) => handleNav(e, "contact")}
        style={{ visibility: page === "contact" ? "hidden" : "visible" }}
      >
        Contact details
      </a>

      <button
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>
    </header>
  );
}
