// Resolve all assets in ../assets so Vite bundles them cleanly for Vercel deployment
const assetModules = import.meta.glob('../assets/*', { eager: true, import: 'default' });
const snapshotModules = import.meta.glob('../assets/snapshot/*', { eager: true, import: 'default' });
const logoModules = import.meta.glob('../assets/logo/*', { eager: true, import: 'default' });

export function getAsset(filename) {
  const key = `../assets/${filename}`;
  return assetModules[key] || `./assets/${filename}`;
}

export function getSnapshot(filename) {
  const key = `../assets/snapshot/${filename}`;
  return snapshotModules[key] || `./assets/snapshot/${filename}`;
}

export function getLogo(filename) {
  const key = `../assets/logo/${filename}`;
  return logoModules[key] || `./assets/logo/${filename}`;
}

export const PROFILE = {
  name: 'Irgi Muhammad Fadll',
  shortName: 'Irgi',
  role: 'Mahasiswa Teknik Informatika & Full Stack Web Developer',
  cvUrl: getAsset('CV.pdf'),
  portraitUrl: getAsset('fotosaya.png'),
  heroSubjectUrl: getAsset('poto-belakang.png'),
  eventPhotoUrl: getSnapshot('bawah.jpg'),
  bio: 'Sebagai mahasiswa Teknik Informatika UIN Sunan Gunung Djati Bandung, saya berfokus pada pengembangan aplikasi web Full Stack, Data Science, dan AI yang tidak hanya fungsional, tetapi juga menghadirkan pengalaman digital yang menarik dan berdampak.',
  socials: [
    {
      name: 'LinkedIn',
      handle: 'linkedin.com/in/irgimf',
      url: 'https://www.linkedin.com/in/irgimf',
      icon: 'linkedin',
      color: '#0A66C2',
    },
    {
      name: 'Instagram',
      handle: '@igye__',
      url: 'https://www.instagram.com/igye__',
      icon: 'instagram',
      color: '#E4405F',
    },
    {
      name: 'GitHub',
      handle: 'github.com/Irgimf',
      url: 'https://github.com/Irgimf',
      icon: 'github',
      color: '#181717',
    },
    {
      name: 'WhatsApp',
      handle: '+62 823-1717-9877',
      url: 'https://wa.me/6282317179877',
      icon: 'whatsapp',
      color: '#25D366',
    },
  ],
};

export const EDUCATION = [
  {
    id: 1,
    institution: 'UIN Sunan Gunung Djati Bandung',
    period: '2024 – Sekarang',
    title: 'S1 Teknik Informatika',
    subtitle: 'Rekayasa Perangkat Lunak, Sistem Informasi & AI',
    badge: 'Undergraduate',
    logo: getLogo('uin.png'),
  },
  {
    id: 2,
    institution: 'SMA Terpadu Riyadlul Ulum',
    period: '2019 – 2023',
    title: 'Sekolah Menengah Atas (SMA)',
    subtitle: 'Berpikir Kritis, Terstruktur & Problem Solving',
    badge: 'High School',
    logo: getLogo('smp-sma-riyadlul-ulum.png'),
  },
  {
    id: 3,
    institution: "SMP Terpadu Riyadlul Ulum Wadda'wah",
    period: '2017 – 2019',
    title: 'Sekolah Menengah Pertama (SMP)',
    subtitle: 'Fondasi Observasi & Ketertarikan Teknologi',
    badge: 'Junior High',
    logo: getLogo('smp-sma-riyadlul-ulum.png'),
  },
  {
    id: 4,
    institution: 'SDN 1 Cihaurbeuti',
    period: '2011 – 2017',
    title: 'Sekolah Dasar (SD)',
    subtitle: 'Kedisiplinan, Nilai Moral & Rasa Ingin Tahu',
    badge: 'Elementary',
    logo: getLogo('sd.png'),
  },
];

