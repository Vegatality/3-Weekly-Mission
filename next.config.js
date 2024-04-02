/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts'],
  compiler: {
    styledComponents: {
      cssProp: true,
      displayName: true,
      ssr: true,
    },
    removeConsole: process.env.NODE_ENV === 'production',
  },
  rewrites: async () => {
    return [
      {
        source: '/shared',
        destination: '/shared/:folderId',
        has: [
          {
            type: 'query',
            key: 'folder',
            // https://nextjs.org/docs/pages/api-reference/next-config-js/rewrites#header-cookie-and-query-matching
            value: '(?<folderId>.*)',
          },
        ],
      },
    ];
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: { not: /component/ },
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: /component/,
        use: ['@svgr/webpack'],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  images: {
    remotePatterns: [
      // 일단 다 걍 풀어둠.
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
