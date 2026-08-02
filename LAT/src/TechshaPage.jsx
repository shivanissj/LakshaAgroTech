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
import orangePackImg from "./assets/orangepack.png";
import pinkBagImg from "./assets/pinkbag.png";
import greenBagImg from "./assets/greenbag.png";
import blueBagImg from "./assets/bluebag.png";
import growfertImg from "./assets/growfert.png";
import pottasiumImg from "./assets/pottasium.png";

/* ------------------------------------------------------------------
   DATA
   (img: null means no product photo yet -> falls back to text thumb)
------------------------------------------------------------------ */

const categories = [
  { icon: "WS", name: "Water Soluble Fertilizers", count: 9 },
  { icon: "SF", name: "Suspension Fertilizers", count: 6 },
  { icon: "Zn", name: "Micronutrient Fertilizers", count: 1 },
  { icon: "K", name: "Potassium Humate", count: 1 },
  { icon: "B", name: "Boron 20%", count: 1 },
];

const waterSoluble = [
  { grade: "20-20-20 + TE", npk: "N 20% | P 20% | K 20%", desc: "Balanced NPK for all crops & growth stages.", img: blueBagImg, tag: "WATER SOLUBLE FERTILIZER" },
  { grade: "12-12-36 + TE", npk: "N 12% | P 12% | K 36%", desc: "High Potassium formula for fruit setting & quality.", img: greenBagImg, tag: "WATER SOLUBLE FERTILIZER" },
  { grade: "15-05-30 + TE", npk: "N 15% | P 05% | K 30%", desc: "For fruit set & maturity. Improves size & sweetness.", img: blueBagImg, tag: "WATER SOLUBLE FERTILIZER" },
  { grade: "21-21-21 + TE", npk: "N 21% | P 21% | K 21%", desc: "Balanced multipurpose fertilizer for all crops & stages.", img: greenBagImg, tag: "WATER SOLUBLE FERTILIZER" },
  { grade: "13-40-13", npk: "N 13% | P 40% | K 13%", desc: "Water soluble fertilizer for better yield & growth.", img: orangePackImg, tag: "WATER SOLUBLE FERTILIZER" },
  { grade: "19-19-19", npk: "N 19% | P 19% | K 19%", desc: "Balanced NPK for maximum yield in high production.", img: greenBagImg, tag: "WATER SOLUBLE FERTILIZER" },
  { grade: "MAP 12-61-00", npk: "N 12% | P 61% | K 00%", desc: "Mono Ammonium Phosphate for robust root development.", img: orangePackImg, tag: "WATER SOLUBLE FERTILIZER" },
  { grade: "MKP 00-52-34", npk: "P 52% | K 34%", desc: "Mono Potassium Phosphate for flowering & fruiting.", img: blueBagImg, tag: "WATER SOLUBLE FERTILIZER" },
  { grade: "Calcium Nitrate", npk: "N 15% | Ca 19%", desc: "Multi-purpose fertilizer, treats calcium & nitrogen deficiency.", img: pinkBagImg, tag: "WATER SOLUBLE FERTILIZER" },
];

const suspensionFertilizers = [
  { grade: "12-52-08 + TE", npk: "N 12% | P 52% | K 08%", tag: "High P & K Formula", img: blueBucketImg },
  { grade: "12-00-60 + TE", npk: "N 12% | K 60%", tag: "High Potassium", img: greenBucketImg },
  { grade: "00-52-34 + TE", npk: "P 52% | K 34%", tag: "High P & K", img: pinkBucketImg },
  { grade: "10-20-50 + TE", npk: "N 10% | P 20% | K 50%", tag: "Potassium Rich", img: blueBucketImg },
  { grade: "25-25-25 + TE", npk: "N 25% | P 25% | K 25%", tag: "Balanced Grade", img: greenBucketImg },
  { grade: "00-37-47 + TE", npk: "P 37% | K 47%", tag: "Phosphorus & Potash", img: pinkBucketImg },
];

const microCards = [
  {
    title: "GROWFERT",
    subtitle: "(Micro Nutrient Fertilizer)",
    desc:
      "Mix micro nutrient fertilizer for foliar and drip irrigation. Contains six micro nutrients like (Zn, Fe, Mg, Cu, B, Mo). It is highly water soluble.",
    extra: "Dosage: 5-10 Kg Field crops, 10-20 Kg Horti and plantation crops",
    image: growfertImg,
  },
  {
    title: "TECHSHA",
    subtitle: "(Super Pottasium Humate)",
    desc:
      "It is a concentrate Humi Acid Substance and 100% water soluble plant growth stimulant and soil conditioner.",
    extra:
      "Foliar Spray: 1 to 2 gm in 1 Litre water  •  Drip Irrigation: 2 to 3 Kgs per Acre  •  Soil Application: 3 to 5 Kgs per Acre",
    image: pottasiumImg,
  },
  {
    title: "TECHSHA (Boron 20%)",
    subtitle: "Di Sodium Octoborate Tetrahydrate",
    desc: "",
    extra:
      "Boron (as B), Min: 20.0%  •  Water Insoluble, Max: 1.0%  •  Lead (as Pb), Min: 0.003%  •  Cadmium (as Cd), Min: 0.0025%  •  Arsenic (as As), Min: 0.01%",
    image: null,
  },
];

