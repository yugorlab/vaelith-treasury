document.addEventListener("DOMContentLoaded", () => {
  const portal = document.getElementById("portal");
  const loginScreen = document.getElementById("loginScreen");
  const dashboardScreen = document.getElementById("dashboardScreen");

  const screens = {
    home: portal,
    login: loginScreen,
    dashboard: dashboardScreen
  };

  function routeTo(name) {
    if (!screens[name]) name = "home";

    Object.entries(screens).forEach(([key, element]) => {
      element.classList.toggle("hidden", key !== name);
    });

    window.scrollTo(0, 0);
  }

  // Переключение экранов
  document.addEventListener("click", event => {
    const routeButton = event.target.closest("[data-route]");

    if (routeButton) {
      event.preventDefault();
      const route = routeButton.dataset.route;

      routeTo(route);

      if (route === "home") {
        history.replaceState(null, "", location.pathname);
      }
    }
  });

  // Демонстрационная кнопка Google
  document.getElementById("googleButton")
    ?.addEventListener("click", () => {
      alert(
        "Авторизация Google пока не подключена. " +
        "Вход в систему не выполнен."
      );
    });

  // Мобильное меню
  document.getElementById("menuToggle")
    ?.addEventListener("click", () => {
      document.getElementById("navigation")
        ?.classList.toggle("open");
    });

  document.querySelectorAll(".navigation a").forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("navigation")
        ?.classList.remove("open");
    });
  });

  // Начальный экран
  const initialRoute = new URLSearchParams(location.search).get("view");

  routeTo(initialRoute || "home");
});
