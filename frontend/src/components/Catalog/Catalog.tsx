import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUpperwearItems } from '../../services/catalogueService';
import { getRecipient } from '../../services/api';
import ItemList from './ItemList';
import ItemInformation from './ItemInformation';
import FilterMenu from './FilterMenu';
import { CatalogItem } from '../../models/CatalogItem';
import "../../style.scss";
import { product, slide } from '../Interfaces/Item';

interface CatalogProps {
  setItem: React.Dispatch<React.SetStateAction<any>>;
}

const Catalog: React.FC<CatalogProps> = ({ setItem }) => {
  const { recipientId } = useParams<{ recipientId: string }>();
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<CatalogItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [styling, setStyling] = useState(false);
  const navigate = useNavigate();
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);
  const [filters, setFilters] = useState({
    gender: '',
    ageGroup: [],
    styles: '',
    sizes: [],
    fit: '',
    season: [],
  });

  const handleAddToCart = () => {
    setItem(filteredItems[activeIndex]);
    setStyling(true);
  }

  useEffect(() => {
    if (styling) {
      navigate(`/styling/${recipientId}`);
    }
  }, [styling, navigate]);

  useEffect(() => {
    console.log("Current filters:", filters);
  }, [filters]);
  
  useEffect(() => {
    console.log("Items before filtering:", items);
  }, [items]);
  
  useEffect(() => {
    console.log("Items after filtering:", filteredItems);
  }, [filteredItems]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [catalogData, recipientData] = await Promise.all([
          getUpperwearItems(),
          getRecipient(recipientId!)
        ]);
    
        console.log("Fetched catalog data:", catalogData);
        console.log("Fetched recipient data:", recipientData);
    
        if (catalogData.length === 0) {
          setError('No items found in the catalog.');
        } else {
          const filteredCatalogData = catalogData.filter((item: CatalogItem) => item.fields.Name !== undefined);
          console.log("Filtered catalog data:", filteredCatalogData);
          setItems(filteredCatalogData);
          setFilters({
            gender: recipientData.gender || '',
            ageGroup: recipientData.ageGroup || [],
            styles: recipientData.likedStyles?.[0] || '',
            sizes: recipientData.preferredSizes || [],
            fit: '',
            season: [],
          });
        }
      } catch (error) {
        setError('Error fetching data.');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [recipientId]);

  useEffect(() => {
  const applyFilters = () => {
    console.log("Applying filters:", filters);
    console.log("Total items before filtering:", items.length);
    
    const filtered = items.filter(item => {
      const matchesFilter = (
        (filters.gender === '' || item.fields.Gender?.toUpperCase() === filters.gender.toUpperCase()) &&
        (filters.ageGroup.length === 0 || (item.fields['Age Group'] && filters.ageGroup.some(age => item.fields['Age Group']!.includes(age)))) &&
        (filters.styles === '' || item.fields.Styles === filters.styles) &&
        (filters.sizes.length === 0 || (item.fields['Size (General)'] && filters.sizes.some(size => item.fields['Size (General)']!.includes(size)))) &&
        (filters.fit === '' || item.fields['Fit (Detailed)'] === filters.fit) &&
        (filters.season.length === 0 || (item.fields.Season && filters.season.some(season => item.fields.Season!.includes(season))))
      );
      
      if(!(filters.ageGroup.length === 0 || (item.fields['Age Group'] && filters.ageGroup.some(age => item.fields['Age Group']!.includes(age))))) console.log(item.fields['Age Group'], " ", filters.ageGroup);
      if(!(filters.styles === '' || item.fields.Styles === filters.styles)) console.log(item.fields.Styles, " ", filters.styles);
      if(!(filters.sizes.length === 0 || (item.fields['Size (General)'] && filters.sizes.some(size => item.fields['Size (General)']!.includes(size)))) ) console.log(item.fields['Size (General)'], " ", filters.sizes);
      if(!(filters.fit === '' || item.fields['Fit (Detailed)'] === filters.fit)) console.log(item.fields['Fit (Detailed)'], " ", filters.fit);
      if(!(filters.season.length === 0 || (item.fields.Season && filters.season.some(season => item.fields.Season!.includes(season)))) ) console.log(item.fields.Season, " ", filters.season);
      
      if (!matchesFilter) {
        console.log("Item filtered out:", item.fields.Name);
      }
      
      return matchesFilter;
    });
    
    console.log("Total items after filtering:", filtered.length);
    setFilteredItems(filtered);
  };

  applyFilters();
}, [items, filters]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  const upperwearSlides: slide[] = filteredItems.map(item => ({
    image: item.fields.Model?.[0].url || '',
    name: item.fields.Name || ''
  }));

  const productSlides: product[] = filteredItems.map(item => ({
    imageUrl: item.fields.Front?.[0].url || '',
    price: item.fields.Price || '',
    title: item.fields.Name || ''
  }));

  return (
    <div className="flex h-screen w-screen bg-white">
      <FilterMenu 
        filters={filters}
        onFilterChange={setFilters}
      />
      {/* Left Component - 2/3 of the screen */}
      <div className="basis-2/3 container mx-auto overflow-hidden">
        {filteredItems.length > 0 ? (
          <ItemList 
            name="upperwear" 
            items={upperwearSlides} 
            activeIndex={activeIndex} 
            setActiveIndex={setActiveIndex} 
            height={500} 
            controlledSwiper={secondSwiper}
            setControlledSwiper={setFirstSwiper}
          />
        ) : (
          <div>No items match the current filters</div>
        )}
      </div>
      {/* Right Component - 1/3 of the screen */}
      <div className="basis-1/3 container mx-auto overflow-hidden">
        {filteredItems.length > 0 ? (
          <ItemInformation
            items={productSlides}
            onClick={handleAddToCart}
            controlledSwiper={firstSwiper}
            setControlledSwiper={setSecondSwiper}
            setActiveIndex={setActiveIndex}
          />
        ) : (
          <div>No item information available</div>
        )}
      </div>
    </div>
  );
};

export default Catalog;