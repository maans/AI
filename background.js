const aiWebsites = [
  "chatgpt.com",
  "openai.com",
  "claude.ai",
  "gemini.google.com",
  "poe.com",
  "perplexity.ai",
  "copilot.microsoft.com"
];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    try {
      const url = new URL(tab.url);
      const domain = url.hostname.replace('www.', '');

      if (aiWebsites.includes(domain)) {
        const timestamp = new Date().toLocaleTimeString();
        const entry = { domain, title: tab.title, timestamp };

        chrome.storage.local.get({ history: [] }, (data) => {
          const newHistory = [entry, ...data.history].slice(0, 50);
          chrome.storage.local.set({ history: newHistory, alert: true });
        });
      }
    } catch (e) {
      console.error("Ugyldig URL");
    }
  }
});
