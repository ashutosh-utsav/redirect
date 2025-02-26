chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [
      {
        id: 1,
        priority: 1,
        action: {
          type: "redirect",
          redirect: { url: "https://www.ashutoshutsav.in/" }
        },
        condition: {
          urlFilter: "youtube.com",
          resourceTypes: ["main_frame"]
        }
      },
      {
        id: 2,
        priority: 1,
        action: {
          type: "redirect",
          redirect: { url: "https://www.linkedin.com/" }
        },
        condition: {
          urlFilter: "facebook.com",
          resourceTypes: ["main_frame"]
        }
      }
    ]
  });
  