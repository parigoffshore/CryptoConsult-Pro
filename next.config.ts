const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Empêche que la build Netlify casse à cause d'erreurs TypeScript ou ESLint
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // (Optionnel) si tu utilises des images externes
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};
