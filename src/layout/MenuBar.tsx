import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Grid,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import RootState from "../models/RootStateTypes";
import { clearUser } from "../redux/UserSlice";

const MenuBar = ({ loginSuccess }: { loginSuccess?: boolean }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        <Grid container alignItems="center">
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
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
              <Link to="/client_home" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
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
              </Link>
            </Grid>
            <Grid item sx={{ marginRight: 8 }}>
              <Link to="/provider_menu" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
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
              </Link>
            </Grid>
          </Grid>
        );
      } else if (user.userType === "Proveedor") {
        return (
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
              <Link to="/provider_home" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
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
              </Link>
            </Grid>
            <Grid item sx={{ marginRight: 8 }}>
              <Link to="/provider_menu" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
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
              </Link>
            </Grid>
            <Grid item sx={{ marginRight: 8 }}>
              <Link to="/provider_areas" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
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
              </Link>
            </Grid>
          </Grid>
        );
      }
    }
  };

  return (
    <Grid item xs={12}>
      <AppBar position="static" sx={{ backgroundColor: "#242424" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
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
