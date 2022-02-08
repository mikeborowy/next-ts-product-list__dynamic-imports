import type { NextPage, GetStaticPropsResult } from "next";
import { ProductModel, ProductsModel } from "../models";
import fs from "fs/promises";
import path from "path";
import { ReactNode } from "react";
import Link from "next/link";

type HomePageProps = {
  children?: ReactNode;
  products: ProductModel[];
};

export const HomePage: NextPage<HomePageProps, {}> = (props: HomePageProps) => {
  const { products } = props;

  return (
    <ul>
      {products &&
        products?.map((product) => {
          return (
            <li key={product.id}>
              <Link href={`/product-details/${product.id}`}>
                {product.title}
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export type StaticPropsType = {
  props: {
    products: ProductModel[];
  };
  revalidate: number;
};

export async function getStaticProps(): Promise<
  GetStaticPropsResult<HomePageProps>
> {
  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const productsJsonData = await fs.readFile(filePath, { encoding: "utf8" });
  const data: ProductsModel = JSON.parse(productsJsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
        permanent: true,
      },
    };
  }

  if (data.products.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 1,
  };
}

export default HomePage;
