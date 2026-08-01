import { useState } from "react";
import "./ProductsPage.css";
import logoImg from "./assets/logo.png";
import Header from "./Header";
import albertImg from "./assets/omex albert solution.png";
import bio20GoldImg from "./assets/omex Bio20Gold.png";
import calmaxGoldImg from "./assets/omex calmaxgold.png";
import k41Img from "./assets/omex K41.png";
import kingfolZincImg from "./assets/omex Kingfol zinc.png";
import foliarBoronImg from "./assets/omex foliar boron.png";
import cabLowImg from "./assets/omex cab low.png";
import threeXImg from "./assets/omex 3x.png";
import sequential1Img from "./assets/omex Sequential1.png";
import dp98Img from "./assets/omex dp 98.png";
import premiumImg from "./assets/omexpremium.png";
import omex144800Img from "./assets/Omex 14.48.00.png";

// ---- MOCK DATA: edit names/features here, add `image: yourImportedImg` per product when ready ----
const categories = [
  {
    slug: "foliar",
    name: "Foliar Fertilizers",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7ed957" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
    desc: "High quality foliar nutrition for better growth, higher yield and improved crop health.",
    products: [
      {
        name: "Omex Bio-20",
        image: bio20GoldImg,
        features: ["Enhances plant growth", "Improves stress tolerance", "Promotes natural plant health"],
        desc: "A concentrated, premium foliar nutrition solution and biostimulant engineered to maximize crop yields and help crops recover rapidly from environmental stress.",
      },
      {
        name: "Omex Premium",
        image: premiumImg,
        features: ["Premium quality formula", "Improves flowering and fruit set", "Increases yield and quality"],
        desc: "A premium-grade foliar formulation offering enhanced nutrient uptake for demanding, high-value crops.",
      },
      {
        name: "Omex Sequential 1",
        image: sequential1Img,
        features: ["Balanced nutrient delivery", "Supports critical growth stages", "Improves yield potential"],
        desc: "Part of a staged nutrition program, formulated to support crops through early growth stages with the right micronutrient balance.",
      },
      {
        name: "Omex Albert Solution",
        image: albertImg,
        features: ["Balanced foliar nutrition", "Supports overall plant health", "Improves crop performance"],
        desc: "A balanced multi-nutrient foliar feed designed to correct deficiencies quickly and support steady, healthy crop growth.",
      },
      {
        name: "Omex 3X",
        image: threeXImg,
        features: ["Powerful 3X formula", "Enhances growth and vitality", "Improves yield and quality"],
        desc: "A triple-strength nutrient solution designed for rapid correction of multiple deficiencies in a single application.",
      },
      {
        name: "Omex K41",
        image: k41Img,
        features: ["High Potassium formula", "Improves fruit size and quality", "Enhances plant strength"],
        desc: "A potassium-rich liquid feed formulated to strengthen crops during flowering and fruiting stages.",
      },
    ],
  },
  {
    slug: "micronutrient",
    name: "Micronutrient Fertilizers",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7ed957" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/></svg>,
    desc: "Targeted trace-element solutions to fix specific crop deficiencies.",
    products: [
      {
        name: "Omex Kingfol Zinc",
        image: kingfolZincImg,
        features: ["Corrects zinc deficiency", "Supports enzyme activity", "Improves crop vigor"],
        desc: "A highly concentrated, single-element zinc formulation designed to correct zinc deficiency quickly.",
      },
      {
        name: "Omex Foliar Boron",
        image: foliarBoronImg,
        features: ["Prevents boron deficiency", "Improves flowering", "Supports fruit set"],
        desc: "A highly specialized, fully water-soluble liquid fertilizer designed to prevent and correct boron deficiencies.",
      },
    ],
  },
  {
    slug: "npk",
    name: "NPK Fertilizers",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7ed957" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
    desc: "Core nitrogen-phosphorus-potassium blends for overall crop health.",
    products: [
      {
        name: "Omex 14.48.00",
        image: omex144800Img,
        features: ["High phosphorus starter", "Boosts root development", "Supports early establishment"],
        desc: "A high-phosphorus starter formulation ideal for root development and early crop establishment.",
      },
      {
        name: "Omex CaB Low",
        image: cabLowImg,
        features: ["Calcium-boron combination", "Strengthens cell structure", "Improves nutrient uptake"],
        desc: "A combined calcium-boron liquid feed formulated to support strong cell development and correct dual deficiencies together.",
      },
      {
        name: "Omex DP 98",
        image: dp98Img,
        features: ["High-analysis NPK blend", "Boosts overall nutrient supply", "Supports steady crop growth"],
        desc: "A high-analysis NPK formulation designed to deliver balanced nutrition across key growth stages.",
      },
    ],
  },
  {
    slug: "secondary",
    name: "Secondary Nutrient Fertilizers",
    icon: <span style={{ color: "#7ed957", fontWeight: "bold", fontSize: "20px" }}>Ca</span>,
    desc: "Calcium, magnesium and sulphur based nutrition for stronger crops.",
    products: [
      {
        name: "Omex CalMax Gold",
        image: calmaxGoldImg,
        features: ["Advanced calcium bio-stimulant", "Strengthens cell walls", "Improves fruit quality"],
        desc: "A next-generation, water-soluble suspension foliar fertilizer and advanced calcium bio-stimulant providing a balanced intake of calcium.",
      },
    ],
  },
];

