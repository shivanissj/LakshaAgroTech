import { useRef, useEffect, useState } from "react";
import "./TechshaPage.css";
import logoImg from "./assets/logo.png";
import Header from "./Header";
import techshaHeroImg from "./assets/heroooo2.png";

/* ------------------------------------------------------------------
   PRODUCT PHOTOS (place these files in src/assets/ with these exact names)
------------------------------------------------------------------ */
import pinkBucketImg from "./assets/pinkbucket.png";
import blueBucketImg from "./assets/bluebucket.png";
import greenBucketImg from "./assets/greenbucket.png";
import t1 from "./assets/t1.png";
import t2 from "./assets/t2.png";
import t3 from "./assets/t3.png";
import t4 from "./assets/t4.png";
import t5 from "./assets/t5.png";
import t6 from "./assets/t6.png";
import t7 from "./assets/t7.png";
import t8 from "./assets/t8.png";
import t9 from "./assets/t9.png";
import t10 from "./assets/t10.png";
import t11 from "./assets/t11.png";
import t12 from "./assets/t12.png";
import or from "./assets/or.png";
import lg from "./assets/lg.png";
/* ------------------------------------------------------------------
   DATA
   (img: null means no product photo yet -> falls back to text thumb)
------------------------------------------------------------------ */

const categories = [
  { 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7ed957" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3v4.4L4.8 13.6c-.6.8-.2 2.4.9 2.4h12.6c1.1 0 1.5-1.6.9-2.4L15 7.4V3"></path>
        <path d="M14 3v4c0 .6.4 1 1 1h4"></path>
        <path d="M9 3h6"></path>
      </svg>
    ), 
    name: "Suspension Liquid Fertilizer", count: 6 
  },
  { 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7ed957" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
        <path d="M2 22l10-10"></path>
      </svg>
    ), 
    name: "Suspension Powder Fertilizer", count: 9 
  },
  { 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7ed957" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="4"></circle>
        <line x1="21.17" y1="8" x2="12" y2="8"></line>
        <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
        <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
      </svg>
    ), 
    name: "Micronutrient Fertilizers", count: 3 
  },
];

const waterSoluble = [
  { grade: "20-20-20 + TE", npk: "N 20% | P 20% | K 20%", desc: "Balanced NPK for all crops & growth stages.", img: t6, tag: "WATER SOLUBLE FERTILIZER" },
  { grade: "12-12-36 + TE", npk: "N 12% | P 12% | K 36%", desc: "High Potassium formula for fruit setting & quality.", img: t3, tag: "WATER SOLUBLE FERTILIZER" },
  { grade: "15-05-30 + TE", npk: "N 15% | P 05% | K 30%", desc: "For fruit set & maturity. Improves size & sweetness.", img: t1, tag: "WATER SOLUBLE FERTILIZER" },
  { grade: "21-21-21 + TE", npk: "N 21% | P 21% | K 21%", desc: "Balanced multipurpose fertilizer for all crops & stages.", img: t4, tag: "WATER SOLUBLE FERTILIZER" },
  { grade: "MAP 13-40-13", npk: "N 13% | P 40% | K 13%", desc: "Water soluble fertilizer for better yield & growth.", img: t7, tag: "WATER SOLUBLE FERTILIZER" },
  { grade: "19-19-19 + TE", npk: "N 19% | P 19% | K 19%", desc: "Balanced NPK for maximum yield in high production.", img: t5, tag: "WATER SOLUBLE FERTILIZER" },
  { grade: "MAP 12-61-00", npk: "N 12% | P 61% | K 00%", desc: "Mono Ammonium Phosphate for robust root development.", img: t8, tag: "WATER SOLUBLE FERTILIZER" },
  { grade: "MKP 00-52-34", npk: "P 52% | K 34%", desc: "Mono Potassium Phosphate for flowering & fruiting.", img: t2, tag: "WATER SOLUBLE FERTILIZER" },
  { grade: "Calcium Nitrate", npk: "N 15% | Ca 19%", desc: "Multi-purpose fertilizer, treats calcium & nitrogen deficiency.", img: t9, tag: "WATER SOLUBLE FERTILIZER" },
];

