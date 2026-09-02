export interface ProjectCaseStudy {
  overview: string;
  background: string;
  role: string;
  category: string;
  timeline: string;
  deliverables: string[];
  architecture: {
    title: string;
    description: string;
    points: string[];
  }[];
  features: {
    title: string;
    description: string;
  }[];
  systemDesign: string[];
  learnings: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  stacks: string[];
  isFeatured: boolean;
  categoryType: 'web' | 'it-support' | 'ecommerce';
  impactHighlights: string[];
  demoUrl?: string;
  githubUrl?: string;
  detail: string;
  accentColor?: string;
  caseStudy: ProjectCaseStudy;
}

export const PROJECTS: Project[] = [
  {
    id: 'gegares',
    title: 'Platform E-Commerce "GEGARES"',
    subtitle: 'Aplikasi E-Commerce Kuliner Tradisional & Luaran Penulisan Ilmiah',
    description:
      'Aplikasi e-commerce fungsional produk kuliner tradisional dengan katalog interaktif, keranjang belanja, checkout, dan manajemen inventaris sebagai luaran resmi Penulisan Ilmiah Universitas Gunadarma.',
    image: '/images/gegares-live.png',
    stacks: ['Laravel 12', 'MySQL', 'Tailwind CSS', 'PHP', 'Blade'],
    isFeatured: true,
    categoryType: 'ecommerce',
    impactHighlights: ['Full-Stack Laravel 12', 'Optimasi Query MySQL', 'Dokumentasi UML/ERD'],
    demoUrl: 'https://gegares.shop',
    githubUrl: 'https://github.com/greedykid',
    detail:
      'GEGARES adalah platform e-commerce yang dibangun penuh sebagai implementasi dan luaran resmi proyek Penulisan Ilmiah tingkat sarjana di Universitas Gunadarma.\n\nFitur & Arsitektur:\n- Mengembangkan arsitektur backend MVC menggunakan framework Laravel dan perancangan skema database relasional MySQL.\n- Optimasi query data transaksi dan inventaris produk.\n- Antarmuka modern, interaktif, dan responsif dengan Tailwind CSS.\n- Dokumentasi perancangan sistem komprehensif meliputi Use Case Diagram, Activity Diagram, Sequence Diagram, dan Entity Relationship Diagram (ERD).',
    accentColor: '#6366f1',
    caseStudy: {
      overview:
        'GEGARES adalah platform e-commerce kuliner modern yang dibangun dari tahap perancangan arsitektur hingga deployment produksi. Proyek ini memfasilitasi transaksi jual-beli kuliner secara efisien dengan alur belanja yang intuitif, pencatatan transaksi otomatis, dan manajemen inventaris real-time bagi pengelola.',
      background:
        'Banyak pelaku usaha kuliner lokal masih mengandalkan pencatatan manual dan pemesanan via pesan singkat yang rawan kesalahan data dan pencatatan stok. GEGARES dirancang sebagai solusi digital terintegrasi untuk mendigitalkan katalog menu, memvalidasi pesanan otomatis, dan memberikan pengalaman berbelanja modern bagi konsumen.',
      role: 'Fullstack Web Developer & System Analyst',
      category: 'E-Commerce Platform',
      timeline: 'Sep 2025 – Feb 2026 (Penulisan Ilmiah Universitas Gunadarma)',
      deliverables: [
        'Web Application E-Commerce Fungsional',
        'Skema Database Relasional MySQL & Optimasi Query',
        'Dokumentasi Rekayasa Perangkat Lunak (ERD, UML, Use Case)',
        'Antarmuka Responsif (Mobile, Tablet, Desktop) dengan Tailwind CSS',
      ],
      architecture: [
        {
          title: 'Backend Arsitektur MVC & Framework Laravel 12',
          description:
            'Mengimplementasikan pola Model-View-Controller untuk memisahkan logika bisnis, perutean dinamis, dan representasi data secara modular dan aman.',
          points: [
            'Routing RESTful dan middleware validasi keamanan form (CSRF, sanitasi input).',
            'Eloquent ORM untuk relasi data transaksi, item pesanan, dan kategori produk.',
            'Struktur kode terstandarisasi untuk memudahkan pemeliharaan jangka panjang.',
          ],
        },
        {
          title: 'Perancangan Database Relasional MySQL',
          description:
            'Merancang struktur database yang ternormalisasi (3NF) untuk menjamin integritas relasi antar tabel transaksi, detail pesanan, dan stok barang.',
          points: [
            'Pengindeksan kolom kunci untuk mempercepat query pencarian produk dan riwayat transaksi.',
            'Foreign key constraints dan foreign cascade untuk konsistensi data.',
            'Optimasi query agregat untuk pembuatan laporan penjualan.',
          ],
        },
      ],
      features: [
        {
          title: 'Katalog Produk & Penyaringan Kategori Dinamis',
          description:
            'Menampilkan menu kuliner dengan detail foto, deskripsi porsi, harga, dan filter kategori cepat tanpa lag.',
        },
        {
          title: 'Keranjang Belanja & Alur Checkout Intuitif',
          description:
            'Sistem keranjang belanja dinamis yang menghitung subtotal, estimasi pengiriman, dan ringkasan pesanan secara real-time.',
        },
        {
          title: 'Manajemen Inventaris & Dashboard Admin',
          description:
            'Panel administrasi untuk mengelola status ketersediaan menu, memperbarui harga, memproses pesanan masuk, dan mengunduh rekap transaksi.',
        },
        {
          title: 'Desain Antarmuka Mobile-First & Responsif',
          description:
            'Tata letak visual yang dioptimalkan menggunakan Tailwind CSS sehingga nyaman diakses dari smartphone maupun layar monitor lebar.',
        },
      ],
      systemDesign: [
        'Use Case Diagram: Memetakan peran interaksi antara Pelanggan (Customer) dan Pengelola (Admin).',
        'Activity Diagram: Memodelkan alur bisnis mulai dari pemilihan menu, pengisian keranjang, hingga konfirmasi pembayaran.',
        'Sequence Diagram: Menggambarkan urutan pertukaran pesan antar objek pengendali, database, dan antarmuka.',
        'Entity Relationship Diagram (ERD): Diagram relasi entitas tabel Users, Products, Categories, Orders, dan Order_Items.',
      ],
      learnings: [
        'Memperdalam pemahaman perancangan sistem informasi berskala penuh dari tahap analisis kebutuhan hingga deployment aktif.',
        'Menguasai optimasi query relasional MySQL dan penanganan transaksi database simultan.',
        'Meningkatkan efisiensi arsitektur MVC Laravel dan pembuatan antarmuka modern yang cepat dan aksesibel.',
      ],
    },
  },
  {
    id: 'berkah-mulia',
    title: 'Website Katalog Digital "Berkah Mulia"',
    subtitle: 'Platform Katalog Digital Aktif Produk Pakaian Bayi & Anak',
    description:
      'Website katalog digital aktif (bmberkahmulia.com) untuk produk pakaian bayi dan anak berbasis framework Laravel dan database MySQL dengan klasifikasi kategori bertingkat.',
    image: '/images/berkahmulia-live.png',
    stacks: ['Laravel', 'MySQL', 'Tailwind CSS', 'Blade'],
    isFeatured: true,
    categoryType: 'web',
    impactHighlights: ['Live Production', 'Katalog Bertingkat', '100% Responsif Mobile'],
    demoUrl: 'https://bmberkahmulia.com',
    githubUrl: 'https://github.com/greedykid/berkahmulia',
    detail:
      'Berkah Mulia adalah website katalog digital aktif yang dapat diakses publik pada domain bmberkahmulia.com.\n\nFitur & Arsitektur:\n- Merancang, membangun, dan mendeploy website katalog digital aktif untuk produk pakaian bayi dan anak berbasis framework Laravel dan database MySQL.\n- Menyusun perancangan kebutuhan sistem dan mengimplementasikan arsitektur navigasi katalog dengan klasifikasi kategori produk bertingkat.\n- Mengoptimalkan performa kecepatan loading halaman, efisiensi aset, dan responsivitas tampilan antarmuka (UI/UX) pada berbagai perangkat.\n- Manajemen repositori dan version control di GitHub (github.com/greedykid/berkahmulia).',
    accentColor: '#10b981',
    caseStudy: {
      overview:
        'Berkah Mulia (bmberkahmulia.com) adalah platform katalog digital aktif untuk memamerkan dan mengorganisir ratusan varian produk pakaian bayi dan anak. Dibangun dengan fokus pada kecepatan loading, klasifikasi kategori bertingkat yang rapi, dan kemudahan calon pembeli dalam menjelajah produk sebelum bertransaksi.',
      background:
        'Toko konvensional pakaian anak menghadapi tantangan saat menyajikan ratusan variasi ukuran, warna, dan jenis pakaian melalui media sosial yang tercecer. Website katalog digital ini hadir sebagai pusat etalase resmi yang terstruktur, rapi, dan dapat diakses publik kapan saja dengan performa loading cepat.',
      role: 'Web Developer & System Designer',
      category: 'Digital Product Catalog',
      timeline: 'Jun 2026 – Sekarang (Production Live)',
      deliverables: [
        'Website Katalog Digital Aktif di Domain bmberkahmulia.com',
        'Arsitektur Navigasi & Klasifikasi Produk Bertingkat',
        'Optimasi Aset Gambar & Performa Kecepatan Akses',
        'Repositori GitHub Version Control (github.com/greedykid/berkahmulia)',
      ],
      architecture: [
        {
          title: 'Arsitektur Katalog & Routing Efisien dengan Laravel',
          description:
            'Menggunakan Laravel untuk routing yang bersih (clean URLs/SEO-friendly), rendering server-side yang cepat dengan Blade, dan pengelolaan controller terstruktur.',
          points: [
            'Struktur pengkategorian bertingkat (Kategori Utama & Sub-Kategori Produk).',
            'Manajemen aset statis teroptimasi untuk memastikan waktu muat halaman di bawah 1 detik.',
            'Integrasi database MySQL untuk kueri inventaris produk yang ringan.',
          ],
        },
        {
          title: 'Performa Visual & UI/UX Responsif',
          description:
            'Antarmuka dirancang dengan pendekatan Mobile-First menggunakan Tailwind CSS untuk memastikan tampilan katalog rapi di semua resolusi layar.',
          points: [
            'Pemuatan gambar lazy loading untuk menghemat bandwidth pengguna seluler.',
            'Desain kartu produk yang bersih, menampilkan foto produk resolusi tinggi dan label ukuran jelas.',
            'Tautan langsung ke saluran pemesanan resmi untuk mempermudah konversi pelanggan.',
          ],
        },
      ],
      features: [
        {
          title: 'Klasifikasi Kategori Produk Bertingkat',
          description:
            'Pengelompokan pakaian berdasarkan usia bayi/anak, jenis kelamin, dan kategori busana untuk navigasi yang teratur.',
        },
        {
          title: 'Galeri Foto Produk Interaktif',
          description:
            'Pratinjau visual detail pakaian dengan tampilan sudut beragam dan informasi spesifikasi bahan.',
        },
        {
          title: 'Navigasi Cepat & Pencarian Produk',
          description:
            'Pencarian produk instan yang memungkinkan calon pembeli menemukan model busana yang diinginkan secara cepat.',
        },
        {
          title: 'Integrasi Saluran Kontak Langsung',
          description:
            'Akses langsung dari halaman produk menuju saluran komunikasi resmi untuk kemudahan konfirmasi ketersediaan stok.',
        },
      ],
      systemDesign: [
        'Analisis Kebutuhan Sistem: Mengidentifikasi alur calon pembeli dari penjelajahan katalog hingga interaksi kontak.',
        'Hierarki Navigasi Informasi: Merancang struktur sitemap dan taksonomi kategori produk.',
        'Skema Relasi Database: Pemodelan data produk, relasi kategori bertingkat, dan atribut varian pakaian.',
      ],
      learnings: [
        'Menerapkan praktik terbaik optimasi performa web katalog dengan banyak aset gambar visual.',
        'Meningkatkan keahlian dalam perancangan hierarki informasi dan navigasi e-catalog bertingkat.',
        'Pengalaman langsung dalam konfigurasi domain, deployment produksi aktif, dan pemeliharaan website berbasis Laravel.',
      ],
    },
  },
  {
    id: 'it-network-infrastructure',
    title: 'Infrastruktur Jaringan LAN/WAN & Troubleshooting PC',
    subtitle: 'Simulasi Cisco Router, Subnetting, dan Pemeliharaan Sistem Komputer',
    description:
      'Dokumentasi teknis perancangan topologi jaringan Cisco Router, konfigurasi routing RIP/OSPF, subnetting IP address, serta pemecahan masalah perangkat keras, instalasi OS, dan pemeliharaan perangkat kantor.',
    image: '/images/gegares-live.png',
    stacks: ['Cisco Packet Tracer', 'Routing LAN/WAN', 'Hardware Diagnostics', 'Windows/Linux OS'],
    isFeatured: true,
    categoryType: 'it-support',
    impactHighlights: ['Konfigurasi Cisco Router', 'Subnetting VLSM', 'Troubleshooting Hardware'],
    githubUrl: 'https://github.com/greedykid',
    detail:
      'Implementasi praktis infrastruktur jaringan dan dukungan teknis TI meliputi konfigurasi router jaringan, analisis konektivitas LAN/WAN, pemecahan masalah hardware, instalasi sistem operasi, dan pemeliharaan periferal.',
    accentColor: '#06b6d4',
    caseStudy: {
      overview:
        'Proyek ini merangkum perancangan topologi jaringan komputer berbasis Cisco Router (LAN & WAN) dan prosedur standar penanganan kendala teknis perangkat keras dan lunak (IT Support) untuk lingkungan kerja operasional.',
      background:
        'Kelancaran operasional kerja memerlukan infrastruktur jaringan yang stabil, pengalamatan IP yang terstruktur rapi, serta pemeliharaan preventif dan kuratif terhadap perangkat PC, laptop, dan printer pengguna.',
      role: 'IT Support Specialist & Network Administrator',
      category: 'IT Support & Networking',
      timeline: '2023 – 2025 (Laboratorium & Praktik Mandiri)',
      deliverables: [
        'Topologi Jaringan LAN & WAN Menggunakan Cisco Packet Tracer',
        'Tabel Pengalamatan IP Subnetting (VLSM / CIDR)',
        'SOP Troubleshooting Perangkat Keras & Instalasi Sistem Operasi',
        'Dokumentasi Pemeliharaan Printer & Periferal Kantor',
      ],
      architecture: [
        {
          title: 'Perancangan Topologi Jaringan & Protokol Routing',
          description:
            'Merancang arsitektur jaringan bertingkat menghubungkan beberapa subnet kantor cabang menggunakan Cisco Router.',
          points: [
            'Konfigurasi routing statis dan dinamis (RIP / OSPF) pada Cisco IOS.',
            'Segmentasi jaringan lokal (LAN) dan alokasi gateway untuk keamanan lalu lintas data.',
            'Pengujian latensi, packet loss, dan troubleshooting konektivitas menggunakan ping & traceroute.',
          ],
        },
        {
          title: 'Pemeliharaan Hardware & Sistem Operasi',
          description:
            'Prosedur penanganan insiden perangkat komputer untuk memastikan downtime operasional minimal.',
          points: [
            'Diagnosa komponen hardware (RAM, storage SSD/HDD, power supply, thermal paste).',
            'Instalasi bersih (clean install) sistem operasi Windows 11 dan Linux Ubuntu.',
            'Manajemen driver, sharing printer lokal, dan konfigurasi keamanan endpoint.',
          ],
        },
      ],
      features: [
        {
          title: 'Konfigurasi Cisco Router & Pengalamatan IP',
          description:
            'Pengaturan antarmuka Serial & FastEthernet pada router, penetapan IP address, subnet mask, dan default gateway.',
        },
        {
          title: 'Troubleshooting Hardware & Software Cepat',
          description:
            'Metodologi eliminasi bertahap untuk mengidentifikasi penyebab error BSOD, sistem lambat, atau kegagalan booting.',
        },
        {
          title: 'Pengaturan Jaringan Nirkabel & Sharing Sumber Daya',
          description:
            'Konfigurasi access point Wi-Fi kantor dan sharing folder jaringan terotentikasi.',
        },
        {
          title: 'Pemeliharaan Preventif Perangkat Keras',
          description:
            'Pembersihan berkala debu sistem pendingin, pembaruan patch keamanan OS, dan backup data penting.',
        },
      ],
      systemDesign: [
        'Diagram Topologi LAN/WAN: Pemetaan visual router, switch, access point, dan end-user PC.',
        'Tabel Subnetting IP: Alokasi network address, usable host range, dan broadcast address.',
        'Flowchart Penanganan Masalah: Diagram alur pemecahan masalah jaringan dan kegagalan sistem operasional.',
      ],
      learnings: [
        'Menguasai sintaks command-line interface (CLI) Cisco IOS untuk manajemen router jaringan.',
        'Meningkatkan efisiensi dan ketelitian dalam mendiagnosa kerusakan hardware dan komponen PC.',
        'Memahami pentingnya dokumentasi jaringan terstruktur untuk memudahkan proses troubleshooting tim TI.',
      ],
    },
  },
];
