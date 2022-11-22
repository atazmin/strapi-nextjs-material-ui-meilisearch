import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Button,
  Box,
  Link as MuiLink,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PhotoSizeSelectLargeIcon from "@mui/icons-material/PhotoSizeSelectLarge";
import BrushIcon from "@mui/icons-material/Brush";
import { buildUrl } from "cloudinary-build-url";
import { fetcher } from "/lib/api";
import { PageNotFound } from "/src/components/status/Status";
import HeadElement from "/src/components/head/HeadElement";
import ArtworksType from "/src/components/collection-type/ArtworksType";

function Artwork({ data }) {
  // console.log("pages - artworks - [slug].js - getStaticProps - data: ", data);

  const theme = useTheme();
  const breakpointUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const {
    id,
    attributes: {
      name,
      price,
      width,
      height,
      image,
      artwork_technique,
      seo,
      openGraph,
    } = {},
  } = data[0] ?? {};

  const {
    id: artistId,
    attributes: { name: artistName, slug: artistSlug, photo } = {},
  } = data[0]?.attributes.artist.data ?? {};

  let src = "";
  if (photo?.data) {
    src = buildUrl(photo.data.attributes.provider_metadata.public_id, {
      cloud: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
      },
      transformations: {
        gravity: "face",
        dpr: "auto",
        width: 120,
        aspectRatio: "1",
        crop: "thumb",
        radius: "max",
        effect: {
          name: "grayscale",
        },
      },
    });
  }

  const [artworks, setArtworks] = useState([]);
  const StyledLink = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.main,
  }));

  useEffect(() => {
    const filterArtworks = async () => {
      if (artistId) {
        const { data } = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_API}/artworks?publicationState=live&populate[0]=image&populate[1]=artist&filters[artist][id][$eq]=${artistId}&filters[id][$ne]=${id}&pagination[pageSize]=300`
        );
        // console.log("pages - artworks - [slug].js - useEffect - data: ", data);
        setArtworks(data);
      }
    };
    filterArtworks();
  }, [id, artistId]);

  return (
    <>
      {data.length ? (
        <>
          <HeadElement seo={seo} openGraph={openGraph} />
          <Container disableGutters={breakpointUpLg ? true : false}>
            <Stack direction="row" justifyContent="center" sx={{ py: 4 }}>
              <Box
                component="img"
                src={
                  image.data.attributes.formats.medium
                    ? image.data.attributes.formats.medium.url
                    : image.data.attributes.url
                }
                alt={image.data.attributes.alternativeText}
                loading="lazy"
                sx={{
                  display: "block",
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </Stack>
          </Container>
          <Container
            maxWidth="none"
            disableGutters
            sx={{
              backgroundColor: theme.palette.grey.lighter,
              pt: { xs: 4, md: 6 },
              pb: !artworks.length > 0 ? { xs: 4, md: 6 } : 0,
            }}
          >
            <Container disableGutters={breakpointUpLg ? true : false}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                sx={{
                  [theme.breakpoints.up("md")]: {
                    mb: 4,
                  },
                }}
              >
                <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
                  <StyledLink
                    href={`/artists/${artistSlug}`}
                    sx={{
                      display: "inline-block",
                      mr: 1,
                      pt: 1,
                      textDecoration: "none",
                      borderTop: `2px solid ${theme.palette.green.light}`,
                      whiteSpace: "nowrap",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {artistName}
                  </StyledLink>
                  <Typography
                    component="span"
                    sx={{
                      fontSize: "inherit",
                      fontWeight: 700,
                      color: theme.palette.grey.darker,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {name}
                  </Typography>
                </Typography>
                <Stack
                  direction={{ xs: "column-reverse", md: "row" }}
                  alignItems={{ md: "center" }}
                >
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: 21,
                      mr: 3,
                    }}
                  >
                    <BrushIcon />
                    {artwork_technique.data?.attributes.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: theme.palette.grey.darker,
                      textTransform: "uppercase",
                      fontSize: 40,
                      lineHeight: 1,
                      [theme.breakpoints.up("md")]: {},
                    }}
                  >
                    <MonetizationOnIcon
                      fontSize="large"
                      sx={{
                        mr: 1,
                      }}
                    />
                    {price ? (
                      <Typography
                        sx={{
                          fontSize: "inherit",
                          fontWeight: "inherit",
                          lineHeight: "inherit",
                        }}
                      >
                        {price}
                      </Typography>
                    ) : (
                      <Typography
                        sx={{
                          fontWeight: "inherit",
                          lineHeight: "inherit",
                          fontSize: 21,
                          [theme.breakpoints.up("md")]: {
                            textAlign: "center",
                            fontSize: "inherit",
                          },
                          br: {
                            display: "none",
                            [theme.breakpoints.up("md")]: {
                              display: "block",
                            },
                          },
                        }}
                      >
                        Ask for
                        <br /> Price
                      </Typography>
                    )}
                  </Box>
                </Stack>
              </Stack>
              <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
              >
                {!(!width && !height) && (
                  <Typography
                    sx={{
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      span: {
                        ml: 2,
                      },
                      em: {
                        fontWeight: 600,
                        fontStyle: "normal",
                        fontSize: "125%",
                      },
                      [theme.breakpoints.down("md")]: {
                        mb: 4,
                        fontSize: "85%",
                      },
                    }}
                  >
                    <PhotoSizeSelectLargeIcon
                      sx={{
                        [theme.breakpoints.up("md")]: {
                          fontSize: 44,
                        },
                      }}
                    />
                    <span>
                      width: <em>{width}</em> inch
                    </span>
                    <span>
                      height: <em>{height}</em> inch
                    </span>
                  </Typography>
                )}
                <MuiLink
                  href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}?subject=Artwork: ${name} Artist: ${artistName}&body=%0D%0A%0D%0A%0D%0AArtwork Location: ${process.env.NEXT_PUBLIC_DOMAIN}/artworks/${data[0].attributes.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textDecoration: "none",
                  }}
                >
                  <Button
                    variant="contained"
                    color="yellow"
                    size="large"
                    disableElevation
                    sx={{
                      fontSize: 18,
                      display: "block",
                      [theme.breakpoints.down("md")]: {
                        mx: "auto",
                        mt: 2,
                      },
                    }}
                  >
                    Ask about this artwork
                  </Button>
                </MuiLink>
              </Stack>
            </Container>
          </Container>
          {artworks.length > 0 && (
            <Container
              maxWidth="none"
              disableGutters
              sx={{
                backgroundColor: theme.palette.common.white,
                py: { xs: 4, md: 8 },
              }}
            >
              {photo.data && (
                <Stack direction="row" justifyContent="center">
                  <Box
                    component="img"
                    src={src}
                    alt={photo.data.attributes.alternativeText}
                    width="120"
                    height="120"
                    sx={{
                      mb: 2,
                    }}
                  />
                </Stack>
              )}
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  textAlign: "center",
                  fontWeight: 500,
                  mb: 4,
                }}
              >
                more from
                <StyledLink
                  href={`/artists/${artistSlug}`}
                  sx={{
                    mx: 1,
                    "&:hover": {
                      textDecoration: "underline",
                      color: theme.palette.green.main,
                    },
                  }}
                >
                  {artistName}
                </StyledLink>
              </Typography>
              <ArtworksType props={artworks} />
            </Container>
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
    `${process.env.NEXT_PUBLIC_STRAPI_API}/artworks?publicationState=live&pagination[page]=1&pagination[pageSize]=3000`
  );

  const paths =
    data?.map((item) => ({
      params: { slug: item.attributes.slug },
    })) ?? [];

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const { data, notFound } = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/artworks?publicationState=live&populate[0]=artist&populate[1]=artist.photo&populate[2]=artwork_art_type&populate[3]=artwork_format&populate[4]=artwork_subject&populate[5]=artwork_technique&populate[6]=image&populate[7]=seo&populate[8]=openGraph&filters[slug]=${params.slug}`
  );

  if (notFound) {
    return {
      notFound: true,
    };
  }

  return { props: { data } };
}

export default Artwork;
