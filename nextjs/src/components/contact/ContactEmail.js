import { Link as MuiLink } from "@mui/material";

function ContactEmail(props) {
  // console.log("components - contact - ContactEmail.js - props: ", props);

  const emailAddress = props.props;

  return (
    <MuiLink
      href={`mailto:${emailAddress}`}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        fontWeight: 500,
        letterSpacing: "1.4px",
        textDecoration: "none",
        color: "green.dark",
        "&:hover": {
          textDecoration: "underline",
        },
      }}
    >
      {emailAddress}
    </MuiLink>
  );
}

export default ContactEmail;
