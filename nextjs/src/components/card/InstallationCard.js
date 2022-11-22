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
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function InstallationCard(props) {
  // console.log("components - card - InstallationCard.js - props: ", props);
  const { name, slug, featuredImage } = props.props ?? {};
  const theme = useTheme();
  const StyledLink = styled(Link)(() => ({
    height: "inherit",
    display: "inherit",
    textDecoration: "none",
  }));

  if (!props.props) return;

  return (
    <Card
      sx={{
        borderRadius: 0,
        boxShadow: 0,
        height: "100%",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        ...(featuredImage?.data && {
          backgroundImage: `url(${
            featuredImage.data?.attributes?.formats?.small?.url ??
            featuredImage.data.attributes.url
          } )`,
        }),
        "&:hover": {
          "& .MuiCardContent-root": {
            backgroundColor: alpha(theme.palette.purple.main, 0.9),
          },
        },
      }}
    >
      <StyledLink href={`installations/${slug}`}>
        <CardContent
          sx={{
            width: "50%",
            height: "inherit",
            display: "flex",
            flexDirection: "column",
            color: theme.palette.common.white,
            backgroundColor: alpha(theme.palette.primary.main, 0.9),
            p: { xs: 2, md: 3 },
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              color: alpha(theme.palette.common.white, 0.5),
            }}
            gutterBottom
          >
            Installations
          </Typography>
          <Box
            sx={{
              mt: "auto",
              py: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: 23,
                fontWeight: 700,
              }}
            >
              {name}
              <ChevronRightIcon
                sx={{
                  fontSize: "inherit",
                  mb: -0.5,
                }}
              />
            </Typography>
          </Box>
        </CardContent>
      </StyledLink>
    </Card>
  );
}

export default InstallationCard;
