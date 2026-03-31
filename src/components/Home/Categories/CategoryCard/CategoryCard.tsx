import Image from "next/image";
import Link from "next/link";
import { CategoryCardProps } from "./category-card.types";


export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <>
      <Link
        className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition group cursor-pointer"
        href={`/categories/${category._id}`}
      >
        <div className="h-20 w-20 overflow-hidden bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-200 transition">
          <Image
            src={category.image}
            alt={category.name}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-medium">{category.name}</h3>
      </Link>
    </>
  );
}
