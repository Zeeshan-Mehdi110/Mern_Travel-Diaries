import { AppBar, Box, Tab, Tabs, Toolbar, Typography, styled } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import CardTravelIcon from '@mui/icons-material/CardTravel';
import { useSelector } from "react-redux";

const linksArr = [
  { label: "Home", path: "/" },
  { label: "Diaries", path: "/diaries" },
  { label: "Form", path: "/signup" },
];
const loggedInArr = [
  { label: "Home", path: "/" },
  { label: "Diaries", path: "/diaries" },
  { label: "Profile", path: "/profile" },
  { label: "Add Post", path: "/add" },
];

// StyledTabs component to override the indicator color
const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    backgroundColor: "#FFFFFF",
  },
}));

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [value, setValue] = useState("/");


  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "crimson" }}>
        <Toolbar sx={{
          "maxWidth": "100vw", "paddingRight": "0px", "paddingLeft": "0px", "@media (min-width: 600px)": {
            paddingLeft: { xs: 0, md: "30px" },
            paddingRight: { xs: 0, md: "30px" },
          },
        }} >
          <Box display={{ xs: 'none', md: 'flex' }} alignItems="center" >
            <Link to="/" style={{ color: "white", marginRight: "10px" }}>
              <CardTravelIcon />
            </Link>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: "flex",
                fontFamily: "Josefin Sans",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              MERN Stack Travel Diaries
            </Typography>
          </Box>

          {/* <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuLink data={data} styleObject={{ "color": 'black' }} />
            </Menu>
          </Box> */}
          <Box marginRight="auto" marginLeft="auto" display={{ md: "block", xs: "none" }} >
            {/* Autocomplete code */}
          </Box>
          <Box display="flex">
            <StyledTabs
              value={value}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ "& .MuiTabs-flexContainer": { borderBottom: "none", "padding": "0px" } }}
            >
              {isLoggedIn
                ? loggedInArr.map((element, index) => (
                  <Tab
                    key={index}
                    component={Link}
                    to={element.path}
                    label={element.label}
                    value={element.path}
                    sx={{
                      fontFamily: "Josefin Sans",
                      textDecoration: "none",
                      color: "#FFFFFF",
                      "padding": "0px",
                      "&.Mui-selected": {
                        color: "#FFFFFF",
                      },
                    }}
                  />
                ))
                : linksArr.map((element, index) => (
                  <Tab
                    key={index}
                    component={Link}
                    to={element.path}
                    label={element.label}
                    value={element.path}
                    sx={{
                      fontFamily: "Josefin Sans",
                      textDecoration: "none",
                      color: "#FFFFFF",
                      "&.Mui-selected": {
                        color: "#FFFFFF",
                      },
                    }}
                  />
                ))}
            </StyledTabs>
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default Header;
