import React, { useEffect, useState } from "react";
import { getCategories } from "~/api/category";
import { Category } from "~/types/category";

const ProductCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false); // Chỉ lưu trạng thái lỗi

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        console.log(data);
        setCategories(data);
      } catch (err) {
        setError(true); // Đánh dấu có lỗi nhưng không hiển thị lỗi
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-8 px-4 bg-gray-100">
      <div className="w-main mx-auto">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
          Product Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {loading || error
            ? // Skeleton loading khi đang tải hoặc khi có lỗi
              Array.from({ length: 20 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-4 text-center animate-pulse"
                >
                  <div className="w-14 h-14 bg-gray-300 rounded-full mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
                </div>
              ))
            : // Danh sách danh mục khi tải xong
              categories.map((category) => (
                <div
                  key={category.categoryId}
                  className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-transform transform hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label={category.categoryName}
                >
                  <div
                    style={{ backgroundColor: category.bgColor }}
                    className="w-14 h-14 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-2xl shadow-lg"
                  >
                    {category.icon}
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {category.categoryName}
                  </p>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
