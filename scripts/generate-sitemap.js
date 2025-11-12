const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const { glob } = require("glob");
const path = require("path");

async function generateSitemap() {
  const hostname = "https://amarjannat.vercel.app";
  const stream = new SitemapStream({ hostname });

  // ✅ 1. Include homepage manually (Google prefers this)
  stream.write({
    url: "/",
    changefreq: "daily",
    priority: 1.0,
    lastmod: new Date().toISOString(),
  });

  // ✅ 2. Get all .mdx pages automatically
  const files = await glob("pages/**/*.mdx");

  files.forEach((file) => {
    // Convert file path to URL format
    let pagePath = file
      .replace("pages", "")
      .replace(/index\.mdx$/, "") // remove index pages
      .replace(".mdx", "");

    // Skip 404 and _app or _document pages if exist
    if (pagePath.includes("404") || pagePath.includes("_")) return;

    stream.write({
      url: pagePath,
      changefreq: "daily",
      priority: 0.7,
      lastmod: new Date().toISOString(), // ✅ 3. Add lastmod dynamically
    });
  });

  stream.end();

  // ✅ 4. Save sitemap file
  const sitemap = await streamToPromise(stream);
  createWriteStream(path.resolve("./public/sitemap.xml")).write(
    sitemap.toString()
  );

  console.log("✅ Sitemap generated successfully!");
}

generateSitemap();
