import { describe, it, expect } from 'vitest';
import { transformOrderToRows } from '../transformer';
import { Order } from '../types';

describe('Order Transformer', () => {
    const mockOrder: Order = {
        orderId: '111',
        orderUrl: '',
        purchaseDate: '2023-01-01',
        shippedTo: 'John Doe',
        status: 'Delivered',
        paymentMethod: '1234',
        items: [
            { name: 'Item A', price: 10.0 },
            { name: 'Item B', price: 15.0 }
        ],
        orderLevelCharges: { tax: 2.0, shipping: 3.0, total: 30.0 }
    };

    it('should transform standard orders into item rows + delivery row', () => {
        const rows = transformOrderToRows(mockOrder);
        expect(rows.length).toBe(3); // 2 items + 1 delivery

        expect(rows[0]['item name']).toBe('Item A');
        expect(rows[0]['item price']).toBe(10.0);

        expect(rows[1]['item name']).toBe('Item B');
        expect(rows[1]['item price']).toBe(15.0);

        expect(rows[2]['item name']).toBe('amazon delivery');
        expect(rows[2]['item price']).toBe(5.0); // tax + shipping
    });

    it('should transform fresh orders into a single row', () => {
        const rows = transformOrderToRows(mockOrder, true);
        expect(rows.length).toBe(1);

        expect(rows[0]['item name']).toBe('amazon fresh delivery');
        expect(rows[0]['item price']).toBe(30.0); // total
    });
});
