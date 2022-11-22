import Image from "next/image";
import Link from "next/link";
import { Box, Skeleton, useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useGetSitewide } from "/lib/useRequest";
import { Error } from "/src/components/status/Status";

function WebsiteLogo() {
  const { data, error } = useGetSitewide();
  // console.log(
  //   "components - website - WebsiteLogo.js - useRequest - data: ",
  //   data?.shared
  // );
  const { siteLogo } = data?.shared ?? {};
  const theme = useTheme();
  const breakpointUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const StyledLink = styled(Link)(() => ({
    lineHeight: 0,
  }));

  if (error) return <Error />;
  if (!siteLogo)
    return (
      <Skeleton animation="wave" variant="circular" width={50} height={50} />
    );

  return (
    <StyledLink href="/">
      <Image
        priority
        src={siteLogo.data.attributes.url}
        alt={siteLogo.data.attributes.alternativeText}
        width={40}
        height={40}
        style={{
          ...(breakpointUpLg && {
            width: "50px",
            height: "50px",
          }),
        }}
      />
    </StyledLink>
  );
}

export default WebsiteLogo;
