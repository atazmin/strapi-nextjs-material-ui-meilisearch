import Link from "next/link";
import { Skeleton, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useGetSitewide } from "/lib/useRequest";
import { Error } from "/src/components/status/Status";

function WebsiteTitle() {
  const { data, error } = useGetSitewide();
  // console.log("components - website - WebsiteTitle.js - useRequest - data: ", data?.shared);
  const { siteName } = data?.shared ?? {};
  const StyledLink = styled(Link)(({ theme }) => ({
    textTransform: "uppercase",
    fontWeight: 600,
    letterSpacing: "1.4px",
    textDecoration: "none",
    color: theme.palette.primary.main,
  }));

  if (error) return <Error />;
  if (!siteName)
    return (
      <Skeleton
        animation="wave"
        variant="text"
        width={330}
        sx={{ fontSize: "1rem" }}
      />
    );

  return (
    <StyledLink href="/" style={{}}>
      {siteName}
    </StyledLink>
  );
}

export default WebsiteTitle;
