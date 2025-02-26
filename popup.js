document.getElementById("saveRule").addEventListener("click", () => {
    const blockSite = document.getElementById("blockSite").value.trim();
    const redirectSite = document.getElementById("redirectSite").value.trim();
  
    if (!blockSite || !redirectSite) {
      alert("Please enter both the block site and redirect site.");
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
  