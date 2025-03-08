import { motion } from "framer-motion";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import Button from "../button/Button";
import { Link } from "react-router-dom";

// Định nghĩa interface cho Product
type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: boolean;
  image: string;
  description: string;
  long_description: string;
  slug: string;
  product_images: { imgname: string }[];
  sold: number;
  stock: number;
  rating: number;
  category: string; // Missing property
  isNew: boolean; // Missing property
  isBestSeller: boolean; // Missing property
  isDiscounted: boolean; // Missing property
};

// Interface cho Props
interface ProductCardProps {
  product: Product;
  onAddToCart: (id: number) => void;
  onViewDetails: (id: number) => void;
}

const Card: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white text-gray-900 rounded-2xl shadow-lg p-5 flex flex-col items-center space-y-4 transition-all duration-300 hover:shadow-2xl "
    >
      <motion.img
        src={product.image}
        alt={product.name}
        className="w-52 h-52 object-cover rounded-xl shadow-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <h3 className="text-lg font-bold text-center">{product.name}</h3>
      <p className="text-gray-600 text-sm text-center px-2">{product.description}</p>

      <div className="flex items-center justify-between w-full px-4">
        <span className="text-xl font-semibold text-blue-500">${product.price?.toFixed(2)}</span>
        <div className="flex items-center text-yellow-500">
          <FaStar className="mr-1" />
          <span className="font-semibold">{product.rating?.toFixed(1)}</span>
        </div>
      </div>

      <div className="flex justify-between w-full text-gray-500 text-sm px-4">
        <span>Sold: {product.sold}</span>
        <span>Stock: {product.stock}</span>
      </div>

      <div className="flex space-x-4 w-full mt-2">
        <Link to={`/products/${product.id}`} className="w-full">
          <Button className="bg-blue-500 text-white px-4 py-2 w-full rounded-lg shadow-md transition hover:bg-blue-600">
            View Details
          </Button>
        </Link>
        <button
          onClick={() => onAddToCart(product.id)}
          className="bg-yellow-400 text-black p-3 rounded-lg shadow-md transition hover:bg-yellow-500"
        >
          <FaShoppingCart size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default Card;