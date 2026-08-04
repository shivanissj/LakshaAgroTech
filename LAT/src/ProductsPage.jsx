import { useState } from "react";
import "./ProductsPage.css";
import logoImg from "./assets/logo.png";
import Header from "./Header";
import kingfolZincImg from "./assets/omex Kingfol zinc.png";
import foliarBoronImg from "./assets/omex foliar boron.png";
import cabLowImg from "./assets/omex cab low.png";
import threeXImg from "./assets/omex 3x.png";
import c1 from "./assets/c1.png";
import c2 from "./assets/c2.png";
import c3 from "./assets/c3.png";
import c4 from "./assets/c4.png";
import c5 from "./assets/c5.png";
import c6 from "./assets/c6.png";
import m from "./assets/micro.png"
import oa from "./assets/oa.png";
import od from "./assets/od.png";


// ---- MOCK DATA: edit names/features here, add `image: yourImportedImg` per product when ready ----
const categories = [
  {
    slug: "suspension-liquid",
    name: "Suspension Liquid Fertilizer",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7ed957" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.31" /><path d="M14 9.3V1.99" /><path d="M8.5 2h7" /><path d="M14 9.3a6.5 6.5 0 1 1-4 0" /><path d="M5.52 16h12.96" /></svg>,
    desc: "Premium liquid formulations for immediate nutrient availability and easy application.",
    products: [
      {
        name: "Omex Bio-20",
        image: c1,
        features: ["Enhances plant growth", "Improves stress tolerance", "Promotes natural plant health"],
        desc: "A concentrated, premium foliar nutrition solution and biostimulant engineered to maximize crop yields and help crops recover rapidly from environmental stress.",
        composition: [
          { element: "Total Nitrogen (N)", value: "20.00%" },
          { element: "Available Phosphorus (P₂O₅)", value: "20.00%" },
          { element: "Soluble Potassium (K₂O)", value: "20.00%" },
          { element: "Magnesium (MgO)", value: "1.50%" },
          { element: "Iron (Fe)", value: "0.15%" },
          { element: "Zinc (Zn)", value: "0.07%" },
          { element: "Copper (Cu)", value: "0.07%" },
          { element: "Manganese (Mn)", value: "0.073%" },
          { element: "Boron (B)", value: "0.029%" },
          { element: "Cobalt (Co)", value: "0.0012%" },
          { element: "Molybdenum (Mo)", value: "0.0012%" },
          { element: "Organic Matter", value: "28.00%" }
        ]
      },
      {
        name: "Omex CalMax Gold",
        image: c6,
        features: ["Advanced calcium bio-stimulant", "Strengthens cell walls", "Improves fruit quality"],
        desc: "A next-generation, water-soluble suspension foliar fertilizer and advanced calcium bio-stimulant providing a balanced intake of calcium.",
        composition: [
          { element: "Total Nitrogen (N)", value: "16.00%" },
          { element: "Calcium (CaO)", value: "24.00%" },
          { element: "Magnesium (MgO)", value: "3.20%" },
          { element: "Manganese (Mn)", value: "0.16%" },
          { element: "Iron (Fe)", value: "0.16%" },
          { element: "Boron (B)", value: "0.08%" },
          { element: "Copper (Cu)", value: "0.08%" },
          { element: "Zinc (Zn)", value: "0.08%" },
          { element: "Molybdenum (Mo)", value: "0.0016%" },
          { element: "Amino Acids", value: "9.00%" }
        ]
      },
      {
        name: "Omex K41",
        image: c4,
        features: ["High Potassium formula", "Improves fruit size and quality", "Enhances plant strength"],
        desc: "A potassium-rich liquid feed formulated to strengthen crops during flowering and fruiting stages.",
        composition: [
          { element: "Total Nitrogen (N)", value: "3.00%" },
          { element: "Soluble Potassium (K₂O)", value: "41.00%" },
          { element: "Magnesium (MgO)", value: "2.50%" },
          { element: "Sulphur (S)", value: "7.30%" },
          { element: "EDTA", value: "3.00%" }
        ]
      },
      {
        name: "Micromax",
        image: m,
        features: ["Balanced micronutrients", "Prevents deficiencies", "Improves overall health"],
        desc: "A highly concentrated micronutrient blend to support essential plant processes.",
        composition: [
          { element: "Iron (Fe)", value: "2.60%" },
          { element: "Zinc (Zn)", value: "2.60%" },
          { element: "Manganese (Mn)", value: "1.95%" },
          { element: "Boron (B)", value: "1.00%" },
          { element: "Copper (Cu)", value: "0.33%" },
          { element: "Molybdenum (Mo)", value: "0.03%" },
          { element: "Magnesium (MgO)", value: "1.30%" },
          { element: "Sulphur (S)", value: "1.82%" }
        ]
      },
      {
        name: "Omex CaB Low",
        image: cabLowImg,
        features: ["Calcium-boron combination", "Strengthens cell structure", "Improves nutrient uptake"],
        desc: "A combined calcium-boron liquid feed formulated to support strong cell development and correct dual deficiencies together.",
        composition: [
          { element: "Calcium (Ca)", value: "15.00%" },
          { element: "Boron (B)", value: "3.00%" },
          { element: "Total Nitrogen (N)", value: "12.00%" }
        ]
      },
      {
        name: "Omex Foliar Boron",
        image: foliarBoronImg,
        features: ["Prevents boron deficiency", "Improves flowering", "Supports fruit set"],
        desc: "A highly specialized, fully water-soluble liquid fertilizer designed to prevent and correct boron deficiencies.",
        composition: [
          { element: "Boron (B)", value: "15.00%" },
          { element: "Total Nitrogen (N)", value: "6.50%" }
        ]
      },
      {
        name: "Omex Kingfol Zinc",
        image: kingfolZincImg,
        features: ["Corrects zinc deficiency", "Supports enzyme activity", "Improves crop vigor"],
        desc: "A highly concentrated, single-element zinc formulation designed to correct zinc deficiency quickly.",
        composition: [
          { element: "Zinc (Zn)", value: "70.00%" },
          { element: "Total Nitrogen (N)", value: "1.70%" }
        ]
      },
      {
        name: "Omex 3X",
        image: threeXImg,
        features: ["Powerful 3X formula", "Enhances growth and vitality", "Improves yield and quality"],
        desc: "A triple-strength nutrient solution designed for rapid correction of multiple deficiencies in a single application.",
        composition: [
          { element: "Total Nitrogen (N)", value: "24.00%" },
          { element: "Available Phosphorus (P₂O₅)", value: "24.00%" },
          { element: "Soluble Potassium (K₂O)", value: "18.00%" },
          { element: "Magnesium (MgO)", value: "0.078%" },
          { element: "Iron (Fe)", value: "0.162%" },
          { element: "Manganese (Mn)", value: "0.081%" },
          { element: "Copper (Cu)", value: "0.161%" },
          { element: "Zinc (Zn)", value: "0.081%" },
          { element: "Boron (B)", value: "0.031%" },
          { element: "Cobalt (Co)", value: "0.0010%" },
          { element: "Molybdenum (Mo)", value: "0.0012%" }
        ]
      },
    ],
  },
  {
    slug: "suspension-powder",
    name: "Suspension Powder Fertilizer",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7ed957" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>,
    desc: "Highly soluble powder formulations for maximum concentration and extended shelf life.",
    products: [
      {
        name: "Omex Albert Solution",
        image: c3,
        features: ["Balanced foliar nutrition", "Supports overall plant health", "Improves crop performance"],
        desc: "A balanced multi-nutrient foliar feed designed to correct deficiencies quickly and support steady, healthy crop growth.",
        composition: [
          { element: "Total Nitrogen (N)", value: "11.50%" },
          { element: "Available Phosphorus (P₂O₅)", value: "9.00%" },
          { element: "Soluble Potassium (K₂O)", value: "16.00%" },
          { element: "Magnesium (MgO)", value: "1.60%" },
          { element: "Calcium (CaO)", value: "13.00%" },
          { element: "Sulphur (S)", value: "2.30%" },
          { element: "Copper (Cu)", value: "35 mg/kg" },
          { element: "Zinc (Zn)", value: "150 mg/kg" },
          { element: "Iron (Fe)", value: "660 mg/kg" },
          { element: "Boron (B)", value: "35 mg/kg" },
          { element: "Manganese (Mn)", value: "130 mg/kg" },
          { element: "Molybdenum (Mo)", value: "20 mg/kg" }
        ]
      },
      {
        name: "OMEX ADVANCE",
        image: oa,
        features: ["Advanced nutrient blend", "Promotes vigorous growth", "High solubility"],
        desc: "A specialized powder formulation providing a complete nutritional package for demanding crops.",
        composition: [
          { element: "Available Phosphorus (P₂O₅)", value: "40.00%" },
          { element: "Soluble Potassium (K₂O)", value: "39.00%" },
          { element: "Magnesium (MgO)", value: "863 mg/kg" },
          { element: "Iron (Fe-EDTA)", value: "660 mg/kg" }
        ]
      },
      {
        name: "Omex 14.48.00 (OMEX GOLD)",
        image: c5,
        features: ["High phosphorus starter", "Boosts root development", "Supports early establishment"],
        desc: "A high-phosphorus starter formulation ideal for root development and early crop establishment.",
        composition: [
          { element: "Total Nitrogen (N)", value: "14.00%" },
          { element: "Available Phosphorus (P₂O₅)", value: "48.00%" },
          { element: "Sulphur (SO₃)", value: "10.90%" },
          { element: "Boron (B)", value: "22 mg/kg" },
          { element: "Copper (Cu-EDTA)", value: "16 mg/kg" },
          { element: "Iron (Fe-EDTA)", value: "70 mg/kg" },
          { element: "Manganese (Mn-EDTA)", value: "42 mg/kg" },
          { element: "Molybdenum (Mo)", value: "16 mg/kg" },
          { element: "Zinc (Zn-EDTA)", value: "15 mg/kg" }
        ]
      },
      {
        name: "OMEX DELIGHT",
        image: od,
        features: ["Premium crop nutrition", "Enhances fruit quality", "Improves color and flavor"],
        desc: "Formulated specifically to improve the final quality, color, and taste of high-value crops.",
        composition: [
          { element: "Available Phosphorus (P₂O₅)", value: "9.00%" },
          { element: "Soluble Potassium (K₂O)", value: "46.00%" }
        ]
      },
      {
        name: "Omex Premium",
        image: c2,
        features: ["Premium quality formula", "Improves flowering and fruit set", "Increases yield and quality"],
        desc: "A premium-grade foliar formulation offering enhanced nutrient uptake for demanding, high-value crops.",
        composition: [
          { element: "Available Phosphorus (P₂O₅)", value: "40.00%" },
          { element: "Soluble Potassium (K₂O)", value: "37.00%" },
          { element: "Magnesium (MgO)", value: "0.17%" },
          { element: "Iron (Fe)", value: "71 mg/kg" },
          { element: "Zinc (Zn)", value: "15 mg/kg" },
          { element: "Copper (Cu)", value: "16 mg/kg" },
          { element: "Manganese (Mn)", value: "43 mg/kg" },
          { element: "Boron (B)", value: "22 mg/kg" },
          { element: "Molybdenum (Mo)", value: "16 mg/kg" }
        ]
      },
    ],
  },
];

