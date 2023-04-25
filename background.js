chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "www.linkedin.com" },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ])
  })
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getCookie") {
    chrome.cookies.get({ url: "https://www.linkedin.com", name: "li_at" }, function (cookie) {
      sendResponse({ cookie: cookie ? cookie.value : "Cookie não encontrado" })
    })
    return true
  }
})
