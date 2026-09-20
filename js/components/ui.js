window.UI = {
  escape(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  },

  loading(message = "Memuat data...") {
    return `<div class="loading"><span class="spinner"></span>${this.escape(message)}</div>`;
  },

  empty(message = "Belum ada data.") {
    return `<div class="empty">${this.escape(message)}</div>`;
  },

  table(headers, rows) {
    if (!rows.length) return this.empty("Belum ada data.");
    return `<div class="table-wrap"><table>
      <thead><tr>${headers.map(h => `<th>${this.escape(h)}</th>`).join("")}</tr></thead>
      <tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c ?? ""}</td>`).join("")}</tr>`).join("")}</tbody>
    </table></div>`;
  }
};