function ProductsPage({ onBack, initialSlug, navigateTo }) {
  const [activeSlug, setActiveSlug] = useState(initialSlug || "all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCategoryClick = (slug) => {
    setActiveSlug(activeSlug === slug ? "all" : slug);
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        document.querySelector('.grid-area')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  let activeCategory;
  if (activeSlug === "all") {
    activeCategory = {
      name: "All Products",
      desc: "Explore our complete range of high-quality agricultural products.",
      products: categories.reduce((acc, cat) => [...acc, ...cat.products], [])
    };
  } else {
    activeCategory = categories.find((c) => c.slug === activeSlug) || categories[0];
  }

  return (
    <div className="products-page">
      <div className="breadcrumb">
        <button onClick={onBack} className="crumb-home" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>← BACK</button>
      </div>

      <div className="products-layout">
        {/* ---------- SIDEBAR ---------- */}
        <aside className="sidebar">
          <h3>Product Range</h3>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              className={`sidebar-item ${cat.slug === activeSlug ? "active" : ""}`}
              onClick={() => handleCategoryClick(cat.slug)}
            >
              <span className="sidebar-icon">{cat.icon}</span>
              <span className="sidebar-text">
                <span className="sidebar-name">{cat.name}</span>
                <span className="sidebar-count">{cat.products.length} Product{cat.products.length > 1 ? "s" : ""}</span>
              </span>
              <span className="sidebar-arrow">›</span>
            </button>
          ))}
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
              <div className="pg-card" key={p.name} onClick={() => setSelectedProduct(p)}>
                <div className="pg-img">
                  {p.image ? (
                    <img src={p.image} alt={p.name} />
                  ) : (
                    <span className="pg-img-placeholder">Image</span>
                  )}
                </div>
                <div className="pg-body">
                  <h3>{p.name} <span className="pg-arrow">→</span></h3>
                </div>
              </div>
            ))}
          </div>

        </main>
      </div>

      <div className="trust-row-wrapper">
        <div className="trust-row">
          <div className="trust-item">
            <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7ed957" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg></span>
            <div>
              <h5>Quality Assured</h5>
              <p>Tested &amp; trusted for best results</p>
            </div>
          </div>
          <div className="trust-item">
            <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7ed957" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg></span>
            <div>
              <h5>Safe for Crops</h5>
              <p>Eco-friendly &amp; safe for all crops</p>
            </div>
          </div>
          <div className="trust-item">
            <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7ed957" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.31" /><path d="M14 9.3V1.99" /><path d="M8.5 2h7" /><path d="M14 9.3a6.5 6.5 0 1 1-4 0" /><path d="M5.52 16h12.96" /></svg></span>
            <div>
              <h5>Advanced Formula</h5>
              <p>Scientifically formulated for better absorption</p>
            </div>
          </div>
          <div className="trust-item">
            <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7ed957" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg></span>
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
              <ul className="modal-features-list">
                {selectedProduct.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              {selectedProduct.composition && selectedProduct.composition.length > 0 && (
                <div className="composition-table-container">
                  <h4>Composition</h4>
                  <table className="composition-table">
                    <thead>
                      <tr>
                        <th>Element</th>
                        <th>Wt/Wt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProduct.composition.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.element}</td>
                          <td>{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <button className="btn btn-primary" onClick={() => navigateTo("contact", null, `I am interested in ${selectedProduct.name}. Please provide more details.`)}>Enquire Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;