export const EXPERIENCE = [
  {
    id: 1,
    organization: 'DPP INKINDO DKI JAKARTA',
    period: 'Sep 2026 – Des 2026',
    title: 'Full Stack Developer Intern',
    subtitle: 'Jakarta • Ekosistem Web Terintegrasi (Laravel & CI4)',
    badge: 'Internship',
    logo: getLogo('inkindo.png'),
    bullets: [
      'Merancang dan mengembangkan ekosistem dua aplikasi web terintegrasi—SIM-INKINDO DKI (CodeIgniter 4) dan Website Profil Resmi (Laravel)—dalam satu database MySQL (Single Source of Truth) yang terhubung melalui Single Sign-On (SSO) dan Role-Based Access Control (RBAC) untuk Admin, Anggota, serta Mitra Kerja.',
      'Membangun 8 modul Admin CMS dinamis, direktori anggota & SBU (JK/NJK), portal kemitraan, fitur dwibahasa (ID/EN), serta Asisten Virtual berbasis Gemini API, sekaligus melakukan audit keamanan (CSRF, CAPTCHA, proteksi upload/XSS) dan optimasi performa (caching, indeks database, konversi otomatis WebP, eliminasi N+1 query).',
      'Memberikan dukungan teknis TI dan mengelola operasional acara tingkat provinsi maupun nasional, termasuk Rakerprov INKINDO DKI, rapat sekretariat DPN & DPP, sosialisasi OSS-RBA, serta Bimtek Intensif Akselerasi AI untuk Jasa Konsultasi.',
    ],
  },
  {
    id: 2,
    organization: 'GDG Cloud Bandung',
    period: 'Des 2025',
    title: 'Event Runner — Cloud DevFest Bandung 2025',
    subtitle: 'Operasional Acara & Koordinasi Pembicara',
    badge: 'Volunteer',
    logo: getLogo('images.jpg'),
    bullets: [
      'Mendukung kelancaran Google Cloud DevFest Bandung 2025 pada 6 Desember 2025 melalui koordinasi operasional on-site, transisi sesi, serta pendampingan penyelenggara, pembicara, dan peserta.',
    ],
  },
  {
    id: 3,
    organization: 'MONITOR Teknik Informatika',
    period: 'Sep – Okt 2025',
    title: 'Komisi Disiplin (Komdis)',
    subtitle: 'Masa Orientasi Mahasiswa Baru Teknik Informatika',
    badge: 'Committee',
    logo: getLogo('himatif.jpg'),
    bullets: [
      'Menegakkan kedisiplinan peserta, memastikan tata tertib acara dipatuhi, serta membantu membentuk karakter dan mentalitas mahasiswa baru selama 13 September – 11 Oktober 2025.',
    ],
  },
  {
    id: 4,
    organization: 'Informatics Futsal Competition 2025',
    period: 'Sep 2025',
    title: 'Divisi Acara',
    subtitle: 'Turnamen Futsal SMA/Sederajat se-Bandung Raya',
    badge: 'Committee',
    logo: getLogo('himatif.jpg'),
    bullets: [
      'Mengelola jalannya pertandingan, memastikan jadwal acara terlaksana dengan baik, dan berkoordinasi lintas divisi pada 5–6 September 2025.',
    ],
  },
];

