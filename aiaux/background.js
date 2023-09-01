// Add an event listener to listen for when any tab is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if the updated tab has fully loaded (status is 'complete')
  // and if the tab's URL starts with 'http' (indicating it's a webpage, not a chrome setting page or other non-http page)
  if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
      
      // Execute the 'content.js' script in the context of the updated tab
      chrome.scripting.executeScript({
          target: { tabId: tabId },  // Target tab to execute the script in
          files: ["./content.js"]    // Specify the file path to 'content.js'
      })
          .then(() => {
              // If the script executes successfully, log a message stating that the foreground script has been added
              console.log("AiAux added foreground script.");
          })
          .catch(err => {
              // If there's an error executing the script, log the error to the console
              console.error(err);
          });
  }
});
