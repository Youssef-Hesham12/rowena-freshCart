import { CategoryType } from "@/types/category.types";
import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({ category }: { category: CategoryType }) {
  return (
    <Link
      className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 hover:-translate-y-1"
      href={`/categories/${category._id}`}
    >
      <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-4">
        <Image
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          src={category.image}
          width={232}
          height={232}
        />
      </div>
      <h3 className="font-bold text-gray-900 text-center group-hover:text-primary-600 transition-colors">
        {category.name}
      </h3>
      <div className="flex justify-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs text-primary-600 flex items-center gap-1">
          View Subcategories
          <svg
            width="13"
            height="10"
            viewBox="0 0 13 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.0664 5.44141C11.3105 5.19727 11.3105 4.80078 11.0664 4.55664L7.94141 1.43164C7.69727 1.1875 7.30078 1.1875 7.05664 1.43164C6.8125 1.67578 6.8125 2.07227 7.05664 2.31641L9.11523 4.375H1.875C1.5293 4.375 1.25 4.6543 1.25 5C1.25 5.3457 1.5293 5.625 1.875 5.625H9.11523L7.05664 7.68359C6.8125 7.92773 6.8125 8.32422 7.05664 8.56836C7.30078 8.8125 7.69727 8.8125 7.94141 8.56836L11.0664 5.44336V5.44141Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
