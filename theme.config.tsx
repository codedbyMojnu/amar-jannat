import dynamic from "next/dynamic";
import { DocsThemeConfig } from "nextra-theme-docs";
import AudioPlayer from "./components/AudioPlayer";
import CollaborateSection from "./components/CollaborateSection";
import Logo from "./components/Logo";
import PdfDownloader from "./components/PdfDownloader";
import VideoPlayer from "./components/VideoPlayer";

const GiscusComments = dynamic(() => import("./components/GiscusComments"), {
  ssr: false,
}) as React.FC<any>;
const LiveCodeEditor = dynamic(() => import("./components/LiveCodeEditor"), {
  ssr: false,
}) as React.FC<any>;
const Donate = dynamic(() => import("./components/Donate"), {
  ssr: false,
}) as React.FC<any>;
const Pitfall = dynamic(() => import("./components/Pitfall"), {
  ssr: false,
}) as React.FC<any>;
const Reveal = dynamic(() => import("./components/Reveal"), {
  ssr: false,
}) as React.FC<any>;
const Custom404Page = dynamic(() => import("./components/Custom404Page"), {
  ssr: false,
}) as React.FC<any>;
const SyllabusCard = dynamic(() => import("./components/SyllabusCard"), {
  ssr: false,
}) as React.FC<any>;
const SyllabusDetail = dynamic(() => import("./components/SyllabusDetail"), {
  ssr: false,
}) as React.FC<any>;

