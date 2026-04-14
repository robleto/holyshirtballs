/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Uncomment to enable fully static export for Netlify/Vercel without SSR:
  // output: 'export',
  // trailingSlash: true,
  experimental: {
    // Ensures only the specific named imports used are included in the bundle,
    // preventing full barrel-file inclusion from icon packages.
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },
};

module.exports = nextConfig;
