import { Product } from "@/objects/Product";

export type ProductRepository = {
  getAll: ({
    take,
    channel,
  }: {
    take: number;
    channel: string;
  }) => Promise<Product[]>;
};
