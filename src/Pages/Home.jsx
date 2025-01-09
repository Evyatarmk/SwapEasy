import React, { useState } from 'react';
import Slider from 'react-slick';
import '../CSS/Home.css'; // כל הסגנונות יהיו כאן
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// קובץ React שמציג את הקרוסלה
const products = [
  { id: 1, title: 'מוצר 1', image: 'path_to_image_1.jpg', price: '₪100' },
  { id: 2, title: 'מוצר 2', image: 'path_to_image_2.jpg', price: '₪200' },
  { id: 3, title: 'מוצר 3', image: 'path_to_image_3.jpg', price: '₪300' },
  // הוסף עוד מוצרים כאן
];

const settings = {
  arrows:true,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  
};
export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['רכב', 'דירות', 'טכנולוגיה', 'חיות מחמד'];

  const productsByCategory = {
    רכב: products.filter(product => product.title.includes('רכב')),
    דירות: products.filter(product => product.title.includes('דירות')),
    טכנולוגיה: products.filter(product => product.title.includes('טכנולוגיה')),
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="home-container">
      {/* קרוסלה */}
      <h2>הקרוסלה של מוצרים</h2>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="product-slide">
            <h3>{product.title}</h3>
            <p>{product.price}</p>
          </div>
        ))}
      </Slider>

      {/* סרגל קטגוריות */}
      <h2>בחר קטגוריה</h2>
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

      {/* רשימת מוצרים לפי הקטגוריה */}
      <h2>מוצרים בקטגוריה: {selectedCategory}</h2>
      <div className="product-list">
        {selectedCategory && productsByCategory[selectedCategory].map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.title} className="product-image" />
            <h3>{product.title}</h3>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
