import { getPageMap } from "nextra/page-map";

const baseUrl = "https://amarjannat.com";

export default async function sitemap() {
  const pageMap = await getPageMap();

  const routes = [];

  function traverse(items) {
    if (!items) return;

    for (const item of items) {
      // Skip meta files and other non-page items
      if (item.name && item.name.startsWith("_")) continue;

      if (item.route) {
        routes.push({
          url: `${baseUrl}${item.route}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: item.route === "/" ? 1.0 : 0.8,
        });
      }

      if (item.children) {
        traverse(item.children);
      }
    }
  }

  traverse(pageMap);

  return routes;
}
