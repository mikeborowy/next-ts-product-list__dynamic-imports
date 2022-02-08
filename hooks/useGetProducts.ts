import { ProductsModel } from "../models";

export const useGetProducts = async (): Promise<ProductsModel> => {
  const response = await fetch("../dummy-data.json");
  return response.json();
};
