import { Montserrat } from "@next/font/google";
import {
  createTheme,
  responsiveFontSizes,
  alpha,
  darken,
} from "@mui/material/styles";

export const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

let theme = createTheme({
  palette: {
    primary: {
      lighter: "#F2D383",
      light: "#6E5B54",
      main: "#60504a",
      dark: "#614941",
      darker: "#473630",
    },
    secondary: {
      main: "#19857b",
    },
    grey: {
      lighter: "#F5F5F5",
      light: "#f7f7f7",
      main: "#e7e7e7",
      dark: "#787878",
      darker: "#2e2e2e",
    },
    green: {
      lighter: "#ADF032",
      light: "#8AC126",
      main: "#76A422",
      dark: "#648b1e",
      darker: "#537319",
    },
    yellow: {
      main: "#f8e74e",
    },
    purple: {
      light: "#714ea7",
      main: "#604091",
      dark: "#4e2d80",
    },
    background: {
      default: "#e7e7e7",
    },
    text: {
      primary: "#5F5049",
    },
  },
  typography: {
    fontFamily: montserrat.style.fontFamily,
    body1: {
      fontFamily: montserrat.style.fontFamily,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      mobile: 0,
      tablet: 640,
      laptop: 1200,
      desktop: 1600,
    },
  },
});

theme = createTheme(theme, {
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.primary.main,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          wordWrap: "break-word",
        },
      },
    },
    MuiTextField: {
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            backgroundColor: theme.palette.common.white,
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: 0,
            },
            label: {
              color: alpha(theme.palette.grey.dark, 0.5),
              "&.Mui-focused": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
                padding: "0 5px",
                marginLeft: "-2.5px",
              },
            },
          },
        },
      ],
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          whiteSpace: "pre-wrap",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 0,
        },
      },
      variants: [
        {
          props: { variant: "green" },
          style: {
            backgroundColor: theme.palette.green.main,
            color: theme.palette.common.white,
            "&:hover": {
              backgroundColor: theme.palette.purple.main,
            },
          },
        },
        {
          props: { variant: "yellow" },
          style: {
            backgroundColor: theme.palette.yellow.main,
            color: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: darken(theme.palette.yellow.main, 0.125),
            },
          },
        },
        {
          props: { variant: "grey" },
          style: {
            backgroundColor: theme.palette.grey.main,
            color: theme.palette.primary.main,
            fontWeight: 500,
            "&:hover": {
              backgroundColor: darken(theme.palette.grey.main, 0.075),
            },
          },
        },
      ],
    },
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: "pointer",
          textDecorationColor: "unset",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
