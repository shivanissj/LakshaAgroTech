import { useRef, useState, useEffect } from "react";
import "./App.css";
import heroImg from "./assets/herooo.png";
import aboutImg from "./assets/about.png";
import logoImg from "./assets/logo.png";
import footerImg from "./assets/Footer.png";
import ProductsPage from "./ProductsPage";
import TechshaPage from "./TechshaPage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import Header from "./Header";
import foliarImg from "./assets/FoliarFertilizers.png";
import micronutrientImg from "./assets/MicronutrientFertilizers.png";
import npkImg from "./assets/NPKFertilizers.png";
import calciumImg from "./assets/CalciumFertilizers.png";

// single banner image for the manufacturing section
import techshaBannerImg from "./assets/techsa.png";

const categories = [
  { slug: "foliar", name: "Foliar Fertilizers", count: 6, image: foliarImg },
  { slug: "micronutrient", name: "Micronutrient Fertilizers", count: 2, image: micronutrientImg },
  { slug: "npk", name: "NPK Fertilizers", count: 3, image: npkImg },
  { slug: "secondary", name: "Secondary Nutrient Fertilizers", count: 1, image: calciumImg },
];

function App() {
  const scrollRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // ---------- READ INITIAL PAGE FROM HISTORY STATE ----------
  // On a hard reload, the browser preserves window.history.state for the
  // current entry (since we pushState'd it before). Previously this
  // component always hardcoded useState("home"), so a reload on
  // About/Contact/etc. would always snap back to Home. Reading the
  // existing history state (if any) on first render fixes that.
  const [page, setPage] = useState(() => {
    return window.history.state?.page || "home"; // "home" | "products" | "techsha" | "about" | "contact"
  });
  const [selectedSlug, setSelectedSlug] = useState(() => {
    return window.history.state?.slug ?? null;
  });

  const scrollProducts = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction * 220, behavior: "smooth" });
    }
  };

  // ---------- SCROLL REVEAL ANIMATION ----------
  useEffect(() => {
    if (page !== "home") return; // only run on home page markup

    const revealEls = document.querySelectorAll(".reveal");
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      isMobile
        ? { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
        : { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [page]);

  // ---------- LOCK BODY SCROLL WHEN DRAWER IS OPEN ----------
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // ---------- REAL BROWSER HISTORY WIRING ----------
  // Makes the phone/browser's physical Back button (and swipe-back gestures)
  // return to whichever page + scroll position the user was actually on,
  // instead of exiting the app entirely.
  useEffect(() => {
    // establish a base "home" entry the very first time the app loads.
    // If a history state already exists (e.g. this is a reload on a
    // sub-page, or the user navigated forward/back before reloading),
    // leave it alone — we already read it above for the initial page.
    if (!window.history.state) {
      window.history.replaceState({ page: "home", slug: null, scrollY: 0 }, "");
    }

    const handlePopState = (event) => {
      const state = event.state || { page: "home", slug: null, scrollY: 0 };
      setSelectedSlug(state.slug ?? null);
      setPage(state.page);
      if (state.page === "home") {
        requestAnimationFrame(() => {
          window.scrollTo({ top: state.scrollY || 0, behavior: "instant" });
        });
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Pushes a new history entry so the Back button can return here later.
  const navigateTo = (targetPage, slug = null) => {
    const scrollY = window.scrollY;
    window.history.pushState({ page: targetPage, slug, scrollY }, "");
    setSelectedSlug(slug);
    setPage(targetPage);
  };

  // Used by ProductsPage / TechshaPage / AboutPage / ContactPage's in-app
  // "Home"/logo/breadcrumb links. Just walks the browser history back one
  // step — popstate above then restores the exact page + scroll position,
  // same as pressing the device's physical Back button.
  const goBackHome = () => {
    window.history.back();
  };

  const goToProducts = (e) => {
    if (e) e.preventDefault();
    navigateTo("products", null);
  };

  const goToTechsha = (e) => {
    if (e) e.preventDefault();
    navigateTo("techsha", null);
  };

  const goToAbout = (e) => {
    if (e) e.preventDefault();
    navigateTo("about", null);
  };

  const goToContact = (e) => {
    if (e) e.preventDefault();
    navigateTo("contact", null);
  };

  const renderPage = () => {
    if (page === "products") {
      return <ProductsPage initialSlug={selectedSlug} onBack={goBackHome} navigateTo={navigateTo} />;
    }

    if (page === "techsha") {
      return <TechshaPage onBack={goBackHome} navigateTo={navigateTo} />;
    }

    if (page === "about") {
      return (
        <AboutPage
          onBack={goBackHome}
          onGoToContact={() => navigateTo("contact")}
          navigateTo={navigateTo}
        />
      );
    }

    if (page === "contact") {
      return (
        <ContactPage
          onBack={goBackHome}
          onGoToAbout={() => navigateTo("about")}
          navigateTo={navigateTo}
        />
      );
    }

    return (
      <>
        {/* ---------- HERO ---------- */}
        <section
          className="hero"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(8,20,10,0.92) 0%, rgba(8,20,10,0.75) 30%, rgba(8,20,10,0.25) 55%, rgba(8,20,10,0.05) 75%), linear-gradient(to bottom, rgba(10,20,10,0.35), rgba(10,20,10,0.1) 35%, rgba(8,18,10,0.8) 100%), url(${heroImg})`,
          }}
        >
          <div className="hero-body">
            <div className="hero-copy">
            <h1 className="hero-fade hero-fade-1">
              <span className="accent-green">Smart Farming for a</span>
              <br />
              <span className="accent-white">Better Tomorrow</span>
            </h1>
            <p className="hero-fade hero-fade-2">
              Innovative solutions, advanced technology and quality products
              to empower farmers and nourish the future.
            </p>
            <div className="hero-actions hero-fade hero-fade-3">
              <a href="#solutions" className="btn btn-primary" onClick={goToProducts}>
                Explore Solutions <span className="arrow">→</span>
              </a>
              <a href="#story" className="btn btn-dark">
                <span className="play">▶</span> Watch Our Story
              </a>
            </div>
          </div>

          <div className="hero-cards reveal reveal-up hero-fade hero-fade-4">
            <div className="float-card">
              <p className="card-label">Soil Health:</p>
              <p className="card-value">Good, 7.2pH</p>
              <svg viewBox="0 0 100 30" className="mini-chart">
                <polyline points="0,25 20,15 40,20 60,5 80,10 100,2" />
              </svg>
            </div>
            <div className="float-card">
              <p className="card-label">Crop Yield: <span className="up">↑</span></p>
              <p className="card-value">+24% vs. Last Season</p>
            </div>
            <div className="float-card">
              <p className="card-label">💧 Water Usage:</p>
              <p className="card-value">Optimized</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PRODUCT RANGE ---------- */}
      <section className="products" id="products">
        <h2 className="reveal reveal-up">Our Products for You</h2>
        <div className="product-row marquee-container">
          <div className="product-track-marquee">
            {[...categories, ...categories, ...categories, ...categories].map((cat, i) => (
              <div
                className="product-card reveal reveal-up reveal-stagger"
                style={{ cursor: "pointer", "--reveal-delay": `${(i % categories.length) * 0.12}s` }}
                key={`${cat.slug}-${i}`}
                onClick={() => navigateTo("products", cat.slug)}
              >
                <div className="product-img-wrap">
                  <img src={cat.image} alt={cat.name} className="product-img" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WHY CHOOSE US ---------- */}
      <section className="why" id="about">
        <div
          className="why-art reveal reveal-left"
          style={{ backgroundImage: `url(${aboutImg})` }}
          role="img"
          aria-label="Laksha Agro Tech smart farming illustration"
        ></div>
        <div className="why-copy reveal reveal-right">
          <h2>
            Why Choose
            <br />
            <span className="accent-green">Laksha Agro Tech?</span>
          </h2>
          <ul>
            <li>Advanced & Reliable Technology</li>
            <li>High Quality Tested Products</li>
            <li>Expert Advice & Support</li>
            <li>Sustainable & Eco-Friendly Practices</li>
          </ul>
          <a href="#about" className="btn btn-primary" onClick={goToAbout}>Learn More</a>
        </div>
      </section>

      {/* ---------- MANUFACTURING PRODUCTS ---------- */}
      <section className="manufacturing" id="manufacturing">
        <div className="manufacturing-panel reveal reveal-up">
          <img
            src={techshaBannerImg}
            alt="TECHSHA - Speciality Soluble Fertilizer"
            className="manufacturing-banner"
          />
          <button
            className="manufacturing-arrow"
            onClick={() => navigateTo("techsha")}
            aria-label="View TECHSHA products"
          >
            →
          </button>
        </div>
      </section>

      </>
    );
  };

  return (
    <div className="site">
      <Header page={page} navigateTo={navigateTo} />
      {renderPage()}
      
      {/* ==================== GLOBAL FOOTER (BANNER STYLE) ==================== */}
      <section 
        className="global-footer-container"
        style={{ backgroundImage: `url(${footerImg})`, backgroundColor: '#182b1a' }}
      >
        <div className="global-footer-overlay"></div>
        
        <div className="global-footer-card">
          <div className="global-footer-content">
            <div className="global-footer-brand">
              <img src={logoImg} alt="Laksha Agro Tech" className="global-footer-logo" />
            </div>

            <div className="global-footer-links-col">
              <h4>Quick Links</h4>
              <ul>
                <li><span className="global-leaf">🌿</span><a href="#home" onClick={(e) => { e.preventDefault(); navigateTo("home"); }}>Home</a></li>
                <li><span className="global-leaf">🌿</span><a href="#about" onClick={goToAbout}>About Us</a></li>
                <li><span className="global-leaf">🌿</span><a href="#products" onClick={goToProducts}>Products</a></li>
                <li><span className="global-leaf">🌿</span><a href="#solutions" onClick={(e) => { e.preventDefault(); navigateTo("home"); setTimeout(() => window.location.hash = "solutions", 100); }}>Solutions</a></li>
                <li><span className="global-leaf">🌿</span><a href="#manufacturing" onClick={goToTechsha}>Manufacturing</a></li>
              </ul>
            </div>

            <div className="global-footer-contact-col">
              <h4>Contact</h4>
              <div className="global-footer-contact-list">
                <p>
                  <span className="global-contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7ed957" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </span> 
                  +91 919600320783
                </p>
                <p>
                  <span className="global-contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7ed957" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                  </span> 
                  lakshaagrotech.com
                </p>
                <p>
                  <span className="global-contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7ed957" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </span> 
                  lakshaagrotechsales@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="global-footer-bottom">
          <p>Copyright © 2025 Laksha Agro Tech. All rights reserved.</p>
          <div className="global-footer-legal">
            <a href="#">Term of use</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;