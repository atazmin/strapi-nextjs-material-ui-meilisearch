import Link from "next/link";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Skeleton,
  alpha,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useGetSitewide } from "/lib/useRequest";
import { Error } from "/src/components/status/Status";

function FooterCard() {
  const { data, error } = useGetSitewide();
  // console.log(
  //   "components - card - FooterCard.js - useRequest - data: ",
  //   data?.footer?.eventCard
  // );
  const { type, description, recurringHeading, recurringDescription, link } =
    data?.footer?.eventCard ?? {};
  const theme = useTheme();
  const StyledLink = styled(Link)(({ theme }) => ({
    height: "inherit",
    display: "inherit",
    textDecoration: "none",
    ":hover": {
      backgroundColor: theme.palette.purple.main,
    },
  }));

  if (error) return <Error />;

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

  const cardContent = (
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
          mb: 2,
          fontSize: 18,
          fontWeight: 600,
          color: alpha(theme.palette.common.white, 0.5),
        }}
      >
        {type}
      </Typography>
      <Box
        sx={{
          borderLeft: "5px solid white",
          px: 2,
          py: 1,
        }}
      >
        <Typography
          sx={{ fontSize: 21, fontWeight: 700, lineHeight: 1.2 }}
          gutterBottom
        >
          {description}
        </Typography>
      </Box>
      <Box
        sx={{
          mt: "auto",
          fontSize: 14,
        }}
      >
        <Typography sx={{ fontWeight: 700 }}>{recurringHeading}</Typography>
        <Typography sx={{ fontWeight: 500 }}>{recurringDescription}</Typography>
      </Box>
    </CardContent>
  );

  return (
    data?.footer?.eventCard && (
      <Card
        sx={{
          borderRadius: 0,
          boxShadow: 0,
          height: "100%",
          backgroundColor: cardType,
        }}
      >
        {link ? (
          <StyledLink href={link}>{cardContent}</StyledLink>
        ) : (
          cardContent
        )}
      </Card>
    )
  );
}

export default FooterCard;
