(function () {
  var storageKey = "gns-theme";
  var mode = "system";

  try {
    var stored = window.localStorage.getItem(storageKey);
    if (stored === "light" || stored === "dark" || stored === "system") {
      mode = stored;
    }
  } catch (error) {
    mode = "system";
  }

  var resolved = mode;
  if (mode === "system") {
    resolved = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  var root = document.documentElement;
  root.dataset.theme = resolved;
  root.dataset.themeMode = mode;
  root.style.colorScheme = resolved;

  var themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    themeColor.setAttribute(
      "content",
      resolved === "dark" ? "#17110f" : "#ffffff",
    );
  }
})();
