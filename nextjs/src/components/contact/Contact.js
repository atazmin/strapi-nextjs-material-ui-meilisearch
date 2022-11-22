import {
  Container,
  Grid,
  Box,
  Link as MuiLink,
  Stack,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import Markdown from "markdown-to-jsx";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AddressCard from "/src/components/card/AddressCard";
import ContactPhone from "/src/components/contact/ContactPhone";
import ContactEmail from "/src/components/contact/ContactEmail";

function Contact(props) {
  // console.log("components - contact - Contact.js - props: ", props);

  const { description, phoneNumber, emailAddress, addressCard } = props.props;
  const theme = useTheme();
  const breakpointUpLg = useMediaQuery(theme.breakpoints.up("lg"));

  const MarkdownLink = ({ children, ...props }) => (
    <MuiLink {...props}>{children}</MuiLink>
  );

  const Heading = ({ children, ...props }) => (
    <Typography {...props}>{children}</Typography>
  );

  const StyledMarkdown = styled(Markdown)(({ theme }) => ({}));

  return (
    <Container
      maxWidth="none"
      disableGutters
      sx={{
        backgroundColor: theme.palette.common.white,
      }}
    >
      <Container
        disableGutters={breakpointUpLg ? true : false}
        sx={{
          py: 4,
        }}
      >
        <Grid container sx={{}}>
          <Grid item xs={12} lg={6}>
            <StyledMarkdown
              options={{
                forceBlock: true,
                overrides: {
                  a: {
                    component: MarkdownLink,
                    props: {
                      target: "_blank",
                    },
                  },
                  h2: {
                    component: Heading,
                    props: {
                      component: "h2",
                      variant: "h4",
                      sx: {
                        fontWeight: 700,
                      },
                    },
                  },
                },
              }}
            >
              {description}
            </StyledMarkdown>
          </Grid>
          <Grid item xs={12} lg={6}>
            <AddressCard props={addressCard} />
          </Grid>
        </Grid>
        <Divider sx={{ my: 5 }} />
        <Box
          sx={{
            [theme.breakpoints.up("lg")]: {
              maxWidth: "50%",
              mx: "auto",
            },
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="center"
            alignItems="center"
            spacing={1}
            sx={{
              mb: 2,
              ".MuiSvgIcon-root": {
                fontSize: "3rem",
              },
            }}
          >
            <PhoneIcon style={{ width: "48px", height: "48px" }} />
            <ContactPhone props={phoneNumber} />
          </Stack>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="center"
            alignItems="center"
            spacing={1}
            sx={{
              pb: 4,
              ".MuiSvgIcon-root": {
                fontSize: "3rem",
              },
            }}
          >
            <EmailIcon sx={{ width: "48px", height: "48px" }} />
            <ContactEmail props={emailAddress} />
          </Stack>
        </Box>
      </Container>
    </Container>
  );
}

export default Contact;
