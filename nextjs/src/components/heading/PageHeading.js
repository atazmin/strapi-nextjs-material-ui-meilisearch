import {
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

function PageHeading(props) {
  // console.log("components - heading - PageHeading.js - props: ", props);

  const { heading, isCentered } = props.props ?? {};
  const { name, index } = props;
  let { bgcolor } = props;

  if (bgcolor == null) {
    if (index === 0) {
      bgcolor = "grey";
    } else {
      bgcolor = "white";
    }
  }

  let backgroundColor = () => {
    switch (bgcolor) {
      case "white":
        backgroundColor = theme.palette.common.white;
        return backgroundColor;
      case "grey":
        backgroundColor = theme.palette.grey.main;
        return backgroundColor;
      default:
        return;
    }
  };
  const theme = useTheme();
  const breakpointUpLg = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Container
      maxWidth="none"
      disableGutters
      sx={{
        backgroundColor: backgroundColor,
        py: 4,
        [theme.breakpoints.up("md")]: {
          py: 7,
        },
      }}
    >
      <Container disableGutters={breakpointUpLg ? true : false}>
        <Typography
          component="h1"
          sx={{
            fontWeight: 700,
            fontSize: 36,
            textAlign: isCentered ? "center" : "initial",
          }}
        >
          {heading ? heading : name}
        </Typography>
      </Container>
    </Container>
  );
}

export default PageHeading;
