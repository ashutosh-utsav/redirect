chrome.runtime.onInstalled.addListener(() => {
    // Clear any existing rules on install
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // Clear previous rules
      addRules: []
    });
  });
  
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "addRule") {
      chrome.storage.local.get("rules", (data) => {
        const rules = data.rules || [];
        const newId = rules.length ? Math.max(...rules.map(rule => rule.id)) + 1 : 1;
  
        const newRule = {
          id: newId,
          priority: 1,
          action: {
            type: "redirect",
            redirect: { url: message.redirectUrl }
          },
          condition: {
            urlFilter: message.blockSite,
            resourceTypes: ["main_frame"]
          }
        };
  
        rules.push(newRule);
  
        // Save new rules
        chrome.storage.local.set({ rules }, () => {
          // Update DNR rules
          chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: rules.map(rule => rule.id),
            addRules: rules
          });
        });
      });
    }
  });
  