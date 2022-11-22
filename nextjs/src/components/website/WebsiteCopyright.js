import { Typography, Skeleton } from "@mui/material";
import { useGetSitewide } from "/lib/useRequest";
import { Error } from "/src/components/status/Status";

function WebsiteCopyright() {
  const { data, error } = useGetSitewide();
  const { copyright } = data?.footer ?? {};
  // console.log(
  //   "components - website - WebsiteCopyright.js - useRequest - data: ",
  //   data
  // );

  if (error) return <Error />;
  if (!copyright) return;

  return (
    <Typography sx={{ fontWeight: 500, mb: { xs: 2, md: 0 } }}>
      &copy; {new Date().getFullYear()} {copyright}
    </Typography>
  );
}

export default WebsiteCopyright;
