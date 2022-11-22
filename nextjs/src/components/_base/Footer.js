import { Container, Stack, Grid, Divider, useTheme } from "@mui/material";
import FooterCard from "/src/components/card/FooterCard";
import TextCard from "/src/components/card/TextCard";
import WebsiteCredit from "/src/components/website/WebsiteCredit";
import WebsiteCopyright from "/src/components/website/WebsiteCopyright";
import ContactAddress from "/src/components/contact/ContactAddress";
import ContactPhone from "/src/components/contact/ContactPhone";
import NewsletterForm from "/src/components/form/NewsletterForm";

function Footer() {
  const theme = useTheme();

  return (
    <Container
      component="footer"
      maxWidth="none"
      sx={{
        backgroundColor: theme.palette.grey.light,
        py: 4,
      }}
    >
      <Container disableGutters>
        <Grid
          container
          spacing={4}
          direction={{ md: "row-reverse" }}
          sx={{
            mb: 5,
          }}
        >
          <Grid item xs={12} md={6}>
            <TextCard />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={4} direction={{ md: "row-reverse" }}>
              <Grid item xs={12} md={6}>
                <FooterCard />
              </Grid>
              <Grid item xs={12} md={6}>
                <NewsletterForm />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          justifyContent="space-between"
          sx={{ py: { md: 3 }, textAlign: { xs: "center", md: "initial" } }}
        >
          <WebsiteCopyright />
          <Stack direction={{ xs: "column", md: "row" }}>
            <ContactAddress />
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderColor: theme.palette.primary.main,
                mx: 1,
                my: 0.75,
                [theme.breakpoints.down("md")]: {
                  display: "none",
                },
              }}
            />
            <ContactPhone />
          </Stack>
        </Stack>
        <WebsiteCredit />
      </Container>
    </Container>
  );
}

export default Footer;
