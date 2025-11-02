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
const CourseCards = dynamic(() => import("./components/CourseCards"), {
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
    CourseCards,
  },
  sidebar: {
    defaultMenuCollapseLevel: 1, // here
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
      "bcs-exam-preparation": {
        title: "BCS প্রস্তুতি ২০২৫ (প্রিলি, লিখিত, ভাইভা) সম্পূর্ণ গাইডলাইন",
        description:
          "BCS Preparation Bangladesh: সর্বশেষ সিলেবাস, প্রশ্ন ব্যাংক, মডেল টেস্ট, এবং কার্যকর প্রস্তুতির কৌশল। প্রিলিমিনারি, লিখিত, ও ভাইভা পরীক্ষার জন্য সেরা রিসোর্স।",
        keywords: [
          "BCS Preparation Bangladesh",
          "BCS প্রস্তুতি",
          "BCS Preliminary Syllabus 2025",
          "BCS Written Question Bank",
          "BCS Viva Tips",
          "47th BCS",
          "48th BCS",
          "বিসিএস প্রস্তুতি",
        ],
      },
      "primary-assistant-teacher": {
        title: "প্রাইমারি সহকারী শিক্ষক নিয়োগ প্রস্তুতি ২০২৫",
        description:
          "DPE প্রাইমারি সহকারী শিক্ষক নিয়োগ পরীক্ষার সম্পূর্ণ প্রস্তুতি। সর্বশেষ সিলেবাস, প্রশ্ন সমাধান, গুরুত্বপূর্ণ সাজেশন এবং ফাইনাল মডেল টেস্ট।",
        keywords: [
          "Primary Assistant Teacher Exam",
          "DPE Exam Preparation",
          "প্রাইমারি শিক্ষক নিয়োগ",
          "dpe question bank pdf",
          "primary model test",
          "প্রাইমারি সাজেশন",
        ],
      },
      "ntrca-school-teacher": {
        title: "NTRCA স্কুল শিক্ষক নিবন্ধন প্রস্তুতি (১৭তম ও ১৮তম)",
        description:
          "NTRCA স্কুল ও স্কুল-২ লেভেলের শিক্ষক নিবন্ধন পরীক্ষার পূর্ণাঙ্গ প্রস্তুতি। সিলেবাস, বিগত সালের প্রশ্ন সমাধান, এবং চূড়ান্ত মডেল টেস্ট।",
        keywords: [
          "NTRCA School Teacher",
          "18th NTRCA Circular",
          "NTRCA School Syllabus",
          "এনটিআরসিএ স্কুল শিক্ষক",
          "NTRCA Question Bank",
          "বেসরকারি শিক্ষক নিবন্ধন",
        ],
      },
      "ntrca-college-teacher": {
        title: "NTRCA কলেজ প্রভাষক নিবন্ধন প্রস্তুতি (১৭তম ও ১৮তম)",
        description:
          "NTRCA কলেজ লেভেলের প্রভাষক নিবন্ধন পরীক্ষার পূর্ণাঙ্গ প্রস্তুতি। বিষয়ভিত্তিক সিলেবাস, বিগত সালের প্রশ্ন বিশ্লেষণ, এবং চূড়ান্ত মডেল টেস্ট।",
        keywords: [
          "NTRCA College Teacher",
          "18th NTRCA College Circular",
          "NTRCA College Syllabus",
          "এনটিআরসিএ কলেজ শিক্ষক",
          "NTRCA Lecturer",
          "বেসরকারি প্রভাষক নিবন্ধন",
        ],
      },
      "secondary-level": {
        title: "মাধ্যমিক (SSC) পর্যায়ের সকল বিষয়ের লেকচার ও নোটস",
        description:
          "নবম-দশম শ্রেণীর (SSC) সকল বিষয়ের অধ্যায়ভিত্তিক লেকচার, হ্যান্ড নোট, এবং বোর্ড পরীক্ষার প্রস্তুতির জন্য পূর্ণাঙ্গ গাইডলাইন।",
        keywords: [
          "SSC Preparation",
          "Class 9-10 All Subjects",
          "মাধ্যমিক",
          "নবম দশম শ্রেণী",
          "SSC Suggestion",
          "SSC Board Question",
        ],
      },
      "higher-secondary-level": {
        title: "উচ্চ মাধ্যমিক (HSC) সকল বিষয়ের লেকচার ও নোটস",
        description:
          "একাদশ-দ্বাদশ শ্রেণীর (HSC) বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা শাখার সকল বিষয়ের অধ্যায়ভিত্তিক লেকচার, হ্যান্ড নোট, এবং বোর্ড পরীক্ষার সেরা প্রস্তুতি।",
        keywords: [
          "HSC Preparation",
          "Class 11-12 All Subjects",
          "উচ্চ মাধ্যমিক",
          "একাদশ দ্বাদশ শ্রেণী",
          "HSC Suggestion",
          "HSC Board Question",
        ],
      },
      "web-development": {
        title: "বাংলা ভাষায় ওয়েব ডেভেলপমেন্ট শিখুন (সম্পূর্ণ কোর্স)",
        description:
          "শূন্য থেকে একজন প্রফেশনাল ওয়েব ডেভেলপার হওয়ার পূর্ণাঙ্গ বাংলা গাইডলাইন। HTML, CSS, JavaScript, React, এবং Next.js শিখে নিজের ক্যারিয়ার গড়ুন।",
        keywords: [
          "Web Development Bangla",
          "Learn Web Development",
          "ওয়েব ডেভেলপমেন্ট",
          "React Bangla Tutorial",
          "JavaScript Bangla",
          "প্রোগ্রামিং শিখুন",
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
