/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Pass remote images straight through to the browser (the server/sandbox
    // does not proxy outbound image fetches; the client loads them directly).
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.unsplash.com" },
    ],
  },
};

export default nextConfig;
