/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://amarjannat.vercel.app",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/404", "/500", "/_error"],

  // Custom transform for better SEO
  transform: async (config, path) => {
    // Higher priority for main sections
    const priorities = {
      "/": 1.0,
      "/bcs": 0.9,
      "/primary-assistant-teacher": 0.9,
      "/ntrca-school-teacher": 0.9,
      "/ntrca-college-teacher": 0.9,
      "/web-development": 0.9,
    };

    const changefreqs = {
      "/": "daily",
      "/bcs": "weekly",
      "/primary": "weekly",
      "/ntrca-school-teacher": "weekly",
      "/ntrca-college-teacher": "weekly",
      "/web-development": "weekly",
    };

    // Find matching pattern
    let priority = 0.7;
    let changefreq = "monthly";

    Object.keys(priorities).forEach((key) => {
      if (path.startsWith(key)) {
        priority = priorities[key];
        changefreq = changefreqs[key] || "monthly";
      }
    });

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/404", "/500"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 0,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        crawlDelay: 0,
      },
    ],
    additionalSitemaps: ["https://amarjannat.vercel.app/sitemap.xml"],
  },
};