const config: DocsThemeConfig = {
  logo: <Logo />,
  project: {
    link: "https://github.com/codedbyMojnu/amar-jannat",
  },
  chat: {
    link: "https://discord.gg/8ZpFFu5d",
  },
  docsRepositoryBase: "https://github.com/codedbyMojnu/amar-jannat/blob/main",
  footer: {
    text: (() => {
      const start = 2025;
      const current = new Date().getFullYear();
      return current === start
        ? `© ${start} Amar Jannat — মজনু মিয়ার জান্নাত`
        : `© ${start} - ${current} Amar Jannat — মজনু মিয়ার জান্নাত`;
    })(),
  },
  components: {
    Donate,
    GiscusComments,
    Reveal,
    Pitfall,
    LiveCodeEditor,
    AudioPlayer,
    PdfDownloader,
    VideoPlayer,
    Custom404Page,
    CollaborateSection,
    SyllabusCard,
    SyllabusDetail,
  },
  useNextSeoProps() {
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      return {
        titleTemplate: "%s – Amar Jannat",
      };
    }
    return { titleTemplate: "Amar Jannat — মজনু মিয়ার জান্নাত" };
  },
  head: (props: {
    title?: string;
    meta?: { description?: string; keywords?: string | string[] };
  }) => {
    const { title, meta } = props;
    const pathname =
      typeof window !== "undefined" ? window.location.pathname : "/";
    const url = `https://amarjannat.vercel.app${pathname}`;
    const slug = pathname.split("/").filter(Boolean)[0] || "";

    // Section-specific SEO fallbacks (if page doesn't provide its own)
    const sectionSEO: Record<
      string,
      { description: string; keywords: (string | undefined)[]; title?: string }
    > = {
      "bcs-exam-preparation-bangladesh": {
        title: "BCS প্রস্তুতি — Bangladesh",
        description:
          "BCS প্রিলিমিনারি, লিখিত ও ভাইভা প্রস্তুতি — সিলেবাস, টপিকভিত্তিক নোটস, MCQ প্র্যাকটিস ও মডেল টেস্ট।",
        keywords: [
          "BCS Preparation",
          "BCS প্রস্তুতি",
          "BCS Preliminary",
          "BCS Written",
          "BCS Viva",
          "BCS MCQ",
          "BCS Model Test",
          "বিসিএস প্রস্তুতি",
        ],
      },
      "primary-assistant-teacher-exam-preparation": {
        title: "প্রাইমারি সহকারী শিক্ষক নিয়োগ প্রস্তুতি",
        description:
          "DPE/প্রাইমারি সহকারী শিক্ষক নিয়োগের প্রস্তুতি — সিলেবাস, টপিকভিত্তিক নোটস, MCQ ও মডেল টেস্ট।",
        keywords: [
          "Primary Assistant Teacher",
          "Primary Head Teacher",
          "DPE Exam Preparation",
          "প্রাইমারি সহকারী শিক্ষক",
          "DPE Model Test",
          "Primary School Teacher MCQ",
        ],
      },
      "ntrca-school-teacher-exam-preparation": {
        title: "NTRCA স্কুল শিক্ষক প্রস্তুতি",
        description:
          "NTRCA স্কুল শিক্ষক নিবন্ধন প্রস্তুতি — সিলেবাস, টপিকভিত্তিক নোটস, MCQ ও মডেল টেস্ট।",
        keywords: [
          "NTRCA School Teacher",
          "NTRCA Registration",
          "NTRCA MCQ",
          "NTRCA Model Test",
          "MPO School Teacher",
          "এনটিআরসিএ স্কুল শিক্ষক",
        ],
      },
      "ntrca-college-teacher-exam-preparation": {
        title: "NTRCA কলেজ শিক্ষক প্রস্তুতি",
        description:
          "NTRCA কলেজ শিক্ষক নিবন্ধন প্রস্তুতি — সিলেবাস, টপিকভিত্তিক নোটস, MCQ ও মডেল টেস্ট।",
        keywords: [
          "NTRCA College Teacher",
          "College Teacher Registration",
          "NTRCA Preparation",
          "NTRCA Model Test",
          "MPO College Teacher",
          "এনটিআরসিএ কলেজ শিক্ষক",
        ],
      },
    };

    const keywordsDefault =
      "Amar Jannat, মজনু মিয়ার জান্নাত, Mojnu Miah, Web Development, BCS Preparation, Primary Assistant Teacher, NTRCA, NTRCA College Teacher, NTRCA School Teacher, DPE";
    const baseKeywords = Array.isArray(meta?.keywords)
      ? meta?.keywords
      : meta?.keywords
      ? [meta?.keywords]
      : keywordsDefault.split(", ");
    const sectionKeywords = sectionSEO[slug]?.keywords || [];
    const keywords = Array.from(
      new Set([...baseKeywords, ...sectionKeywords])
    ).join(", ");

    const description =
      meta?.description ||
      sectionSEO[slug]?.description ||
      "Amar Jannat - মজনু মিয়ার জান্নাত হলো একটি চাকরি প্রস্তুতি প্ল্যাটফর্ম। এখানে পাবেন ওয়েব ডেভেলপমেন্ট, বিসিএস প্রস্তুতি, প্রাইমারি সহকারী শিক্ষক, এনটিআরসিএ স্কুল/কলেজ শিক্ষক চাকরির প্রস্তুতির রিসোর্স।";
    const effectiveTitle = title || sectionSEO[slug]?.title;

    return (
      <>
        {/* SEO and Meta Tags */}
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width" />
        <meta httpEquiv="Content-Language" content="bn" />

        {/* Favicon and App Icons */}
        <link rel="icon" href="/icons/amar-jannat-icon.png" />
        <link rel="apple-touch-icon" href="/icons/amar-jannat-icon.png" />
        <link rel="shortcut icon" href="/icons/amar-jannat-icon.png" />

        {/* SEO Keywords */}
        <meta name="keywords" content={keywords} />

        <link rel="canonical" href={url} />
        <link rel="alternate" hrefLang="bn" href={url} />
        <link rel="alternate" hrefLang="x-default" href={url} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="bn_BD" />
        <meta
          property="og:site_name"
          content="Amar Jannat — মজনু মিয়ার জান্নাত"
        />
        <meta
          property="og:title"
          content={effectiveTitle || "Amar Jannat — মজনু মিয়ার জান্নাত"}
        />
        <meta
          name="twitter:title"
          content={effectiveTitle || "Amar Jannat — মজনু মিয়ার জান্নাত"}
        />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://amarjannat.vercel.app/icons/amar-jannat-icon.png"
        />
        <meta property="og:image:alt" content="Amar Jannat Logo" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://amarjannat.vercel.app/icons/amar-jannat-icon.png"
        />
        <meta name="robots" content="index,follow" />

        {/* JSON-LD: Organization */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Amar Jannat",
              url,
              logo: "https://amarjannat.vercel.app/icons/amar-jannat-icon.png",
              sameAs: [
                "https://github.com/codedbymojnu",
                "https://discord.gg/8ZpFFu5d",
              ],
            }),
          }}
        />

        {/* JSON-LD: WebSite with SearchAction */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Amar Jannat",
              url,
              potentialAction: {
                "@type": "SearchAction",
                target: `${url}/?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* JSON-LD: Breadcrumbs (for main sections) */}
        {slug && sectionSEO[slug] && (
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://amarjannat.vercel.app/",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: sectionSEO[slug]?.title || slug,
                    item: url,
                  },
                ],
              }),
            }}
          />
        )}
      </>
    );
  },
};

export default config;
