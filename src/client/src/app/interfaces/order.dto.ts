export interface OrderItemDto {
    productId: number;
    quantity: number;
}

export interface CreateOrderRequest {
    userId: number,
    items: OrderItemDto[];
}

export interface OrderResponseDto {
    id: number;
    orderDate: string;
    totalAmount: number;
}
