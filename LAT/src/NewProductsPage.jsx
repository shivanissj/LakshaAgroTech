import { useState, useEffect } from "react";
import ProductsPage from "./ProductsPage";
import TechshaPage from "./TechshaPage";
import "./NewProductsPage.css";

import omexHero from "./assets/omex.png";
import techshaHero from "./assets/techsha.png";

export default function NewProductsPage({ initialSlug, initialTab = null, onBack, navigateTo }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  if (activeTab === 'omex') {
    return <ProductsPage onBack={() => setActiveTab(null)} navigateTo={navigateTo} />;
  }
  
  if (activeTab === 'techsha') {
    return (
      <div className="products-page">
         <div className="breadcrumb" style={{ marginBottom: 0 }}>
           <button onClick={() => setActiveTab(null)} className="crumb-home" style={{background:'none',border:'none',cursor:'pointer',fontSize:'14px',color:'#8fa389',display:'flex',alignItems:'center',gap:'5px'}}>← BACK</button>
         </div>
         <TechshaPage hideHero={true} navigateTo={navigateTo} />
      </div>
    );
  }

  return (
    <div className="new-products-page">
      <h1 style={{ textAlign: 'center', color: '#fff', marginBottom: '40px', fontSize: '2.5rem' }}>Our Products</h1>
      
      <div className="np-cards-container">
        
        {/* Omex Card */}
        <div className="np-card" onClick={() => setActiveTab('omex')}>
           <div className="np-card-img-wrap">
             <img src={omexHero} alt="Omex" className="np-card-img" />
           </div>
           <div className="np-card-content">
             <h2>Omex</h2>
             <p>Explore our wide range of Omex foliar, micronutrient, and NPK fertilizers.</p>
             <span className="np-arrow">→</span>
           </div>
        </div>

        {/* Techsha Card */}
        <div className="np-card" onClick={() => setActiveTab('techsha')}>
           <div className="np-card-img-wrap">
             <img src={techshaHero} alt="Techsha" className="np-card-img" />
           </div>
           <div className="np-card-content">
             <h2>Techsha</h2>
             <p>Discover our specialty water soluble and suspension fertilizers.</p>
             <span className="np-arrow">→</span>
           </div>
        </div>

      </div>
    </div>
  );
}
