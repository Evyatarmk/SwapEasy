import React, { useContext, useState } from 'react';
import { AllAdsContext } from '../FCglobal/ContextAllAds';
import Slider from 'react-slick';
import '../CSS/Home.css'; // כל הסגנונות יהיו כאן
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AdDisplay from '../FCglobal/AdDisplay';
import FilterBar from '../FCHome/FilterBar';



const settings = {
  arrows: true,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
};
export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('');
    const { allAds } = useContext(AllAdsContext);
  
  const categories = [...new Set(allAds.map(ad=>ad.category))];
  console.log(categories)

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="home-container">
      <Slider {...settings}>
        {allAds.map((ad) => (
          <AdDisplay ad={ad} />
        ))}
      </Slider>

      {/* סרגל קטגוריות */}
      <div className="category-bar">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'selected' : ''}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {/* סרגל סינון */}
    <FilterBar/>

      {/* רשימת מוצרים לפי הקטגוריה */}
      <div className="product-list">
        {selectedCategory && allAds.filter((ad) => ad.category === selectedCategory).map((ad) => (
          <AdDisplay ad={ad} key={ad.id} />
        ))}
      </div>
    </div>
  );
}
