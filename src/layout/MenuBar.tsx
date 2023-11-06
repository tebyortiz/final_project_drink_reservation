import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Grid,
  Typography,
  Avatar,
  IconButton,
  Hidden,
  Menu,
  MenuItem,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import RootState from "../models/RootStateTypes";
import { clearUser } from "../redux/UserSlice";
import { useState } from "react";

const MenuBar = ({ loginSuccess }: { loginSuccess?: boolean }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/login");
  };

  const getAvatarStyle = () => {
    if (user && user.userType === "Cliente") {
      return {
        boxShadow: "0px 0px 10px rgba(236, 41, 159, 0.9)",
        borderRadius: "50%",
      };
    } else if (user && user.userType === "Proveedor") {
      return {
        boxShadow: "0px 0px 10px rgba(1, 255, 114, 0.9)",
        borderRadius: "50%",
      };
    }
    return {};
  };

  const renderUserSection = () => {
    if (loginSuccess && user) {
      return (
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Typography
              variant="subtitle1"
              sx={{
                marginRight: "8px",
                fontFamily: "Quicksand, sans-serif",
                fontWeight: "bold",
                fontSize: "24px",
              }}
            >
              {user.name}
            </Typography>
          </Grid>
          <Grid item>
            {user.userType === "Proveedor" ? (
              <Avatar
                alt={user.company?.name}
                src={user.company?.logo}
                style={getAvatarStyle()}
              />
            ) : (
              <Avatar
                alt={user.name}
                src={user.photo}
                style={getAvatarStyle()}
              />
            )}
          </Grid>
          <Grid item>
            <IconButton color="inherit" onClick={handleLogout}>
              <ExitToAppIcon />
            </IconButton>
          </Grid>
        </Grid>
      );
    }
    return null;
  };

  const renderButtons = () => {
    if (!loginSuccess || !user) {
      return (
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <Link to="/registration" style={{ textDecoration: "none" }}>
              <Button
                color="inherit"
                sx={{
                  backgroundColor: "#01FF72",
                  color: "#242424",
                  fontFamily: "Quicksand, sans-serif",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#01FF72",
                    color: "white",
                  },
                }}
              >
                Registrarse
              </Button>
            </Link>
          </Grid>
          <Grid item sx={{ marginRight: 8 }}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                color="inherit"
                sx={{
                  backgroundColor: "#01FF72",
                  color: "#242424",
                  fontFamily: "Quicksand, sans-serif",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#01FF72",
                    color: "white",
                  },
                }}
              >
                Ingresar
              </Button>
            </Link>
          </Grid>
        </Grid>
      );
    } else {
      if (user.userType === "Cliente") {
        return (
          <Toolbar disableGutters>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item>
                <Hidden lgUp>
                  <Button color="inherit" onClick={handleMenuOpen}>
                    <MenuIcon />
                  </Button>
                </Hidden>

                <Hidden mdDown>
                  <Button
                    onClick={() => navigate("/client_home")}
                    variant="contained"
                    color="primary"
                    sx={{
                      position: "absolute",
                      mt: "-18px",
                      ml: 5,
                      backgroundColor: "#EC299F",
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "#EC299F",
                      },
                    }}
                  >
                    Inicio
                  </Button>

                  <Button
                    onClick={() => navigate("/client_local_providers")}
                    variant="contained"
                    color="primary"
                    sx={{
                      position: "absolute",
                      mt: "-18px",
                      ml: 18,
                      backgroundColor: "#EC299F",
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "#EC299F",
                      },
                    }}
                  >
                    Proveedores Cercanos
                  </Button>
                </Hidden>
              </Grid>
            </Grid>

            <Hidden lgUp>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/client_home");
                    handleMenuClose();
                  }}
                >
                  Inicio
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    navigate("/client_local_providers");
                    handleMenuClose();
                  }}
                >
                  Proveedores Cercanos
                </MenuItem>
              </Menu>
            </Hidden>
          </Toolbar>
        );
      } else if (user.userType === "Proveedor") {
        return (
          <Toolbar disableGutters>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item>
                <Hidden lgUp>
                  <Button color="inherit" onClick={handleMenuOpen}>
                    <MenuIcon />
                  </Button>
                </Hidden>

                <Hidden mdDown>
                  <Button
                    onClick={() => navigate("/provider_home")}
                    variant="contained"
                    color="primary"
                    sx={{
                      position: "absolute",
                      mt: "-18px",
                      ml: 5,
                      backgroundColor: "#01FF72",
                      color: "#242424",
                      fontFamily: "Quicksand, sans-serif",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "#01FF72",
                      },
                    }}
                  >
                    Inicio
                  </Button>

                  <Button
                    onClick={() => navigate("/provider_menu")}
                    variant="contained"
                    color="primary"
                    sx={{
                      position: "absolute",
                      mt: "-18px",
                      ml: 18,
                      backgroundColor: "#01FF72",
                      color: "#242424",
                      fontFamily: "Quicksand, sans-serif",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "#01FF72",
                      },
                    }}
                  >
                    Servicios
                  </Button>

                  <Button
                    onClick={() => navigate("/provider_areas")}
                    variant="contained"
                    color="primary"
                    sx={{
                      position: "absolute",
                      mt: "-18px",
                      ml: 35,
                      backgroundColor: "#01FF72",
                      color: "#242424",
                      fontFamily: "Quicksand, sans-serif",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "#01FF72",
                      },
                    }}
                  >
                    Áreas
                  </Button>

                  <Button
                    onClick={() => navigate("/provider_stock")}
                    variant="contained"
                    color="primary"
                    sx={{
                      position: "absolute",
                      mt: "-18px",
                      ml: 48,
                      backgroundColor: "#01FF72",
                      color: "#242424",
                      fontFamily: "Quicksand, sans-serif",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "#01FF72",
                      },
                    }}
                  >
                    Stock
                  </Button>
                </Hidden>
              </Grid>
            </Grid>

            <Hidden lgUp>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/provider_home");
                    handleMenuClose();
                  }}
                >
                  Inicio
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    navigate("/provider_menu");
                    handleMenuClose();
                  }}
                >
                  Servicios
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    navigate("/provider_areas");
                    handleMenuClose();
                  }}
                >
                  Áreas
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    navigate("/provider_stock");
                    handleMenuClose();
                  }}
                >
                  Stock
                </MenuItem>
              </Menu>
            </Hidden>
          </Toolbar>
        );
      }
    }
  };

  return (
    <Grid item xs={12}>
      <AppBar position="static" sx={{ backgroundColor: "#242424" }}>
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>{renderButtons()}</Grid>
              <Grid item>{renderUserSection()}</Grid>
            </Grid>
          </Box>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default MenuBar;
