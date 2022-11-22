import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { green, red } from "@mui/material/colors";
import { useGetSitewide } from "/lib/useRequest";
import { Error } from "/src/components/status/Status";

function NewsletterForm() {
  const { data, error: newsletterError } = useGetSitewide();
  const { isShowNewsletterForm } = data?.footer ?? {};
  // console.log(
  //   "components - form - NewsletterForm.js - useRequest - data: ",
  //   data
  // );
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");
  const [emailStatusText, setEmailStatusText] = useState("");
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

  const style = {
    textField: {
      mb: 1,
    },
    formField: {
      minWidth: { xs: "100%" },
    },
    formButton: {
      ...(success && {
        bgcolor: green[500],
        "&:hover": {
          bgcolor: green[700],
        },
      }),
      ...(error && {
        bgcolor: red[500],
        "&:hover": {
          bgcolor: red[700],
        },
      }),
    },
  };

  const resetInputFields = () => {
    setEmail("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setEmailError(false);

    if (email === "") {
      setEmailError(true);
    }

    if (email) {
      resetInputFields();
      setIsEmailSubmitted(false);

      if (!loading) {
        setSuccess(true);
        setError(true);
        setLoading(false);
      }

      fetch(`${process.env.NEXT_PUBLIC_STRAPI_API}/subscribe`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email }),
      })
        .then((response) => {
          setIsEmailSubmitted(true);

          return response.json().then((data) => {
            const { success, error } = data;
            setEmailStatus(success ? "success" : "error");
            setEmailStatusText(success || error);

            if (success) {
              setSuccess(true);
              setError(false);
              setLoading(false);
            } else {
              setSuccess(false);
              setError(true);
              setLoading(false);
            }
            return data;
          });
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  };

  if (newsletterError) return <Error />;

  return (
    isShowNewsletterForm && (
      <Box
        sx={{
          backgroundColor: theme.palette.grey.main,
          p: { xs: 2, md: 3 },
          width: "100%",
          height: "100%",
        }}
      >
        <Typography
          component="h3"
          variant="h5"
          sx={{ pt: 1, pb: 1, mb: 2, fontSize: 23 }}
        >
          <Typography
            component="em"
            sx={{
              display: "inherit",
              fontSize: "inherit",
              fontStyle: "inherit",
              fontWeight: 700,
            }}
          >
            Be in the know,
          </Typography>
          Subscribe to our gallery invitation list
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <Stack
            direction={{ xs: "column" }}
            spacing={2}
            sx={{ alignItems: "center" }}
          >
            {isEmailSubmitted && (
              <Typography
                sx={{
                  textAlign: "left",
                  color:
                    emailStatus === "success"
                      ? theme.palette.success.main
                      : theme.palette.error.main,
                }}
              >
                {emailStatusText}
              </Typography>
            )}

            <TextField
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              label="Email address"
              variant="outlined"
              size="small"
              required
              error={emailError}
              sx={{
                ...style.textField,
                ...style.formField,
              }}
            />
            <Button
              type="submit"
              variant="green"
              size="large"
              disabled={loading}
              sx={{
                ...style.formButton,
                ...style.formField,
              }}
            >
              Subscribe
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Stack>
        </Box>
      </Box>
    )
  );
}

export default NewsletterForm;
