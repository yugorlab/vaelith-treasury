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

  // ==========================================
  // ВЫДВИЖНОЕ МЕНЮ ДЛЯ АДМИН-ПАНЕЛИ (MOBILE)
  // ==========================================
  if (dashboardScreen) {
    const sidebar = dashboardScreen.querySelector(".sidebar");
    const dashboardMain = dashboardScreen.querySelector(".dashboard-main");
    const dashHeader = dashboardScreen.querySelector(".dash-header");
    
    if (sidebar && dashboardMain && dashHeader) {
    // 1. Создаем кнопку открытия меню
      const toggleBtn = document.createElement("button");
      toggleBtn.className = "mobile-menu-toggle";
      toggleBtn.innerHTML = "☰ Меню хранилища";
    
    // Вставляем кнопку перед заголовком (в начало контентной части)
      dashboardMain.insertBefore(toggleBtn, dashHeader);

    // 2. Создаем темный фон (оверлей)
      const overlay = document.createElement("div");
      overlay.className = "sidebar-overlay";
      dashboardScreen.appendChild(overlay);

    // 3. Логика открытия/закрытия
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

    // 4. Закрываем меню при клике на любую ссылку/вкладку в сайдбаре
      sidebar.querySelectorAll(".side-link, .side-brand, .side-bottom button").forEach(link => {
        link.addEventListener("click", () => {
          if (window.innerWidth <= 850) {
            closeMenu();
          }
        });
      });
    }
  }
});
