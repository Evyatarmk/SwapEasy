import React, { useState } from 'react';
import Slider from 'react-slick';
import '../CSS/Home.css'; // כל הסגנונות יהיו כאן
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AdDisplay from '../FCglobal/AdDisplay';



const settings = {
  arrows: true,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,

};
export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['רכב', 'דירות', 'טכנולוגיה',];
  const Ads = [
    { id: 1, title: 'מודעה 1', category: 'רכב', price: '₪50,000', image: "" },
    { id: 2, title: 'מודעה 2', category: 'דירות', price: '₪1,200,000', image: '' },
    { id: 3, title: 'מודעה 3', category: 'טכנולוגיה', price: '₪3,000', image: "" },
  ];


  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="home-container">
      <Slider {...settings}>
        {Ads.map((ad) => (
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
    

      {/* רשימת מוצרים לפי הקטגוריה */}
      <div className="product-list">
        {selectedCategory && Ads.filter((ad) => ad.category === selectedCategory).map((ad) => (
          <AdDisplay ad={ad} key={ad.id} />
        ))}
      </div>
    </div>
  );
}
