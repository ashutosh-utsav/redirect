document.getElementById("saveRule").addEventListener("click", () => {
    const blockSite = document.getElementById("blockSite").value.trim();
    const redirectSite = document.getElementById("redirectSite").value.trim();
  
    if (!blockSite || !redirectSite) {
      alert("Please enter both the block site and redirect site.");
      return;
    }
  
    // Ensure the redirect URL is valid
    if (!isValidUrl(redirectSite)) {
      alert("Please enter a valid redirect URL (e.g., https://example.com)");
      return;
    }
  
    chrome.runtime.sendMessage({
      action: "addRule",
      blockSite: blockSite,
      redirectUrl: redirectSite
    });
  
    document.getElementById("blockSite").value = "";
    document.getElementById("redirectSite").value = "";
  
    loadRules();
  });
  
  function isValidUrl(string) {
    try {
      new URL(string); // Throws if invalid
      return true;
    } catch (err) {
      return false;
    }
  }
  
  function loadRules() {
    chrome.storage.local.get("rules", (data) => {
      const rules = data.rules || [];
      const rulesList = document.getElementById("rulesList");
      rulesList.innerHTML = "";
      rules.forEach((rule) => {
        const li = document.createElement("li");
        li.textContent = `Block: ${rule.condition.urlFilter} → Redirect: ${rule.action.redirect.url}`;
        rulesList.appendChild(li);
      });
    });
  }
  
  loadRules();
  