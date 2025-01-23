import React, { useContext, useEffect, useState } from 'react';
import "../CSS/FilterBar.css";
import Select from 'react-select';
import { AllAdsContext } from '../FCglobal/ContextAllAds';
import { useCityContext } from '../FCglobal/CityProvider';

export default function FilterBar(props) {
  const { allAds, loading, error } = useContext(AllAdsContext);
  const categories = allAds.length > 0 ? [...new Set(allAds.map(ad => ad.category))] : [];
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || "");
  const { cities } = useCityContext(); // גישה לרשימת הערים דרך ה-Context

  // Hook to handle category change and send filtered ads to parent
  useEffect(() => {
    console.log("rrrrr")
    if (categories.length > 0 && selectedCategory) {
      const filteredAds = allAds.filter((ad) => ad.category === selectedCategory);
      props.sendAdsToParent(filteredAds); // Send filtered ads to the parent
    }
  }, [selectedCategory, allAds]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const adsToSend = allAds.filter((ad) => ad.category === category);
    props.sendAdsToParent(adsToSend);
  };

  const [filters, setFilters] = useState({
    Cities: [],
    saleType: "",
    minPrice: "",
    maxPrice: "",
    conditions: [],
    search: "",
  });

  const cityOptions = cities 
  ? [...cities.map((city) => ({ value: city, label: city }))]
  : [
      { value: "תל אביב", label: "תל אביב" },
      { value: "ירושלים", label: "ירושלים" },
      { value: "חיפה", label: "חיפה" },
      { value: "באר שבע", label: "באר שבע" },
      { value: "אילת", label: "אילת" },
    ];

  const conditionOptions = [
    { value: 'חדש באריזה', label: 'חדש באריזה' },
    { value: 'כמו חדש', label: 'כמו חדש' },
    { value: 'משומש', label: 'משומש' },
    { value: 'נדרש תיקון', label: 'נדרש תיקון' },
    { value: 'לא רלוונטי', label: 'לא רלוונטי' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setFilters({ ...filters, [name]: value });
  };

  const handleCityChange = (selectedOptions) => {
    let newSelectedOptions=selectedOptions.map(option=>option.value)
    let newFilters={...filters,Cities:[...newSelectedOptions]}
    setFilters(newFilters)
  } 
  const handleConditionChange = (selectedOptions) => {
    let newSelectedOptions=selectedOptions.map(option=>option.value)
    let newFilters={...filters,conditions:[...newSelectedOptions]}
    setFilters(newFilters)
  }

  const filterAds = () => {
    const filteredAds = allAds.filter((ad) => {
      // Check if category matches
      const isCategoryMatch = ad.category === selectedCategory;
  
      // Check if city matches (or if no cities are selected, include all)
      const isCityMatch =
        filters.Cities.length === 0 || filters.Cities.includes(ad.city);
  
      // Check if sale type matches (or if no sale type is selected, include all)
      const isSaleTypeMatch = 
        !filters.saleType || ad.saleType === filters.saleType;
  
      // Check if price is within range
      const isPriceMatch =
        (!filters.minPrice || ad.price >= parseFloat(filters.minPrice)) &&
        (!filters.maxPrice || ad.price <= parseFloat(filters.maxPrice));
  
      // Check if condition matches (or if no conditions are selected, include all)
      const isConditionMatch =
        filters.conditions.length === 0 || filters.conditions.includes(ad.condition);
      // Check if search term matches title or description
      const isSearchMatch = 
        !filters.search || 
        ad.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        ad.description.toLowerCase().includes(filters.search.toLowerCase());
  
      // Return ads that match all conditions
      return (
        isCategoryMatch &&
        isCityMatch &&
        isSaleTypeMatch &&
        isPriceMatch &&
        isConditionMatch &&
        isSearchMatch
      );
    });

    props.sendAdsToParent(filteredAds)
  }
  if (loading) {
    return <p>Loading ads...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
        />

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

        <Select
          isMulti
          styles={customStyles}
          options={conditionOptions}
          placeholder="בחר מצב מוצר"
          onChange={handleConditionChange}
        />

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
    backgroundColor: 'rgba(214, 143, 0, 0.36)',
  }),
};
