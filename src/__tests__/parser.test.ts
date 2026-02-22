import { describe, it, expect } from 'vitest';
import { parseOrderList, parseOrderDetail } from '../parser';
import * as fs from 'fs';
import * as path from 'path';

describe('Amazon DOM Parser', () => {

    it('should parse order list page to find order IDs and URLs', () => {
        const html = fs.readFileSync(path.join(__dirname, 'mocks/mockOrderList.html'), 'utf-8');
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const orders = parseOrderList(doc);
        expect(orders.length).toBe(1);
        expect(orders[0].orderId).toBe('111-2223334-4455667');
        expect(orders[0].purchaseDate).toBe('September 15, 2023');
        expect(orders[0].url).toContain('order-details');
    });

    it('should parse order detail page to find items and costs', () => {
        const html = fs.readFileSync(path.join(__dirname, 'mocks/mockOrderDetail.html'), 'utf-8');
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const order = parseOrderDetail(doc, '111-2223334-4455667', '/test');
        expect(order.shippedTo).toBe('John Doe');
        expect(order.paymentMethod).toBe('1234');
        expect(order.items.length).toBe(1);
        expect(order.items[0].name).toBe('Sample Item 1');
        expect(order.items[0].price).toBe(19.99);
        expect(order.orderLevelCharges.tax).toBe(1.50);
        expect(order.orderLevelCharges.shipping).toBe(4.99);
        expect(order.orderLevelCharges.total).toBe(26.48);
    });

});
