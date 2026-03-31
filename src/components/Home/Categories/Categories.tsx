import { getCategories } from "@/services/categories.service";
import { CategoriesResponseType } from "@/types/response.types";
import CategoryCard from "./CategoryCard/CategoryCard";
import HeaderSection from "../HeaderSection/HeaderSection";

export default async function Categories() {
  const categories: CategoriesResponseType = await getCategories();
  
  return (
    <section className="py-10">
      <div className="container mx-auto px-4!">
        <HeaderSection
          headerName="Shop By"
          sectionName="Category"
          viewAllLink="View All Categories"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories?.data?.map((category) => (
              <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
