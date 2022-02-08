import React, { useEffect, useState } from "react";
import { SaleModel, SalesModel } from "../../models/index";
import useSWR from "swr";
import { fetchSalesAPI } from "../../api/fetchSales";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
// import { useSales } from "../../hooks/useSales";

/**
 * Dynamically loaded component, not pre-rendered
 * Will not show any data in source page unless...
 */

type LastSalesPageProps = {
  sales: SaleModel[];
};

const LastSalesPage = (props: LastSalesPageProps) => {
  // const { data: sales, isLoading, error, refetch } = useSales();

  const [sales, setSales] = useState<SaleModel[]>(props.sales);

  const { data, error } = useSWR<SalesModel>(
    "https://nextjs-course-12061-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const sales = Object.entries(data).map(([_, sale]) => sale);
      setSales(sales);
    }
  }, [data]);

  if (error) {
    return <>Failed to load...</>;
  }

  if (!data && !sales) {
    return <>Loading...</>;
  }

  return (
    <ul>
      {sales?.map((sale) => (
        <li key={sale.userName}>
          {sale.userName} - {sale.volume}
        </li>
      ))}
    </ul>
  );
};

/**
 * Unless With getStaticProps - it will be visible in source page
 */
export const getStaticProps: GetStaticProps<
  LastSalesPageProps,
  ParsedUrlQuery
> = async () => {
  const data = fetchSalesAPI();
  const sales: SaleModel[] = Object.entries(data).map(([_, sale]) => sale);

  return { props: { sales } };
};

export default LastSalesPage;
