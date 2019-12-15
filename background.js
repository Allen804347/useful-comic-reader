(function () {
  // Listen for requests from content pages wanting to set up a port
  chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
    });
  });
}()) ;