const suspensionFertilizers = [
  { 
    grade: "25-25-25 + TE", 
    npk: "N 25% | P 25% | K 25%", 
    tag: "Balanced Grade", 
    img: greenBucketImg,
    desc: "NPK 25-25-25 is a balanced grade fertilizer for general crop growth. Its homogeneous suspension formula is suitable for application during all stages of plant growth. It promotes vigorous vegetative growth, balanced nutrient supply, and improved crop quality."
  },
  { 
    grade: "10-50-20 + TE", 
    npk: "N 10% | P 50% | K 20%", 
    tag: "High Phosphorus", 
    img: blueBucketImg,
    desc: "NPK 10-50-20 is a high-phosphorus fertilizer that supports root development, early plant establishment, flowering, and fruit setting. The homogeneous suspension formulation ensures better nutrient availability throughout the crop growth stages."
  },
  { 
    grade: "12-00-60 + TE", 
    npk: "N 12% | P 0% | K 60%", 
    tag: "Potassium Rich", 
    img: or,
    desc: "NPK 12-00-60 is a potassium-rich fertilizer specially formulated for fruit setting and fruit development. It is free from chlorine, sodium, and heavy metals. The product contains high sulfur content, which helps lower soil pH and improves nutrient availability, resulting in better crop performance."
  },
  { 
    grade: "00-40-37 + TE", 
    npk: "N 0% | P 40% | K 37%", 
    tag: "Phosphorus & Potash", 
    img: lg,
    desc: "NPK 00-40-37 + TE is a premium source of phosphorus and potassium, formulated to support flowering, fruit setting, root development, and improved plant immunity. The balanced phosphorus and potash ratio enhances nutrient efficiency, promotes healthy crop growth, and improves yield quality."
  },
  { 
    grade: "10-20-50 + TE", 
    npk: "N 10% | P 20% | K 50%", 
    tag: "Potassium Rich", 
    img: pinkBucketImg,
    desc: "NPK 10-20-50 is a premium potassium-rich suspension fertilizer designed to support fruit setting and fruit development. Manufactured using high-quality raw materials, it is free from chlorine, sodium, and heavy metals. Its high sulfur content helps reduce soil pH and enhances the availability of essential nutrients for improved crop performance."
  }
];

const microCards = [
  {
    title: "GROWFERT",
    subtitle: "(Micro Nutrient Fertilizer)",
    desc:
      "Mix micro nutrient fertilizer for foliar and drip irrigation. Contains six micro nutrients like (Zn, Fe, Mg, Cu, B, Mo). It is highly water soluble.",
    extra: "Dosage: 5-10 Kg Field crops, 10-20 Kg Horti and plantation crops",
    image: t10,
  },
  {
    title: "TECHSHA",
    subtitle: "(Super Pottasium Humate)",
    desc:
      "It is a concentrate Humi Acid Substance and 100% water soluble plant growth stimulant and soil conditioner.",
    extra:
      "Foliar Spray: 1 to 2 gm in 1 Litre water  •  Drip Irrigation: 2 to 3 Kgs per Acre  •  Soil Application: 3 to 5 Kgs per Acre",
    image: t11,
  },
  {
    title: "TECHSHA (Boron 20%)",
    subtitle: "Di Sodium Octoborate Tetrahydrate",
    desc: "",
    extra:
      "Boron (as B), Min: 20.0%  •  Water Insoluble, Max: 1.0%  •  Lead (as Pb), Min: 0.003%  •  Cadmium (as Cd), Min: 0.0025%  •  Arsenic (as As), Min: 0.01%",
    image: t12,
  },
];

const comparison = [
  { grade: "25-25-25 + TE", n: 25, p: 25, k: 25, benefit: "Vigorous vegetative growth & balanced nutrient supply", app: "Foliar Spray / Fertigation" },
  { grade: "10-50-20 + TE", n: 10, p: 50, k: 20, benefit: "Root development, flowering & fruit setting", app: "Foliar Spray / Fertigation" },
  { grade: "12-00-60 + TE", n: 12, p: "-", k: 60, benefit: "Fruit setting & development (Free from Chlorine)", app: "Foliar Spray / Fertigation" },
  { grade: "00-40-37 + TE", n: "-", p: 40, k: 37, benefit: "Flowering, fruit setting & plant immunity", app: "Foliar Spray / Fertigation" },
  { grade: "10-20-50 + TE", n: 10, p: 20, k: 50, benefit: "Premium potassium for fruit setting & development", app: "Foliar Spray / Fertigation" },
];

/* ------------------------------------------------------------------
   PRODUCT DETAIL MODAL
------------------------------------------------------------------ */

