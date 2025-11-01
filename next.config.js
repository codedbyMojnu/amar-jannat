const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  latex: true,
});

module.exports = withNextra({
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      // Old slugs to new, SEO-focused slugs
      // {
      //   source: "/bcs-preparation/:path*",
      //   destination: "/bcs-exam-preparation-bangladesh/:path*",
      //   permanent: true,
      // },
    ];
  },
});