const comparison = [
  { grade: "20-20-20 + TE", n: 20, p: 20, k: 20, benefit: "Balanced growth for all crops", app: "Foliar Spray / Fertigation" },
  { grade: "12-12-36 + TE", n: 12, p: 12, k: 36, benefit: "High Potassium for reproductive stage", app: "Foliar Spray / Fertigation" },
  { grade: "10-20-50 + TE", n: 10, p: 20, k: 50, benefit: "Fruit setting & development", app: "Foliar Spray / Fertigation" },
  { grade: "12-00-60 + TE", n: 12, p: "-", k: 60, benefit: "High Potassium for quality & yield", app: "Foliar Spray / Fertigation" },
  { grade: "00-37-47 + TE", n: "-", p: 37, k: 47, benefit: "Improves flowering & fruit quality", app: "Foliar Spray / Fertigation" },
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

export default function TechshaPage({ navigateTo }) {
  const catRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCat, setActiveCat] = useState("All");

  const scrollCats = (dir) => {
    if (catRef.current) catRef.current.scrollBy({ left: dir * 220, behavior: "smooth" });
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

      {/* ---------- CATEGORY CAROUSEL ---------- */}
      <section className="tp-categories">
        <button className="tp-scroll-btn tp-scroll-left" onClick={() => scrollCats(-1)} aria-label="Previous">‹</button>
        <div className="tp-category-track" ref={catRef}>
          {categories.map((cat, i) => (
            <div
              className={`tp-category-card ${activeCat === cat.name ? 'selected' : ''}`}
              key={cat.name}
              onClick={() => setActiveCat(activeCat === cat.name ? "All" : cat.name)}
            >
              <span className="tp-category-icon">{cat.icon}</span>
              <p className="tp-category-name">{cat.name}</p>
              <p className="tp-category-count">{cat.count} Product{cat.count > 1 ? "s" : ""}</p>
            </div>
          ))}
        </div>
        <button className="tp-scroll-btn tp-scroll-right" onClick={() => scrollCats(1)} aria-label="Next">›</button>
      </section>

      {/* ---------- WATER SOLUBLE FERTILIZERS ---------- */}
      {(activeCat === "All" || activeCat === "Water Soluble Fertilizers") && (
      <section className="tp-section" id="products">
        <div className="tp-section-head reveal reveal-up">
          <h2>WATER SOLUBLE FERTILIZERS</h2>
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

      {/* ---------- SUSPENSION FERTILIZERS ---------- */}
      {(activeCat === "All" || activeCat === "Suspension Fertilizers") && (
      <section className="tp-section tp-section-alt">
        <div className="tp-section-head reveal reveal-up">
          <h2>SUSPENSION FERTILIZERS</h2>
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
      {(activeCat === "All" || activeCat === "Micronutrient Fertilizers" || activeCat === "Potassium Humate" || activeCat === "Boron 20%") && (
      <section className="tp-section">
        <div className="tp-section-head reveal reveal-up">
          <h2>
            {activeCat === "All" ? "SPECIALTY PRODUCTS" : 
             activeCat === "Micronutrient Fertilizers" ? "MICRONUTRIENT FERTILIZERS" : 
             activeCat === "Potassium Humate" ? "POTASSIUM HUMATE" :
             activeCat === "Boron 20%" ? "BORON 20%" : ""}
          </h2>
        </div>
        <div className="tp-grid tp-grid-3">
          {microCards.filter(c => 
            activeCat === "All" || 
            (activeCat === "Micronutrient Fertilizers" && c.title === "GROWFERT") ||
            (activeCat === "Potassium Humate" && c.subtitle.includes("Super Pottasium")) ||
            (activeCat === "Boron 20%" && c.title.includes("Boron 20%"))
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

      {/* ---------- MANUFACTURING BANNER ---------- */}
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

      {/* ---------- PRODUCT DETAIL MODAL ---------- */}
      <ProductModal product={selectedProduct} onClose={closeModal} navigateTo={navigateTo} />
    </div>
  );
}