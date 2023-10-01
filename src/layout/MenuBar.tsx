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

  const renderUserSection = () => {
    if (loginSuccess && user) {
      return (
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="subtitle1" sx={{ marginRight: "8px" }}>
              Bienvenido {user.name}
            </Typography>
          </Grid>
          <Grid item>
            {user.userType === "Proveedor" ? (
              <Avatar alt={user.company.name} src={user.company.logo} />
            ) : (
              <Avatar alt={user.name} src={user.photo} />
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
          <Grid item>
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
              <Link to="/client-welcome" style={{ textDecoration: "none" }}>
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
                  Cliente
                </Button>
              </Link>
            </Grid>
          </Grid>
        );
      } else if (user.userType === "Proveedor") {
        return (
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
              <Link to="/provider-welcome" style={{ textDecoration: "none" }}>
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
                  Proveedor
                </Button>
              </Link>
            </Grid>
          </Grid>
        );
      }
    }
  };

  return (
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
  );
};

export default MenuBar;
