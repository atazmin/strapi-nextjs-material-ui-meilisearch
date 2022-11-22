import Link from "next/link";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  alpha,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { format, parse, isBefore, parseISO } from "date-fns";

function EventCard(props) {
  // console.log("components - card - EventCard.js - props: ", props);
  const { type, name, slug, date, timeEnd, timeStart } =
    props.props?.attributes ?? {};
  const theme = useTheme();
  const StyledLink = styled(Link)(({ theme }) => ({
    display: "inherit",
    height: "inherit",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: theme.palette.purple.main,
    },
  }));

  if (!props.props) return;

  let cardType = () => {
    switch (type) {
      case "On Exhibit":
        cardType = theme.palette.primary.main;
        return cardType;
      case "Event":
        cardType = theme.palette.green.main;
        return cardType;
      case "Opening":
        cardType = theme.palette.secondary.main;
        return cardType;
      case "Artist Spotlight":
        cardType = theme.palette.secondary.main;
        return cardType;
      default:
        return cardType;
    }
  };

  const currentDate = format(new Date(), "yyyy-MM-dd");

  return (
    <Card
      sx={{
        borderRadius: 0,
        boxShadow: 0,
        height: "100%",
        backgroundColor: cardType(),
      }}
    >
      <StyledLink href={`events/${slug}`}>
        <CardContent
          sx={{
            height: "inherit",
            display: "flex",
            flexDirection: "column",
            color: theme.palette.common.white,
            p: { xs: 2, md: 3 },
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 600,
              color: alpha(theme.palette.common.white, 0.5),
            }}
            gutterBottom
          >
            {type}
          </Typography>
          <Box
            sx={{
              mb: 2,
              pl: 1,
              borderLeft: `5px solid ${theme.palette.common.white}`,
            }}
          >
            <Typography
              sx={{ fontSize: 21, fontWeight: 700, lineHeight: 1.2 }}
              gutterBottom
            >
              {name}
            </Typography>
          </Box>
          <Box
            sx={{
              mt: "auto",
              fontSize: 14,
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                mb: 0.5,
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
                <span>Upcoming </span>
              ) : (
                <span>
                  <s>Past</s>
                </span>
              )}
              <em>Event</em>
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
              <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                {format(
                  parse(timeStart.split(":", 2).join(":"), "HH:mm", new Date()),
                  "hh:mm a"
                )}
                {timeEnd && (
                  <Typography component="span" sx={{ mx: 0.5 }}>
                    -
                  </Typography>
                )}
                {format(
                  parse(timeEnd.split(":", 2).join(":"), "HH:mm", new Date()),
                  "hh:mm a"
                )}
              </Typography>
            )}
          </Box>
        </CardContent>
      </StyledLink>
    </Card>
  );
}

export default EventCard;