function ProductModal({ product, onClose, navigateTo }) {
  if (!product) return null;

  const features = [
    product.npk ? `Nutrient Content: ${product.npk}` : null,
    "High Purity Premium Quality",
    "Better Yield & Quality",
  ].filter(Boolean);

  return (
    <div className="tp-modal-overlay" onClick={onClose}>
      <div className="tp-modal" onClick={(e) => e.stopPropagation()}>
        <button className="tp-modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="tp-modal-image-wrap">
          {product.img ? (
            <img src={product.img} alt={product.grade} className="tp-modal-img" />
          ) : (
            <span className="tp-modal-img-fallback">TECHSHA</span>
          )}
        </div>

        <div className="tp-modal-content">
          <h2 className="tp-modal-title">{product.grade}</h2>
          <p className="tp-modal-desc">
            {product.desc || "Premium quality fertilizer engineered for better crop yield and quality."}
          </p>

          <ul className="tp-modal-features">
            {features.map((f) => (
              <li key={f}>
                <span className="tp-modal-check">✓</span> {f}
              </li>
            ))}
          </ul>

          <button className="tp-modal-cta" onClick={() => navigateTo("contact", null, `I am interested in ${product.grade}. Please provide more details.`)}>Enquire Now</button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   COMPONENT
------------------------------------------------------------------ */

export default function TechshaPage({ navigateTo, hideHero }) {
  const catRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCat, setActiveCat] = useState("All");

  const scrollCats = (dir) => {
    if (catRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = catRef.current;
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      
      if (isMobile && dir === 1 && scrollLeft + clientWidth >= scrollWidth - 10) {
        catRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        catRef.current.scrollBy({ left: dir * 220, behavior: "smooth" });
      }
    }
  };

  const handleCategoryClick = (catName) => {
    setActiveCat(activeCat === catName ? "All" : catName);
    
    setTimeout(() => {
      const section = document.getElementById("products-section");
      if (section) {
        const y = section.getBoundingClientRect().top + window.scrollY - 80; // offset for nav if any
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100);
  };

  const openModal = (item) => setSelectedProduct(item);
  const closeModal = () => setSelectedProduct(null);

  // Lock background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = selectedProduct ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProduct]);

  // Close modal on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ---------- SCROLL REVEAL ANIMATION ----------
  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal:not(.in-view)");
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
  }, [activeCat]);

  return (
    <div className="tp-page">

      {/* ---------- HERO ---------- */}
      {!hideHero && (
      <section 
        className="tp-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(8, 20, 10, 0.7), rgba(8, 20, 10, 0.85)), url(${techshaHeroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '60vh',
          alignItems: 'center'
        }}
      >
        <div className="tp-hero-copy reveal reveal-up">
          <h1>
            Nourishing Crops.
            <br />
            <span className="tp-accent">Enriching</span> Futures.
          </h1>
          <p>
            High quality water soluble and suspension fertilizers for all
            types of crops and growth stages.
          </p>

        </div>
      </section>
      )}

      {/* ---------- MAIN LAYOUT ---------- */}
      <div className="products-layout" style={{ marginTop: '20px' }}>
        
        {/* ---------- SIDEBAR ---------- */}
        <div className="sidebar techsha-sidebar">
          <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '4px', paddingLeft: '10px' }}>Product Range</h3>
          {categories.map((cat, i) => (
            <div
              className={`sidebar-item ${activeCat === cat.name ? "active" : ""}`}
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
            >
              <div className="sidebar-icon">
                {cat.icon}
              </div>
              <div className="sidebar-text">
                <span className="sidebar-name">{cat.name}</span>
                <span className="sidebar-count">{cat.count} Products</span>
              </div>
              <div className="sidebar-arrow">›</div>
            </div>
          ))}
        </div>

        {/* ---------- PRODUCT GRID AREA ---------- */}
        <div className="grid-area">
          <div id="products-section"></div>

      {/* ---------- SUSPENSION POWDER FERTILIZERS ---------- */}
      {(activeCat === "All" || activeCat === "Suspension Powder Fertilizer") && (
      <section className="tp-section" id="products">
        <div className="tp-section-head reveal reveal-up">
          <h2>SUSPENSION POWDER FERTILIZERS</h2>
        </div>
        <div className="tp-grid tp-grid-4">
          {waterSoluble.map((item, i) => (
            <div
              className="tp-card reveal reveal-up reveal-stagger"
              style={{ "--reveal-delay": `${(i % 4) * 0.1}s` }}
              key={item.grade}
              onClick={() => openModal(item)}
            >
              <div className="tp-card-thumb">
                {item.img ? (
                  <img src={item.img} alt={item.grade} className="tp-thumb-img" />
                ) : (
                  "TECHSHA"
                )}
              </div>
              <div className="tp-card-body">
                <h3>{item.grade} <span className="pg-arrow">→</span></h3>
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* ---------- SUSPENSION LIQUID FERTILIZERS ---------- */}
      {(activeCat === "All" || activeCat === "Suspension Liquid Fertilizer") && (
      <section className="tp-section tp-section-alt">
        <div className="tp-section-head reveal reveal-up">
          <h2>SUSPENSION LIQUID FERTILIZERS</h2>
        </div>
        <div className="tp-grid tp-grid-6">
          {suspensionFertilizers.map((item, i) => (
            <div
              className="tp-bucket-card reveal reveal-up reveal-stagger"
              style={{ "--reveal-delay": `${(i % 6) * 0.08}s` }}
              key={item.grade}
              onClick={() => openModal(item)}
              role="button"
              tabIndex={0}
            >
              <div className="tp-bucket-thumb">
                {item.img ? (
                  <img src={item.img} alt={item.grade} className="tp-thumb-img" />
                ) : (
                  "TECHSHA"
                )}
              </div>
              <div className="tp-card-body">
                <h3>{item.grade} <span className="pg-arrow">→</span></h3>
              </div>
            </div>
          ))}
        </div>
        <p className="tp-rate-line">
          <strong>Application Rate</strong> (All Suspension Fertilizers) &nbsp;
          <span className="tp-green-icon">✔</span> Foliar Spray: 4 – 7 gm / L &nbsp;&nbsp; <span className="tp-green-icon">✔</span> Fertigation: 5 – 10 Kgs / Acre
        </p>
      </section>
      )}

      {/* ---------- MICRONUTRIENT / HUMATE / BORON CARDS ---------- */}
      {(activeCat === "All" || activeCat === "Micronutrient Fertilizers") && (
      <section className="tp-section">
        <div className="tp-section-head reveal reveal-up">
          <h2>
            {activeCat === "All" ? "SPECIALTY PRODUCTS" : "MICRONUTRIENT FERTILIZERS"}
          </h2>
        </div>
        <div className="tp-grid tp-grid-3">
          {microCards.filter(c => 
            activeCat === "All" || activeCat === "Micronutrient Fertilizers"
          ).map((c, i) => (
            <div
              className="tp-info-card reveal reveal-up reveal-stagger"
              style={{ "--reveal-delay": `${i * 0.12}s` }}
              key={c.title}
              onClick={() =>
                openModal({
                  grade: c.title,
                  npk: c.subtitle,
                  desc: c.desc,
                  img: c.image,
                  tag: c.subtitle,
                })
              }
              role="button"
              tabIndex={0}
            >
              <div className="tp-info-thumb">
                {c.image ? (
                  <img src={c.image} alt={c.title} className="tp-info-img" />
                ) : c.title.includes("GROWFERT") ? (
                  "GROWFERT"
                ) : (
                  "TECHSHA"
                )}
              </div>
              <div className="tp-card-body">
                <h3>{c.title} <span className="pg-arrow">→</span></h3>
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* ---------- QUICK NUTRIENT COMPARISON ---------- */}
      <section className="tp-section tp-section-alt">
        <h2 className="tp-centered-heading reveal reveal-up">QUICK NUTRIENT COMPARISON</h2>
        <div className="tp-table-wrap reveal reveal-up">
          <table className="tp-table">
            <thead>
              <tr>
                <th rowSpan={2}>Product</th>
                <th colSpan={3}>Macro Elements (%)</th>
                <th rowSpan={2}>Key Benefits</th>
                <th rowSpan={2}>Application</th>
              </tr>
              <tr>
                <th>N</th><th>P</th><th>K</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.grade}>
                  <td>{row.grade}</td>
                  <td>{row.n}</td><td>{row.p}</td><td>{row.k}</td>
                  <td>{row.benefit}</td>
                  <td>{row.app}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      </div> {/* end grid-area */}
      </div> {/* end products-layout */}

      {/* ---------- MANUFACTURING BANNER ---------- */}
      {!hideHero && (
      <section 
        className="tp-manufacturing" 
        id="manufacturing"
        style={{
          backgroundImage: `linear-gradient(rgba(8, 20, 10, 0.7), rgba(8, 20, 10, 0.85)), url(${techshaHeroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '60vh',
          alignItems: 'center'
        }}
      >
        <div className="tp-manufacturing-copy reveal reveal-up">
          <span className="tp-manufacturing-label">OUR OWN MANUFACTURING PRODUCT</span>
          <h2 className="tp-manufacturing-title">TECHSHA</h2>
          <div className="tp-manufacturing-ribbon">
            <span>SPECIALITY&nbsp;&nbsp;SOLUBLE&nbsp;&nbsp;FERTILIZER</span>
          </div>
          <div className="tp-manufacturing-features">
            <span><span className="tp-green-icon">✔</span> High Purity Raw Materials</span>
            <span><span className="tp-green-icon">✔</span> Advanced Technology</span>
            <span><span className="tp-green-icon">✔</span> 100% Water Soluble</span>
            <span><span className="tp-green-icon">✔</span> Better Yield &amp; Quality</span>
          </div>
        </div>
      </section>
      )}

      {/* ---------- PRODUCT DETAIL MODAL ---------- */}
      <ProductModal product={selectedProduct} onClose={closeModal} navigateTo={navigateTo} />
    </div>
  );
}