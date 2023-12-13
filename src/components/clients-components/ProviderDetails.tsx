import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Box,
  Grid,
  Avatar,
  Snackbar,
  SnackbarContent,
  IconButton,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import RootState from "../../models/RootStateTypes";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { alpha } from "@mui/material/styles";
import BeerList from "./BeerList";
import { Beer, Cocktail, Provider } from "../../models/UsersModels";
import {
  addBeerToCart,
  addCocktailToCart,
  setClient,
  setProvider,
} from "../../redux/PurchaseListSlice";
import { useState } from "react";

const ProviderDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarIcon, setSnackbarIcon] = useState("check");
  const pathParts = location.pathname.split("/");

  let provider: Provider | undefined;
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (pathParts.length > 1) {
    const providerName = pathParts.pop()?.replace(/-/g, " ");
    const providers = useSelector(
      (state: RootState) => state.providers.providers
    );

    provider = providers.find(
      (provider) =>
        provider.company.name.toLowerCase() ===
        (providerName ? providerName.toLowerCase() : "")
    );
  }

  if (!provider) {
    return <div>Proveedor no encontrado</div>;
  }

  const currentProvider = useSelector(
    (state: RootState) => state.purchaseList.currentPurchase.provider
  );

  const handleCocktailClick = (cocktail: Cocktail) => {
    if (!provider) {
      showSnackbar("Proveedor incorrecto", "error");
      return;
    }
    if (!currentProvider) {
      dispatch(setProvider({ provider }));
      dispatch(setClient(user));
      dispatch(addCocktailToCart({ cocktail, provider }));
      showSnackbar(`Producto "${cocktail.name}" añadido al carrito`, "check");
    } else if (currentProvider.company.name === provider.company.name) {
      dispatch(addCocktailToCart({ cocktail, provider }));
      showSnackbar(`Producto "${cocktail.name}" añadido al carrito`, "check");
    } else {
      showSnackbar("Proveedor incorrecto", "error");
    }
  };

  const handleBeerClick = (beer: Beer) => {
    if (!provider) {
      showSnackbar("Proveedor incorrecto", "error");
      return;
    }
    if (!currentProvider) {
      dispatch(setProvider({ provider }));
      dispatch(addBeerToCart({ beer, provider }));
      showSnackbar(`Producto "${beer.name}" añadido al carrito`, "check");
    } else if (currentProvider.company.name === provider.company.name) {
      dispatch(addBeerToCart({ beer, provider }));
      showSnackbar(`Producto "${beer.name}" añadido al carrito`, "check");
    } else {
      showSnackbar("Proveedor incorrecto", "error");
    }
  };

  const showSnackbar = (message: string, icon: string) => {
    setSnackbarMessage(message);
    setSnackbarIcon(icon);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarIcon("");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding="5px"
      justifyContent="space-between"
      marginTop="30px"
    >
      <Grid container spacing={2}>
        <Grid container item xs={12}>
          <Card
            sx={{
              backgroundColor: "#242424",
              width: 800,
              margin: "10px auto",
              borderRadius: "15px",
              color: "white",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
              display: "flex",
              height: "140px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardContent
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Box marginTop={"15px"}>
                <Typography
                  variant="h4"
                  sx={{
                    color: "#01FF72",
                    fontFamily: "Quicksand, sans-serif",
                    fontWeight: "bold",
                    marginBottom: "20px",
                  }}
                >
                  {provider.company.name}
                </Typography>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <WhatsAppIcon style={{ color: "#01FF72" }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      {provider.company.phone}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <MailOutlineIcon style={{ color: "#01FF72" }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      {provider.company.email}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Avatar
                alt={provider.company.name}
                src={provider.company.logo}
                sx={{
                  width: 110,
                  height: 110,
                  marginTop: "8px",
                  boxShadow: "0px 0px 10px rgba(1, 255, 114, 0.9)",
                  borderRadius: "50%",
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box textAlign="center" marginTop="50px">
        <Typography
          variant="h5"
          sx={{ fontFamily: "Quicksand, sans-serif", fontWeight: "bold" }}
        >
          Bienvenido
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Quicksand, sans-serif",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Aquí puedes conocer todos nuestros productos con información
          detallada.
        </Typography>
      </Box>
      {provider.service.cocktails.length > 0 && (
        <Grid container spacing={2}>
          <Card
            sx={{
              backgroundColor: "#242424",
              borderRadius: "10px",
              color: "white",
              maxWidth: 490,
              margin: "0 auto",
              padding: "20px",
              marginBottom: "20px",
              marginTop: "40px",
            }}
          >
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <LocalBarIcon style={{ color: "#01FF72" }} />
              </Grid>
              <Grid item>
                <Typography
                  variant="h5"
                  style={{
                    marginBottom: "8px",
                    fontFamily: "Quicksand, sans-serif",
                    fontWeight: "bold",
                    color: "#01FF72",
                  }}
                >
                  Listado de Cócteles
                </Typography>
              </Grid>
            </Grid>
          </Card>

          <Grid container spacing={2}>
            {provider.service.cocktails
              .filter((cocktail) => cocktail.stock > 0)
              .map((cocktail: Cocktail) => (
                <Grid container item xs={12} key={cocktail.name}>
                  {cocktail.stock > 0 && (
                    <Card
                      sx={{
                        backgroundColor: "white",
                        width: 800,
                        margin: "auto",
                        borderRadius: "15px",
                        color: "white",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
                        display: "flex",
                        height: "140px",
                        position: "relative",
                      }}
                      onClick={() => handleCocktailClick(cocktail)}
                    >
                      <CardContent
                        sx={{
                          backgroundColor: "#EC299F",
                          color: "#242424",
                          padding: "5px",
                          borderTopLeftRadius: "15px",
                          borderBottomLeftRadius: "15px",
                          flexDirection: "column",
                          flex: "2",
                          justifyContent: "center",
                        }}
                      >
                        <Grid
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              textAlign: "left",
                              fontFamily: "Quicksand, sans-serif",
                              fontWeight: "bold",
                              marginTop: "1px",
                              marginLeft: "15px",
                              color: "white",
                            }}
                          >
                            {cocktail.name}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              textAlign: "right",
                              fontFamily: "Quicksand, sans-serif",
                              fontWeight: "bold",
                              marginTop: "10px",
                              marginLeft: "15px",
                            }}
                          >
                            Precio: ${cocktail.price}
                          </Typography>
                        </Grid>
                        <Divider
                          sx={{
                            width: "100%",
                            borderWidth: "1px",
                            borderColor: "#242424",
                            marginBottom: "-10px",
                          }}
                        ></Divider>
                        <CardContent>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "white",
                              marginBottom: "7px",
                              fontFamily: "Quicksand, sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            Ingredientes
                          </Typography>
                          {cocktail.ingredients.map((ingredient, index) => (
                            <Chip
                              key={index}
                              label={ingredient}
                              sx={{
                                fontSize: "0.60rem",
                                marginBottom: "1px",
                                marginRight: "2px",
                                backgroundColor: "#242424",
                                "& .MuiChip-label": { color: "white" },
                              }}
                            />
                          ))}
                        </CardContent>
                      </CardContent>
                      <CardMedia
                        component="img"
                        height="140"
                        image={cocktail.image}
                        alt={cocktail.name}
                        sx={{
                          width: "140px",
                          height: "140px",
                          objectFit: "cover",
                          objectPosition: "center",
                          marginLeft: "0px",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: 5,
                          right: 5,
                          zIndex: 1,
                        }}
                      >
                        <IconButton
                          style={{
                            bottom: 1,
                            right: 1,
                            color: "#FFFFFF",
                            backgroundColor: alpha("#EC299F", 0.9),
                            zIndex: 1,
                          }}
                        >
                          <AddShoppingCartIcon />
                        </IconButton>
                      </div>
                    </Card>
                  )}
                </Grid>
              ))}
          </Grid>
        </Grid>
      )}

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContent
          message={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#242424",
              }}
            >
              {snackbarIcon === "check" ? (
                <CheckCircleIcon
                  style={{
                    color: "#01FF72",
                    marginRight: "8px",
                  }}
                />
              ) : snackbarIcon === "error" ? (
                <ErrorIcon
                  style={{
                    color: "red",
                    marginRight: "8px",
                  }}
                />
              ) : null}
              {snackbarMessage}
            </div>
          }
          style={{
            backgroundColor: "white",
            border: "2px solid #242424",
            fontFamily: "Quicksand, sans-serif",
            fontWeight: "bold",
            textAlign: "center",
          }}
        />
      </Snackbar>

      {provider.service.beers.length > 0 && (
        <BeerList provider={provider} onBeerClick={handleBeerClick} />
      )}
    </Box>
  );
};

export default ProviderDetails;
