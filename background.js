// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === 'start-login') {
//     console.log('Extension started.');
//     chrome.tabs.create({ url: "https://dashboard.razorpay.com/?screen=sign_in" }, (tab) => {
//       console.log('Razorpay login page opened.');
//       chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         files: ['content.js']
//       });
//     });
//   }
// });
let entityName = '';

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log('Background script received message:', message); // Debugging
//   if (message.type === 'fetchEntityName') {
//     entityName = message.data.entityName;
//     console.log('Stored entity name:', entityName); // Debugging
//   } else if (message.type === 'getEntityName') {
//     sendResponse({ entityName: entityName });
//   }
// });

// Background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'saveData') {
    chrome.storage.local.set({ entityName: message.entityName }, () => {
      console.log('Entity name saved to chrome.storage');
    });
  } else if (message.action === 'getData') {
    chrome.storage.local.get(['entityName'], (result) => {
      console.log('Entity name from chrome.storage:', result.entityName);
      sendResponse(result.entityName);
    });
    return true;  // Keep the message channel open for asynchronous response
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background script received message:', message); // Debugging
  if (message.type === 'getEntityName') {
    chrome.storage.local.get('entityName', function(result) {
      sendResponse({ entityName: result.entityName || 'Login to uat first' });
    });
    // Indicate that we will send a response asynchronously
    return true;
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'start-login') {
    console.log('Extension started.');
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        files: ['content.js']
      }, () => {
        console.log('Automation script executed on current page.');
      });
    });
  }
});
