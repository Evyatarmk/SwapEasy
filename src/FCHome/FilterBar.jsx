import React, { useContext, useEffect, useState } from 'react';
import "../CSS/FilterBar.css";
import Select from 'react-select';
import { AllAdsContext } from '../FCglobal/ContextAllAds';

export default function FilterBar(props) {
  const { allAds } = useContext(AllAdsContext);
  const categories = [...new Set(allAds.map(ad=>ad.category))];
   const [selectedCategory, setSelectedCategory] = useState(categories[categories.length-1]);
   useEffect(() => {
    const filteredAds = allAds.filter((ad) => ad.category === selectedCategory);
    props.sendAdsToParent(filteredAds); // Send filtered ads to the parent
   },[])
   
   const handleCategoryChange = (category) => {
      setSelectedCategory(category);
      let adsToSend = allAds.filter((ad) => ad.category === category); // Use strict equality (===)
      // Send the filtered ads to the parent component
      props.sendAdsToParent(adsToSend);
    };
  
  const [filters, setFilters] = useState({
    city: "",
    saleType: "",
    minPrice: "",
    maxPrice: "",
    condition: "",
    search: "",
  });
  const [selectedCities, setSelectedCities] = useState([]);

  const cityOptions = [
    { value: 'tel-aviv', label: 'תל אביב' },
    { value: 'jerusalem', label: 'ירושלים' },
    { value: 'haifa', label: 'חיפה' },
    { value: 'beer-sheva', label: 'באר שבע' },
    { value: 'eilat', label: 'אילת' },
  ];
  const conditionOptions = [
    { value: 'new-in-box', label: 'חדש באריזה' },
    { value: 'like-new', label: 'כמו חדש' },
    { value: 'used', label: 'משומש' },
    { value: 'needs-repair', label: 'נדרש תיקון' },
    { value: 'irrelevant', label: 'לא רלוונטי' },
  ];
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    onFilterChange({ ...filters, [name]: value });
  };
  const handleCityChange = (selectedOptions) => {
    setSelectedCities(selectedOptions || []);
  } 
  const filterAds = () => {
   
  };

  
  return (
     <>
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
    <div className="filter-bar">
      <Select
       isMulti
       styles={customStyles}
       options={cityOptions}
       placeholder="בחר עיר"
       onChange={handleCityChange}
       >
      </Select>

     

      <div className="price-filter">
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleInputChange}
          placeholder="מחיר מינימום"
          className="filter-input"
          />
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleInputChange}
          placeholder="מחיר מקסימום"
          className="filter-input"
          />
      </div>

      <Select
       isMulti
       styles={customStyles}
       options={conditionOptions}
       placeholder="בחר מצב מוצר"
       onChange={handleCityChange}
       >
      </Select>

      <input
        type="text"
        name="search"
        value={filters.search}
        onChange={handleInputChange}
        placeholder="חיפוש חופשי"
        className="filter-input"
        />
      <button className='filter-button' onClick={filterAds}>
        סנן
      </button>
    </div>
</>
  );
}
const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#f9f9f9',
    border: '1px solid #d68e00',
    borderRadius: '8px',
    boxShadow: 'none',
    padding: '5px',
    fontSize: '1rem',
    width: '100%', /* רוחב קבוע */
    minWidth: '200px', /* רוחב מינימלי */
    maxWidth: '400px', /* רוחב מקסימלי */
    margin: '0 auto', /* מרכז את ה-Select */
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '1px solid #ddd',
    zIndex: 1000,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#d68e00'
      : state.isFocused
      ? '#f1f1f1'
      : '#fff',
    color: state.isSelected ? '#fff' : '#333',
    padding: '10px',
    cursor: 'pointer',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#444',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#aaa',
    fontSize: '0.9rem',
  }),
  multiValue: (provided) => ({
      ...provided,  
      backgroundColor:'rgba(214, 143, 0, 0.36)' ,
    }),
    
};