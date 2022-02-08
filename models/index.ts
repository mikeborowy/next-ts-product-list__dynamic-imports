export type ProductModel = {
  id: string;
  title: string;
  description: string;
};

export type ProductsModel = {
  products: ProductModel[];
};

export type SaleModel = { userName: string; volume: number };

export type SalesModel = Record<string, SaleModel>;
