import { AppBar, Toolbar, Button, Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const MenuBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#242424" }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
