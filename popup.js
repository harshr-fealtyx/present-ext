document.getElementById('start-login').addEventListener('click', () => {
    console.log('Start Login button clicked.');
    chrome.runtime.sendMessage({ action: 'start-login' });
  });
  
  document.addEventListener('DOMContentLoaded', function () {
    chrome.runtime.sendMessage({ type: 'getEntityName' }, function (response) {
      const entityNameElement = document.getElementById('entityName');
      if (response && response.entityName) {
        entityNameElement.textContent = response.entityName;
      } else {
        entityNameElement.textContent = 'No entity name available';
      }
    });
  });
  
  