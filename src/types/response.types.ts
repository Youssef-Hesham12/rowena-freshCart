import { ResponseType } from "@/types/api.types";
import { CategoryType } from "@/types/category.types";
import { ProductType } from "./product.types";
import { BrandType } from "./brand.types";
import { SubcategoryType } from "./subcategory.types";

export type CategoriesResponseType = ResponseType<CategoryType>;
export type ProductsResponseType= ResponseType<ProductType>
export type BrandsResponseType= ResponseType<BrandType>
export type SubcategoryResponseType= ResponseType<SubcategoryType>
