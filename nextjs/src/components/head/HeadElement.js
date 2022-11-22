import Head from "next/head";
import { useRouter } from "next/router";

function HeadElement(props) {
  // console.log("components - head - Head.js - props: ", props);

  const { title, description, blockSearchIndexing } = props.seo ?? {};
  const { ogTitle, ogDescription, ogImage } = props.openGraph ?? {};
  const { asPath } = useRouter();

  return (
    <Head>
      <title>{title}</title>
      {description && (
        <meta name="description" content={description} key="desc" />
      )}
      {blockSearchIndexing && <meta name="robots" content="noindex" />}
      {ogTitle && <meta property="og:title" content={ogTitle} key="title" />}
      {ogDescription && (
        <meta property="og:description" content={ogDescription} />
      )}
      {ogImage?.data && (
        <meta property="og:image" content={ogImage.data.attributes.url} />
      )}
      <meta
        property="og:url"
        content={process.env.NEXT_PUBLIC_DOMAIN + asPath}
      />
    </Head>
  );
}

export default HeadElement;
