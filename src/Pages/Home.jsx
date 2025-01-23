import React, { useContext, useState } from 'react';
import { AllAdsContext } from '../FCglobal/ContextAllAds';
import '../CSS/Home.css'; // כל הסגנונות יהיו כאן
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import AdDisplay from '../FCglobal/AdDisplay';
import FilterBar from '../FCHome/FilterBar';
import carPhoto from '../Photos/carPhoto.png';
import homePhoto from '../Photos/homePhoto.png';
import sofaPhoto from '../Photos/sofaPhoto.png';


const settings = {
  dots: true, // נקודות ניווט
  infinite: true, // לופ אינסופי
  speed: 500, // מהירות מעבר
  slidesToShow: 1, // מספר השקפים המוצגים
  slidesToScroll: 1, // מספר השקפים שגוללים בכל מעבר
  autoplay: true, // הפעלה אוטומטית
  autoplaySpeed: 3000, // מהירות ההפעלה האוטומטית (3 שניות)
  pauseOnHover: true, // עצירה בהצבעה על השקף
};
export default function Home() {
  const [adsToShow, setAdsToShow] = useState();
  const updateAdsToShow = (ads) => {
    setAdsToShow(ads)
  }
  const { allAds } = useContext(AllAdsContext);

return (
  <div className="home-container">
   <div className="home-container">
  <Slider {...settings}>
    <div>
      <img src={carPhoto} alt="Car photo" className="slider-image" />
    </div>
    <div>
      <img src={homePhoto} alt="Home photo" className="slider-image" />
    </div>
    <div>
      <img src={sofaPhoto} alt="Sofa photo" className="slider-image" />
    </div>
  </Slider>
</div>

    {/* סרגל סינון */}
    <FilterBar sendAdsToParent={updateAdsToShow} />

    {/* רשימת מוצרים לפי הקטגוריה */}
    <div className="product-list">
      {adsToShow && adsToShow.map((ad, index) => (
        <AdDisplay ad={ad} key={ad.id} />
      ))}
    </div>
  </div>
);
}
