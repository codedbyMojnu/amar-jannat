export function JsonLd({ metadata, url }) {
  const isMcq = url.includes("/mcq/");

  const schema = {
    "@context": "https://schema.org",
    "@type": isMcq ? "Quiz" : "Article",
    headline: metadata.title,
    description: metadata.description,
    image:
      metadata.openGraph?.images?.[0]?.url ||
      "https://amarjannat.com/opengraph-image.png",
    author: {
      "@type": "Person",
      name: "Amar Jannat Team",
      url: "https://amarjannat.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Amar Jannat",
      logo: {
        "@type": "ImageObject",
        url: "https://amarjannat.com/icon.png",
      },
    },
    datePublished: new Date().toISOString(), // Ideally this comes from git timestamp or frontmatter
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
