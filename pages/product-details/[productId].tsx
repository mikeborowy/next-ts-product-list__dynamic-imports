import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import fs from "fs/promises";
import path from "path";
import React from "react";
import { ProductModel, ProductsModel } from "../../models";
import { title } from "process";
import { ParsedUrlQuery } from "querystring";

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const productsJsonData = await fs.readFile(filePath, { encoding: "utf8" });
  const data: ProductsModel = JSON.parse(productsJsonData);

  return data;
};

type ProductDetailsPageProps = {
  product?: ProductModel;
};

const ProductDetailsPage: NextPage<ProductDetailsPageProps> = (
  props: ProductDetailsPageProps
) => {
  const { product } = props;

  if (!product) {
    return <>Loading...</>;
  }

  return (
    <>
      <h1>{product?.title}</h1>
      <h1>{product?.description}</h1>
    </>
  );
};

interface Params extends ParsedUrlQuery {
  productId: string;
}

export const getStaticProps: GetStaticProps<
  ProductDetailsPageProps,
  Params
> = async (context) => {
  const { params } = context;
  const productId = params?.productId;
  const data = await getData();
  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: product,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await getData();
  const paths = data.products
    .map((product) => product.id)
    .map((id) => ({ params: { productId: id } }));

  return {
    paths,
    fallback: true,
  };
};

export default ProductDetailsPage;
