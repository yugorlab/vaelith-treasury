const screens = {
  home: null,
  login: document.getElementById("loginScreen"),
  dashboard: document.getElementById("dashboardScreen")
};

function routeTo(name) {
  document.querySelector("main").classList.toggle("hidden", name !== "home");
  document.querySelector(".topbar").classList.toggle("hidden", name !== "home");
  document.querySelector(".ticker").classList.toggle("hidden", name !== "home");
  document.querySelectorAll(".content-section, .closing, .footer").forEach(el => el.classList.toggle("hidden", name !== "home"));
  Object.entries(screens).forEach(([key, el]) => {
    if (el) el.classList.toggle("hidden", key !== name);
  });
  window.scrollTo(0, 0);
}

document.querySelectorAll("[data-route]").forEach(button => {
  button.addEventListener("click", () => routeTo(button.dataset.route));
});
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", () => {
    if (link.getAttribute("href") === "#home") routeTo("home");
  });
});
document.getElementById("googleButton").addEventListener("click", () => {
  alert("Google authentication is not configured in this prototype. No sign-in has occurred.");
});
document.getElementById("menuToggle").addEventListener("click", () => {
  document.querySelector(".topnav").classList.toggle("open");
});
window.addEventListener("hashchange", () => {
  const route = location.hash.replace("#", "");
  if (["home", "login", "dashboard"].includes(route)) routeTo(route);
});
routeTo("home");
