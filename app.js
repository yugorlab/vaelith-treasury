document.addEventListener("DOMContentLoaded", () => {
  // 1. РОУТИНГ ЭКРАНОВ
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
      if (element) {
        element.classList.toggle("hidden", key !== name);
      }
    });

    window.scrollTo(0, 0);
  }

  // Обработчик кликов по кнопкам с data-route
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

  // 2. ДЕМОНСТРАЦИОННАЯ КНОПКА GOOGLE
  document.getElementById("googleButton")?.addEventListener("click", () => {
    alert("Авторизация Google пока не подключена. Вход в систему не выполнен.");
  });

  // 3. МОБИЛЬНОЕ МЕНЮ (Публичная часть)
  document.getElementById("menuToggle")?.addEventListener("click", () => {
    document.getElementById("navigation")?.classList.toggle("open");
  });

  document.querySelectorAll(".navigation a").forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("navigation")?.classList.remove("open");
    });
  });

  // 4. ВЫДВИЖНОЕ МЕНЮ (Админ-панель)
  if (dashboardScreen) {
    const sidebar = dashboardScreen.querySelector(".sidebar");
    const dashboardMain = dashboardScreen.querySelector(".dashboard-main");
    const dashHeader = dashboardScreen.querySelector(".dash-header");

    if (sidebar && dashboardMain && dashHeader) {
      // Создаем кнопку "Меню хранилища"
      const toggleBtn = document.createElement("button");
      toggleBtn.className = "mobile-menu-toggle";
      toggleBtn.innerHTML = "☰ Меню хранилища";
      dashboardMain.insertBefore(toggleBtn, dashHeader);

      // Создаем затемнение (оверлей)
      const overlay = document.createElement("div");
      overlay.className = "sidebar-overlay";
      dashboardScreen.appendChild(overlay);

      // Функции открытия/закрытия
      function openMenu() {
        sidebar.classList.add("open");
        overlay.classList.add("active");
      }

      function closeMenu() {
        sidebar.classList.remove("open");
        overlay.classList.remove("active");
      }

      toggleBtn.addEventListener("click", openMenu);
      overlay.addEventListener("click", closeMenu);

      // Автоматически закрываем меню при клике на ссылки внутри него
      sidebar.querySelectorAll(".side-link, .side-bottom button").forEach(link => {
        link.addEventListener("click", () => {
          if (window.innerWidth <= 850) {
            closeMenu();
          }
        });
      });
    }
  }

  // 5. НАЧАЛЬНЫЙ ЭКРАН (если в URL есть ?view=...)
  const initialRoute = new URLSearchParams(location.search).get("view");
  routeTo(initialRoute || "home");
});
