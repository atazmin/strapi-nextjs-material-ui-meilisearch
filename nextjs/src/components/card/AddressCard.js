import {
  Card,
  CardContent,
  Typography,
  Link as MuiLink,
  alpha,
  useTheme,
} from "@mui/material";

function AddressCard(props) {
  // console.log("components - card - AddressCard.js - props: ", props);
  const { name, address, link, neighborhood, image } = props.props ?? {};
  
  const theme = useTheme();  
  if (!props.props) return;

  return (
    <Card
      sx={{
        borderRadius: 0,
        boxShadow: 0,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: `url(${image.data.attributes.url} )`,
        "&:hover": {
          "& .MuiCardContent-root": {
            backgroundColor: alpha(theme.palette.purple.main, 0.9),
          },
        },
      }}
    >
      <MuiLink
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          height: "inherit",
          display: "inherit",
          textDecoration: "none",
        }}
      >
        <CardContent
          sx={{
            width: "50%",
            height: "inherit",
            display: "flex",
            flexDirection: "column",
            color: theme.palette.common.white,
            backgroundColor: alpha(theme.palette.primary.main, 0.9),
            ml: "auto",
            p: { xs: 2, md: 5 },
          }}
        >
          <Typography
            component="h3"
            sx={{
              fontSize: 23,
              fontWeight: 800,
              mb: 2,
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              mb: 2,
            }}
          >
            {address}
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              color: alpha(theme.palette.common.white, 0.7),
            }}
          >
            {neighborhood}
          </Typography>
        </CardContent>
      </MuiLink>
    </Card>
  );
}

export default AddressCard;