function ProductsPage({ onBack, initialSlug, navigateTo }) {
  const [activeSlug, setActiveSlug] = useState(initialSlug || categories[0].slug);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const activeCategory = categories.find((c) => c.slug === activeSlug);

  return (
    <div className="products-page">

      <div className="breadcrumb">
        <button onClick={onBack} className="crumb-home">⌂</button>
        <span>/</span>
        <span>Products</span>
        <span>/</span>
        <span className="crumb-active">{activeCategory.name}</span>
      </div>

      <div className="products-layout">
        {/* ---------- SIDEBAR ---------- */}
        <aside className="sidebar">
          <h3>Product Range</h3>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              className={`sidebar-item ${cat.slug === activeSlug ? "active" : ""}`}
              onClick={() => setActiveSlug(cat.slug)}
            >
              <span className="sidebar-icon">{cat.icon}</span>
              <span className="sidebar-text">
                <span className="sidebar-name">{cat.name}</span>
                <span className="sidebar-count">{cat.products.length} Product{cat.products.length > 1 ? "s" : ""}</span>
              </span>
              <span className="sidebar-arrow">›</span>
            </button>
          ))}

          <div className="help-box">
            <span className="help-icon">🌱</span>
            <h4>Need Help Choosing the Right Product?</h4>
            <p>Our experts are here to help you.</p>
            <a href="#contact" className="btn btn-primary help-btn">Get Expert Advice →</a>
          </div>
        </aside>

        {/* ---------- PRODUCT GRID ---------- */}
        <main className="grid-area">
          <div className="grid-heading">
            <div>
              <h1>{activeCategory.name}</h1>
              <p>{activeCategory.desc}</p>
            </div>
          </div>

          <div className="product-grid">
            {activeCategory.products.map((p) => (
              <div className="pg-card" key={p.name}>
                <div className="pg-img">
                  {p.image ? (
                    <img src={p.image} alt={p.name} />
                  ) : (
                    <span className="pg-img-placeholder">Image</span>
                  )}
                </div>
                <div className="pg-body">
                  <span className="pg-tag">{activeCategory.name.replace(/s$/, "").toUpperCase()}</span>
                  <h3>{p.name}</h3>
                  <ul>
                    {p.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <button className="btn btn-outline" onClick={() => setSelectedProduct(p)}>
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>

        </main>
      </div>

      <div className="trust-row-wrapper">
        <div className="trust-row">
          <div className="trust-item">
            <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7ed957" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>
            <div>
              <h5>Quality Assured</h5>
              <p>Tested &amp; trusted for best results</p>
            </div>
          </div>
          <div className="trust-item">
            <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7ed957" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg></span>
            <div>
              <h5>Safe for Crops</h5>
              <p>Eco-friendly &amp; safe for all crops</p>
            </div>
          </div>
          <div className="trust-item">
            <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7ed957" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/></svg></span>
            <div>
              <h5>Advanced Formula</h5>
              <p>Scientifically formulated for better absorption</p>
            </div>
          </div>
          <div className="trust-item">
            <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7ed957" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg></span>
            <div>
              <h5>Expert Support</h5>
              <p>Get guidance from our experts</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- DETAIL POPUP ---------- */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>✕</button>
            <div className="modal-img">
              {selectedProduct.image ? (
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              ) : (
                <span className="pg-img-placeholder">Image</span>
              )}
            </div>
            <div className="modal-details">
              <span className="pg-tag">{activeCategory.name.replace(/s$/, "").toUpperCase()}</span>
              <h2>{selectedProduct.name}</h2>
              <p className="modal-desc">{selectedProduct.desc}</p>
              <ul>
                {selectedProduct.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a href="#contact" className="btn btn-primary">Enquire Now</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;