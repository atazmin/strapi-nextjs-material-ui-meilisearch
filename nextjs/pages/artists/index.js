import Link from "next/link";
import { Container, Grid, Card, useTheme, useMediaQuery } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { fetcher } from "/lib/api";
import HeadElement from "/src/components/head/HeadElement";
import { PageNotFound } from "src/components/status/Status";

function Artists({ data, artistPageData }) {
  // console.log("pages - artists - index.js - getStaticProps - props: ", data);

  const theme = useTheme();
  const breakpointUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const { name, seo, openGraph } = artistPageData?.attributes ?? {};

  return (
    <>
      {artistPageData ? (
        <>
          <HeadElement seo={seo} openGraph={openGraph} />
          <Container
            disableGutters={breakpointUpLg ? true : false}
            sx={{
              backgroundColor: theme.palette.grey.main,
              py: 5,
            }}
          >
            <Grid container spacing={4}>
              {data &&
                data.map((artist) => (
                  <Grid
                    key={artist.id}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    sx={{}}
                  >
                    <Card
                      variant="outlined"
                      sx={{
                        height: "100%",
                        minHeight: "130px",
                        border: 0,
                        borderRadius: 0,
                        color: theme.palette.grey.darker,
                        "&:hover": {
                          backgroundColor: theme.palette.purple.main,
                          color: theme.palette.common.white,
                        },
                      }}
                    >
                      <Link
                        href={`/artists/${artist?.attributes.slug}`}
                        style={{
                          padding: 24,
                          display: "block",
                          height: "100%",
                          fontSize: 25,
                          fontWeight: 600,
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        {artist?.attributes.name}
                        <ChevronRightIcon
                          sx={{
                            fontSize: "inherit",
                            mb: -0.5,
                          }}
                        />
                      </Link>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Container>
        </>
      ) : (
        <PageNotFound />
      )}
    </>
  );
}

export async function getStaticProps() {
  const { data: artistPageData } = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/artist-page?publicationState=live&populate[seo][populate]=%2A&populate[openGraph][populate]=%2A`
  );

  const { data, notFound } = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/artists?publicationState=live&sort[0]=name&fields[0]=name&fields[1]=slug&pagination[page]=1&pagination[pageSize]=300`
  );

  if (notFound) {
    return {
      notFound: true,
    };
  }

  return { props: { data, artistPageData }, revalidate: 60 };
}

export default Artists;
