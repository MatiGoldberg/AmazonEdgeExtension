export interface Order {
    orderId: string;
    orderUrl: string;
    purchaseDate: string;
    deliveryDate?: string;
    shippedTo: string;
    status: string;
    paymentMethod: string;
    items: OrderItem[];
    orderLevelCharges: OrderLevelCharges;
}

export interface OrderItem {
    name: string;
    price: number;
    itemUrl?: string;
    isFresh?: boolean;
}

export interface OrderLevelCharges {
    tax: number;
    shipping: number;
    total?: number;
}
