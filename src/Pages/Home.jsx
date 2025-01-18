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
  infinite: true,
  speed: 500,
  slidesToShow: 2,
};
export default function Home() {
  const [adsToShow, setAdsToShow] = useState();
  const updateAdsToShow = (ads) => {
    setAdsToShow(ads)
  }
  const { allAds } = useContext(AllAdsContext);
   

return (
  <div className="home-container">
    <Slider {...settings}>
      {allAds.map((ad) => (
        <AdDisplay ad={ad} key={ad.id} />
      ))}
    </Slider>

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
