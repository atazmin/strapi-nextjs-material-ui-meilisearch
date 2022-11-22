import { Typography, Link as MuiLink, Skeleton, useTheme } from "@mui/material";
import { useGetSitewide } from "/lib/useRequest";
import { Error } from "/src/components/status/Status";

function WebsiteCredit() {
  const { data, error } = useGetSitewide();
  const { isShowWebsiteCredit } = data?.footer ?? {};
  // console.log(
  //   "components - website - WebsiteCopyright.js - useRequest - data: ",
  //   isShowWebsiteCredit
  // );

  if (error) return <Error />;
  if (!isShowWebsiteCredit) return;

  return (
    isShowWebsiteCredit && (
      <Typography
        align="center"
        component="p"
        variant="body1"
        sx={{
          textAlign: "center",
          pt: 2,
          pb: 1,
          fontSize: 12,
          fontWeight: 500,
        }}
      >
        Website by:
        <MuiLink
          href="https://lemonbirdsolutions.com"
          rel="noreferrer noopener"
          target="_blank"
          sx={{
            ml: 1,
            color: "inherit",
            textDecoration: "none",

            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          LemonBird
        </MuiLink>
      </Typography>
    )
  );
}

export default WebsiteCredit;
