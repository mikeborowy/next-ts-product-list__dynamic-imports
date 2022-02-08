import { useState, useEffect } from "react";
import { fetchSalesAPI } from "../api/fetchSales";
import { SaleModel } from "../models";

export const useSales = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<SaleModel[]>([]);
  const [error, setError] = useState<unknown>();
  const refetch = () => {
    setIsLoading(true);
    fetchSalesAPI()
      .then((data) => {
        const sales = Object.entries(data).map(([_, sale]) => sale);
        setData(sales);
        setIsLoading(false);
      })
      .catch((error) => setError(error));
  };

  useEffect(() => {
    refetch();
  }, []);

  return { isLoading, data, error, refetch };
};
