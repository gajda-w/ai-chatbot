import { ProductRepository } from "@/repositories/product";

export const getAllProductsUseCase = async (
  deps: {
    productRepository: ProductRepository;
  },
  input: {
    channel: string;
    take: number;
  }
) => {
  const productsResult = await deps.productRepository.getAll({
    channel: input.channel,
    take: input.take,
  });

  if (!productsResult) {
    throw new Error("Failed to fetch products");
  }

  return productsResult;
};
