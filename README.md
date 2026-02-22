# Amazon Order Exporter Extension

A modern, fast, and secure Microsoft Edge / Google Chrome extension to export your Amazon order history to a CSV file.

## Features
- **Itemized CSV Export**: Generates a CSV file containing an individual row for every item purchased, rather than just the top-level order.
- **Data Extracted**: Order Number, Purchase Date, Delivery Date, Item Name, Shipped To, Pre-tax Item Price, Status, Payment Method (Last 4).
- **Tax & Shipping Separation**: Automatically calculates and separates tax and shipping costs into a distinct row for cleaner accounting.
- **Amazon Fresh Support**: Consolidates Amazon Fresh deliveries into a single row summary out-of-the-box.
- **Beautiful UI**: Built with React and Vanilla CSS (Glassmorphism design, dark mode, smooth animations).

## Architecture
- **Framework**: Vite + React + TypeScript + CRXJS (Manifest V3)
- **Vite & CRXJS**: Provides hot-module reloading during development.
- **Scraping Engine**: Content scripts safely read DOM data from your active session seamlessly in the background without requiring your Amazon password.
- **Testing**: Vitest + JSDOM for testing order parsing logic against mock HTML snippets.

## Installation (Developer Mode)

1. Clone or download this repository.
2. Ensure you have Node.js installed.
3. Open a terminal in the project directory and run:
   ```bash
   npm install
   npm run build
   ```
4. A `dist` folder will be generated.
5. In Microsoft Edge, navigate to `edge://extensions/` (or `chrome://extensions/` in Chrome).
6. Enable **Developer mode** in the bottom-left corner.
7. Click **Load unpacked** and select the `dist` folder in this project.

## Development

To work on the extension with Hot Module Replacement (HMR):
```bash
npm run dev
```
Make changes to `src/App.tsx` or `src/content.ts`, and your browser will automatically reflect the updates.

### Running Tests
Automated tests are written using Vitest to ensure the parsing logic remains robust against Amazon's DOM changes.
```bash
npm run test
```

## Contributing
Amazon's HTML structure changes occasionally. If the scraper breaks, you can update the DOM selectors inside `src/parser.ts` and add failing mock HTML snippets to `src/__tests__/mocks` to verify your fix. Pull requests are welcome!

## License
MIT License
