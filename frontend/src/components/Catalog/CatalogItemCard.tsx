import React from 'react';

interface CatalogItemCardProps {
  title: string;
  price: string;
  imageUrl: string;
  onAddToCart: () => void;
}

const CatalogItemCard: React.FC<CatalogItemCardProps> = ({ title, price, imageUrl, onAddToCart }) => {
  return (
    //I want to create a card that displays the title, price, and image of a product. The card should have a button that when clicked, calls the onAddToCart function.
    //I want the image to be transparent and centered in the container. The title and price should be displayed underneath the image.
    <div className="flex flex-col items-center justify-center p-4">
      <img src={imageUrl} alt={title} className="w-48 h-48 object-contain" />
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm">{price}</p>
      <button className="bg-blue-500 text-white px-4 py-2 mt-4" onClick={onAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default CatalogItemCard;
