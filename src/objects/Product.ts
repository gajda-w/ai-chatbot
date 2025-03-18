export type Product = {
  name: string;
  description: string;
  price: {
    amount: number;
    currency: string;
  };
  link: string;
  thumbnail: string;
};
