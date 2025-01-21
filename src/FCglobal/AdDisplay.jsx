import haertIcon from '../Icons/heart.png';
import heartEmptyIcon from '../Icons/heartEmpty.png';
import '../CSS/AdHomeDisplay.css'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './ContextUser';

export default function AdDisplay(props) {
  const ad = props.ad;
  const navigate = useNavigate();
  const { user ,deleteOrAddToUserSavedAds,updateUser} = useContext(UserContext);
 const addOrDeleteSaveAd=async(e)=>{
  e.stopPropagation();
  deleteOrAddToUserSavedAds(ad.id)
  try {
    const response = await fetch("https://ozshfkh0yg.execute-api.us-east-1.amazonaws.com/dev/User/SavedAds", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        adId: ad.id,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData.error);
      return errorData;
    }

    const result = await response.json();
    console.log("Success:", result);
    updateUser(result.user)
    return result;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }


 }
  const goToAdDetails=()=>{
    navigate(`/ad-details/${ad.id}`);
  }
  return (
    <div className="container-ad" key={ad.id} onClick={goToAdDetails}>
      <div className="ad-info">
        <div className="ad-info-header">
          <img onClick={addOrDeleteSaveAd} className="haert-button" src={user.savedAds.includes(ad.id)?haertIcon:heartEmptyIcon} />
          <p className="price">₪ {ad.price}</p>
        </div>
        <h3>{ad.title}</h3>
        <p className="category">{ad.category}</p>
      </div>
      <img src={ad.images[0]} className="ad-thumbnail" />
    </div>
  )
}

