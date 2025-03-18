import React, { useState, useEffect } from "react";
import { Product } from "~/constance/seed/product";

type ProductImagesProps = {
  product: Product;
};

export const ProductImages: React.FC<ProductImagesProps> = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % product.product_images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [product.product_images]);

  return (
    <div className="w-full md:w-1/2">
      <img
        src={product.product_images[currentImage]?.imgname}
        alt={product.name}
        className="w-full h-96 object-cover rounded-lg"
      />
    </div>
  );
};