/* eslint-env node */
import { Footer, Layout, Navbar } from "nextra-theme-docs";
import "nextra-theme-docs/style.css";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";

export const metadata = {
  metadataBase: new URL("https://amar-jannat.com"),
  title: {
    template: "%s - Amar Jannat",
  },
  description:
    "Amar Jannat — মজনু মিয়ার জান্নাত। বিসিএস, প্রাইমারি শিক্ষক নিয়োগ, NTRCA— স্কুল ও কলেজ শিক্ষক নিবন্ধন প্রস্তুতির বাংলাদেশের সেরা রিসোর্স।",
  applicationName: "Amar Jannat",
  generator: "Next.js",
  appleWebApp: {
    title: "Amar Jannat",
  },
  other: {
    "msapplication-TileImage": "/ms-icon-144x144.png",
    "msapplication-TileColor": "#fff",
  },
  twitter: {
    site: "https://amar-jannat.com",
  },
  verification: {
    google: "-0oyDJ10CwLMNFF2z2zhS90QOrbzypnffqi7A4LkYbU",
  },
};

export default async function RootLayout({ children }) {
  const navbar = (
    <Navbar
      logo={
        <div>
          <b>Amar Jannat</b>{" "}
          <span style={{ opacity: "60%" }}>মজনু মিয়ার জান্নাত</span>
        </div>
      }
    />
  );
  const pageMap = await getPageMap();
  return (
    <html lang="bn" dir="ltr" suppressHydrationWarning>
      <Head faviconGlyph="📚" />
      <body>
        <Layout
          navbar={navbar}
          footer={
            <Footer>
              Amar Jannat {new Date().getFullYear()} © All rights reserved.
            </Footer>
          }
          editLink="Edit this page on GitHub"
          docsRepositoryBase="https://github.com/your-repo/amar-jannat/blob/main"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          pageMap={pageMap}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
