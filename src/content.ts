import { ExportRow } from './transformer';

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.type === 'SCRAPE_YEAR') {
        scrapeYear().then(rows => {
            sendResponse({ rows });
        });
        return true; // Keep message channel open for async response
    }
});

async function scrapeYear(): Promise<ExportRow[]> {
    // In a real implementation this would fetch pages, parse them and delay to respect rate limits.
    // For the sake of this setup, we simulate the scraping and return dummy data or parsed data from the current page.

    // Simulated delay for demonstration
    await new Promise(r => setTimeout(r, 2000));

    // Sample dummy response mapped to the schema
    const dummyRows: ExportRow[] = [
        {
            'order number': '111-2223334-4455667',
            'purchase date': '2023-09-15',
            'delivery date': '2023-09-18',
            'item name': 'Sample Item 1',
            'shipped to': 'John Doe',
            'item price': 19.99,
            'status': 'Delivered',
            'payment method': '1234'
        },
        {
            'order number': '111-2223334-4455667',
            'purchase date': '2023-09-15',
            'delivery date': '2023-09-18',
            'item name': 'amazon delivery',
            'shipped to': 'John Doe',
            'item price': 6.49,
            'status': 'Delivered',
            'payment method': '1234'
        }
    ];

    return dummyRows;
}
