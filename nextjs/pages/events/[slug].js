import { fetcher } from "/lib/api";
import IframeVideo from "/src/components/video/IframeVideo";
import HeadElement from "/src/components/head/HeadElement";
import FullwidthImage from "/src/components/image/FullwidthImage";
import RichText from "/src/components/text/RichText";
import PageHeading from "src/components/heading/PageHeading";
import ImageGallery from "src/components/gallery/ImageGallery";
import { PageNotFound, NoPageContent } from "/src/components/status/Status";

function Event({ data }) {
  // console.log("pages - events - [slug].js - getStaticProps - props: ", data);

  const {
    name,
    date,
    timeStart,
    timeEnd,
    type,
    seo,
    openGraph,
    block,
    contentType,
  } = data[0]?.attributes ?? {};

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
                case "image.full-width-image":
                  return (
                    <FullwidthImage
                      key={component.__component + "_" + component.id}
                      props={component}
                      contentType={contentType}
                      name={name}
                      index={index}
                      eventDetails={{
                        date,
                        timeStart,
                        timeEnd,
                        type,
                      }}
                    />
                  );
                case "text.rich-text":
                  return (
                    <RichText
                      key={component.__component + "_" + component.id}
                      props={component}
                      bgcolor="white"
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
    `${process.env.NEXT_PUBLIC_STRAPI_API}/events`
  );

  const paths =
    data?.map((item) => ({
      params: { slug: item.attributes.slug },
    })) ?? [];

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const { data, notFound } = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/events?publicationState=live&populate[seo][populate]=%2A&populate[openGraph][populate]=%2A&populate[block][populate]=%2A&filters[slug]=${params.slug}`
  );

  if (notFound) {
    return {
      notFound: true,
    };
  }

  return { props: { data }, revalidate: 60 };
}

export default Event;
