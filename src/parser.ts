import { Order, OrderItem } from './types';

/**
 * Parses the "Your Orders" list page and returns a list of Order IDs and Detail URLs.
 * @param document React/JSDOM document representing the order list page
 */
export function parseOrderList(document: Document): { orderId: string; url: string; purchaseDate: string }[] {
    const orders: { orderId: string; url: string; purchaseDate: string }[] = [];
    const orderNodes = document.querySelectorAll('.order');

    orderNodes.forEach(node => {
        const rows = node.querySelectorAll('.a-row.a-size-small .value');
        if (rows.length >= 2) {
            const purchaseDate = rows[0].textContent?.trim() || '';
            const orderId = rows[1].textContent?.trim() || '';
            const linkMatch = node.querySelector('a.a-link-normal[href*="order-details"]');
            const url = linkMatch ? linkMatch.getAttribute('href') || '' : '';

            orders.push({ orderId, purchaseDate, url });
        }
    });

    return orders;
}

/**
 * Parses a specific Order Detail page to extract items, shipping, tax, etc.
 * @param document React/JSDOM document representing the order detail page
 */
export function parseOrderDetail(document: Document, orderId: string, url: string): Order {
    const shippedTo = document.querySelector('.displayAddressFullName')?.textContent?.trim() || '';

    const paymentText = document.querySelector('span[text*="Payment Method"]')?.textContent ||
        Array.from(document.querySelectorAll('span')).find(s => s.textContent?.includes('Payment Method:'))?.textContent || '';
    const paymentMethod = paymentText.match(/ending in (\d{4})/)?.[1] || '';

    const items: OrderItem[] = [];
    const itemNodes = document.querySelectorAll('.a-box-group .a-row');
    itemNodes.forEach(node => {
        const nameNode = node.querySelector('a');
        const priceNode = node.querySelector('.a-color-price');
        if (nameNode && priceNode) {
            items.push({
                name: nameNode.textContent?.trim() || '',
                price: parseFloat(priceNode.textContent?.replace(/[^0-9.]/g, '') || '0'),
                itemUrl: nameNode.getAttribute('href') || ''
            });
        }
    });

    const getSubtotalValue = (label: string) => {
        const node = Array.from(document.querySelectorAll('#od-subtotals span')).find(s => s.textContent?.includes(label));
        if (!node) return 0;
        return parseFloat(node.textContent?.replace(/[^0-9.]/g, '') || '0');
    };

    const tax = getSubtotalValue('tax to be collected');
    const shipping = getSubtotalValue('Shipping & Handling');
    const total = getSubtotalValue('Grand Total');

    return {
        orderId,
        orderUrl: url,
        purchaseDate: "", // Usually extracted from list, could also grab from detail banner
        shippedTo,
        status: "Parsed", // We can refine this later
        paymentMethod,
        items,
        orderLevelCharges: { tax, shipping, total }
    };
}
