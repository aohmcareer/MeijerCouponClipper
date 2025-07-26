function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function clickCategories(categoriesToSelect) {
  console.log("Attempting to click categories button.");
  const categoriesButton = document.querySelector('button[aria-controls="js-category-content"]');
  if (categoriesButton) {
    console.log("Categories button found, clicking.");
    categoriesButton.click();
    await sleep(1000); // Wait for categories to expand
    console.log("Selecting category checkboxes.");
    const checkboxes = document.querySelectorAll('#js-category-content input[type="checkbox"]');
    console.log(`Found ${checkboxes.length} checkboxes.`);
    checkboxes.forEach(checkbox => {
      const labelElement = checkbox.parentElement;
      if (labelElement) {
        // The label text is the first text node of the label element.
        const label = labelElement.firstChild.textContent.trim();
        console.log(`Found checkbox with label: "${label}"`);
        if (categoriesToSelect.includes(label)) {
          console.log(`Clicking checkbox for: ${label}`);
          checkbox.click();
        }
      }
    });
  } else {
    console.error("Categories button not found.");
  }
}


async function clipAllCoupons() {
  console.log("Attempting to clip all coupons.");
  const clipButtons = document.querySelectorAll('button.coupon-tile__button--clip');
  console.log(`Found ${clipButtons.length} coupons to clip.`);
  for (let i = 0; i < clipButtons.length; i++) {
    // Check if the button is not already clipped
    if (clipButtons[i].textContent.trim() === 'Clip') {
        console.log(`Clipping coupon ${i + 1} of ${clipButtons.length}`);
        clipButtons[i].click();
        await sleep(500); // Stagger clicks to avoid being blocked
    }
  }
}

console.log("Meijer coupon clipper content script loaded.");

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log("Message received in content script:", request);
  if (request.action === "get_categories") {
    const categoriesButton = document.querySelector('button[aria-controls="js-category-content"]');
    if (categoriesButton) {
      categoriesButton.click();
      await sleep(1000);
      const availableCategories = [];
      const checkboxes = document.querySelectorAll('#js-category-content input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        const labelElement = checkbox.parentElement;
        if (labelElement) {
          const label = labelElement.firstChild.textContent.trim();
          availableCategories.push(label);
        }
      });
      categoriesButton.click();
      chrome.runtime.sendMessage({ action: 'category_list', categories: availableCategories, preselected: CATEGORIES_TO_SELECT });
    }
  } else if (request.action === "startClipping") {
    console.log("startClipping action received.");
    await clickCategories(request.categories);
    console.log("Waiting for filtered coupons to load...");
    await sleep(5000); // Wait 5 seconds for the filtered coupons to load
    await clipAllCoupons();
    console.log("All coupons should be clipped.");
  }
});
