import Papa from 'papaparse';
import { ExportRow } from './transformer';

console.log('Background service worker started');

let isExporting = false;

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.type === 'START_EXPORT') {
        if (isExporting) return;
        isExporting = true;
        startExport(request.payload.year).catch(console.error);
        sendResponse({ status: 'started' });
    }
});

async function startExport(year: string) {
    const tabs = await chrome.tabs.query({ url: "*://*.amazon.com/*" });
    let tabId = tabs.length > 0 ? tabs[0].id : undefined;

    if (!tabId) {
        const newTab = await chrome.tabs.create({ url: 'https://www.amazon.com/your-orders/orders', active: false });
        tabId = newTab.id;
        // Wait for tab to load
        await new Promise(r => setTimeout(r, 3000));
    }

    chrome.runtime.sendMessage({ type: 'PROGRESS_UPDATE', message: 'Fetching order list...', current: 0, total: 1 });

    // Ask content script to scrape
    chrome.tabs.sendMessage(tabId!, { type: 'SCRAPE_YEAR', year }, (response) => {
        isExporting = false;
        if (chrome.runtime.lastError) {
            chrome.runtime.sendMessage({ type: 'PROGRESS_UPDATE', message: 'Failed to connect to Amazon tab.', current: 0, total: 1, status: 'error' });
            return;
        }

        if (response && response.rows) {
            generateCsvAndDownload(response.rows, year);
            chrome.runtime.sendMessage({ type: 'PROGRESS_UPDATE', message: 'Done!', current: 1, total: 1, status: 'done' });
        }
    });
}

function generateCsvAndDownload(rows: ExportRow[], year: string) {
    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    chrome.downloads.download({
        url: url,
        filename: `amazon_orders_${year}.csv`,
        saveAs: false
    });
}
