import { apiClient, FetchResult } from "../../../apiClient";

export type ShippingAddress = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type CreateOrderPayload = {
  items: { productId: string; quantity: number; image?: string }[];
  shippingAddress: ShippingAddress;
};

export async function createOrder(token: string, payload: CreateOrderPayload) {
  const result = await apiClient.createOrder(token, payload);
  if (!result.success) {
    throw new Error(result.error || "Failed to create order");
  }
  return {
    order: result.order,
    paymentUrl: result.paymentUrl,
    paymentId: result.paymentId,
  };
}

export async function getMyOrders(token: string) {
  const result = await apiClient.getMyOrders(token);
  if (!result.success) {
    throw new Error(result.error || "Failed to fetch orders");
  }
  return {
    orders: result.orders,
    quantity: result.quantity,
  };
}

export async function getOrderById(token: string, orderId: string) {
  const result = await apiClient.getOrderById(token, orderId);
  if (!result.success) {
    throw new Error(result.error || "Failed to fetch order");
  }
  return result.order;
}
