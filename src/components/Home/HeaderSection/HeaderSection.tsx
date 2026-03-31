import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { SectionHeaderTypes } from "./header-section.types";

export default function HeaderSection({headerName, sectionName, viewAllLink}: SectionHeaderTypes) {
  return (
    <div>
      <div className={viewAllLink && 'flex flex-col sm:flex-row justify-between sm:items-center mb-8'}>
        <div className="flex items-center gap-3 my-8">
          <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {headerName} <span className="text-emerald-600">{sectionName}</span>
          </h2>
        </div>{" "}
        {viewAllLink && <Link
          className="text-primary-600 self-end sm:self-auto hover:text-primary-700 font-medium flex items-center cursor-pointer"
          href="categories"
        >
          {viewAllLink}
          <FaArrowRightLong className="ml-2" />
        </Link>}
      </div>
    </div>
  );
}