export const PROJECTS = [
  {
    slug: 'web-dpp-inkindo-dki-jakarta',
    title: 'Web DPP INKINDO DKI Jakarta',
    shortDesc:
      'Website profil resmi dan portal publik DPP INKINDO DKI Jakarta berbasis Laravel yang terintegrasi dengan SIM-INKINDO DKI via SSO, dilengkapi fitur dwibahasa (ID/EN) dan Asisten Virtual AI berbasis Gemini API.',
    fullDesc:
      'Website profil resmi dan portal publik DPP INKINDO DKI Jakarta yang dirancang menggunakan Laravel 12, MySQL, Tailwind CSS, dan Vite. Terhubung langsung dengan SIM-INKINDO DKI melalui satu database (Single Source of Truth) dan mekanisme Single Sign-On (SSO).',
    highlights: [
      'Direktori badan usaha anggota terdaftar & SBU (JK/NJK) secara real-time dari database terpadu',
      'Portal Mitra Kerja dinamis lengkap dengan profil mitra, produk, dan formulir pesan masuk',
      'Berita, publikasi, regulasi, dan konten Tentang Kami yang dikelola melalui 8 modul Admin CMS',
      'Dukungan dwibahasa (Indonesia / English) dan Asisten Virtual AI berbasis Gemini API',
      'Audit keamanan (CSRF, rate limiting, proteksi XSS/upload) dan optimasi performa (caching, konversi otomatis WebP, eliminasi N+1 query)',
    ],
    image: getAsset('inkindo-web.png'),
    github: 'https://github.com/Irgimf/inkindo-dki-web',
    demo: 'https://irgimf.github.io/inkindo-dki-web/',
    tech: [
      { name: 'PHP', icon: 'https://skillicons.dev/icons?i=php&theme=dark' },
      { name: 'Laravel', icon: 'https://skillicons.dev/icons?i=laravel&theme=dark' },
      { name: 'MySQL', icon: 'https://skillicons.dev/icons?i=mysql&theme=dark' },
      { name: 'Tailwind CSS', icon: 'https://skillicons.dev/icons?i=tailwind&theme=dark' },
      { name: 'Vite', icon: 'https://skillicons.dev/icons?i=vite&theme=dark' },
      { name: 'JavaScript', icon: 'https://skillicons.dev/icons?i=js&theme=dark' },
    ],
  },
  {
    slug: 'sim-inkindo-dki',
    title: 'SIM INKINDO DKI',
    shortDesc:
      'Sistem Informasi & Manajemen terpadu DPP INKINDO DKI Jakarta berbasis CodeIgniter 4 dan MySQL dengan RBAC (Admin, Anggota, Mitra Kerja), SSO, manajemen PT & SBU, serta 8 modul Admin CMS.',
    fullDesc:
      'SIM-INKINDO DKI (Sistem Informasi & Manajemen INKINDO DKI) merupakan aplikasi internal dan portal layanan terpadu untuk mengelola data badan usaha anggota, sertifikasi SBU (JK/NJK), pengajuan kemitraan, serta seluruh konten dinamis portal web resmi.',
    highlights: [
      'Autentikasi multi-role dengan RBAC (Admin, Anggota, Mitra Kerja), CAPTCHA, dan Single Sign-On (SSO) ke Website Profil Resmi',
      'Manajemen data perusahaan (PT), Sertifikat Badan Usaha (SBU JK/NJK), serta riwayat proyek/pekerjaan',
      'Portal Mitra Kerja dengan alur onboarding, persetujuan admin, manajemen produk, dan kotak pesan konsultasi',
      '8 modul Admin CMS dinamis untuk mengatur Beranda, Berita, Tentang Kami, Regulasi, Lelang, Ketentuan Mitra, Background, dan Footer',
    ],
    image: getAsset('sim-inkindo-dki.png'),
    github: 'https://github.com/Irgimf/sistem-manajemen-data-pt',
    demo: '',
    tech: [
      { name: 'PHP', icon: 'https://skillicons.dev/icons?i=php&theme=dark' },
      { name: 'CodeIgniter 4', icon: getAsset('codeigniter.svg') },
      { name: 'MySQL', icon: 'https://skillicons.dev/icons?i=mysql&theme=dark' },
      { name: 'Bootstrap', icon: 'https://skillicons.dev/icons?i=bootstrap&theme=dark' },
      { name: 'JavaScript', icon: 'https://skillicons.dev/icons?i=js&theme=dark' },
    ],
  },
  {
    slug: 'web-dapodik-kota-bandung',
    title: 'Web Dapodik Kota Bandung',
    shortDesc:
      'Sistem informasi data pokok pendidikan terpadu untuk Kota Bandung menggunakan arsitektur full stack modern React, FastAPI, dan PostgreSQL.',
    fullDesc:
      'Sistem informasi data pokok pendidikan terpadu untuk Kota Bandung yang dibangun dengan arsitektur full stack modern untuk manajemen dan visualisasi data pendidikan berskala besar. Demo Akun — Username: viewer | Password: viewer.',
    highlights: [
      'Frontend responsif dan interaktif menggunakan React dan Tailwind CSS',
      'RESTful API performa tinggi berbasis Python FastAPI dengan database PostgreSQL',
      'Visualisasi statistik pendidikan dan manajemen data terstruktur',
      'Ter-deploy di Vercel dengan akses akun demo (viewer / viewer)',
    ],
    image: getAsset('dashboard-dapodik.png'),
    github: 'https://github.com/Irgimf/dashboard-dapodik',
    demo: 'https://dashboard-dapodik.vercel.app',
    tech: [
      { name: 'React', icon: 'https://skillicons.dev/icons?i=react&theme=dark' },
      { name: 'Tailwind CSS', icon: 'https://skillicons.dev/icons?i=tailwind&theme=dark' },
      { name: 'Python', icon: 'https://skillicons.dev/icons?i=python&theme=dark' },
      { name: 'FastAPI', icon: 'https://skillicons.dev/icons?i=fastapi&theme=dark' },
      { name: 'PostgreSQL', icon: 'https://skillicons.dev/icons?i=postgres&theme=dark' },
      { name: 'Vercel', icon: 'https://skillicons.dev/icons?i=vercel&theme=dark' },
    ],
  },
  {
    slug: 'sistem-pengawasan-parlemen',
    title: 'Sistem Pengawasan Parlemen',
    shortDesc:
      'Aplikasi web PWA end-to-end berbasis Laravel dan MySQL untuk pengelolaan laporan pengawasan Parlemen Remaja DPR RI oleh tim LSPP 306.',
    fullDesc:
      'Aplikasi web Progressive Web App (PWA) end-to-end berbasis Laravel dan MySQL untuk pengelolaan laporan pengawasan Parlemen Remaja DPR RI oleh tim LSPP 306.',
    highlights: [
      'Mendukung instalasi mobile mandiri (PWA) untuk akses cepat di lapangan',
      'Auto-generate dokumen laporan PDF kustom sesuai format resmi',
      'Integrasi tanda tangan elektronik langsung pada aplikasi',
    ],
    image: getAsset('sistem-pengawasan.png'),
    github: 'https://github.com/Irgimf/pengawasan-parlemen',
    demo: '',
    tech: [
      { name: 'PHP', icon: 'https://skillicons.dev/icons?i=php&theme=dark' },
      { name: 'Laravel', icon: 'https://skillicons.dev/icons?i=laravel&theme=dark' },
      { name: 'MySQL', icon: 'https://skillicons.dev/icons?i=mysql&theme=dark' },
      { name: 'Tailwind CSS', icon: 'https://skillicons.dev/icons?i=tailwind&theme=dark' },
      { name: 'JavaScript', icon: 'https://skillicons.dev/icons?i=js&theme=dark' },
    ],
  },
  {
    slug: 'cekduit',
    title: 'Cekduit',
    shortDesc:
      'Aplikasi web manajemen keuangan pribadi berbasis PHP, Laravel 12, dan MySQL dengan visualisasi statistik interaktif menggunakan Chart.js.',
    fullDesc:
      'Cekduit adalah aplikasi web manajemen keuangan yang dibangun dengan PHP, Laravel 12, dan MySQL untuk mencatat pemasukan, pengeluaran, serta memantau arus kas secara visual.',
    highlights: [
      'Pencatatan transaksi harian, kategori pemasukan dan pengeluaran',
      'Dashboard visualisasi data statistik interaktif berbasis Chart.js',
      'Antarmuka bersih dan responsif menggunakan Bootstrap',
    ],
    image: getAsset('cekduit.png'),
    github: 'https://github.com/Irgimf/cekduit',
    demo: 'https://cekduit.alwaysdata.net',
    tech: [
      { name: 'PHP', icon: 'https://skillicons.dev/icons?i=php&theme=dark' },
      { name: 'Laravel', icon: 'https://skillicons.dev/icons?i=laravel&theme=dark' },
      { name: 'MySQL', icon: 'https://skillicons.dev/icons?i=mysql&theme=dark' },
      { name: 'Bootstrap', icon: 'https://skillicons.dev/icons?i=bootstrap&theme=dark' },
      { name: 'JavaScript', icon: 'https://skillicons.dev/icons?i=js&theme=dark' },
    ],
  },
  {
    slug: 'absolute-cinema',
    title: 'Absolute Cinema',
    shortDesc:
      'Aplikasi web PWA interaktif untuk menjelajahi katalog film, memberi rating, dan menulis ulasan dengan integrasi API TMDB dan Spring Boot.',
    fullDesc:
      'Aplikasi web PWA interaktif untuk menjelajahi katalog film, memberi rating, dan menulis ulasan. Di proyek tim ini, saya berada di divisi Service & API yang bertanggung jawab atas integrasi API eksternal TMDB serta routing controller.',
    highlights: [
      'Integrasi API eksternal The Movie Database (TMDB) untuk katalog film real-time',
      'Arsitektur backend Java Spring Boot & MySQL dengan manajemen rating dan ulasan',
      'Dukungan Progressive Web App (PWA) untuk pengalaman layaknya aplikasi native',
    ],
    image: getAsset('absolutecinema.png'),
    github: 'https://github.com/karimaulya/AbsoluteCinema',
    demo: 'https://absolutecinema.adrianz.me/',
    tech: [
      { name: 'Java', icon: 'https://skillicons.dev/icons?i=java&theme=dark' },
      { name: 'Spring Boot', icon: 'https://skillicons.dev/icons?i=spring&theme=dark' },
      { name: 'MySQL', icon: 'https://skillicons.dev/icons?i=mysql&theme=dark' },
      { name: 'JavaScript', icon: 'https://skillicons.dev/icons?i=js&theme=dark' },
    ],
  },
  {
    slug: 'cek-penyakit-kuning',
    title: 'Cek Penyakit Kuning',
    shortDesc:
      'Aplikasi web interaktif untuk membantu mendeteksi gejala penyakit kuning dengan antarmuka front-end yang ramah pengguna.',
    fullDesc:
      'Aplikasi web yang dirancang untuk membantu pengguna mendeteksi gejala awal penyakit kuning secara mandiri melalui serangkaian pertanyaan interaktif dengan tampilan front-end yang ramah pengguna.',
    highlights: [
      'Alur deteksi gejala interaktif dan mudah dipahami',
      'Desain responsif menggunakan HTML5, CSS3, dan Vanilla JavaScript',
    ],
    image: getAsset('penyakit-kuning.png'),
    github: 'https://github.com/Irgimf/cek-penyakit-kuning',
    demo: 'https://irgimf.github.io/cek-penyakit-kuning/',
    tech: [
      { name: 'HTML5', icon: 'https://skillicons.dev/icons?i=html&theme=dark' },
      { name: 'CSS3', icon: 'https://skillicons.dev/icons?i=css&theme=dark' },
      { name: 'JavaScript', icon: 'https://skillicons.dev/icons?i=js&theme=dark' },
    ],
  },
  {
    slug: 'data-segmentation-and-classification',
    title: 'Data Segmentation & Classification',
    shortDesc:
      'Proyek Machine Learning untuk segmentasi (clustering) dan klasifikasi data menggunakan Python dan TensorFlow.',
    fullDesc:
      'Proyek submission akhir dari kelas Belajar Machine Learning untuk Pemula di Dicoding Indonesia x DBS Foundation. Menerapkan teknik preprocessing, clustering untuk segmentasi, dan model klasifikasi menggunakan Python.',
    highlights: [
      'Exploratory Data Analysis (EDA), feature scaling, dan data cleaning',
      'Segmentasi data dengan algoritma clustering serta evaluasi metrik kualitas cluster',
      'Pelatihan dan evaluasi model klasifikasi menggunakan Python & TensorFlow',
    ],
    image: getAsset('ml-project.png'),
    github: 'https://github.com/Irgimf/data-segmentation-and-classification',
    demo: '',
    tech: [
      { name: 'Python', icon: 'https://skillicons.dev/icons?i=python&theme=dark' },
      { name: 'TensorFlow', icon: 'https://skillicons.dev/icons?i=tensorflow&theme=dark' },
    ],
  },
  {
    slug: 'dashboard-persebaran-pelanggan-olist',
    title: 'Dashboard Persebaran Pelanggan Olist',
    shortDesc:
      'Proyek analisis data dan visualisasi interaktif mengenai persebaran wilayah pelanggan e-commerce Olist menggunakan Python dan Streamlit.',
    fullDesc:
      'Proyek analisis data dan dashboard interaktif untuk memetakan persebaran geografis pelanggan e-commerce Olist di Brasil menggunakan Python, Pandas, Matplotlib, Seaborn, Folium, dan Streamlit.',
    highlights: [
      'Analisis distribusi pelanggan dan transaksi e-commerce lintas negara bagian',
      'Pemetaan geografis interaktif menggunakan Folium',
      'Dashboard analitik interaktif yang dibangun dengan Streamlit',
    ],
    image: getAsset('dashboard-olist.png'),
    github: 'https://github.com/Irgimf/Dashboard-Persebaran-Wilayah-Pelanggan-Olist',
    demo: '',
    tech: [
      { name: 'Python', icon: 'https://skillicons.dev/icons?i=python&theme=dark' },
      { name: 'Pandas', badge: 'PD' },
      { name: 'NumPy', badge: 'NP' },
      { name: 'Matplotlib', badge: 'PLT' },
      { name: 'Seaborn', badge: 'SNS' },
      { name: 'Folium', badge: 'MAP' },
      { name: 'Streamlit', badge: 'ST' },
    ],
  },
];

