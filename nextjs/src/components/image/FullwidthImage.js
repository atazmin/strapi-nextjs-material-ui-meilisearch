import Image from "next/image";
import { useState } from "react";
import {
  Container,
  Box,
  Stack,
  Divider,
  Typography,
  useTheme,
  useMediaQuery,
  alpha,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import { format, parse, isBefore, parseISO } from "date-fns";
import { setConfig, buildUrl } from "cloudinary-build-url";

function FullwidthImage(props) {
  // console.log("components - image - FullwidthImage.js - props: ", props);

  const { image, isFullWidth, verticalFocalPoint, details, isShowDetails } =
    props.props ?? {};
  const { date, timeStart, timeEnd, type } = props.eventDetails ?? {};
  const { name, index, contentType } = props;
  const theme = useTheme();
  const breakpointUpXs = useMediaQuery(theme.breakpoints.up("xs"));
  const breakpointUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  const breakpointUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const breakpointUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const breakpointUpXl = useMediaQuery(theme.breakpoints.up("xl"));
  const imageWidth = () => {
    if (breakpointUpXl) return 1920;
    if (breakpointUpLg) return 1600;
    if (breakpointUpMd) return 1200;
    if (breakpointUpSm) return 900;
    if (breakpointUpXs) return 600;
  };
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  setConfig({
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  });

  const src = buildUrl(image.data.attributes.provider_metadata.public_id, {
    transformations: {
      resize: {
        type: "fill",
        width: imageWidth(),
        height: 500,
      },
    },
  });
  const srcPlaceholder = buildUrl(
    image.data.attributes.provider_metadata.public_id,
    {
      transformations: {
        resize: {
          type: "fill",
          width: imageWidth(),
          height: 500,
        },
        effect: {
          name: "blur:2000",
          quality: 1,
        },
      },
    }
  );
  const currentDate = format(new Date(), "yyyy-MM-dd");

  return (
    <Container
      maxWidth={isFullWidth ? "none" : "xl"}
      disableGutters
      style={{
        height: "500px",
      }}
      sx={{
        backgroundColor: theme.palette.common.white,
        [theme.breakpoints.up("md")]: {
          mt: index === 0 ? "-80px" : 0,
          ...(isShowDetails &&
            (contentType === "installation" || contentType === "event") && {
              mb: 20,
            }),
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "500px",
          overflow: "hidden",
          backgroundImage: `url(${srcPlaceholder})`,
          backgroundSize: "cover",
          backgroundPosition: `center ${
            verticalFocalPoint ? verticalFocalPoint : "50"
          }%`,
          backgroundRepeat: "no-repeat",
        }}
      >
        {imageWidth() && (
          <Image
            priority
            src={src}
            alt={image.data.attributes.alternativeText}
            sizes="(min-width: 1200px) 75vw, 100vw"
            onLoadingComplete={() => {
              setIsImageLoaded(true);
            }}
            width={imageWidth()}
            height={500}
            style={{
              position: "relative",
              objectFit: "cover",
              objectPosition: `center ${
                verticalFocalPoint ? verticalFocalPoint : "50"
              }%`,
              maxHeight: "500px",
              opacity: isImageLoaded ? 1 : 0,
            }}
          />
        )}
      </Box>
      {isShowDetails && isImageLoaded && (
        <Container disableGutters sx={{ position: "relative" }}>
          <Box
            className="event-date"
            style={{
              width: "270px",
              height: "270px",
              padding: "20px 25px",
              lineHeight: 1.2,
              display: "flex",
              flexDirection: "column",
              hyphens: "auto",
            }}
            sx={{
              [theme.breakpoints.up("md")]: {
                left: "initial",
              },
              ...(contentType === "event" || contentType === "installation"
                ? {
                    position: "absolute",
                    left: 0,
                    bottom: 10,
                    fontSize: 23,
                    fontWeight: 700,
                    color: theme.palette.common.white,
                    backgroundColor:
                      contentType === "event"
                        ? alpha(theme.palette.green.main, 0.9)
                        : alpha(theme.palette.primary.main, 0.95),
                    [theme.breakpoints.up("md")]: {
                      position: "relative",
                      mt: "-125px",
                      justifyContent: "flex-end",
                    },
                  }
                : {
                    position: "absolute",
                    right: 0,
                    bottom: 10,
                    fontSize: 24,
                    fontWeight: 700,
                    fontStyle: "italic",
                    backgroundColor: alpha(theme.palette.common.white, 0.9),
                  }),
            }}
          >
            {contentType === "event" && (
              <Box
                sx={{
                  mb: "auto",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    span: {
                      mr: 0.5,
                    },
                    em: {
                      fontStyle: "normal",
                      fontWeight: 700,
                    },
                  }}
                >
                  {isBefore(new Date(currentDate), new Date(date)) ? (
                    <>
                      <EventAvailableIcon sx={{ mr: 1 }} />
                      <span>Upcoming</span>
                    </>
                  ) : (
                    <>
                      <EventBusyIcon sx={{ mr: 1 }} />
                      <span>
                        <s>Past</s>
                      </span>
                    </>
                  )}
                  <em>Event</em>
                </Typography>
                <Typography
                  sx={{
                    mb: 1,
                    fontSize: 20,
                    fontWeight: 800,
                    textTransform: "uppercase",
                  }}
                >
                  {type}
                </Typography>
                <Divider
                  sx={{
                    mb: 1,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    em: {
                      fontStyle: "normal",
                      fontWeight: 700,
                      mr: 0.5,
                    },
                  }}
                >
                  {timeStart && (
                    <em>{format(new Date(`${date}T${timeStart}Z`), "EEEE")}</em>
                  )}
                  {format(parseISO(date), "MMMM d, yyyy")}
                </Typography>
                {timeStart && (
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    {format(
                      parse(
                        timeStart.split(":", 2).join(":"),
                        "HH:mm",
                        new Date()
                      ),
                      "hh:mm a"
                    )}
                    {timeEnd && (
                      <Typography component="span" sx={{ mx: 0.5 }}>
                        -
                      </Typography>
                    )}
                    {format(
                      parse(
                        timeEnd.split(":", 2).join(":"),
                        "HH:mm",
                        new Date()
                      ),
                      "hh:mm a"
                    )}
                  </Typography>
                )}
              </Box>
            )}
            {contentType === "installation" && (
              <Typography
                sx={{
                  mb: "auto",
                  fontWeight: "inherit",
                  "::first-letter": {
                    textTransform: "uppercase",
                  },
                }}
              >
                {contentType}
              </Typography>
            )}
            {details ? details : name}
            {contentType === "installation" && (
              <ChevronRightIcon
                sx={{
                  fontSize: "inherit",
                  mb: -0.5,
                }}
              />
            )}
          </Box>
        </Container>
      )}
    </Container>
  );
}

export default FullwidthImage;
