window.Router = (() => {
  const routes = {
    dashboard: () => Modules.dashboard(),
    siswa: () => Modules.siswa(),
    absensi: () => Modules.absensi(),
    nilai: () => Modules.nilai(),
    ledger: () => Modules.ledger(),
    jadwal: () => Modules.jadwal(),
    inventaris: () => Modules.inventaris(),
    organisasi: () => Modules.organisasi(),
    laporan: () => Modules.laporan()
  };

  function current() {
    return (location.hash || "#dashboard").replace("#", "").split("?")[0] || "dashboard";
  }

  async function go(route) {
    if (!Auth.isLoggedIn()) {
      renderLogin();
      return;
    }
    const fn = routes[route] || routes.dashboard;
    await fn();
    setActive(route);
  }

  function setActive(route) {
    document.querySelectorAll("[data-route]").forEach(el => {
      el.classList.toggle("active", el.dataset.route === route);
    });
  }

  function renderLogin() {
    document.body.innerHTML = `
      <main class="login-page">
        <section class="login-card">
          <img class="login-logo" src="${APP_CONFIG.LOGO}" alt="Logo SMK Widya Dirgantara">
          <h1>SISTEM MANAJEMEN<br>KELAS</h1>
          <p class="login-subtitle">Masuk ke akun Anda untuk mengelola administrasi dan kegiatan kelas.</p>
          <form id="loginForm">
            <label class="input-box">
              <span class="input-icon">👤</span>
              <input id="username" autocomplete="username" placeholder="Username" required>
            </label>
            <label class="input-box">
              <span class="input-icon">🔒</span>
              <input id="password" type="password" autocomplete="current-password" placeholder="Password" required>
              <button type="button" class="eye" id="togglePassword">◉</button>
            </label>
            <button class="primary-btn" type="submit">MASUK</button>
            <div id="loginMessage" class="form-message"></div>
          </form>
          <div class="login-footer">SMK WIDYA DIRGANTARA • BANDUNG</div>
        </section>
      </main>`;

    document.getElementById("togglePassword").onclick = () => {
      const p = document.getElementById("password");
      p.type = p.type === "password" ? "text" : "password";
    };

    document.getElementById("loginForm").onsubmit = async (e) => {
      e.preventDefault();
      const msg = document.getElementById("loginMessage");
      msg.textContent = "Memproses...";
      try {
        await Auth.login(
          document.getElementById("username").value.trim(),
          document.getElementById("password").value
        );
        location.hash = "#dashboard";
        location.reload();
      } catch (err) {
        msg.textContent = err.message;
      }
    };
  }

  function shell(content = "") {
    document.body.innerHTML = `
      <div class="app-shell">
        <aside class="sidebar">
          <div class="brand">
            <img src="${APP_CONFIG.LOGO}" alt="Logo">
            <div><strong>SISTEM<br>MANAJEMEN KELAS</strong><small>SMK WIDYA DIRGANTARA</small></div>
          </div>
          <nav>
            ${[
              ["dashboard","🏠","Dashboard"],
              ["siswa","👨‍🎓","Data Siswa"],
              ["absensi","📋","Kehadiran"],
              ["nilai","📚","Nilai"],
              ["ledger","📊","Ledger Nilai"],
              ["jadwal","🗓️","Jadwal"],
              ["inventaris","📦","Inventaris"],
              ["organisasi","👥","Organisasi Kelas"],
              ["laporan","📄","Laporan"]
            ].map(([r,i,t]) => `<a href="#${r}" data-route="${r}"><span>${i}</span>${t}</a>`).join("")}
          </nav>
          <button id="logoutBtn" class="logout-btn">↪ Keluar</button>
        </aside>
        <main class="main">
          <header class="topbar">
            <button class="menu-btn" id="menuBtn">☰</button>
            <div>
              <strong id="pageTitle">Sistem Manajemen Kelas</strong>
              <span id="pageSub">Memuat...</span>
            </div>
            <div class="user-chip">👤 <span>${UI.escape(Auth.getSession()?.name || "")}</span></div>
          </header>
          <section id="content" class="content">${content}</section>
        </main>
      </div>`;

    document.getElementById("logoutBtn").onclick = () => Auth.logout();
    document.getElementById("menuBtn").onclick = () => document.querySelector(".sidebar").classList.toggle("open");
    document.querySelectorAll("[data-route]").forEach(a => a.onclick = () => {
      document.querySelector(".sidebar")?.classList.remove("open");
    });
  }

  return { current, go, shell };
})();
