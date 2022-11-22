import { fetcher } from "/lib/api";
import { PageNotFound, NoPageContent } from "/src/components/status/Status";
import FullwidthImage from "/src/components/image/FullwidthImage";
import CollectionType from "/src/components/collection-type/CollectionType";
import Contact from "/src/components/contact/Contact";
import HeadElement from "/src/components/head/HeadElement";
import TwoColumnText from "/src/components/text/TwoColumnText";
import PageHeading from "src/components/heading/PageHeading";
const qs = require("qs");

function Page({ data }) {
  // console.log("pages - [slug].js - getStaticProps - props: ", data);
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
                      name={name}
                      index={index}
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
                    />
                  );
                case "contact.contact":
                  return (
                    <Contact
                      key={component.__component + "_" + component.id}
                      props={component}
                    />
                  );
                case "text.two-column-text":
                  return (
                    <TwoColumnText
                      key={component.__component + "_" + component.id}
                      props={component}
                    />
                  );
                case "show-collection-types.clients":
                case "show-collection-types.installations":
                case "show-collection-types.videos":
                case "show-collection-types.events":
                  return (
                    <CollectionType
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
  const { data } = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_API}/pages`);

  const paths =
    data?.map((item) => ({
      params: { slug: item.attributes.slug },
    })) ?? [];

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const query = qs.stringify(
    {
      populate: [
        "seo",
        "socialMedia",
        "block.image",
        "block.addressCard.image",
      ],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const { data, notFound } = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/pages?publicationState=live&${query}&filters[slug]=${params.slug}`
  );

  if (notFound) {
    return {
      notFound: true,
    };
  }

  return { props: { data }, revalidate: 60 };
}

export default Page;
