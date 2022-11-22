import { styled } from "@mui/system";
import Header from "/src/components/_base/Header";
import Footer from "/src/components/_base/Footer";

const Main = styled("main")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    paddingTop: "80px",
  },
}));

function Layout({ children }) {
  // console.log("components - layout - Layout.js - props - children: ", children);

  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}

export default Layout;
