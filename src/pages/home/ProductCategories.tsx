import React from "react";

// Định nghĩa kiểu dữ liệu cho mỗi danh mục
interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
}

// Danh sách danh mục sản phẩm
const categories: Category[] = [
  { id: 1, name: "Bia hồ sơ", icon: "📁", color: "bg-blue-500" },
  { id: 2, name: "Bút bi", icon: "✒️", color: "bg-red-500" },
  { id: 3, name: "Bút chì", icon: "✏️", color: "bg-yellow-500" },
  { id: 4, name: "Sổ", icon: "📓", color: "bg-green-500" },
  { id: 5, name: "Băng keo", icon: "🛠️", color: "bg-orange-500" },
  { id: 6, name: "Bảng tên, dây đeo", icon: "🏷️", color: "bg-purple-500" },
  { id: 7, name: "Bút dạ", icon: "🖍️", color: "bg-pink-500" },
  { id: 8, name: "Hóa đơn", icon: "💰", color: "bg-teal-500" },
  { id: 9, name: "Kéo, kéo giấy", icon: "✂️", color: "bg-indigo-500" },
  { id: 10, name: "Bút lông", icon: "🖌️", color: "bg-rose-500" },
  { id: 11, name: "Kẹp tài liệu", icon: "📎", color: "bg-cyan-500" },
  { id: 12, name: "Đồ chơi trẻ em", icon: "🧸", color: "bg-amber-500" },
  { id: 13, name: "Nhãn dán (sticker)", icon: "🏷️", color: "bg-lime-500" },
  { id: 14, name: "Hộp đựng - Mực dấu", icon: "📦", color: "bg-violet-500" },
  { id: 15, name: "Đèn bàn", icon: "💡", color: "bg-sky-500" },
  { id: 16, name: "Tập vở", icon: "📒", color: "bg-emerald-500" },
  { id: 17, name: "Dao rọc giấy", icon: "🔪", color: "bg-fuchsia-500" },
  { id: 18, name: "Dụng cụ sinh hoạt", icon: "🏠", color: "bg-rose-600" },
  { id: 19, name: "Giấy nhớ", icon: "📜", color: "bg-blue-600" },
  { id: 20, name: "Dụng cụ khác", icon: "🔧", color: "bg-gray-500" },
];

const ProductCategories: React.FC = () => {
  return (
    <section className="py-8 px-4 bg-gray-100">
      <div className="w-main mx-auto">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
          Product Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-transform transform hover:scale-105 active:scale-95 cursor-pointer"
              aria-label={category.name}
            >
              <div
                className={`w-14 h-14 ${category.color} text-white rounded-full flex items-center justify-center mx-auto mb-2 text-2xl shadow-lg`}
              >
                {category.icon}
              </div>
              <p className="text-sm font-medium text-gray-700">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
