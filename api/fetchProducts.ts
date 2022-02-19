import { ProductsModel } from "../models";

export const fetchProducts = async (): Promise<ProductsModel> => {
  const response = await fetch("../dummy-data.json");
  return response.json();
};
