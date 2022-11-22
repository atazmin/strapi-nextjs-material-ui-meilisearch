import { Box, Typography, useTheme } from "@mui/material";
import { useGetSitewide } from "/lib/useRequest";
import { Error } from "/src/components/status/Status";

function TextCard() {
  const { data, error } = useGetSitewide();
  // console.log(
  //   "components - card - TextCard.js - useRequest - data: ",
  //   data?.footer?.textCard
  // );
  const { heading, description } = data?.footer?.textCard ?? {};
  const theme = useTheme();

  if (error) return <Error />;

  return (
    data?.footer?.textCard && (
      <Box component="div">
        <Typography
          sx={{
            fontSize: 26,
            fontWeight: 700,
            mb: 2,
          }}
        >
          {heading}
        </Typography>
        <Typography
          sx={{
            [theme.breakpoints.up("lg")]: {
              fontSize: 23,
            },
          }}
        >
          {description}
        </Typography>
      </Box>
    )
  );
}

export default TextCard;
