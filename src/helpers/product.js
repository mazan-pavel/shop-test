import { Product } from "@/models/product";
/**
 * Get array products by category
 * @param {Array} products array products
 * @param {String} categoryId category id
 * @returns return array product
 */
export function getProductsByCategory(products, categoryId) {
  return products.filter((el) => el.G === Number(categoryId));
}

/**
 * Get array products by Arrays product and name
 * @param {Array} products Array products
 * @param {Array} names Array products name
 * @returns Array models Products
 */
export function getProductsWithName(products, names, currencyRate) {
  return [...products].map((product) => {
    const { T: productId, C: cost, P: stock, G: groupId } = product;
    const { N: nameProduct } = names[product["T"]];
    return new Product(
      productId,
      nameProduct,
      cost,
      stock,
      groupId,
      currencyRate
    );
  });
}

export const currencyFormat = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
});
