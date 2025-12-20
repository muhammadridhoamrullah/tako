export const users = [
  {
    name: "Muhammad Ridho",
    email: "ridho@example.com",
    createdAt: new Date("2024-01-15"),
  },
  {
    name: "Amrullah",
    email: "amrullah@example.com",
    createdAt: new Date("2024-01-20"),
  },
  {
    name: "Budi Santoso",
    email: "budi@example.com",
    createdAt: new Date("2024-02-01"),
  },
  {
    name: "Siti Nurhaliza",
    email: "siti@example. com",
    createdAt: new Date("2024-02-10"),
  },
  {
    name: "Ahmad Fadli",
    email: "ahmad@example.com",
    createdAt: new Date("2024-02-15"),
  },
];

export const posts = [
  {
    title: "Belajar GraphQL dengan Apollo Server",
    content:
      "GraphQL adalah query language untuk API yang dikembangkan oleh Facebook.  Dengan GraphQL, client bisa request data yang dibutuhkan saja.",
    // userId akan di-set saat seeding
    createdAt: new Date("2024-02-20"),
  },
  {
    title: "MongoDB Native Driver vs Mongoose",
    content:
      "MongoDB Native Driver lebih ringan dan performant, sedangkan Mongoose menyediakan schema validation dan banyak helper functions.",
    createdAt: new Date("2024-02-21"),
  },
  {
    title: "Tips Membuat REST API yang Baik",
    content:
      "Gunakan HTTP methods yang benar, versioning API, proper error handling, dan dokumentasi yang jelas.",
    createdAt: new Date("2024-02-22"),
  },
  {
    title: "Kenapa Harus Pakai TypeScript?",
    content:
      "TypeScript memberikan type safety yang membuat code lebih maintainable dan mengurangi bug di production.",
    createdAt: new Date("2024-02-23"),
  },
  {
    title: "Docker untuk Pemula",
    content:
      "Docker memudahkan deployment aplikasi dengan containerization. Aplikasi bisa jalan di environment manapun dengan konsisten.",
    createdAt: new Date("2024-02-24"),
  },
  {
    title: "Microservices Architecture",
    content:
      "Microservices memecah aplikasi monolitik menjadi service-service kecil yang independent dan scalable.",
    createdAt: new Date("2024-02-25"),
  },
  {
    title: "CI/CD Best Practices",
    content:
      "Continuous Integration dan Continuous Deployment mempercepat development cycle dan mengurangi human error.",
    createdAt: new Date("2024-02-26"),
  },
  {
    title: "Keamanan API:  JWT vs Session",
    content:
      "JWT stateless dan cocok untuk microservices, sedangkan session lebih aman karena bisa di-revoke sewaktu-waktu.",
    createdAt: new Date("2024-02-27"),
  },
];
