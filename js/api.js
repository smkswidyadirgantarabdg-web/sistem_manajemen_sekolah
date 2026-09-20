window.API = (() => {
  async function request(action, params = {}, options = {}) {
    const token = window.Auth?.getToken?.() || "";
    const payload = {
      version: APP_CONFIG.API_VERSION,
      action,
      token,
      params
    };

    if (!APP_CONFIG.API_URL || APP_CONFIG.API_URL.includes("PASTE_")) {
      throw new Error("URL backend GAS belum dikonfigurasi.");
    }

    const response = await fetch(APP_CONFIG.API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      cache: "no-store",
      redirect: "follow"
    });

    const result = await response.json();

    if (!result.success) {
      if (result.code === "AUTH_REQUIRED" || result.code === "SESSION_EXPIRED") {
        Auth.logout();
      }
      throw new Error(result.message || "Permintaan gagal.");
    }

    return result.data;
  }

  return { request };
})();
