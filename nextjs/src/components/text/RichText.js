import {
  Container,
  Box,
  Typography,
  Link,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import Markdown from "markdown-to-jsx";

function RichText(props) {
  // console.log("components - text - RichText.js - props: ", props);

  const theme = useTheme();
  const breakpointUpLg = useMediaQuery(theme.breakpoints.up("lg"));

  if (props.props == null) return;

  const { description, isCentered } = props.props;
  const { bgcolor, contentType } = props;
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

  const MarkdownLink = ({ children, ...props }) => (
    <Link {...props}>{children}</Link>
  );

  const Heading = ({ children, ...props }) => (
    <Typography {...props}>{children}</Typography>
  );

  const Paragraph = ({ children, ...props }) => (
    <Typography {...props}>{children}</Typography>
  );

  const Blockquote = ({ children, ...props }) => (
    <Box
      {...props}
      sx={{
        borderLeft: `4px solid ${theme.palette.primary.main}`,
        mb: 4,
        px: 4,
        py: 2,
        fontSize: 21,
        fontStyle: "italic",
        fontWeight: 700,
        backgroundColor: theme.palette.grey.main,
        "& p": {
          fontSize: "inherit",
          fontStyle: "italic",
          fontWeight: "inherit",
        },
      }}
    >
      <FormatQuoteIcon
        sx={{
          fontSize: 48,
        }}
      />
      {children}
    </Box>
  );

  const Image = ({ children, ...props }) => (
    <Box component="img" {...props}>
      {children}
    </Box>
  );

  const StyledMarkdown = styled(Markdown)(({ theme }) => ({}));

  return (
    <Container
      maxWidth="none"
      disableGutters
      sx={{
        backgroundColor: backgroundColor,
      }}
    >
      <Container
        disableGutters={breakpointUpLg ? true : false}
        sx={{
          pt: { xs: 2, md: 4 },
          pb: { xs: 2, md: 4 },
          textAlign: isCentered ? "center" : "left",
        }}
      >
        <StyledMarkdown
          options={{
            forceBlock: true,
            overrides: {
              p: {
                component: Paragraph,
                props: {
                  sx: {
                    mb: { xs: 2, md: 3 },
                    lineHeight:
                      contentType === "installation" || "event"
                        ? 1.75
                        : "initial",
                    [theme.breakpoints.up("lg")]: {
                      fontSize:
                        contentType === "installation" || "event"
                          ? 20
                          : "initial",
                    },
                  },
                },
              },
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
                  sx: {
                    fontSize: 36,
                    fontWeight: 700,
                    lineHeight: 1.35,
                    my: 4,
                  },
                },
              },
              h3: {
                component: Heading,
                props: {
                  component: "h3",
                  sx: {
                    fontSize: 30,
                    fontWeight: 600,
                    lineHeight: 1.25,
                    letterSpacing: 4,
                    mb: 1,
                  },
                },
              },
              img: {
                component: Image,
                props: {
                  sx: {
                    display: "block",
                    maxWidth: "100%",
                    height: "auto",
                    mx: "auto",
                    mb: 2,
                    padding: 0,
                  },
                },
              },
              blockquote: {
                component: Blockquote,
              },
            },
          }}
          sx={{
            [theme.breakpoints.up("md")]: {
              mx: "auto",
              maxWidth:
                contentType === "installation" || "event" ? "50%" : "initial",
            },
          }}
        >
          {description}
        </StyledMarkdown>
      </Container>
    </Container>
  );
}

export default RichText;
