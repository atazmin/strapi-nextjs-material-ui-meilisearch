import { fetcher } from "/lib/api";
import { PageNotFound, NoPageContent } from "/src/components/status/Status";
import HeadElement from "/src/components/head/HeadElement";
import IframeVideo from "/src/components/video/IframeVideo";
import ImageGallery from "src/components/gallery/ImageGallery";
import PageHeading from "src/components/heading/PageHeading";
const qs = require("qs");

function Video({ data }) {
  // console.log("pages - videos - [slug].js - getStaticProps - props: ", data);

  const { name, seo, openGraph, block, contentType } =
    data[0]?.attributes ?? {};

  return (
    <>
      {data.length ? (
        <>
          <HeadElement seo={seo} openGraph={openGraph} />
          {block?.length ? (
            block.map((component, index) => {
              switch (component.__component) {
                case "heading.page-heading":
                  return (
                    <PageHeading
                      key={component.__component + "_" + component.id}
                      props={component}
                      contentType={contentType}
                      name={name}
                      index={index}
                    />
                  );
                case "image.image-gallery":
                  return (
                    <ImageGallery
                      key={component.__component + "_" + component.id}
                      props={component}
                    />
                  );
                case "video.round-me-video":
                case "video.video":
                  return (
                    <IframeVideo
                      key={component.__component + "_" + component.id}
                      props={component}
                      collectionName={component.__component.substr(
                        component.__component.indexOf(".") + 1
                      )}
                    />
                  );
                default:
                  return null;
              }
            })
          ) : (
            <NoPageContent />
          )}
        </>
      ) : (
        <PageNotFound />
      )}
    </>
  );
}

export async function getStaticPaths() {
  const { data } = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/videos`
  );

  const paths =
    data?.map((item) => ({
      params: { slug: item.attributes.slug },
    })) ?? [];

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const query = qs.stringify(
    {
      populate: ["seo", "openGraph", "block", "block.images"],
      filters: {
        slug: params.slug,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const { data, notFound } = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/videos?publicationState=live&${query}`
  );

  if (notFound) {
    return {
      notFound: true,
    };
  }

  return { props: { data } };
}

export default Video;
