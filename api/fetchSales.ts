import { SalesModel } from "../models";

export const fetchSalesAPI = async (): Promise<SalesModel> => {
  const response = await fetch(
    "https://nextjs-course-12061-default-rtdb.firebaseio.com/sales.json"
  );

  return response.json();
};
