import { fetcher } from "/lib/api";
import { PageNotFound, NoPageContent } from "/src/components/status/Status";
import FullwidthImage from "/src/components/image/FullwidthImage";
import FeaturedCollectionTypes from "/src/components/collection-type/FeaturedCollectionTypes";
import RandomArtworks from "/src/components/collection-type/RandomArtworks";
import HeadElement from "/src/components/head/HeadElement";

function HomePage({ data }) {
  // console.log("pages - index.js - getStaticProps - data: ", data);
  const { name, seo, openGraph, block, contentType } = data?.attributes ?? {};

  return (
    <>
      {data ? (
        <>
          <HeadElement seo={seo} openGraph={openGraph} />
          {block.length ? (
            block.map((component, index) => {
              switch (component.__component) {
                case "image.full-width-image":
                  return (
                    <FullwidthImage
                      key={component.__component + "_" + component.id}
                      props={component}
                      contentType={contentType}
                      name={name}
                      index={index}
                    />
                  );
                case "show-collection-types.featured-types":
                  return (
                    <FeaturedCollectionTypes
                      key={component.__component + "_" + component.id}
                      props={component}
                    />
                  );
                case "show-collection-types.random-artworks":
                  return (
                    <RandomArtworks
                      key={component.__component + "_" + component.id}
                      props={component}
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

export async function getStaticProps() {
  const { data, notFound } = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/homepage?publicationState=live&populate[seo][populate]=%2A&populate[openGraph][populate]=%2A&populate[block][populate]=%2A`
  );

  if (notFound) {
    return {
      notFound: true,
    };
  }

  return { props: { data }, revalidate: 60 };
}

export default HomePage;
