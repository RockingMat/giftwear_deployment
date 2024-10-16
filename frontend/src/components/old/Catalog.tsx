// src/components/Catalog.tsx

// import React, { useEffect, useState } from 'react';
// import { getCatalogueItems } from '../services/catalogueService';
// import './Catalog.css'; // Import the CSS file

// const Catalog: React.FC = () => {
//   const [catalogItems, setCatalogItems] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCatalogData = async () => {
//       try {
//         const data = await getCatalogueItems();
//         if (data.length === 0) {
//           setError('No items found in the catalog.');
//         } else {
//           setCatalogItems(data);
//         }
//       } catch (error) {
//         setError('Error fetching catalog data.');
//         console.error('Error:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCatalogData();
//   }, []);

//   if (loading) return <div className="loading">Loading...</div>;

//   if (error) return <div className="error">{error}</div>;

//   return (
//     <div className="catalog-container">
//       <h1 className="catalog-title">Catalog</h1>
//       {catalogItems.length > 0 ? (
//         <div className="catalog-grid">
//           {catalogItems.map((item, index) => (
//             <div key={index} className="catalog-item">
//               {item.fields.Image && item.fields.Image.length > 0 ? (
//                 <img src={item.fields.Image[0].url} alt={item.fields['Item Name']} className="catalog-item-image" />
//               ) : (
//                 <div className="no-image">No image available</div>
//               )}
//               <h2 className="catalog-item-title">{item.fields['Item Name']}</h2>
//               <p className="catalog-item-price">Price: ${item.fields.Price}</p>
//               <p className="catalog-item-category">Category: {item.fields.Category}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="no-items">No catalog items available.</div>
//       )}
//     </div>
//   );
// };

// export default Catalog;