export const CERTIFICATES = [
  {
    id: 'cert-1',
    title: 'Memulai Pemrograman dengan Python (2026)',
    issuer: 'Dicoding Indonesia x DBS Foundation',
    image: getAsset('sertifikat1.png'),
  },
  {
    id: 'cert-2',
    title: 'Belajar Dasar Structured Query Language (SQL) (2026)',
    issuer: 'Dicoding Indonesia x DBS Foundation',
    image: getAsset('sertifikat2.png'),
  },
  {
    id: 'cert-3',
    title: 'Belajar Strategi Pengembangan Diri (2026)',
    issuer: 'Dicoding Indonesia x DBS Foundation',
    image: getAsset('sertifikat3.png'),
  },
  {
    id: 'cert-4',
    title: 'Berinovasi dengan AI (2026)',
    issuer: 'Kemenpora x Yayasan Plan International Indonesia',
    image: getAsset('sertifikat4.png'),
  },
  {
    id: 'cert-5',
    title: 'Belajar Machine Learning untuk Pemula (2026)',
    issuer: 'Dicoding Indonesia x DBS Foundation',
    image: getAsset('sertifikat5.png'),
  },
  {
    id: 'cert-6',
    title: 'Belajar Dasar Data Science (2026)',
    issuer: 'Dicoding Indonesia x DBS Foundation',
    image: getAsset('sertifikat6.png'),
  },
  {
    id: 'cert-7',
    title: 'Belajar Fundamental Analisis Data (2026)',
    issuer: 'Dicoding Indonesia x DBS Foundation',
    image: getAsset('sertifikat7.png'),
  },
  {
    id: 'cert-8',
    title: 'Linux Essentials (2026)',
    issuer: 'Cisco Networking Academy x NDG',
    image: getAsset('linux.png'),
  },
];

