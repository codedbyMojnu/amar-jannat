import { generateStaticParamsFor, importPage } from "nextra/pages";
import { useMDXComponents as getMDXComponents } from "../../../mdx-components";
import { JsonLd } from "../../components/JsonLd";

export const generateStaticParams = generateStaticParamsFor("mdxPath");

export async function generateMetadata(props) {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath);

  const title = metadata.title;
  const description =
    metadata.description ||
    "Amar Jannat - The best educational resource in Bangladesh.";
  const url = `https://amar-jannat.com/${params.mdxPath?.join("/") || ""}`;
  const images = metadata.image ? [metadata.image] : ["/opengraph-image.png"];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Amar Jannat",
      locale: "bn_BD",
      type: "article",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
    alternates: {
      canonical: url,
    },
  };
}

const components = getMDXComponents();
const Wrapper = components.wrapper;

export default async function Page(props) {
  const params = await props.params;
  const {
    default: MDXContent,
    toc,
    metadata,
    sourceCode,
  } = await importPage(params.mdxPath);

  const url = `https://amar-jannat.com/${params.mdxPath?.join("/") || ""}`;

  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <JsonLd metadata={metadata} url={url} />
      <MDXContent {...props} params={params} components={components} />
    </Wrapper>
  );
}
