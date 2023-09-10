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
                  sx={{ backgroundColor: "#c1ff04", color: "#242424" }}
                  //endIcon={<FaceRetouchingNaturalIcon />}
                >
                  Registrarse
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