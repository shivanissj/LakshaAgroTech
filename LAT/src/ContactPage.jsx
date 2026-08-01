import { useState } from "react";
import "./ContactPage.css";

// Images ah correct-a import panniyachu
import navbarImg from "./assets/navbar.jpg"; 
import footerBgImg from "./assets/footer.png"; // Intha image unga assets folder-la irukkanum
import logoImg from "./assets/logo.png"; 

function ContactPage({ onBack, onGoToAbout }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Formatting the message for WhatsApp
    const waText = `Hello Laksha Agro Tech! I have an inquiry:\n\n*Name:* ${form.name}\n*Company:* ${form.company || "N/A"}\n*Phone:* ${form.phone}\n*Email:* ${form.email}\n*Message:* ${form.message}`;
    
    // URL Encoding the text
    const encodedText = encodeURIComponent(waText);
    
    // Redirecting to WhatsApp
    window.open(`https://wa.me/919600320783?text=${encodedText}`, "_blank");
    
    // Optional: Clear form after sending
    setForm({ name: "", email: "", phone: "", company: "", message: "" });
  };

  return (
    <div className="contact-page">
      {/* ==================== HERO + NAV SECTION ==================== */}
      <section className="cp-hero-section">
        {navbarImg ? (
          <img src={navbarImg} alt="Farm Field" className="cp-hero-bg" />
        ) : (
          <div className="cp-hero-bg" style={{ background: "#1a3a22" }} />
        )}
        <div className="cp-hero-overlay" />

        <header className="cp-nav">
          <button className="cp-brand" onClick={onBack}>
            {logoImg ? (
              <img src={logoImg} alt="Laksha Agro Tech Logo" className="cp-nav-logo" />
            ) : (
              <span className="cp-brand-text">Laksha Agro Tech</span>
            )}
          </button>

          <nav className={`cp-nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#home" onClick={(e) => { e.preventDefault(); onBack(); setMenuOpen(false); }}>Home</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); onGoToAbout && onGoToAbout(); setMenuOpen(false); }}>About Us</a>
            <a href="#products">Products</a>
            <a href="#solutions">Solutions</a>
            <a href="#contact" className="active">Contact Us</a>
          </nav>

          <div className="cp-nav-right">
            <a href="tel:+919600320783" className="cp-nav-cta">Call Now</a>
            <button className="cp-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <span />
              <span />
              <span />
            </button>
          </div>
        </header>

        <div className="cp-hero-content">
          <h1>Contact us</h1>
          <p>Laksha Agro Tech is ready to provide the right solution according to your needs</p>
        </div>
      </section>

      {/* ==================== CONTACT CARDS ==================== */}
      <section className="cp-contact-section">
        <div className="cp-layout">
          {/* ---- INFO CARD ---- */}
          <div className="cp-info">
            <h2>Get in touch</h2>
            <p className="cp-info-desc">
              Have a question about our fertilizers, dosage or availability? Reach out to us directly.
            </p>

            <div className="cp-info-item">
              <div className="cp-info-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <p className="cp-info-label">Head Office</p>
                <p>37/1, Laxmipuram, Old Bypass Rd., CHITTODE, Erode Dt., Tamilnadu - 638 102.</p>
              </div>
            </div>

            <div className="cp-info-item">
              <div className="cp-info-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <p className="cp-info-label">Email Us</p>
                <a href="mailto:lakshaagrotechsales@gmail.com">lakshaagrotechsales@gmail.com</a>
              </div>
            </div>

            <div className="cp-info-item">
              <div className="cp-info-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div>
                <p className="cp-info-label">Call Us</p>
                <a href="tel:+919600320783">Phone : +91 919600320783</a>
              </div>
            </div>
          </div>

          {/* ---- FORM CARD ---- */}
          <div className="cp-form-card">
            <form className="cp-form" onSubmit={handleSubmit}>
              <h2>Send us a message</h2>

              <div className="cp-form-row">
                <div className="cp-field">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="cp-field">
                  <label htmlFor="company">Company</label>
                  <input id="company" name="company" type="text" placeholder="Company" value={form.company} onChange={handleChange} />
                </div>
              </div>

              <div className="cp-form-row">
                <div className="cp-field">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" placeholder="Phone" value={form.phone} onChange={handleChange} required />
                </div>
                <div className="cp-field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="cp-field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5} placeholder="Message" value={form.message} onChange={handleChange} required />
              </div>

              <button type="submit" className="cp-btn cp-btn-primary">
                Send via WhatsApp 💬
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ==================== MAP ==================== */}
      <section className="cp-map-section">
        <iframe
          title="Laksha Agro Tech Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3910.1234567890123!2d77.12345678901234!3d11.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDA3JzI0LjQiTiA3N8KwMDcnMjQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      {/* ==================== NEW FOOTER DESIGN ==================== */}
      <section className="cp-footer-container">
        <div 
          className="cp-footer-card" 
          style={{ backgroundImage: footerBgImg ? `url(${footerBgImg})` : 'none', backgroundColor: '#182b1a' }}
        >
          <div className="cp-footer-overlay"></div>
          
          <div className="cp-footer-content">
            <div className="cp-footer-brand">
              {logoImg ? (
                <img src={logoImg} alt="Laksha Agro Tech" className="cp-footer-logo" />
              ) : (
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px" }}>Laksha Agro Tech</h2>
              )}
            </div>

            <div className="cp-footer-links-col">
              <h4>Quick Links</h4>
              <ul>
                <li><span className="cp-leaf">🌿</span><a href="#home">Home</a></li>
                <li><span className="cp-leaf">🌿</span><a href="#about">About Us</a></li>
                <li><span className="cp-leaf">🌿</span><a href="#products">Products</a></li>
                <li><span className="cp-leaf">🌿</span><a href="#solutions">Solutions</a></li>
                <li><span className="cp-leaf">🌿</span><a href="#manufacturing">Manufacturing</a></li>
              </ul>
            </div>

            <div className="cp-footer-contact-col">
              <h4>Contact</h4>
              <p>+91 919600320783</p>
              <p>lakshaagrotech.com</p>
              <p>lakshaagrotechsales@gmail.com</p>
            </div>
          </div>
        </div>
      </section>
      
      <div className="cp-footer-bottom">
        <p>Copyright © 2025 Laksha Agro Tech. All rights reserved.</p>
        <div className="cp-footer-legal">
          <a href="#">Term of use</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>

    </div>
  );
}

export default ContactPage;