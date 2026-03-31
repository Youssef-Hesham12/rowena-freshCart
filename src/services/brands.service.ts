export async function getAllBrands() {
  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands");

    if (!response.ok) {
      return {error : "Failed to get brands"};
    }
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}

export async function getSpecificBrand(brandId: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`,
    );

    if (!response.ok) {
      return {error : "Failed to get brand"};
    }
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}
