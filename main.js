function searchGame(info) {

  if (info.menuItemId === 'youtube') {
    var query = info.selectionText.replaceAll(' ', '+') + "+gameplay";
    chrome.tabs.create({
      url: "https://www.youtube.com/results?search_query=" + query
    });
  }
  if (info.menuItemId === 'youtube-embed') {
    var query = info.selectionText.replaceAll(' ', '+') + "+gameplay";
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      browser.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["pip.js"]
      }, () => {
        browser.scripting.executeScript({
          target: { tabId: tabs[0].id },
          args: [query],
          func: (...args) => showPip(...args)
        });
      });
    });
}
if (info.menuItemId === 'ggdeals') {
  var query = info.selectionText.replaceAll(' ', '+');
  chrome.tabs.create({
    url: "https://gg.deals/games/?title=" + query
  });
}
if (info.menuItemId === 'steam') {
  var query = info.selectionText.replaceAll(' ', '+');
  chrome.tabs.create({
    url: "https://store.steampowered.com/search/?term=" + query
  });
}
if (info.menuItemId === 'gog') {
  var query = info.selectionText.replaceAll(' ', '%20');
  chrome.tabs.create({
    url: "https://www.gog.com/fr/games?query=" + query
  });
}
if (info.menuItemId === 'epic') {
  var query = info.selectionText.replaceAll(' ', '%20');
  chrome.tabs.create({
    url: "https://store.epicgames.com/fr/browse?q=" + query
  });
}
if (info.menuItemId === 'google') {
  var query = info.selectionText.replaceAll(' ', '+');
  chrome.tabs.create({
    url: "https://www.google.com/search?q=" + query
  });
}
};
chrome.contextMenus.removeAll(function () {
  chrome.contextMenus.create({
    id: "group",
    title: "Search '%s'",
    contexts: ["selection"]
  });
  chrome.contextMenus.create({
    id: "youtube-embed",
    title: "Gameplay (Youtube embedded)",
    contexts: ["selection"],
    parentId: "group"
  });
  chrome.contextMenus.create({
    id: "youtube",
    title: "Gameplay (Youtube)",
    contexts: ["selection"],
    parentId: "group"
  });
  chrome.contextMenus.create({
    id: "ggdeals",
    title: "Deals (GG.deals)",
    contexts: ["selection"],
    parentId: "group"
  });
  chrome.contextMenus.create({
    id: "steam",
    title: "Steam",
    contexts: ["selection"],
    parentId: "group"
  });
  chrome.contextMenus.create({
    id: "gog",
    title: "GOG",
    contexts: ["selection"],
    parentId: "group"
  });
  chrome.contextMenus.create({
    id: "epic",
    title: "Epic",
    contexts: ["selection"],
    parentId: "group"
  });
  chrome.contextMenus.create({
    id: "google",
    title: "Google",
    contexts: ["selection"],
    parentId: "group"
  });
})

chrome.contextMenus.onClicked.addListener(searchGame)

