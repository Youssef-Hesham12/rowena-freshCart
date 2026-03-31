export async function getCategories() {
  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories");

    if (!response.ok) {
      return {error : "Failed to get categories"};
    }
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}

export async function getSpecificCategory(categoryId: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`,
    );

    if (!response.ok) {
      return {error : "Failed to get category"};
    }
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}
export async function getSubcategoriesOnCategory(categoryId: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
    );

    if (!response.ok) {
      return {error : "Failed to get subcategories"};
    }
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}