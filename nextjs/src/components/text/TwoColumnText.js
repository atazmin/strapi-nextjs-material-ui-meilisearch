import {
  Container,
  Stack,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

function TwoColumnText(props) {
  // console.log("components - text - TwoColumnText.js - props: ", props);
const { columnOneText, isColumnOneTextEmphasis, columnTwoText } = props.props ?? {};
  const theme = useTheme();
  const breakpointUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const styles = {
    box: {
      flex: "0 1 50%",
    },
  };

  if (!props.props) return;

  return (
    <Container
      maxWidth="none"
      disableGutters
      sx={{
        backgroundColor: theme.palette.grey.main,
      }}
    >
      <Container
        disableGutters={breakpointUpLg ? true : false}
        sx={{
          py: { xs: 4, md: 10 },
        }}
      >
        <Stack direction={{ md: "row" }} spacing={{ xs: 2, md: 4 }}>
          <Box sx={{ ...styles.box }}>
            <Typography
              sx={{
                fontWeight: isColumnOneTextEmphasis ? 600 : "normal",
                fontSize: isColumnOneTextEmphasis ? 21 : "initial",
              }}
            >
              {columnOneText}
            </Typography>
          </Box>
          <Box sx={{ ...styles.box }}>
            <Typography>{columnTwoText}</Typography>
          </Box>
        </Stack>
      </Container>
    </Container>
  );
}

export default TwoColumnText;
