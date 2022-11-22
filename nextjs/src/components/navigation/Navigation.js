import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import {
  Drawer,
  AppBar,
  Typography,
  Stack,
  MenuList,
  MenuItem,
  Divider,
  IconButton,
  Box,
  Skeleton,
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useGetNavigation } from "/lib/useRequest";
import { Error, Loading } from "/src/components/status/Status";
import WebsiteLogo from "src/components/website/WebsiteLogo";
import InputBase from "@mui/material/InputBase";

const drawerWidth = 300;

function Navigation(props) {
  // console.log("component - navigation - Navigation.js - props: ", props);

  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const { links, error } = useGetNavigation();
  const theme = useTheme();
  const breakpointUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const StyledLink = styled(Link)(({ theme }) => ({
    color: breakpointUpLg
      ? theme.palette.common.white
      : theme.palette.primary.dark,
    textDecoration: "none",
    textAlign: "left",
    fontWeight: 500,
    fontSize: 21,
    flexGrow: 1,
    padding: "16px 8px",
    borderBottom: `1px solid ${theme.palette.grey.main}`,

    [theme.breakpoints.up("lg")]: {
      textTransform: "uppercase",
      textAlign: "center",
      fontWeight: "initial",
      fontSize: 16,
      fontWeight: 500,
      padding: "8px",
      borderBottom: "none",
    },
  }));
  const router = useRouter();
  const path = router.asPath.split("?")[0];
  const isSearchPage = router.pathname === "/search";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearchOnMouseLeave = () => {
    if (searchValue === "") {
      setIsSearchOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSearchOpen(!isSearchOpen);

    if (searchValue !== "") {
      setSearchValue("");
      router.push(
        {
          pathname: "/search",
          query: { q: encodeURI(searchValue) },
        },
        undefined,
        { shallow: true }
      );
    }
  };

  // console.log(
  //   "component - navigation - Navigation.js - useGetNavigation - links: ",
  //   links
  // );

  if (error) return <Error />;
  if (!links)
    return (
      <Box
        sx={{
          px: 2,
          py: 2,
          height: "80px",
          [theme.breakpoints.up("md")]: {
            position: "absolute",
            top: "100%",
            left: 0,
          },
        }}
      >
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={40}
        />
      </Box>
    );

  const navigationList = (
    <MenuList
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        justifyContent: "space-between",
        alignItems: { md: "center" },
        width: breakpointUpLg ? "calc(100% - 50px)" : "initial",
      }}
    >
      {links.map((item) => {
        return (
          <MenuItem
            key={item.id}
            disabled={path == item.href}
            sx={{
              m: 0,
              p: 0,
              ...(!breakpointUpLg && {
                width: "100%",
              }),
              ...(path == item.href && {
                borderBottom: `1px solid ${theme.palette.primary.light}`,
                backgroundColor: theme.palette.primary.dark,
                color: theme.palette.common.white,
              }),
              "&.Mui-disabled": {
                opacity: 1,
              },
            }}
          >
            <StyledLink
              href={item.href}
              sx={{
                color: "inherit",
              }}
            >
              {item.label}
            </StyledLink>
          </MenuItem>
        );
      })}
    </MenuList>
  );

  return (
    <>
      <AppBar
        component="nav"
        position="relative"
        sx={{
          px: 2,
          py: 2,
          flexDirection: "row",
          alignItems: "center",
          height: "80px",
          [theme.breakpoints.up("md")]: {
            position: "absolute",
            top: "100%",
            left: 0,
          },
        }}
      >
        {!breakpointUpLg && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              flex: "0 1 50%",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, alignSelf: "center" }}
            >
              <MenuIcon
                sx={{
                  fontSize: 40,
                }}
              />
            </IconButton>
            <Box
              sx={{
                transform: "translateX(50%)",
              }}
            >
              <WebsiteLogo />
            </Box>
          </Stack>
        )}
        {breakpointUpLg && (
          <Stack
            direction="row"
            justifyContent={isSearchPage ? "center" : "space-between"}
            alignItems="center"
            sx={{
              flexGrow: 1,
              position: "relative",
            }}
          >
            {navigationList}
          </Stack>
        )}
        {!isSearchPage && (
          <Stack
            component="form"
            direction="row"
            onSubmit={handleSubmit}
            onMouseLeave={handleSearchOnMouseLeave}
            sx={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              right: 16,
              borderRadius: 2,
              backgroundColor: theme.palette.primary.dark,
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: isSearchOpen
                ? theme.palette.common.white
                : alpha(theme.palette.common.white, 0.15),
              marginLeft: 0,
              "&:hover": {
                borderColor: theme.palette.common.white,
              },
            }}
          >
            <InputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              sx={{
                flex: 1,
                borderRadius: "inherit",
                "& .MuiInputBase-input": {
                  py: 1,
                  pl: 2,
                  pr: 3,
                  color: theme.palette.common.white,
                  width: isSearchOpen ? "300px" : 0,
                  transition: theme.transitions.create("width", {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
                },
              }}
            />
            <IconButton
              type="button"
              aria-label="search"
              onClick={handleSubmit}
              sx={{
                position: "absolute",
                top: "50%",
                right: 0,
                transform: "translateY(-50%)",
                color: theme.palette.common.white,
                borderRadius: 2,
                "& .MuiTouchRipple-child": {
                  borderRadius: 2,
                },
              }}
            >
              <SearchIcon />
            </IconButton>
          </Stack>
        )}
      </AppBar>
      {!breakpointUpLg && (
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <CloseIcon />
                <Typography
                  variant="h6"
                  sx={{
                    my: 2,
                    fontWeight: 600,
                  }}
                >
                  Close
                </Typography>
              </Stack>
              <Divider />
              {navigationList}
            </Box>
          </Drawer>
        </Box>
      )}
    </>
  );
}

export default Navigation;
