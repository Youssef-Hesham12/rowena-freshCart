export async function getSubCategories() {
  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/subcategories");

    if (!response.ok) {
      return {error : "Failed to get subcategories"};
    }
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}

export async function getSpecificSubCategory(subcategoryId: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/subcategories/${subcategoryId}`,
    );

    if (!response.ok) {
      return {error : "Failed to get subcategory"};
    }
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}