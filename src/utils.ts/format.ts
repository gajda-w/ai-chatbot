import { Product } from "@/objects/Product";

export const formatProductList = (products: Product[]): string => {
  if (products.length === 0) return "No products available at the moment.";

  return products
    .map(({ name, link, price }) => `- [${name}](${link}), Price: ${price}.`)
    .join("\n");
};
