import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MeiliSearch from "meilisearch";
import { fetcher } from "/lib/api";
import { PageNotFound } from "src/components/status/Status";
import HeadElement from "/src/components/head/HeadElement";
import ArtworksType from "/src/components/collection-type/ArtworksType";

const client = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILISEARCH_DOMAIN,
  apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_MASTER_KEY,
});

function SearchPage({ data }) {
  // console.log("pages - search - index.js - getStaticProps - props: ", data);

  const { name, seo, openGraph } = data?.attributes ?? {};
  const theme = useTheme();
  const breakpointUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [totalResults, setTotalResults] = useState("");
  const [processingTime, setProcessingTime] = useState("");
  const [queryValue, setQueryValue] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const style = {
    textField: {
      mb: 1,
    },
    formField: {
      maxWidth: { xs: "100%", sm: "400px" },
    },
  };

  const handleSearchInput = (value) => {
    setSearchValue(value);
    router.replace({ query: { q: encodeURI(value) } });
  };

  useEffect(() => {
    if (router.isReady) {
      const query = router.query.q;
      setQueryValue(true);
      setSearchValue(decodeURI(query));
    }
  }, [router.isReady]);

  useEffect(() => {
    const getResultsData = async () => {
      try {
        const { hits, processingTimeMs } = await client
          .index("artwork")
          .search(searchValue, {
            limit: 80,
          });
        setSearchResults(hits);
        setProcessingTime(processingTimeMs);
      } catch (error) {
        // console.log(
        //   "Pages - Search - index.js - useEffect - getResultsData - error",
        //   error
        // );
      }
    };
    if (queryValue) {
      getResultsData();
    }
  }, [searchValue, queryValue]);

  useEffect(() => {
    const getResultsMetaData = async () => {
      try {
        const { estimatedTotalHits } = await client
          .index("artwork")
          .search(searchValue);
        setTotalResults(estimatedTotalHits);
      } catch (error) {
        // console.log(
        //   "Pages - Search - index.js - useEffect - getResultsMetaData - error",
        //   error
        // );
      }
    };
    getResultsMetaData();
  }, []);

  return (
    <>
      {data ? (
        <>
          <HeadElement seo={seo} openGraph={openGraph} />
          <Container
            disableGutters={breakpointUpLg ? true : false}
            sx={{ pb: 4 }}
          >
            <Box
              sx={{
                backgroundColor: theme.palette.common.white,
                p: 4,
                my: 4,
              }}
            >
              <Stack>
                <Typography
                  sx={{
                    mb: 1,
                    py: 1,
                  }}
                >
                  Total Artworks: {totalResults}
                </Typography>
                <TextField
                  onChange={(event) => {
                    handleSearchInput(event.target.value);
                  }}
                  fullWidth
                  value={searchValue}
                  label="Search Artworks"
                  variant="outlined"
                  size="large"
                  sx={{
                    ...style.textField,
                    ...style.formField,
                  }}
                />
                {searchValue && (
                  <Typography
                    sx={{
                      mb: 1,
                      py: 1,
                    }}
                  >
                    {searchResults.length} results for &quot;{searchValue}&quot;
                    in {processingTime} ms
                  </Typography>
                )}
              </Stack>
            </Box>
            {searchResults && <ArtworksType props={searchResults} />}
          </Container>
        </>
      ) : (
        <PageNotFound />
      )}
    </>
  );
}

export async function getStaticProps() {
  const { data, notFound } = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/search-page?publicationState=live&populate[seo][populate]=%2A&populate[openGraph][populate]=%2A`
  );

  if (notFound) {
    return {
      notFound: true,
    };
  }

  return { props: { data }, revalidate: 60 };
}

export default SearchPage;
