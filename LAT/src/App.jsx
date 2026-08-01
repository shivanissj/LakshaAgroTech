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
import foliarImg from "./assets/FoliarFertilizers.png";
import micronutrientImg from "./assets/MicronutrientFertilizers.png";
import npkImg from "./assets/NPKFertilizers.png";
import calciumImg from "./assets/CalciumFertilizers.png";

// single banner image for the manufacturing section
import techshaBannerImg from "./assets/techsa.png";

const categories = [
  { slug: "foliar", name: "Foliar Fertilizers", count: 6, image: foliarImg },
  { slug: "micronutrient", name: "Micronutrient Fertilizers", count: 2, image: micronutrientImg },
  { slug: "npk", name: "NPK Fertilizers", count: 1, image: npkImg },
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

  if (page === "products") {
    return <ProductsPage initialSlug={selectedSlug} onBack={goBackHome} />;
  }

  if (page === "techsha") {
    return <TechshaPage onBack={goBackHome} />;
  }

  if (page === "about") {
    return (
      <AboutPage
        onBack={goBackHome}
        onGoToContact={() => navigateTo("contact")}
      />
    );
  }

  if (page === "contact") {
    return (
      <ContactPage
        onBack={goBackHome}
        onGoToAbout={() => navigateTo("about")}
      />
    );
  }

  const closeMenu = () => setMenuOpen(false);

  const goToProducts = (e) => {
    e.preventDefault();
    navigateTo("products", null);
    setMenuOpen(false);
  };

  const goToTechsha = (e) => {
    e.preventDefault();
    navigateTo("techsha", null);
    setMenuOpen(false);
  };

  const goToAbout = (e) => {
    e.preventDefault();
    navigateTo("about", null);
    setMenuOpen(false);
  };

  const goToContact = (e) => {
    e.preventDefault();
    navigateTo("contact", null);
    setMenuOpen(false);
  };

  return (
    <div className="site">
      {/* ---------- HERO ---------- */}
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(8,20,10,0.92) 0%, rgba(8,20,10,0.75) 30%, rgba(8,20,10,0.25) 55%, rgba(8,20,10,0.05) 75%), linear-gradient(to bottom, rgba(10,20,10,0.35), rgba(10,20,10,0.1) 35%, rgba(8,18,10,0.8) 100%), url(${heroImg})`,
        }}
      >
        <header className="nav">
          <div className="brand">
            <img src={logoImg} alt="Laksha Agro Tech logo" className="brand-logo" />
          </div>

          {menuOpen && <div className="nav-backdrop open" onClick={closeMenu} />}

          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            {/* "active" is now driven by the current page instead of being
                hardcoded on Home, so the correct link stays highlighted.
                (Note: this nav only ever renders while page === "home",
                since App() returns early for the other pages — see the
                AboutPage/ProductsPage/etc. components for their own navs.) */}
            <a href="#home" className={page === "home" ? "active" : ""} onClick={closeMenu}>Home</a>
            <a href="#about" className={page === "about" ? "active" : ""} onClick={goToAbout}>About Us</a>
            <a href="#products" className={page === "products" ? "active" : ""} onClick={goToProducts}>Products</a>
            <a href="#solutions" onClick={closeMenu}>Solutions</a>
            <a href="#contact" className={page === "contact" ? "active" : ""} onClick={goToContact}>Contact Us</a>
          </nav>

          <a href="#contact" className="nav-cta" onClick={goToContact}>Contact details</a>

          <button
            className={`menu-toggle ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line line1"></span>
            <span className="hamburger-line line2"></span>
            <span className="hamburger-line line3"></span>
          </button>
        </header>

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
        <div className="product-row">
          <button className="scroll-btn" aria-label="Previous" onClick={() => scrollProducts(-1)}>‹</button>
          <div className="product-track" ref={scrollRef}>
            {categories.map((cat, i) => (
              <div
                className="product-card reveal reveal-up reveal-stagger"
                style={{ cursor: "pointer", "--reveal-delay": `${i * 0.12}s` }}
                key={cat.slug}
                onClick={() => navigateTo("products", cat.slug)}
              >
                <div className="product-img-wrap">
                  <img src={cat.image} alt={cat.name} className="product-img" />
                </div>
                <p className="product-name">{cat.name}</p>
                <p className="product-category">{cat.count} Product{cat.count > 1 ? "s" : ""}</p>
              </div>
            ))}
          </div>
          <button className="scroll-btn" aria-label="Next" onClick={() => scrollProducts(1)}>›</button>
        </div>
        <div className="dots">
          <span className="dot active" />
          <span className="dot" />
          <span className="dot" />
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

      {/* ---------- FOOTER ---------- */}
      <footer
        className="footer reveal reveal-up"
        id="contact"
        style={{
          backgroundImage: `linear-gradient(rgba(6,16,8,0.5), rgba(6,16,8,0.6)), url(${footerImg})`,
        }}
      >
        <div className="footer-brand">
          <img src={logoImg} alt="Laksha Agro Tech logo" className="brand-logo footer-logo" />
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <a href="#home"><span className="link-icon">🌿</span>Home</a>
          <a href="#about" onClick={goToAbout}><span className="link-icon">🌿</span>About Us</a>
          <a href="#products" onClick={goToProducts}><span className="link-icon">🌿</span>Products</a>
          <a href="#solutions"><span className="link-icon">🌿</span>Solutions</a>
          <a href="#manufacturing" onClick={goToTechsha}><span className="link-icon">🌿</span>Manufacturing</a>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <p>+91 919600320783 </p>
          <p>lakshaagrotech.com</p>
          <p>lakshaagrotechsales@gmail.com </p>
        </div>
      </footer>
    </div>
  );
}

export default App;