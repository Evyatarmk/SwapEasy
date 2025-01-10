import haertIcon from '../Icons/heart.png';
import heartEmptyIcon from '../Icons/heartEmpty.png';
import '../CSS/AdHomeDisplay.css'

export default function AdDisplay(props) {
  const ad = props.ad;
  return (
    <div className="container-ad" key={ad.id}>
      <div className="ad-info">
        <div className="ad-info-header">
          <img className="haert-button" src={heartEmptyIcon} />
          <p className="price">{ad.price}</p>
        </div>
        <h3>{ad.title}</h3>
        <p className="category">{ad.category}</p>
      </div>
      <img src={ad.image} className="ad-thumbnail" />
    </div>
  )
}

