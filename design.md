# Dokumen Desain Portofolio (design.md)
**Proyek:** Redesain Visual Website Portofolio Eka Faizin Hidayat  
**Target Pemilik:** Eka Faizin Hidayat (Law Student & Writer)  
**Palet Warna Baru:** `#000000` (Pitch Black), `#222222` (Dark Charcoal), `#1DCD9F` (Mint Green / Emerald Teal), `#169976` (Deep Teal Accent)

---

## 1. Konsep & Filosofi Desain

Redesain ini memadukan karakter profesional dunia hukum dan kepenulisan yang tegas dengan sentuhan modernitas digital. Penggunaan warna gelap dominan melambangkan ketegasan, integritas, dan kedalaman (depth), sementara aksen warna hijau mint (`#1DCD9F` dan `#169976`) memberikan kontras tinggi yang melambangkan inovasi, pertumbuhan, serta kejelasan berpikir.

### Spesifikasi Palet Warna:
*   **Background Utama (`#000000`):** Memberikan kesan premium, sleek, dan meminimalisir kelelahan mata (dark mode native).
*   **Background Komponen (`#222222`):** Digunakan untuk kartu kontainer (cards), section penunjang, dan background form agar hirarki visual tetap terjaga.
*   **Aksen Utama (`#1DCD9F`):** Digunakan untuk elemen penarik perhatian utama (buttons, active link, hover state, highlights).
*   **Aksen Sekunder/Borders (`#169976`):** Digunakan untuk gradasi, shadow neon halus, garis pembatas, dan link pendukung.

---

## 2. Struktur Informasi & Konten (Berdasarkan Web Asli)

Struktur halaman dipertahankan dalam satu halaman interaktif (single page application style) dengan segmentasi yang lebih rapi:

1.  **Navigation Bar:** Sticky navbar dengan logo inisial/nama dan link navigasi cepat (*About*, *Portfolio*, *Discussion*).
2.  **Hero Section:** Kalimat perkenalan kuat sebagai Mahasiswa Hukum Tata Negara, Penulis Opini & Riset Akademik, lengkap dengan tombol CTA (*Portofolio* & *Unduh CV*).
3.  **About Me Section:** Deskripsi mendalam mengenai visi pemilik di dunia hukum ketatanegaraan, kebijakan publik, dan riset ilmiah.
4.  **Education History:** Lini masa (timeline) pendidikan dari SD hingga S1 Hukum Tata Negara di UIN KHAS Jember.
5.  **Portfolio Showcase:** 
    *   *Publications:* Google Scholar, Kumparan, Kompasiana.
    *   *Certificates & Achievements:* Daftar pencapaian akademik dan non-akademik.
    *   *Experience:* Pengalaman Magang (PN Jember Kelas IA) dan Organisasi/Volunteer (PUSHPASI, LRDC, YOTers, LPI).
6.  **Discussion Room:** Buku tamu (guestbook) interaktif untuk mengirim pesan kolaborasi langsung di halaman.
7.  **Footer:** Copyright dan tautan media sosial.

---

## 3. Implementasi Kode CSS & Panduan Visual

Berikut adalah cetak biru CSS styling untuk menerapkan palet warna baru pada struktur HTML portofolio:

```css
/* ==========================================================================
   1. GLOBAL STYLES & VARIABLES
   ========================================================================== */
:root {
  --bg-primary: #000000;
  --bg-secondary: #222222;
  --accent-mint: #1DCD9F;
  --accent-teal: #169976;
  --text-main: #FFFFFF;
  --text-muted: #B3B3B3;
  --transition-smooth: all 0.3s ease;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-main);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  margin: 0;
  padding: 0;
}

/* ==========================================================================
   2. NAVBAR
   ========================================================================== */
.navbar {
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--bg-secondary);
}

.navbar-brand {
  color: var(--accent-mint);
  font-weight: 700;
}

.nav-link {
  color: var(--text-muted);
}

.nav-link:hover, .nav-link.active {
  color: var(--accent-mint);
  text-shadow: 0 0 8px rgba(29, 205, 159, 0.4);
}

/* ==========================================================================
   3. HERO SECTION
   ========================================================================== */
.hero-section {
  background: radial-gradient(circle at top right, rgba(22, 153, 118, 0.15), transparent 50%);
}

.hero-title span {
  color: var(--accent-mint);
}

/* Call to Action Buttons */
.btn-primary-mint {
  background-color: var(--accent-mint);
  color: var(--bg-primary);
  font-weight: 600;
  border: none;
  transition: var(--transition-smooth);
}

.btn-primary-mint:hover {
  background-color: var(--accent-teal);
  box-shadow: 0 0 15px rgba(29, 205, 159, 0.5);
  color: #ffffff;
}

.btn-outline-mint {
  border: 2px solid var(--accent-mint);
  color: var(--accent-mint);
  background: transparent;
  font-weight: 600;
  transition: var(--transition-smooth);
}

.btn-outline-mint:hover {
  background: rgba(29, 205, 159, 0.1);
  color: var(--accent-mint);
  border-color: var(--accent-teal);
}

/* ==========================================================================
   4. CARDS & SECTIONS (Portfolio, Education, Exp)
   ========================================================================== */
.section-title {
  border-left: 4px solid var(--accent-mint);
  padding-left: 12px;
}

.custom-card {
  background-color: var(--bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: var(--transition-smooth);
}

.custom-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent-mint);
  box-shadow: 0 8px 24px rgba(29, 205, 159, 0.1);
}

/* Timeline Components */
.timeline-item {
  border-left: 2px solid var(--bg-secondary);
  position: relative;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 5px;
  width: 10px;
  height: 10px;
  background-color: var(--accent-mint);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--accent-mint);
}

/* ==========================================================================
   5. DISCUSSION ROOM (Guestbook)
   ========================================================================== */
.form-control-dark {
  background-color: var(--bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-main);
}

.form-control-dark:focus {
  border-color: var(--accent-mint);
  box-shadow: 0 0 8px rgba(29, 205, 159, 0.25);
  background-color: var(--bg-secondary);
  color: var(--text-main);
}

.message-box {
  background-color: var(--bg-secondary);
  border-left: 3px solid var(--accent-teal);
}
```

---

## 4. Efek Interaktif & State Panduan UX

Untuk memaksimalkan palet warna kontras tinggi ini, beberapa transisi micro-interaction direkomendasikan:

*   **Fokus Teks / Input:** Saat user memilih input form di *Discussion Room*, border berubah perlahan dari abu-abu tipis menjadi `#1DCD9F` dengan efek *glow opacity* rendah.
*   **Hover Tab Publikasi:** Ketika menyorot menu tab/kategori (Publications, Certificates, Experience), teks bertransformasi menjadi warna mint dengan garis bawah (underline) animasi yang melebar dari tengah ke samping menggunakan transisi warna `#169976`.
*   **Modal Sertifikat:** Saat gambar sertifikat diperbesar (Zoomed Certificate), overlay latar belakang menggunakan warna `#000000` dengan opasitas 90% sehingga fokus penuh tertuju pada dokumen prestasi yang ditampilkan.
