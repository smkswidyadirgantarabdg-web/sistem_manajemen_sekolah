window.Modules = window.Modules || {};
Modules.dashboard = async function() {
  Router.shell(UI.loading("Memuat dashboard..."));
  try {
    const d = await API.request("dashboard.summary");
    document.getElementById("content").innerHTML = `
      <div class="page-heading"><h2>Dashboard</h2><p>${UI.escape(d.className || "Kelas belum dikonfigurasi")}</p></div>
      <div class="cards">
        ${[
          ["👨‍🎓", d.totalStudents ?? 0, "Jumlah Siswa"],
          ["🟢", d.present ?? 0, "Hadir Hari Ini"],
          ["🟡", d.sick ?? 0, "Sakit"],
          ["🔵", d.permission ?? 0, "Izin"],
          ["🔴", d.absent ?? 0, "Alpa"]
        ].map(x => `<div class="stat-card"><span>${x[0]}</span><strong>${x[1]}</strong><small>${x[2]}</small></div>`).join("")}
      </div>
      <div class="grid-2">
        <section class="panel"><h3>Kehadiran</h3>
          <div class="progress"><i style="width:${Number(d.attendancePercent || 0)}%"></i></div>
          <strong>${Number(d.attendancePercent || 0).toFixed(1)}%</strong> kehadiran
        </section>
        <section class="panel"><h3>Jadwal Hari Ini</h3>
          ${d.todaySchedule?.length ? UI.table(["Jam","Mata Pelajaran","Guru","Ruang"],
            d.todaySchedule.map(x => [UI.escape(x.time), UI.escape(x.subject), UI.escape(x.teacher), UI.escape(x.room)]))
            : UI.empty("Jadwal belum tersedia.")}
        </section>
      </div>`;
    document.getElementById("pageTitle").textContent = "Dashboard";
    document.getElementById("pageSub").textContent = d.className || "";
  } catch (e) {
    document.getElementById("content").innerHTML = `<div class="error">${UI.escape(e.message)}</div>`;
  }
};

Modules.siswa = async function() {
  Router.shell(UI.loading("Memuat data siswa..."));
  try {
    const d = await API.request("student.list");
    document.getElementById("content").innerHTML = `<div class="page-heading"><h2>Data Siswa</h2><p>${d.items.length} siswa</p></div>` +
      UI.table(["No","NIS","Nama","L/P","Status"], d.items.map((x,i) => [i+1, UI.escape(x.nis), UI.escape(x.name), UI.escape(x.gender), UI.escape(x.status)]));
    document.getElementById("pageTitle").textContent = "Data Siswa";
  } catch(e) { document.getElementById("content").innerHTML = `<div class="error">${UI.escape(e.message)}</div>`; }
};

Modules.absensi = async function() {
  Router.shell(UI.loading("Memuat kehadiran..."));
  try {
    const d = await API.request("attendance.today");
    document.getElementById("content").innerHTML = `<div class="page-heading"><h2>Kehadiran</h2><p>${UI.escape(d.date || "")}</p></div>` +
      UI.table(["No","NIS","Nama","Status","Waktu"], d.items.map((x,i) => [i+1, UI.escape(x.nis), UI.escape(x.name), UI.escape(x.status), UI.escape(x.time || "-")]));
    document.getElementById("pageTitle").textContent = "Kehadiran";
  } catch(e) { document.getElementById("content").innerHTML = `<div class="error">${UI.escape(e.message)}</div>`; }
};

Modules.nilai = async function() {
  Router.shell(UI.loading("Memuat nilai..."));
  try {
    const d = await API.request("grade.list");
    document.getElementById("content").innerHTML = `<div class="page-heading"><h2>Daftar Nilai</h2><p>Data dari sumber nilai terhubung</p></div>` +
      UI.table(["No","NIS","Nama","Mata Pelajaran","Nilai"], d.items.map((x,i) => [i+1, UI.escape(x.nis), UI.escape(x.name), UI.escape(x.subject), UI.escape(x.score)]));
    document.getElementById("pageTitle").textContent = "Nilai";
  } catch(e) { document.getElementById("content").innerHTML = `<div class="error">${UI.escape(e.message)}</div>`; }
};

Modules.ledger = async function() {
  Router.shell(UI.loading("Menyusun ledger..."));
  try {
    const d = await API.request("ledger.generate");
    document.getElementById("content").innerHTML = `<div class="page-heading"><h2>Ledger Nilai</h2><p>${UI.escape(d.title || "")}</p></div>` +
      UI.table(d.headers, d.rows.map(r => r.map(c => UI.escape(c))));
    document.getElementById("pageTitle").textContent = "Ledger Nilai";
  } catch(e) { document.getElementById("content").innerHTML = `<div class="error">${UI.escape(e.message)}</div>`; }
};

Modules.jadwal = async function() {
  Router.shell(UI.loading("Memuat jadwal..."));
  try {
    const d = await API.request("schedule.today");
    document.getElementById("content").innerHTML = `<div class="page-heading"><h2>Jadwal Pelajaran</h2><p>${UI.escape(d.day || "")}</p></div>` +
      UI.table(["Jam","Mata Pelajaran","Guru","Ruang"], d.items.map(x => [UI.escape(x.time), UI.escape(x.subject), UI.escape(x.teacher), UI.escape(x.room)]));
    document.getElementById("pageTitle").textContent = "Jadwal Pelajaran";
  } catch(e) { document.getElementById("content").innerHTML = `<div class="error">${UI.escape(e.message)}</div>`; }
};

Modules.inventaris = async function() {
  Router.shell(UI.loading("Memuat inventaris..."));
  try {
    const d = await API.request("inventory.list");
    document.getElementById("content").innerHTML = `<div class="page-heading"><h2>Inventaris Kelas</h2><p>${d.items.length} item</p></div>` +
      UI.table(["Kode","Barang","Jumlah","Kondisi","Lokasi"], d.items.map(x => [UI.escape(x.code), UI.escape(x.name), UI.escape(x.qty), UI.escape(x.condition), UI.escape(x.location)]));
    document.getElementById("pageTitle").textContent = "Inventaris Kelas";
  } catch(e) { document.getElementById("content").innerHTML = `<div class="error">${UI.escape(e.message)}</div>`; }
};

Modules.organisasi = async function() {
  Router.shell(UI.loading("Memuat struktur organisasi..."));
  try {
    const d = await API.request("organization.get");
    document.getElementById("content").innerHTML = `<div class="page-heading"><h2>Organisasi Kelas</h2><p>Struktur pengurus kelas</p></div>` +
      UI.table(["Jabatan","Nama"], d.items.map(x => [UI.escape(x.position), UI.escape(x.name)]));
    document.getElementById("pageTitle").textContent = "Organisasi Kelas";
  } catch(e) { document.getElementById("content").innerHTML = `<div class="error">${UI.escape(e.message)}</div>`; }
};

Modules.laporan = async function() {
  Router.shell(`
    <div class="page-heading"><h2>Laporan</h2><p>Modul laporan siap dikembangkan.</p></div>
    <div class="grid-2">
      <section class="panel"><h3>Rekap Kehadiran</h3><p>Siapkan filter bulan/semester dan cetak laporan.</p></section>
      <section class="panel"><h3>Ledger</h3><p>Gunakan ledger untuk laporan akademik kelas.</p></section>
      <section class="panel"><h3>Inventaris</h3><p>Rekap barang dan kondisi inventaris kelas.</p></section>
      <section class="panel"><h3>Data Siswa</h3><p>Daftar dan profil siswa kelas.</p></section>
    </div>`);
  document.getElementById("pageTitle").textContent = "Laporan";
};
