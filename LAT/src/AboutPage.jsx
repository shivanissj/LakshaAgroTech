import { useEffect } from "react";
import "./AboutPage.css";

/* ------------------------------------------------------------------
   IMPORTING IMAGES
   Make sure about1 to about6 are placed in your src/assets/ folder.
   If your images are .png, change the extension below from .jpg to .png
------------------------------------------------------------------ */
import logoImg from "./assets/logo.png";
import about1 from "./assets/about1.jpg";
import about2 from "./assets/about2.jpg";
import about3 from "./assets/about3.jpg";
import about4 from "./assets/about4.jpg";
import about5 from "./assets/about5.jpg";
import about6 from "./assets/about6.jpg";

// Mapping the 6 images to the 7 available slots on the page
const heroBg = about4;      // Wide landscape for background
const storyImg1 = about2;   // Main story image (Farmer)
const storyImg2 = about3;   // Overlap story image (Hands holding soil)
const gal1 = about1;        // Gallery Tall image (Watering plant)
const gal2 = about5;        // Gallery standard image
const gal3 = about6;        // Gallery standard image
const gal4 = about4;        // Reusing about4 for the wide gallery slot (only 6 photos for 7 slots)

const values = [
  { icon: "🌿", title: "Sustainable Practices", desc: "Eco-friendly formulations protecting long-term soil health." },
  { icon: "🧪", title: "Scientific Formula", desc: "Every product is backed by research for real field results." },
  { icon: "🛡️", title: "Quality Assured", desc: "Strict quality checks from raw material to final pack." },
  { icon: "🎧", title: "Farmer Support", desc: "Expert guidance to help choose and apply the right products." },
];

const stats = [
  { value: "10+", label: "Years of Trust" },
  { value: "20+", label: "Speciality Products" },
  { value: "1000+", label: "Happy Farmers" },
  { value: "50+", label: "Distributors" },
];

function AboutPage({ onBack, onGoToContact }) {
  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Helper for rendering images or placeholders
  const renderImage = (src, alt, className = "") => {
    return src ? (
      <img src={src} alt={alt} className={className} />
    ) : (
      <div className={`img-placeholder ${className}`}>
        <span>📷 Image</span>
      </div>
    );
  };

  return (
    <div className="about-page">
      {/* ---------- NAV ---------- */}
      {/* NOTE: the dark green solid bar behind Home/About Us/Products/Contact
          is set in AboutPage.css (likely a `background` or
          `background-color` rule on `.ap-nav`). I don't have that file yet,
          so as a quick fix I'm overriding it here inline to fully transparent.
          Send AboutPage.css and I can remove this inline override and fix
          it properly at the source instead. */}
      <header className="ap-nav" style={{ background: "transparent", backgroundColor: "transparent", boxShadow: "none" }}>
        <button className="ap-brand" onClick={onBack}>
          {renderImage(logoImg, "Laksha Agro Tech logo", "ap-brand-logo")}
        </button>
        <nav className="ap-nav-links">
          <a href="#home" onClick={(e) => { e.preventDefault(); onBack(); }}>Home</a>
          <a href="#about" className="active">About Us</a>
          <a href="#products">Products</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); onGoToContact && onGoToContact(); }}>
            Contact Us
          </a>
        </nav>
        <button className="ap-nav-cta" onClick={() => onGoToContact && onGoToContact()}>
          📞 Get in Touch
        </button>
      </header>

      {/* ---------- HERO SECTION WITH BG IMAGE ---------- */}
      <section className="ap-hero-modern">
        {heroBg && <img src={heroBg} alt="Farm background" className="ap-hero-bg" />}
        <div className="ap-hero-overlay"></div>
        <div className="ap-hero-content">
          <span className="ap-badge reveal reveal-up">WHO WE ARE</span>
          <h1 className="reveal reveal-up">
            Nourishing Roots, <br/><span className="ap-accent">Growing Futures.</span>
          </h1>
          <p className="reveal reveal-up">
            We manufacture and supply premium water soluble, suspension and speciality fertilizers, 
            helping farmers grow healthier crops with better yield and consistent quality.
          </p>
        </div>
      </section>

      {/* ---------- STORY SECTION (OVERLAPPING IMAGES) ---------- */}
      <section className="ap-story-modern">
        <div className="ap-story-text reveal reveal-left">
          <span className="ap-eyebrow">OUR STORY</span>
          <h2>Rooted in Agriculture, Driven by Innovation</h2>
          <p>
            Laksha Agro Tech was built on a simple idea — every farmer deserves access 
            to reliable, high-quality nutrition solutions for their crops. From our own 
            TECHSHA manufacturing line to trusted imported brands like OMEX and RNZ, 
            we bring together local understanding and global technology.
          </p>
          <p>
            Today, our range covers foliar, suspension, micronutrient, and NPK 
            fertilizers designed to fit every growth stage and crop type. We don't just 
            sell fertilizers; we deliver growth.
          </p>
          <div className="ap-story-stats">
            {stats.slice(0,2).map((s, i) => (
              <div key={i} className="ap-mini-stat">
                <h3>{s.value}</h3>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ap-story-images reveal reveal-right">
          <div className="img-wrapper img-main">
            {renderImage(storyImg1, "Team in field")}
          </div>
          <div className="img-wrapper img-overlap">
            {renderImage(storyImg2, "Manufacturing process")}
          </div>
        </div>
      </section>

      {/* ---------- VALUES SECTION ---------- */}
      <section className="ap-values-section">
        <div className="ap-values-header reveal reveal-up">
          <h2>Why Farmers Choose Us</h2>
          <p>We believe in delivering nothing but the best for your soil and crops.</p>
        </div>
        <div className="ap-grid-4">
          {values.map((v, i) => (
            <div 
              className="ap-card-modern reveal reveal-up reveal-stagger" 
              style={{ "--reveal-delay": `${i * 0.1}s` }} 
              key={v.title}
            >
              <div className="ap-card-icon">{v.icon}</div>
              <h4>{v.title}</h4>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- IMAGE GALLERY ---------- */}
      <section className="ap-gallery-section">
        <h2 className="ap-centered-heading reveal reveal-up">Our Facilities & Fields</h2>
        <div className="ap-gallery-grid">
          <div className="gal-item gal-tall reveal reveal-up">
            {renderImage(gal1, "Gallery Image 1")}
          </div>
          <div className="gal-item reveal reveal-up" style={{ "--reveal-delay": "0.1s" }}>
            {renderImage(gal2, "Gallery Image 2")}
          </div>
          <div className="gal-item reveal reveal-up" style={{ "--reveal-delay": "0.2s" }}>
            {renderImage(gal3, "Gallery Image 3")}
          </div>
          <div className="gal-item gal-wide reveal reveal-up" style={{ "--reveal-delay": "0.3s" }}>
            {renderImage(gal4, "Gallery Image 4")}
          </div>
        </div>
      </section>

      {/* ---------- FULL WIDTH STATS BANNER ---------- */}
      <section className="ap-stats-banner reveal reveal-up">
        <div className="ap-stats-container">
          {stats.map((s) => (
            <div className="ap-stat-item" key={s.label}>
              <span className="ap-stat-val">{s.value}</span>
              <span className="ap-stat-lbl">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="ap-cta-modern reveal reveal-up">
        <div className="ap-cta-box">
          <h2>Have Questions About Our Products?</h2>
          <p>Our agronomists and team are happy to help you choose the right fertilizer for your specific crop and soil needs.</p>
          <button className="ap-btn-glow" onClick={() => onGoToContact && onGoToContact()}>
            Contact Our Experts <span>→</span>
          </button>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;