const portal = document.getElementById("portal");

const screens = {
  login: document.getElementById("loginScreen"),
  dashboard: document.getElementById("dashboardScreen")
};

function routeTo(name) {
  const isPortal = name === "home";

  portal.classList.toggle("hidden", !isPortal);

  Object.entries(screens).forEach(([key, screen]) => {
    screen.classList.toggle("hidden", key !== name);
  });

  window.scrollTo(0, 0);
}

document.querySelectorAll("[data-route]").forEach(button => {
  button.addEventListener("click", () => {
    routeTo(button.dataset.route);
  });
});

document.getElementById("googleButton").addEventListener("click", () => {
  alert(
    "Авторизация Google пока не подключена. " +
    "Вход в систему не выполнен."
  );
});

document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("navigation").classList.toggle("open");
});

document.querySelectorAll(".navigation a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("navigation").classList.remove("open");
  });
});

window.addEventListener("hashchange", () => {
  const route = location.hash.replace("#", "");

  if (route === "home") {
    routeTo("home");
  }
});

routeTo("home");
