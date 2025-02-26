const redirects = {
    "https://www.youtube.com/": "https://www.ashutoshutsav.in/"
  };
  
  chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
      const url = details.url;
      for (let key in redirects) {
        if (url.startsWith(key)) {
          return { redirectUrl: redirects[key] };
        }
      }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
  );
  