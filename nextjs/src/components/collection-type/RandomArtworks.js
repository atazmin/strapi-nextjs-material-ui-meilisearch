import Link from "next/link";
import {
  Stack,
  Container,
  Grid,
  Skeleton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useGetRandomArtworks } from "/lib/useRequest";
import ArtworksType from "/src/components/collection-type/ArtworksType";
import { Error } from "/src/components/status/Status";

function RandomArtworks(props) {
  const { isShowRandomArtworks, __component } = props.props ?? {};
  const { artworks, error } = useGetRandomArtworks();
  // console.log(
  //   "component - collection-type - RandomArtworks.js - props: ",
  //   props
  // );
  // console.log(
  //   "components - collection-type - RandomArtworks.js - useRequest - data: ",
  //   artworks
  // );
  const theme = useTheme();
  const breakpointUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const StyledLink = styled(Link)(() => ({
    color: "inherit",
    textDecoration: "inherit",
    alignSelf: "center",
    padding: "12px 32px",
    fontSize: 16,
    backgroundColor: theme.palette.grey.main,
  }));

  if (!isShowRandomArtworks) return;
  if (error) return <Error />;

  return (
    <>
      {artworks ? (
        <>
          <ArtworksType props={artworks} bgcolor="white" />
          <Stack
            style={{
              height: "80px",
            }}
            sx={{
              backgroundColor: theme.palette.common.white,
              pb: { xs: 4, md: 6 },
            }}
          >
            <StyledLink href="/artworks">See all artworks</StyledLink>
          </Stack>
        </>
      ) : (
        <Container
          maxWidth="none"
          disableGutters
          sx={{
            backgroundColor: theme.palette.common.white,
          }}
        >
          <Container
            disableGutters={breakpointUpLg ? true : false}
            sx={{ pb: 4 }}
          >
            <Grid container spacing={4}>
              {Array.from(new Array(8)).map((item, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  sx={{
                    aspectRatio: "1/1",
                  }}
                >
                  <Skeleton
                    key={index}
                    animation="wave"
                    variant="rectangular"
                    width="100%"
                    height="100%"
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Container>
      )}
    </>
  );
}

export default RandomArtworks;
