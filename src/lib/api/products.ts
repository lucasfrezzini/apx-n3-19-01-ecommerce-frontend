import { apiClient, FetchResult } from "../../../apiClient";

export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category?: string;
  images?: {
    product: string[];
    dimensions?: string;
  };
  attributes?: Record<string, string>;
  isNew?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductListResult = FetchResult<{ products: Product[] }>;
export type ProductResult = FetchResult<{ product: Product }>;

export async function getProducts(options?: {
  category?: string;
  random?: boolean;
  limit?: number;
  sort?: "price_asc" | "price_desc";
}): Promise<Product[]> {
  const result = await apiClient.getProducts(options);
  if (!result.success) {
    throw new Error(result.error);
  }
  return result.products;
}

export async function getSearchProducts(params: {
  q: string;
  category?: string;
  limit?: number;
  offset?: number;
}) {
  const result = await apiClient.search(params.q, {
    offset: params.offset,
    limit: params.limit,
  });
  if (!result.success) {
    throw new Error(result.error);
  }
  return {
    results: result.results,
    page: result.page,
    total: result.total,
    totalPages: result.totalPages,
  };
}

export async function getRandomProducts(limit = 12): Promise<Product[]> {
  const result = await apiClient.getProducts({ random: true, limit });
  if (!result.success) {
    throw new Error(result.error);
  }
  return result.products;
}

export async function getProductById(id: string): Promise<Product> {
  const result = await apiClient.getProductById(id);
  console.log("getProductById result:", result);
  if (!result.success) {
    console.error("Error fetching product:", result.error);
    throw new Error(result.error);
  }
  return result.product;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const result = await apiClient.getProducts({ category });
  if (!result.success) {
    throw new Error(result.error);
  }
  return result.products;
}
