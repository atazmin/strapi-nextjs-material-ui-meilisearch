import { useState } from "react";
import {
  Container,
  Card,
  CardMedia,
  Divider,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";

function IframeVideo(props) {
  // console.log("components - video - IframeVideo.js - props: ", props);
  
  const [collectionType, setCollectionType] = useState(props.collectionName);
  const { videoId, iframeSource } = props.props;
  const theme = useTheme();
  const breakpointUpLg = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Container
      maxWidth="none"
      disableGutters
      sx={{
        backgroundColor: theme.palette.common.white,
      }}
    >
      <Container disableGutters={breakpointUpLg ? true : false} sx={{ py: 5 }}>
        <Divider textAlign="left" sx={{ pb: 5 }}>
          <Chip
            label={iframeSource ? "3D Video" : "Video"}
            sx={{
              fontSize: 21,
              fontWeight: 700,
            }}
          />
        </Divider>
        <Card
          sx={{
            overflow: "hidden",
            pb: "56.25%",
            position: "relative",
            height: 0,
            borderRadius: 0,
            boxShadow: 0,
            iframe: {
              border: 0,
            },
          }}
        >
          <CardMedia
            component="iframe"
            loading="lazy"
            allow="fullscreen"
            src={
              collectionType === "video"
                ? `https://www.youtube.com/embed/${videoId}?rel=0`
                : iframeSource
            }
            sx={{
              position: "absolute",
              left: "0",
              top: "0",
              height: "100%",
              width: "100%",
            }}
          />
        </Card>
      </Container>
    </Container>
  );
}

export default IframeVideo;
