chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
            redirect: { url: ensureHttps(message.redirectUrl) }
          },
          condition: {
            urlFilter: message.blockSite,
            resourceTypes: ["main_frame"]
          }
        };
  
        rules.push(newRule);
  
        chrome.storage.local.set({ rules }, () => {
          chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: rules.map(rule => rule.id),
            addRules: rules
          });
        });
      });
    }
  });
  
  function ensureHttps(url) {
    if (!/^https?:\/\//i.test(url)) {
      return "https://" + url; // Add https if missing
    }
    return url;
  }
  