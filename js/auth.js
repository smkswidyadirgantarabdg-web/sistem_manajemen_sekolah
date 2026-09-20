window.Auth = (() => {
  const KEY = "smk_session";

  function getSession() {
    try { return JSON.parse(sessionStorage.getItem(KEY) || "null"); }
    catch (_) { return null; }
  }

  function getToken() {
    return getSession()?.token || "";
  }

  function setSession(session) {
    sessionStorage.setItem(KEY, JSON.stringify(session));
  }

  function clear() {
    sessionStorage.removeItem(KEY);
  }

  async function login(username, password) {
    const data = await API.request("auth.login", { username, password });
    setSession(data);
    return data;
  }

  function logout() {
    clear();
    location.hash = "#login";
    location.reload();
  }

  function isLoggedIn() {
    return !!getToken();
  }

  return { getSession, getToken, setSession, login, logout, isLoggedIn };
})();
