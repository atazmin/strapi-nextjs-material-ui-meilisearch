import Image from "next/image";
import { Container, Skeleton, useTheme, useMediaQuery } from "@mui/material";
import { fetcher } from "/lib/api";
import { PageNotFound } from "src/components/status/Status";
import HeadElement from "/src/components/head/HeadElement";
import RichText from "src/components/text/RichText";
import PageHeading from "src/components/heading/PageHeading";
import ArtworksType from "/src/components/collection-type/ArtworksType";
const qs = require("qs");

function Artist({ data }) {
  // console.log("pages - artists - [slug].js - getStaticProps - props: ", data);

  const theme = useTheme();
  const breakpointUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const {
    name,
    biography,
    photo,
    seo,
    openGraph,
    artworks: { data: artworks } = { data: [] },
  } = data[0]?.attributes ?? {};

  const descriptionProps = {
    description: biography,
  };

  return (
    <>
      {data.length ? (
        <>
          <HeadElement seo={seo} openGraph={openGraph} />
          <PageHeading name={name} index={0} />
          {photo?.data && (
            <Container
              disableGutters
              maxWidth="none"
              sx={{
                backgroundColor: theme.palette.common.white,
              }}
            >
              <Container
                disableGutters={breakpointUpLg ? true : false}
                sx={{
                  position: "relative",
                  pt: 4,
                  pb: 4,
                }}
              >
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={
                    photo.data.attributes.formats?.medium?.width ??
                    photo.data.attributes.width
                  }
                  height={
                    photo.data.attributes.formats?.medium?.height ??
                    photo.data.attributes.height
                  }
                  sx={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                />
                <Image
                  src={
                    photo.data.attributes.formats?.medium?.url ??
                    photo.data.attributes.url
                  }
                  alt={photo.data.attributes.alternativeText}
                  width={
                    photo.data.attributes.formats?.medium?.width ??
                    photo.data.attributes.width
                  }
                  height={
                    photo.data.attributes.formats?.medium?.height ??
                    photo.data.attributes.height
                  }
                  onLoadingComplete={(event) => {
                    event.style.opacity = 1;
                    event.previousElementSibling.remove();
                  }}
                  style={{
                    marginBottom: 16,
                    display: "block",
                    margin: "0 auto",
                    maxWidth: breakpointUpLg ? "500px" : "100%",
                    height: "auto",
                    opacity: 0,
                  }}
                />
              </Container>
            </Container>
          )}
          {biography && <RichText props={descriptionProps} bgcolor="white" />}
          {artworks && <ArtworksType props={artworks} bgcolor="white" />}
        </>
      ) : (
        <PageNotFound />
      )}
    </>
  );
}

export async function getStaticPaths() {
  const { data } = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/artists?publicationState=live&pagination[page]=1&pagination[pageSize]=300`
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
      populate: [
        "artworks",
        "artworks.artist",
        "artworks.image",
        "photo",
        "seo",
        "openGraph",
        "name",
        "slug",
        "biography",
      ],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const { data, notFound } = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/artists?publicationState=live&${query}&filters[slug]=${params.slug}`
  );

  if (notFound) {
    return {
      notFound: true,
    };
  }

  return { props: { data }, revalidate: 60 };
}

export default Artist;
