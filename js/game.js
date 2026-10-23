(() => {
  const toggle = document.querySelector("[data-theme-toggle]");
  try {
    if (localStorage.getItem("nuzcode-theme") === "light")
      document.body.classList.add("light");
  } catch (e) {}
  toggle?.addEventListener("click", () => {
    document.body.classList.toggle("light");
    try {
      localStorage.setItem(
        "nuzcode-theme",
        document.body.classList.contains("light") ? "light" : "dark",
      );
    } catch (e) {}
  });
})();
