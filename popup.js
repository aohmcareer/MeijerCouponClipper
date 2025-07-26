document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'get_categories' });
  });
});

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'category_list') {
    const container = document.getElementById('categories-container');
    request.categories.forEach(category => {
      const label = document.createElement('label');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = 'category';
      checkbox.value = category;
      if (request.preselected.includes(category)) {
        checkbox.checked = true;
      }
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(category));
      container.appendChild(label);
      container.appendChild(document.createElement('br'));
    });
  }
});

document.getElementById('start-clipping').addEventListener('click', () => {
  const selectedCategories = [];
  const checkboxes = document.querySelectorAll('#categories-container input[type="checkbox"]:checked');
  checkboxes.forEach(checkbox => {
    selectedCategories.push(checkbox.value);
  });

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'startClipping', categories: selectedCategories });
  });
});
