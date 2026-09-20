window.APP_CONFIG = {
  // Setelah GAS Web App dideploy, masukkan URL /exec di sini.
  API_URL: "PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE",

  APP_NAME: "Sistem Manajemen Kelas",
  SCHOOL_NAME: "SMK Widya Dirgantara Bandung",
  LOGO: "./assets/logo-widya.png",

  // Versi API agar frontend dapat dikembangkan tanpa memutus versi lama.
  API_VERSION: "v1",

  // Cache browser hanya untuk data non-rahasia yang aman disimpan sementara.
  LOCAL_CACHE_TTL_MS: 5 * 60 * 1000
};
