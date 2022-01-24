module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["i.pravatar.cc", "firebasestorage.googleapis.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
