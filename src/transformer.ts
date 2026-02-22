import { Order } from './types';

export interface ExportRow {
    'order number': string;
    'purchase date': string;
    'delivery date': string;
    'item name': string;
    'shipped to': string;
    'item price': number;
    'status': string;
    'payment method': string;
}

export function transformOrderToRows(order: Order, isFresh: boolean = false): ExportRow[] {
    const rows: ExportRow[] = [];

    const baseRow = {
        'order number': order.orderId,
        'purchase date': order.purchaseDate || '',
        'delivery date': order.deliveryDate || '',
        'shipped to': order.shippedTo,
        'status': order.status,
        'payment method': order.paymentMethod,
    };

    if (isFresh) {
        rows.push({
            ...baseRow,
            'item name': 'amazon fresh delivery',
            'item price': order.orderLevelCharges.total || 0
        });
        return rows;
    }

    // Normal items
    order.items.forEach(item => {
        rows.push({
            ...baseRow,
            'item name': item.name,
            'item price': item.price
        });
    });

    // Delivery / Tax & Shipping row
    const taxAndShipping = (order.orderLevelCharges.tax || 0) + (order.orderLevelCharges.shipping || 0);
    if (taxAndShipping > 0 || order.items.length > 0) { // Always include if there's an order
        rows.push({
            ...baseRow,
            'item name': 'amazon delivery',
            'item price': parseFloat(taxAndShipping.toFixed(2))
        });
    }

    return rows;
}
