import {
  Container,
  Box,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

function ImageGallery(props) {
  // console.log("components - gallery - ImageGallery.js - props: ", props);

  const theme = useTheme();
  const breakpointUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const regex = /.jpg|.jpeg|.gif|.png/;

  if (props.props == null) return;

  const {
    images: { data: images } = { data: [] },
    isCentered,
    isSpaced,
    isFullwidth,
  } = props.props;

  return (
    <Container
      maxWidth="none"
      disableGutters
      sx={{
        backgroundColor: theme.palette.common.white,
      }}
    >
      <Container disableGutters={breakpointUpLg ? true : false}>
        <Stack>
          {images.map((image, index) => (
            <Box key={image.id + index}>
              <Box
                component="img"
                src={image.attributes.url}
                alt={image.attributes.alternativeText}
                loading="lazy"
                sx={{
                  display: "block",
                  maxWidth: "100%",
                  height: "auto",
                  mx: isCentered ? "auto" : "initial",
                  pt: index === 0 ? 2 : 0,
                  pb: isSpaced ? 2 : 0,
                  [theme.breakpoints.up("md")]: {
                    width: isFullwidth ? "50%" : "initial",
                  },
                }}
              />
              {!regex.test(image.attributes.caption) && (
                <Typography
                  key={image.id + index}
                  sx={{
                    pb: 2,
                  }}
                >
                  {image.attributes.caption}
                </Typography>
              )}
            </Box>
          ))}
        </Stack>
      </Container>
    </Container>
  );
}

export default ImageGallery;
