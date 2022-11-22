import { Container, Stack, useTheme, useMediaQuery } from "@mui/material";
import Navigation from "src/components/navigation/Navigation";
import ContactPhone from "src/components/contact/ContactPhone";
import WebsiteLogo from "src/components/website/WebsiteLogo";
import WebsiteTitle from "src/components/website/WebsiteTitle";

function Header() {
  const theme = useTheme();
  const breakpointUpLg = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Container
      component="header"
      disableGutters
      maxWidth="none"
      style={{
        height: "80px",
      }}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: theme.palette.common.white,
        [theme.breakpoints.up("lg")]: {
          position: "relative",
        },
      }}
    >
      {breakpointUpLg && (
        <Container
          disableGutters
          sx={{
            height: "inherit",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              py: 2,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <WebsiteLogo />
              <WebsiteTitle />
            </Stack>
            <ContactPhone />
          </Stack>
        </Container>
      )}
      <Container
        disableGutters
        sx={{
          position: "relative",
        }}
      >
        <Navigation />
      </Container>
    </Container>
  );
}

export default Header;
