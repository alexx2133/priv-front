/** @type {import('next').NextConfig} */
const nextConfig = {
  // Базовые настройки
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false, // Добавляем для безопасности
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // Отключаем console в production
  },
  // В development показываем больше предупреждений
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // Оптимизация изображений
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,

    // Убираем дублирование domains, используем только remotePatterns
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "192.168.56.1",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "192.168.49.50",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "192.168.56.1",
        port: "2310",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "192.168.49.50",
        port: "2310",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "2310",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "92.255.78.165",
        port: "2310",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "92.255.78.165",
        port: "3315",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3315",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3315",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "192.168.49.50",
        port: "3315",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "192.168.56.1",
        port: "3315",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "privoz-crimea.ru",
        pathname: "/**",
      },
    ],
  },

  // TypeScript - лучше убрать ignoreBuildErrors на проде
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === "development", // Только в разработке
  },

  // Оптимизации компилятора
  compiler: {
    // Удаляем console.log в продакшене
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Оптимизации для производства
  swcMinify: true,

  // Включаем gzip сжатие
  compress: true,

  // Оптимизация кеширования
  experimental: {
    optimizeCss: true, // CSS оптимизация
  },

  // Заголовки для безопасности и кеширования
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
