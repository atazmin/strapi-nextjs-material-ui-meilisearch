import Link from "next/link";
import Image from "next/image";
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { setConfig, buildUrl } from "cloudinary-build-url";

function ArtworksType(props) {
  // console.log(
  //   "components - collection-type - ArtworksType.js - props: ",
  //   props.props.length
  // );

  const theme = useTheme();
  const breakpointUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const artworks = props.props;
  const { bgcolor } = props;
  let backgroundColor = () => {
    switch (bgcolor) {
      case "white":
        backgroundColor = theme.palette.common.white;
        return backgroundColor;
      case "grey":
        backgroundColor = theme.palette.grey.main;
        return backgroundColor;
      default:
        return;
    }
  };
  const imageAttributes = {
    width: 280,
  };

  return (
    <Container
      maxWidth="none"
      disableGutters
      sx={{
        backgroundColor: backgroundColor,
      }}
    >
      <Container disableGutters={breakpointUpLg ? true : false} sx={{ pb: 4 }}>
        <Grid container spacing={4}>
          {artworks?.map((artwork) => {
            setConfig({
              cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
            });
            const src = buildUrl(
              artwork.attributes.image.data.attributes.provider_metadata
                .public_id,
              {
                transformations: {
                  gravity: "auto:subject",
                  dpr: "auto",
                  resize: {
                    type: "fill",
                    width: imageAttributes.width,
                    aspectRatio: "1",
                  },
                },
              }
            );
            const srcPlaceholder = buildUrl(
              artwork.attributes.image.data.attributes.provider_metadata
                .public_id,
              {
                transformations: {
                  gravity: "auto:subject",
                  resize: {
                    type: "fill",
                    width: imageAttributes.width,
                    aspectRatio: "1",
                  },
                  effect: {
                    name: "blur:2000",
                    quality: 1,
                  },
                },
              }
            );

            return (
              <Grid key={artwork.id} item xs={12} sm={6} md={4} lg={3}>
                <Link
                  href={`/artworks/${encodeURIComponent(
                    artwork.attributes.slug
                  )}`}
                >
                  <Card
                    sx={{
                      position: "relative",
                      aspectRatio: "1 / 1",
                      borderRadius: 0,
                      backgroundImage: `url(${srcPlaceholder})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      "&:hover": {
                        "& .MuiCardContent-root": {
                          backgroundColor: "rgba(95, 80, 74, 0.6)",
                        },
                        "& .MuiBox-root": {
                          transform: "translateY(-100%)",
                        },
                      },
                    }}
                  >
                    <Image
                      src={src}
                      alt={
                        artwork.attributes.image.data.attributes.alternativeText
                      }
                      fill
                      sizes="(min-width: 1200px) 25vw,(min-width: 900px) 33vw,(min-width: 600px) 50vw, 100vw"
                      onLoadingComplete={(event) => {
                        event.style.opacity = 1;
                      }}
                      style={{
                        objectFit: "cover",
                        opacity: 0,
                      }}
                    />
                    <CardContent
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        display: "flex",
                        alignItems: "flex-end",
                        transition: "background-color 0.25s ease-out",
                      }}
                    >
                      <Box
                        sx={{
                          color: theme.palette.common.white,
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          right: 0,
                          p: 3,
                          transform: "translateY(0)",
                          transition: "transform 0.25s ease-out",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 25,
                            fontWeight: 700,
                            lineHeight: 1,
                            mb: 1,
                          }}
                        >
                          {artwork.attributes.name}
                        </Typography>
                        {artwork.attributes.artist && (
                          <Typography sx={{ fontWeight: 500 }}>
                            {artwork.attributes.artist.data?.attributes.name ??
                              artwork.attributes.artist.name}
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Container>
  );
}

export default ArtworksType;
