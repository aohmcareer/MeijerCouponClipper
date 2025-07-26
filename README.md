# Meijer Coupon Clipper

This is a Firefox browser extension that automates the process of clipping coupons on the Meijer website.

## Features

- Automatically selects specified categories of coupons.
- Clips all available coupons within the selected categories.

## Setup

1.  **Download the extension files:**
    Make sure you have all the extension files (`manifest.json`, `config.js`, `content.js`, `popup.html`, `popup.js`, and the `icons` directory) in a single directory.

2.  **Open Firefox and navigate to `about:debugging`:**
    You can type this directly into the address bar and press Enter. You may also have to allow it to run on sites with restrictions at `about:addons` and clicking the extension there and reloading the extension and refreshing.

3.  **Load the extension:**
    - Click on "This Firefox" in the sidebar.
    - Click on the "Load Temporary Add-on..." button.
    - Navigate to the directory where you saved the extension files and select the `manifest.json` file.

4.  **Using the extension:**
    - Navigate to the [Meijer coupons page](https://www.meijer.com/shopping/coupons.html).
    - Click on the extension's icon in the Firefox toolbar (it looks like a shopping cart).
    - The extension will open a popup. Click the "Start Clipping Coupons" button to begin the process.

## Configuration

You can customize the categories of coupons that are selected by editing the `config.js` file. Open this file in a text editor and add or remove category names from the `CATEGORIES_TO_SELECT` list.
