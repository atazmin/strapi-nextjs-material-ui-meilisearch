import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import { format } from "date-fns";
import { fetcher } from "/lib/api";

function CollectionType(props) {
  // console.log(
  //   "components - collection-type - CollectionType.js - props: ",
  //   props
  // );

  const { eventType } = props.props ?? {};
  const [collection, setCollection] = useState([]);
  const [collectionType, setCollectionType] = useState(props.collectionName);
  const date = format(new Date(), "yyyy-MM-dd");
  const theme = useTheme();
  const StyledLink = styled(Link)(({ theme }) => ({}));
  const breakpointUpLg = useMediaQuery(theme.breakpoints.up("lg"));

  useEffect(() => {
    const getCollection = async () => {
      let resourceQuery = "";

      if (eventType === "isShowPastEvents") {
        resourceQuery = `&filters[date][$lt]=${date}`;
      }
      if (eventType === "isShowUpcomingEvents") {
        resourceQuery = `&filters[date][$gte]=${date}`;
      }

      const { data, notFound } = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_API}/${collectionType}?publicationState=live${resourceQuery}&sort=name%3Aasc&[populate]=slug&pagination[start]=0&pagination[limit]=100`
      );

      if (notFound) {
        return;
      }

      if (collectionType === "clients") {
        const clientsData = data.map((item) => {
          return {
            ...item,
            attributes: {
              ...item.attributes,
              slug: item.attributes.slug.data?.attributes.slug,
            },
          };
        });
        setCollection(clientsData);
        return;
      }
      setCollection(data);
    };
    getCollection();
  }, [collectionType, eventType, date]);

  if (!props.props) return;

  return (
    <Container
      disableGutters={breakpointUpLg ? true : false}
      sx={{
        pt: { xs: 2, md: 2 },
        pb: { xs: 4, md: 4 },
      }}
    >
      <Typography
        component="h3"
        sx={{
          borderBottomWidth: "2px",
          borderBottomStyle: "solid",
          borderBottomColor: "common.white",
          mb: { xs: 1, md: 2 },
        }}
      >
        <Typography
          component="span"
          sx={{
            display: "inline-block",
            backgroundColor: "common.white",
            color: "common.black",
            fontWeight: 700,
            py: 1,
            px: 2,
            textTransform: "uppercase",
          }}
        >
          {collectionType === "clients" && "Selected corporate projects"}
          {collectionType === "videos" && "Videos"}
          {collectionType === "installations" && "Installations"}
          {collectionType === "events" &&
            ((eventType === "isShowPastEvents" && "Past events") ||
              (eventType === "isShowUpcomingEvents" && "Upcoming events"))}
        </Typography>
      </Typography>
      <Grid
        container
        rowSpacing={{ xs: 1 }}
        columnSpacing={{ xs: 1, md: 4 }}
        sx={{
          pt: 2,
          ">.MuiGrid-item": {
            pb: 1,
          },
        }}
      >
        {collection.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={item.id}
            sx={{
              mb: 2,
            }}
          >
            {item.attributes.slug ? (
              <StyledLink
                href={`/${
                  collectionType === "clients"
                    ? "installations"
                    : collectionType
                }/${item.attributes.slug}`}
                sx={{
                  fontWeight: 500,
                  color: "green.dark",
                  "&:hover": {
                    textDecoration: "none",
                  },
                }}
              >
                {item.attributes.name}
              </StyledLink>
            ) : (
              <Typography sx={{ fontWeight: 500 }}>
                {item.attributes.name}
              </Typography>
            )}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CollectionType;
