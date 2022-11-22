import {
  Container,
  Grid,
  Skeleton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  useGetFeaturedEvents,
  useGetFeaturedInstallation,
} from "/lib/useRequest";
import { Error } from "/src/components/status/Status";
import EventCard from "/src/components/card/EventCard";
import InstallationCard from "/src/components/card/InstallationCard";

function FeaturedCollectionTypes(props) {
  // console.log(
  //   "components - collection-type - FeaturedCollectionTypes.js - props: ",
  //   props
  // );
  const { isShowFeaturedCollectionTypes } = props.props ?? {};
  const { featuredEvents, error: featuredEventsError } = useGetFeaturedEvents();
  const { featuredInstallation, error: featuredInstallationError } =
    useGetFeaturedInstallation();
  // console.log(
  //   "components - collection-type - FeaturedCollectionTypes.js - useRequest - data: ",
  //   featuredInstallation
  // );
  const theme = useTheme();
  const breakpointUpLg = useMediaQuery(theme.breakpoints.up("lg"));

  if (!isShowFeaturedCollectionTypes) return;
  if (featuredEventsError || featuredInstallationError) return <Error />;

  return (
    <Container
      disableGutters
      maxWidth="none"
      sx={{
        backgroundColor: theme.palette.common.white,
      }}
    >
      <Container
        disableGutters={breakpointUpLg ? true : false}
        sx={{
          py: 4,
        }}
      >
        <Grid container spacing={4}>
          {featuredEvents
            ? featuredEvents.map((event) => {
                return (
                  <Grid
                    key={event.id}
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    sx={{
                      minHeight: 260,
                    }}
                  >
                    <EventCard props={event} />
                  </Grid>
                );
              })
            : Array.from(new Array(2)).map((item, index) => {
                return (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    sx={{
                      minHeight: 260,
                    }}
                  >
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width="100%"
                      height="100%"
                    />
                  </Grid>
                );
              })}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              minHeight: 300,
            }}
          >
            {featuredInstallation ? (
              <InstallationCard props={featuredInstallation[0].attributes} />
            ) : (
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                height="100%"
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

export default FeaturedCollectionTypes;
