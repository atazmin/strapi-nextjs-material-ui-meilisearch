import { Box, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const styles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  fontWeight: "400",
  mx: "auto",
  pageStyles: {
    fontSize: { xs: 21 },
    fontWeight: 500,
    p: { xs: 5, lg: 15 },
  },
  componentStyles: {
    p: { xs: 4 },
    fontSize: { xs: 12 },
  },
  iconStyles: {
    fontSize: 40,
    maxWidth: "40px",
    marginRight: 2,
  },
};

const noContentText = "No content has been added yet. Please check back soon.";

export const Loading = () => {
  return (
    <Typography
      sx={{
        ...styles,
        ...styles.componentStyles,
      }}
    >
      Data is loading...
    </Typography>
  );
};

export const Error = () => {
  return (
    <Typography
      sx={{
        ...styles,
        ...styles.componentStyles,
      }}
    >
      Error loading data!
    </Typography>
  );
};

export const InternalServerError = () => {
  return (
    <Box
      sx={{
        ...styles,
        ...styles.pageStyles,
      }}
    >
      <ErrorOutlineIcon style={{ ...styles.iconStyles }} />
      Internal Server Error
    </Box>
  );
};

export const PageNotFound = () => {
  return (
    <Box
      sx={{
        ...styles,
        ...styles.pageStyles,
      }}
    >
      <ErrorOutlineIcon style={{ ...styles.iconStyles }} />
      Page Not Found
    </Box>
  );
};

export const ComponentNotFound = () => {
  return (
    <Box
      sx={{
        ...styles,
        ...styles.pageStyles,
      }}
    >
      <ErrorOutlineIcon style={{ ...styles.iconStyles }} />
      Component Not Found!
    </Box>
  );
};

export const NoPageContent = () => {
  return (
    <Typography
      component="div"
      sx={{
        ...styles,
        ...styles.pageStyles,
      }}
    >
      <ErrorOutlineIcon style={{ ...styles.iconStyles }} />
      {noContentText}
    </Typography>
  );
};

export const NoComponentContent = () => {
  return (
    <Typography
      sx={{
        ...styles,
        ...styles.componentStyles,
      }}
    >
      <ErrorOutlineIcon style={{ ...styles.iconStyles }} />
      {noContentText}
    </Typography>
  );
};
