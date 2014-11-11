// Hack: globally store a referenced to the element being right-clicked.
// Ideally this would be passed directly to the Chrome contextmenu callback.
var contextMenuElement;
window.addEventListener("contextmenu", function(event) {
    contextMenuElement = event.target;
});

// message callback, triggered from contextMenuClick callback in background.js
chrome.extension.onRequest.addListener ( function(request, sender, sendResponse) {
  if (request.name == "link-to-element_contextMenuClick") { 
    var xpath = encodeXPath(getElementXPath(contextMenuElement));
    var xpathLink = window.location.href.replace(/#.*$/,'') + "#" + xpath;
    window.location = xpathLink;
  }
});

// act (jump) on hash change...
window.onhashchange = function() {
  jumpToXPathInUrl();
}

// ... and also on page load
jumpToXPathInUrl(jQuery);
