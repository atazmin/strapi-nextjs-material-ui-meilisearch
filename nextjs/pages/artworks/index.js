import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import {
  Container,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
  Button,
  Typography,
  Pagination,
  PaginationItem,
  Stack,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Close as CloseIcon,
  Photo as PhotoIcon,
  PhotoSizeSelectLarge as PhotoSizeSelectLargeIcon,
  Brush as BrushIcon,
  Portrait as PortraitIcon,
} from "@mui/icons-material";
import queryString from "query-string";
import { fetcher, fetcherWithPagination } from "/lib/api";
import { PageNotFound } from "/src/components/status/Status";
import ArtworksType from "/src/components/collection-type/ArtworksType";
import HeadElement from "/src/components/head/HeadElement";

function Artworks({
  artworkPageData,
  artworksResourceQuery,
  artworksData,
  artworksPaginationData,
  artworkArtTypesData,
  artworkFormatsData,
  artworkSubjectsData,
  artworkTechniquesData,
}) {
  // console.log(
  //   "pages - artworks - index.js - getStaticProps - props:",
  //   artworkPageData
  // );

  const { name, seo, openGraph } = artworkPageData?.attributes ?? {};
  const [artworks, setArtworks] = useState([]);
  const [page, setPage] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [pageSize, setPageSize] = useState("");
  const [total, setTotal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [artworkArtType, setArtworkArtType] = useState("");
  const [artworkFormat, setArtworkFormat] = useState("");
  const [artworkSubject, setArtworkSubject] = useState("");
  const [artworkTechnique, setArtworkTechnique] = useState("");
  const [isReset, setIsReset] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const breakpointUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const iconStyles = {
    display: "block",
    fontSize: "32px",
    mx: "auto",
    mb: "8px",
  };

  const handleSelect = (event) => {
    setIsSelected(true);
    if (event.target.name === "artworkArtType") {
      setArtworkArtType(event.target.value);
    }
    if (event.target.name === "artworkFormat") {
      setArtworkFormat(event.target.value);
    }
    if (event.target.name === "artworkSubject") {
      setArtworkSubject(event.target.value);
    }
    if (event.target.name === "artworkTechnique") {
      setArtworkTechnique(event.target.value);
    }
  };

  const resetFilter = () => {
    setIsReset(true);
    setArtworkArtType("");
    setArtworkFormat("");
    setArtworkSubject("");
    setArtworkTechnique("");
  };

  const previousPage = usePrevious(page);

  function usePrevious(value) {
    const ref = useRef(value);
    useEffect(() => {
      ref.current = value;
    });

    return ref.current;
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [page]);

  useEffect(() => {
    setPage(artworksPaginationData.page);
    setPageCount(artworksPaginationData.pageCount);
    setPageSize(artworksPaginationData.pageSize);
    setTotal(artworksPaginationData.total);
  }, [artworksPaginationData]);

  useEffect(() => {
    setArtworks(artworksData);
  }, [artworksData]);

  useEffect(() => {
    router.push(artworksResourceQuery, undefined, { shallow: true });
  }, [artworksResourceQuery]);

  useEffect(() => {
    const filterArtworks = async () => {
      const query = router.asPath.split(/\?/)[1];
      const parsedQuery = queryString.parse(query);
      const {
        "filters[$and][0][artwork_art_type][name][$eq]": artworkArtTypeValue,
        "filters[$and][1][artwork_format][name][$eq]": artworkFormatValue,
        "filters[$and][2][artwork_subject][name][$eq]": artworkSubjectValue,
        "filters[$and][3][artwork_technique][name][$eq]": artworkTechniqueValue,
        "pagination[page]": pageValue,
      } = parsedQuery;

      let resourceQuery = "";

      if (isSelected || isReset || previousPage !== page) {
        resourceQuery = `?publicationState=live&sort[0]=name&fields[0]=name&fields[1]=slug&fields[2]=price&fields[3]=width&fields[4]=height&populate[0]=image&populate[1]=artist&populate[2]=artwork_art_type&populate[3]=artwork_format&populate[4]=artwork_subject&populate[5]=artwork_technique&pagination[page]=${
          isReset || isSelected ? 1 : page
        }&pagination[pageSize]=40`;
        if (artworkArtType !== "") {
          resourceQuery = resourceQuery.concat(
            `&filters[$and][0][artwork_art_type][name][$eq]=${artworkArtType}`
          );
        }
        if (artworkFormat !== "") {
          resourceQuery = resourceQuery.concat(
            `&filters[$and][1][artwork_format][name][$eq]=${artworkFormat}`
          );
        }
        if (artworkSubject !== "") {
          resourceQuery = resourceQuery.concat(
            `&filters[$and][2][artwork_subject][name][$eq]=${artworkSubject}`
          );
        }
        if (artworkTechnique !== "") {
          resourceQuery = resourceQuery.concat(
            `&filters[$and][3][artwork_technique][name][$eq]=${artworkTechnique}`
          );
        }
        setIsReset(false);
        setIsSelected(false);
      } else {
        resourceQuery = `?publicationState=live&sort[0]=name&fields[0]=name&fields[1]=slug&fields[2]=price&fields[3]=width&fields[4]=height&populate[0]=image&populate[1]=artist&populate[2]=artwork_art_type&populate[3]=artwork_format&populate[4]=artwork_subject&populate[5]=artwork_technique&pagination[page]=${
          pageValue ? pageValue : 1
        }&pagination[pageSize]=40`;

        if (artworkArtTypeValue !== undefined) {
          resourceQuery = resourceQuery.concat(
            `&filters[$and][0][artwork_art_type][name][$eq]=${artworkArtTypeValue}`
          );
          setArtworkArtType(artworkArtTypeValue);
        }
        if (artworkFormatValue !== undefined) {
          resourceQuery = resourceQuery.concat(
            `&filters[$and][0][artwork_format][name][$eq]=${artworkFormatValue}`
          );
          setArtworkFormat(artworkFormatValue);
        }
        if (artworkSubjectValue !== undefined) {
          resourceQuery = resourceQuery.concat(
            `&filters[$and][0][artwork_subject][name][$eq]=${artworkSubjectValue}`
          );
          setArtworkSubject(artworkSubjectValue);
        }
        if (artworkTechniqueValue !== undefined) {
          resourceQuery = resourceQuery.concat(
            `&filters[$and][0][artwork_technique][name][$eq]=${artworkTechniqueValue}`
          );
          setArtworkTechnique(artworkTechniqueValue);
        }
      }

      const { data, meta } = await fetcherWithPagination(
        `${process.env.NEXT_PUBLIC_STRAPI_API}/artworks${resourceQuery}`
      );

      if (data && meta) {
        setArtworks([]);
        setArtworks(data);
        setPage(meta.pagination.page);
        setPageSize(meta.pagination.pageSize);
        setPageCount(meta.pagination.pageCount);
        setTotal(meta.pagination.total);
        setIsLoading(false);
        router.push(resourceQuery, undefined, { shallow: true });
      }
    };
    filterArtworks();
  }, [artworkArtType, artworkFormat, artworkSubject, artworkTechnique, page]);

  const handleChange = (event, value) => {
    setIsLoading(true);
    setPage(value);
  };

  return (
    <>
      {artworkPageData ? (
        <>
          <HeadElement seo={seo} openGraph={openGraph} />
          <Container
            disableGutters={breakpointUpLg ? true : false}
            sx={{ pt: 5 }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                p: 4,
                mb: 4,
              }}
            >
              {!breakpointUpLg && (
                <Typography
                  variant="div"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "0.875rem",
                    mb: 2,
                    em: {
                      fontWeight: 600,
                    },
                  }}
                >
                  Artworks found: <em>{total}</em>
                </Typography>
              )}
              <Grid
                container
                spacing={{ xs: 1, lg: 2 }}
                columns={{ xs: 12, sm: 12, md: 12, lg: 10 }}
                alignItems="flex-end"
                sx={{
                  [theme.breakpoints.up("lg")]: {
                    mb: 0,
                  },
                }}
              >
                <Grid item xs={12} sm={6} md={3} lg={2}>
                  <Box sx={{ mb: 2 }}>
                    {breakpointUpLg && <PhotoIcon sx={{ ...iconStyles }} />}
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Artwork Art Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={artworkArtType}
                        name="artworkArtType"
                        label="artworkArtType"
                        onChange={handleSelect}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {artworkArtTypesData.map((artworkArtType, index) => (
                          <MenuItem
                            key={index}
                            value={artworkArtType.attributes.name}
                          >
                            {artworkArtType.attributes.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                  <Box sx={{ mb: 2 }}>
                    {breakpointUpLg && (
                      <PhotoSizeSelectLargeIcon sx={{ ...iconStyles }} />
                    )}
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label1">
                        Artwork Format
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label1"
                        id="demo-simple-select"
                        value={artworkFormat}
                        name="artworkFormat"
                        label="artworkFormat"
                        onChange={handleSelect}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {artworkFormatsData.map((artworkFormat, index) => (
                          <MenuItem
                            key={index}
                            value={artworkFormat.attributes.name}
                          >
                            {artworkFormat.attributes.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                  <Box sx={{ mb: 2 }}>
                    {breakpointUpLg && <PortraitIcon sx={{ ...iconStyles }} />}
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label1">
                        Artwork Subject
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label1"
                        id="demo-simple-select"
                        value={artworkSubject}
                        name="artworkSubject"
                        label="artworkSubject"
                        onChange={handleSelect}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {artworkSubjectsData.map((artworkSubject, index) => (
                          <MenuItem
                            key={index}
                            value={artworkSubject.attributes.name}
                          >
                            {artworkSubject.attributes.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                  <Box sx={{ mb: 2 }}>
                    {breakpointUpLg && <BrushIcon sx={{ ...iconStyles }} />}
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label1">
                        Artwork Technique
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label1"
                        id="demo-simple-select"
                        value={artworkTechnique}
                        name="artworkTechnique"
                        label="artworkTechnique"
                        onChange={handleSelect}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {artworkTechniquesData.map(
                          (artworkTechnique, index) => (
                            <MenuItem
                              key={index}
                              value={artworkTechnique.attributes.name}
                            >
                              {artworkTechnique.attributes.name}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant="contained"
                      sx={{
                        width: "100%",
                        py: 1.75,
                        fontSize: 16,
                      }}
                      onClick={resetFilter}
                    >
                      Reset Filters
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              {breakpointUpLg && (
                <Grid
                  container
                  spacing={{ lg: 0 }}
                  columns={{ xs: 12, sm: 12, md: 12, lg: 10 }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    lg={2}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    {artworkArtType && (
                      <Button
                        variant="outlined"
                        startIcon={<CloseIcon />}
                        onClick={() => {
                          setIsReset(true);
                          setArtworkArtType("");
                        }}
                      >
                        {artworkArtType}
                      </Button>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    lg={2}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    {artworkFormat && (
                      <Button
                        variant="outlined"
                        startIcon={<CloseIcon />}
                        onClick={() => {
                          setIsReset(true);
                          setArtworkFormat("");
                        }}
                      >
                        {artworkFormat}
                      </Button>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    lg={2}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    {artworkSubject && (
                      <Button
                        variant="outlined"
                        startIcon={<CloseIcon />}
                        onClick={() => {
                          setIsReset(true);
                          setArtworkSubject("");
                        }}
                      >
                        {artworkSubject}
                      </Button>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    lg={2}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    {artworkTechnique && (
                      <Button
                        variant="outlined"
                        startIcon={<CloseIcon />}
                        onClick={() => {
                          setIsReset(true);
                          setArtworkTechnique("");
                        }}
                      >
                        {artworkTechnique}
                      </Button>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    lg={2}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "0.875rem",
                      em: {
                        fontWeight: 600,
                      },
                    }}
                  >
                    Artworks found: <em>{total}</em>
                  </Grid>
                </Grid>
              )}
            </Box>
            {artworks ? (
              <ArtworksType props={artworks} />
            ) : (
              <Container maxWidth="none" disableGutters>
                <Container
                  disableGutters={breakpointUpLg ? true : false}
                  sx={{ pb: 4 }}
                >
                  <Grid container spacing={4}>
                    {Array.from(new Array(40)).map((item, index) => {
                      return (
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
                            animation="wave"
                            variant="rectangular"
                            width="100%"
                            height="100%"
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Container>
              </Container>
            )}
            {pageCount > 1 && (
              <Stack
                disabled={isLoading}
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{
                  mb: 2,
                  py: { xs: 1, md: 3 },
                  backgroundColor: "white",
                }}
              >
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={handleChange}
                  size="large"
                  showFirstButton={breakpointUpLg ? true : false}
                  showLastButton={breakpointUpLg ? true : false}
                  siblingCount={breakpointUpLg ? 2 : 0}
                  boundaryCount={1}
                  renderItem={(item) => (
                    <PaginationItem
                      components={{
                        previous: ArrowBackIcon,
                        next: ArrowForwardIcon,
                      }}
                      {...item}
                      sx={{
                        "&.Mui-selected": {
                          pointerEvents: "none",
                        },
                      }}
                    />
                  )}
                />
                <Typography sx={{ color: "black", fontSize: "0.875rem" }}>
                  {(page - 1) * pageSize + 1} -{" "}
                  {pageCount !== page ? page * pageSize : total} of {total}
                </Typography>
              </Stack>
            )}
          </Container>
        </>
      ) : (
        <PageNotFound />
      )}
    </>
  );
}

export async function getStaticProps() {
  const { data: artworkPageData } = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/artwork-page?publicationState=live&populate[seo][populate]=%2A&populate[openGraph][populate]=%2A`
  );

  const resourceQuery = `?publicationState=live&sort[0]=name&fields[0]=name&fields[1]=slug&fields[2]=price&fields[3]=width&fields[4]=height&populate[0]=image&populate[1]=artist&populate[2]=artwork_art_type&populate[3]=artwork_format&populate[4]=artwork_subject&populate[5]=artwork_technique&pagination[page]=1&pagination[pageSize]=40`;
  const { data, meta, notFound } = await fetcherWithPagination(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/artworks${resourceQuery}`
  );

  const { data: artworkArtTypesData } = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/artwork-art-types`
  );

  const { data: artworkFormatsData } = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/artwork-formats`
  );

  const { data: artworkSubjectsData } = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/artwork-subjects`
  );

  const { data: artworkTechniquesData } = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_API}/artwork-techniques`
  );

  if (notFound) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      artworkPageData,
      artworksResourceQuery: resourceQuery,
      artworksData: data,
      artworksPaginationData: meta ? meta.pagination : null,
      artworkArtTypesData,
      artworkFormatsData,
      artworkSubjectsData,
      artworkTechniquesData,
    },
  };
}

export default Artworks;
