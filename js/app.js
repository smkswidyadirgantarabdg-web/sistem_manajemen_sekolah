document.addEventListener("DOMContentLoaded", async () => {
  const render = async () => {
    if (!Auth.isLoggedIn()) {
      Router.go("login");
      return;
    }
    await Router.go(Router.current());
  };

  window.addEventListener("hashchange", render);
  await render();
});
