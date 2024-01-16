import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TextField,
  IconButton,
  Typography,
  Button,
  Card,
  Grid,
  CardContent,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCocktailQuantity,
  updateBeerQuantity,
  removeItem,
  completePurchase,
  resetPurchase,
  updateTotalPurchase,
  resetProviderIfEmpty,
} from "./../../redux/PurchaseListSlice";
import ProviderCard from "./ProviderCard";
import { RootState } from "../../models/RootStateTypes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import proveedordelivery from "/images/proveedordelivery.png";
import {
  updateBeerStockAfterPurchase,
  updateCocktailStockAfterPurchase,
} from "../../redux/ProvidersSlice";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const currentPurchase = useSelector(
    (state: RootState) => state.purchaseList.currentPurchase
  );

  const provider = currentPurchase.provider;

  const handleCocktailQuantityChange = (
    cocktail: { name: string; image: string; price: number; stock: number },
    quantity: number
  ) => {
    if (quantity <= cocktail.stock) {
      dispatch(
        updateCocktailQuantity({
          cocktail: {
            name: cocktail.name,
            image: cocktail.image,
            price: cocktail.price,
            stock: cocktail.stock,
            ingredients: [],
          },
          quantity,
        })
      );
    } else {
    }
  };

  const handleBeerQuantityChange = (
    beer: { name: string; image: string; price: number; stock: number },
    quantity: number
  ) => {
    if (quantity <= beer.stock) {
      dispatch(
        updateBeerQuantity({
          beer: {
            name: beer.name,
            image: beer.image,
            price: beer.price,
            stock: 0,
            abv: "",
            ibu: "",
            ingredients: {
              malt: [],
              hops: [],
              yeast: [],
            },
          },
          quantity,
        })
      );
    } else {
    }
  };

  const handleRemoveItem = (name: string) => {
    dispatch(removeItem({ name }));
  };

  useEffect(() => {
    const totalPurchase =
      currentPurchase.cocktails.reduce(
        (
          acc: number,
          item: { cocktail: { price: number }; quantity: number }
        ) => acc + (item.cocktail?.price || 0) * item.quantity,
        0
      ) +
      currentPurchase.beers.reduce(
        (acc: number, item: { beer: { price: number }; quantity: number }) =>
          acc + (item.beer?.price || 0) * item.quantity,
        0
      );

    dispatch(updateTotalPurchase(totalPurchase));

    if (
      currentPurchase.cocktails.length === 0 &&
      currentPurchase.beers.length === 0
    ) {
      dispatch(resetProviderIfEmpty());
    }
  }, [currentPurchase.cocktails, currentPurchase.beers, dispatch]);

  const isPurchaseEmpty =
    currentPurchase.cocktails.length === 0 &&
    currentPurchase.beers.length === 0;

  const handleCompletePurchase = () => {
    if (
      currentPurchase.provider &&
      currentPurchase.client &&
      (currentPurchase.cocktails.length > 0 || currentPurchase.beers.length > 0)
    ) {
      const totalPurchase =
        currentPurchase.cocktails.reduce(
          (
            acc: number,
            item: {
              cocktail: { price: number; stock: number };
              quantity: number;
            }
          ) => acc + (item.cocktail?.price || 0) * item.quantity,
          0
        ) +
        currentPurchase.beers.reduce(
          (
            acc: number,
            item: { beer: { price: number; stock: number }; quantity: number }
          ) => acc + (item.beer?.price || 0) * item.quantity,
          0
        );

      const currentDate = new Date();
      dispatch(
        completePurchase({
          date: currentDate.toISOString(),
          purchase: currentPurchase
        })
      );

      currentPurchase.cocktails.forEach(
        (item: {
          cocktail: { name: string; stock: number };
          quantity: number;
        }) => {
          dispatch(
            updateCocktailStockAfterPurchase({
              providerName: currentPurchase.provider?.company.name || "",
              cocktailName: item.cocktail.name,
              quantity: item.quantity,
            })
          );
        }
      );

      currentPurchase.beers.forEach(
        (item: { beer: { name: string; stock: number }; quantity: number }) => {
          dispatch(
            updateBeerStockAfterPurchase({
              providerName: currentPurchase.provider?.company.name || "",
              beerName: item.beer.name,
              quantity: item.quantity,
            })
          );
        }
      );

      dispatch(updateTotalPurchase(totalPurchase));
      dispatch(resetPurchase());
      setDialogOpen(true);
    } else {
      console.error("Faltan datos.");
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleNavigate = () => {
    navigate("/client_local_providers");
  };

  return (
    <div>
      <Grid item xs={12} md={6} style={{ width: "100%", textAlign: "center" }}>
        <ProviderCard provider={provider} />
        {currentPurchase.cocktails.length === 0 &&
          currentPurchase.beers.length === 0 && (
            <Typography
              variant="h6"
              sx={{ color: "#242424", marginBottom: "20px", marginTop: "50px" }}
              style={{
                fontFamily: "Quicksand, sans-serif",
                fontWeight: "bold",
              }}
            >
              No tienes productos añadidos al carrito.
            </Typography>
          )}
        {currentPurchase.cocktails.length > 0 && (
          <Card
            sx={{
              backgroundColor: "#242424",
              margin: "10px auto",
              borderRadius: "15px",
              color: "white",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
              marginTop: "30px",
              width: "90%",
              maxWidth: "900px",
            }}
          >
            <CardContent>
              <Box p={2}>
                <Typography
                  variant="h5"
                  sx={{
                    backgroundColor: "#EC299F",
                    color: "#242424",
                    padding: "10px",
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                    textAlign: "center",
                  }}
                  style={{
                    fontFamily: "Quicksand, sans-serif",
                    fontWeight: "bold",
                  }}
                >
                  Pedido de Cócteles
                </Typography>
              </Box>
              <Box p={2} sx={{ marginTop: "15px" }}>
                <Typography
                  variant="h5"
                  sx={{ color: "white", marginBottom: "20px" }}
                >
                  Listado de Cócteles a pedir:
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography
                            variant="h6"
                            sx={{ color: "#242424", textAlign: "center" }}
                            style={{
                              fontFamily: "Quicksand, sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            <LocalBarIcon />
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="h6"
                            sx={{ color: "#242424", textAlign: "center" }}
                            style={{
                              fontFamily: "Quicksand, sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            Nombre
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="h6"
                            sx={{ color: "#242424", textAlign: "center" }}
                            style={{
                              fontFamily: "Quicksand, sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            Precio
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="h6"
                            sx={{ color: "#242424", textAlign: "center" }}
                            style={{
                              fontFamily: "Quicksand, sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            Cantidad
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="h6"
                            sx={{ color: "#242424", textAlign: "center" }}
                            style={{
                              fontFamily: "Quicksand, sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            Eliminar
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentPurchase.cocktails.map(
                        (item: {
                          cocktail: {
                            name: string;
                            image: string;
                            price: number;
                            stock: number;
                          };
                          quantity: number;
                        }) => (
                          <TableRow key={item.cocktail.name}>
                            <TableCell style={{ textAlign: "center" }}>
                              <img
                                src={item.cocktail.image}
                                alt={item.cocktail.name}
                                height="50"
                              />
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              {item.cocktail.name}
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              ${item.cocktail.price}
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              <TextField
                                type="number"
                                variant="standard"
                                label=""
                                value={item.quantity}
                                sx={{
                                  "& .MuiInputBase-root": {
                                    color: "#242424",
                                    backgroundColor: "white",
                                    borderRadius: "7px",
                                    border: "2px solid #EC299F",
                                  },
                                  "& .MuiInputLabel-root": {
                                    color: "white",
                                  },
                                  "& .MuiInputLabel-root.Mui-focused": {
                                    color: "#EC299F",
                                  },
                                  "& .MuiInputBase-root.Mui-focused": {
                                    borderColor: "#EC299F",
                                  },
                                  "& .MuiInput-underline:after": {
                                    borderBottom: "none",
                                  },
                                }}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) =>
                                  handleCocktailQuantityChange(
                                    item.cocktail,
                                    +e.target.value
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              <IconButton
                                onClick={() =>
                                  handleRemoveItem(item.cocktail.name)
                                }
                              >
                                <HighlightOffIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </CardContent>
          </Card>
        )}
        {currentPurchase.beers.length > 0 && (
          <Card
            sx={{
              backgroundColor: "#242424",
              margin: "10px auto",
              borderRadius: "15px",
              color: "white",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
              marginTop: "30px",
              width: "90%",
              maxWidth: "900px",
            }}
          >
            <CardContent>
              <Box p={2}>
                <Typography
                  variant="h5"
                  sx={{
                    backgroundColor: "#EC299F",
                    color: "#242424",
                    padding: "10px",
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                    textAlign: "center",
                  }}
                  style={{
                    fontFamily: "Quicksand, sans-serif",
                    fontWeight: "bold",
                  }}
                >
                  Pedido de Cervezas
                </Typography>
              </Box>
              <Box p={2} sx={{ marginTop: "15px" }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: "white",
                    marginBottom: "20px",
                    textAlign: "center",
                  }}
                >
                  Listado de Cervezas a pedir:
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography
                            variant="h6"
                            sx={{ color: "#242424", textAlign: "center" }}
                            style={{
                              fontFamily: "Quicksand, sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            <SportsBarIcon />
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="h6"
                            sx={{ color: "#242424", textAlign: "center" }}
                            style={{
                              fontFamily: "Quicksand, sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            Nombre
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="h6"
                            sx={{ color: "#242424", textAlign: "center" }}
                            style={{
                              fontFamily: "Quicksand, sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            Precio
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="h6"
                            sx={{ color: "#242424", textAlign: "center" }}
                            style={{
                              fontFamily: "Quicksand, sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            Cantidad
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="h6"
                            sx={{ color: "#242424", textAlign: "center" }}
                            style={{
                              fontFamily: "Quicksand, sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            Eliminar
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentPurchase.beers.map(
                        (item: {
                          beer: {
                            name: string;
                            image: string;
                            price: number;
                            stock: number;
                          };
                          quantity: number;
                        }) => (
                          <TableRow key={item.beer.name}>
                            <TableCell style={{ textAlign: "center" }}>
                              <img
                                src={item.beer.image}
                                alt={item.beer.name}
                                height="50"
                              />
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              {item.beer.name}
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              ${item.beer.price}
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              <TextField
                                type="number"
                                variant="standard"
                                label=""
                                value={item.quantity}
                                sx={{
                                  "& .MuiInputBase-root": {
                                    color: "#242424",
                                    backgroundColor: "white",
                                    borderRadius: "7px",
                                    border: "2px solid #EC299F",
                                  },
                                  "& .MuiInputLabel-root": {
                                    color: "white",
                                  },
                                  "& .MuiInputLabel-root.Mui-focused": {
                                    color: "#EC299F",
                                  },
                                  "& .MuiInputBase-root.Mui-focused": {
                                    borderColor: "#EC299F",
                                  },
                                  "& .MuiInput-underline:after": {
                                    borderBottom: "none",
                                  },
                                }}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) =>
                                  handleBeerQuantityChange(
                                    item.beer,
                                    +e.target.value
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              <IconButton
                                onClick={() => handleRemoveItem(item.beer.name)}
                              >
                                <HighlightOffIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </CardContent>
          </Card>
        )}
      </Grid>

      <Card
        sx={{
          backgroundColor: "#242424",
          margin: "10px auto",
          borderRadius: "15px",
          color: "white",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
          marginTop: "30px",
          width: "90%",
          maxWidth: "900px",
        }}
      >
        <CardContent>
          <Box p={2}>
            <Typography
              variant="h5"
              sx={{
                backgroundColor: "#EC299F",
                color: "#242424",
                padding: "10px",
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
                textAlign: "center",
              }}
              style={{
                fontFamily: "Quicksand, sans-serif",
                fontWeight: "bold",
              }}
            >
              Resumen de Compra
            </Typography>
          </Box>
          <Box
            p={2}
            sx={{
              marginTop: "-10px",
              textAlign: "center",
              display: "flex",
              flexDirection: { xs: "column", md: "column" },
              justifyContent: { xs: "center", md: "center" },
              alignItems: { xs: "center", md: "space-between" },
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "white", marginBottom: { xs: "20px", md: "20px" } }}
              style={{
                fontFamily: "Quicksand, sans-serif",
                fontWeight: "bold",
              }}
            >
              <LocalMallIcon
                style={{ marginRight: "8px", verticalAlign: "middle" }}
              />
              Total Compra: ${currentPurchase.totalPurchase}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: "10px",
              }}
            >
              <Button
                onClick={handleCompletePurchase}
                disabled={isPurchaseEmpty}
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#EC299F",
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: "bold",
                  padding: "20px",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#EC299F",
                  },
                }}
              >
                <PaidIcon style={{ marginRight: "8px" }} />
                Realizar Compra
              </Button>
              <Button
                onClick={() => dispatch(resetPurchase())}
                disabled={isPurchaseEmpty}
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#EC299F",
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: "bold",
                  padding: "20px",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#EC299F",
                  },
                }}
              >
                <ProductionQuantityLimitsIcon style={{ marginRight: "8px" }} />
                Vaciar Carrito
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        sx={{ textAlign: "center", borderRadius: "15px" }}
      >
        <DialogContent>
          <Card
            sx={{
              backgroundColor: "#242424",
              margin: "10px auto",
              borderRadius: "15px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
              marginTop: "5px",
            }}
          >
            <Typography
              variant="h5"
              style={{
                fontFamily: "Quicksand, sans-serif",
                fontWeight: "bold",
                color: "#01FF72",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              ¡Gracias por tu compra!
            </Typography>
          </Card>
          <Typography
            variant="body1"
            style={{
              fontFamily: "Quicksand, sans-serif",
              fontWeight: "bold",
              marginTop: "20px",
            }}
          >
            En instantes recibirás tu pedido.
          </Typography>
          <Typography
            variant="body1"
            style={{
              fontFamily: "Quicksand, sans-serif",
              fontWeight: "bold",
            }}
          >
            El repartidor te avisará mediante Whatsapp cuando se encuentre en tu
            ubicación.
          </Typography>

          <img
            src={proveedordelivery}
            alt="Cliente Banner"
            style={{
              maxWidth: "100%",
              marginTop: "20px",
              boxShadow: "0px 0px 10px rgba(1, 255, 114, 0.9)",
              borderRadius: "50%",
            }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={handleNavigate}
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#01FF72",
              fontFamily: "Nunito, sans-serif",
              fontWeight: "bold",
              marginBottom: "15px",
              "&:hover": {
                backgroundColor: "#01FF72",
                color: "#242424",
              },
            }}
          >
            Volver
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrderDetails;
