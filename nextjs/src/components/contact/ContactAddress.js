import { Link as MuiLink, Typography } from "@mui/material";
import { useGetSitewide } from "/lib/useRequest";
import { Error } from "/src/components/status/Status";

function ContactAddress() {
  const { data, error } = useGetSitewide();
  // console.log("components - contact - ContactAddress.js - useRequest - data: ", data?.shared);
  const { addressDetails, addressMapLink } = data?.shared ?? {};
  const styles = {
    textTransform: "uppercase",
    fontWeight: 500,
    textDecoration: "none",
    mb: { xs: 2, md: 0 },
  };

  if (error) return <Error />;
  if (!addressDetails) return;

  return addressMapLink ? (
    <MuiLink
      href={addressMapLink}
      rel="noreferrer noopener"
      target="_blank"
      sx={{
        ...styles,
      }}
    >
      {addressDetails}
    </MuiLink>
  ) : (
    <Typography
      sx={{
        ...styles,
      }}
    >
      {addressDetails}
    </Typography>
  );
}

export default ContactAddress;