export const AWARDS = [
  {
    id: 'award-1',
    title: 'Peserta Kontingen Jawa Barat — Cabang Film Pendek POSPENAS IX (2022)',
    issuer: 'Direktorat Jenderal Pendidikan Islam, Kementerian Agama RI',
    description:
      'Menjadi perwakilan kontingen Provinsi Jawa Barat dalam ajang Pekan Olahraga dan Seni antar Pondok Pesantren Tingkat Nasional (POSPENAS) IX.',
    image: getAsset('penghargaan1.jpg'),
  },
];

export const GALLERY_ITEMS = [
  { id: 'gal-1', src: getSnapshot('REIN1810(1).jpg'), rotate: -3, top: '16%', left: '42%', width: 190, z: 7, dx: 0, dy: -25 },
  { id: 'gal-2', src: getSnapshot('12.jpg'), rotate: 4, top: '3%', left: '22%', width: 235, z: 4, dx: -75, dy: -80 },
  { id: 'gal-3', src: getSnapshot('13.jpg'), rotate: -5, top: '12%', left: '4%', width: 230, z: 3, dx: -135, dy: -55 },
  { id: 'gal-4', src: getSnapshot('20251206_154656763.jpg'), rotate: 5, top: '42%', left: '3%', width: 245, z: 6, dx: -145, dy: 30 },
  { id: 'gal-5', src: getSnapshot('20251206_155301044.jpg'), rotate: -4, top: '66%', left: '14%', width: 235, z: 5, dx: -105, dy: 95 },
  { id: 'gal-6', src: getSnapshot('IMG-20251005-WA0040.jpg'), rotate: 3, top: '32%', left: '23%', width: 220, z: 4, dx: -65, dy: 5 },
  { id: 'gal-7', src: getSnapshot('IMG20240604055409.jpg'), rotate: -5, top: '4%', left: '56%', width: 235, z: 4, dx: 65, dy: -85 },
  { id: 'gal-8', src: getSnapshot('IMG_1199.JPG'), rotate: 4, top: '14%', left: '75%', width: 235, z: 5, dx: 135, dy: -55 },
  { id: 'gal-9', src: getSnapshot('IMG_2745.JPG'), rotate: -3, top: '70%', left: '38%', width: 265, z: 6, dx: -10, dy: 105 },
  { id: 'gal-10', src: getSnapshot('IMG_8819(1).jpg'), rotate: 5, top: '38%', left: '74%', width: 240, z: 5, dx: 145, dy: 20 },
  { id: 'gal-11', src: getSnapshot('IMG_8832(1).jpg'), rotate: -6, top: '64%', left: '64%', width: 245, z: 6, dx: 110, dy: 90 },
  { id: 'gal-12', src: getSnapshot('REIN2904(1).jpg'), rotate: 3, top: '28%', left: '58%', width: 225, z: 3, dx: 70, dy: -10 },
  { id: 'gal-13', src: getSnapshot('WhatsApp Image 2026-06-17 at 13.53.49.jpeg'), rotate: -2, top: '54%', left: '46%', width: 245, z: 4, dx: 25, dy: 50 },
];
