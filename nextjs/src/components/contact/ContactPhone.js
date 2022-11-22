import { Link as MuiLink, Skeleton } from "@mui/material";
import { useGetSitewide } from "/lib/useRequest";
import { Error } from "/src/components/status/Status";

function ContactPhone() {
  const { data, error } = useGetSitewide();
  // console.log("components - contact - ContactPhone.js - useRequest - data: ", data?.shared);
  const { phoneNumber } = data?.shared ?? {};

  if (error) return <Error />;
  if (!phoneNumber) return;

  return (
    <MuiLink
      href={`tel:${phoneNumber}`}
      sx={{
        textTransform: "uppercase",
        fontWeight: 500,
        letterSpacing: "1.4px",
        textDecoration: "none",
      }}
    >
      {phoneNumber}
    </MuiLink>
  );
}

export default ContactPhone;
