import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import { Cocktail, Beer } from "../../models/UsersModels";
import { useDispatch, useSelector } from "react-redux";
import RootState from "../../models/RootStateTypes";
import {
  updateCocktailStock,
  updateBeerStock,
} from "../../redux/ProvidersSlice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ProviderStock = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const providers = useSelector(
    (state: RootState) => state.providers.providers
  );
  const userCompanyName = user?.company?.name;
  const selectedProvider = providers.find(
    (provider) => provider.company.name === userCompanyName
  );
  const service = selectedProvider?.service;
  const [cocktailStock, setCocktailStock] = useState<Cocktail[]>(
    service?.cocktails || []
  );
  const [beerStock, setBeerStock] = useState<Beer[]>(service?.beers || []);

  const providerName = userCompanyName || "";
  const dispatch = useDispatch();

  const [updatedCocktailStock, setUpdatedCocktailStock] = useState<number[]>(
    cocktailStock.map((cocktail) => cocktail.stock)
  );

  const [updatedBeerStock, setUpdatedBeerStock] = useState<number[]>(
    beerStock.map((beer) => beer.stock)
  );

  const [isCocktailUpdateDisabled, setIsCocktailUpdateDisabled] = useState(
    Array(cocktailStock.length).fill(true)
  );

  const [isBeerUpdateDisabled, setIsBeerUpdateDisabled] = useState(
    Array(beerStock.length).fill(true)
  );

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    setUpdatedCocktailStock(cocktailStock.map((cocktail) => cocktail.stock));
    setUpdatedBeerStock(beerStock.map((beer) => beer.stock));
  }, [cocktailStock, beerStock]);

  const handleCocktailStockChange = (index: number, newStock: number) => {
    const updatedStock = [...updatedCocktailStock];
    updatedStock[index] = newStock;
    setUpdatedCocktailStock(updatedStock);

    const originalStock = cocktailStock[index].stock;
    setIsCocktailUpdateDisabled((prev) => {
      const newDisabled = [...prev];
      newDisabled[index] = newStock === originalStock;
      return newDisabled;
    });
  };

  const handleBeerStockChange = (index: number, newStock: number) => {
    const updatedStock = [...updatedBeerStock];
    updatedStock[index] = newStock;
    setUpdatedBeerStock(updatedStock);

    const originalStock = beerStock[index].stock;
    setIsBeerUpdateDisabled((prev) => {
      const newDisabled = [...prev];
      newDisabled[index] = newStock === originalStock;
      return newDisabled;
    });
  };

  const handleUpdateCocktailStock = (index: number) => {
    const updatedCocktail = cocktailStock[index];
    const updatedStockValue = updatedCocktailStock[index];

    if (updatedStockValue !== updatedCocktail.stock) {
      const updatedCocktailStockProvider = [...cocktailStock];
      updatedCocktailStockProvider[index] = {
        ...updatedCocktail,
        stock: updatedStockValue,
      };

      dispatch(
        updateCocktailStock({
          providerName: providerName,
          updatedCocktails: updatedCocktailStockProvider,
        })
      );
      setCocktailStock(updatedCocktailStockProvider);
      openSnackbar(updatedCocktail.name, updatedStockValue);

      setIsCocktailUpdateDisabled((prev) => {
        const newDisabled = [...prev];
        newDisabled[index] = true;
        return newDisabled;
      });
    }
  };

  const handleUpdateBeerStock = (index: number) => {
    const updatedBeer = beerStock[index];
    const updatedStockValue = updatedBeerStock[index];

    if (updatedStockValue !== updatedBeer.stock) {
      const updatedBeerStockProvider = [...beerStock];
      updatedBeerStockProvider[index] = {
        ...updatedBeer,
        stock: updatedStockValue,
      };

      dispatch(
        updateBeerStock({
          providerName: providerName,
          updatedBeers: updatedBeerStockProvider,
        })
      );
      setBeerStock(updatedBeerStockProvider);
      openSnackbar(updatedBeer.name, updatedStockValue);

      setIsBeerUpdateDisabled((prev) => {
        const newDisabled = [...prev];
        newDisabled[index] = true;
        return newDisabled;
      });
    }
  };

  const openSnackbar = (itemName: string, newQuantity: number) => {
    setSnackbarMessage(`${itemName} nueva cantidad: ${newQuantity}`);
    setSnackbarOpen(true);
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      {user &&
      user.service &&
      (user.service.type === "Coctelería" || user.service.type === "Ambos") ? (
        <Grid
          item
          xs={12}
          md={6}
          style={{ width: "100%", textAlign: "center" }}
        >
          <Card
            sx={{
              backgroundColor: "#242424",
              margin: "10px auto",
              borderRadius: "15px",
              color: "white",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
              marginTop: "30px",
              width: "90%",
            }}
          >
            <CardContent>
              <Box p={2}>
                <Typography
                  variant="h5"
                  sx={{
                    backgroundColor: "#01FF72",
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
                  Listado de Cócteles
                </Typography>
              </Box>
              <Box p={2} sx={{ marginTop: "15px" }}>
                <Typography
                  variant="h5"
                  sx={{ color: "white", marginBottom: "20px" }}
                >
                  Stock de Cócteles
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography
                            variant="h5"
                            sx={{ color: "#242424", textAlign: "center" }}
                            style={{
                              fontFamily: "Quicksand, sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            Cóctel
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="h5"
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
                            variant="h5"
                            sx={{ color: "#242424", textAlign: "center" }}
                            style={{
                              fontFamily: "Quicksand, sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            Actualizar
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cocktailStock.map((cocktail, index) => (
                        <TableRow key={index}>
                          <TableCell
                            sx={{ color: "#242424", textAlign: "center" }}
                          >
                            {cocktail.name}
                          </TableCell>
                          <TableCell
                            sx={{ color: "#242424", textAlign: "center" }}
                          >
                            <TextField
                              fullWidth
                              label=""
                              sx={{
                                "& .MuiInputBase-root": {
                                  color: "#242424",
                                  backgroundColor: "white",
                                  borderRadius: "7px",
                                  border: "2px solid #01FF72",
                                },
                                "& .MuiInputLabel-root": {
                                  color: "white",
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                  color: "#01FF72",
                                },
                                "& .MuiInputBase-root.Mui-focused": {
                                  borderColor: "#01FF72",
                                },
                                "& .MuiInput-underline:after": {
                                  borderBottom: "none",
                                },
                              }}
                              InputLabelProps={{ shrink: true }}
                              variant="standard"
                              type="number"
                              value={updatedCocktailStock[index] || ""}
                              onChange={(e) =>
                                handleCocktailStockChange(
                                  index,
                                  parseInt(e.target.value, 10)
                                )
                              }
                            />
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleUpdateCocktailStock(index)}
                              sx={{
                                backgroundColor: "#01FF72",
                                fontFamily: "Nunito, sans-serif",
                                fontWeight: "bold",
                                "&:hover": {
                                  backgroundColor: "white",
                                  color: "#01FF72",
                                },
                              }}
                              disabled={isCocktailUpdateDisabled[index]}
                            >
                              Actualizar Stock
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ) : null}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
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
              <CheckCircleIcon
                style={{
                  color: "#01FF72",
                  marginRight: "8px",
                }}
              />
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
      {user &&
      user.service &&
      (user.service.type === "Cervecería" || user.service.type === "Ambos") ? (
        <Grid
          item
          xs={12}
          md={6}
          style={{ width: "100%", textAlign: "center" }}
        >
          <Card
            sx={{
              backgroundColor: "#242424",
              margin: "10px auto",
              borderRadius: "15px",
              color: "white",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
              marginTop: "30px",
              width: "90%",
            }}
          >
            <CardContent>
              <Box p={2}>
                <Typography
                  variant="h5"
                  sx={{
                    backgroundColor: "#01FF72",
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
                  Listado de Cervezas
                </Typography>
              </Box>
              <Box p={2} sx={{ marginTop: "15px" }}>
                <Typography
                  variant="h5"
                  sx={{ color: "white", marginBottom: "20px" }}
                >
                  Stock de Cervezas
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography
                            variant="h5"
                            sx={{ color: "#242424", textAlign: "center" }}
                            style={{
                              fontFamily: "Quicksand, sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            Cerveza
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="h5"
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
                            variant="h5"
                            sx={{ color: "#242424", textAlign: "center" }}
                            style={{
                              fontFamily: "Quicksand, sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            Actualizar
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {beerStock.map((beer, index) => (
                        <TableRow key={index}>
                          <TableCell
                            sx={{ color: "#242424", textAlign: "center" }}
                          >
                            {beer.name}
                          </TableCell>
                          <TableCell
                            sx={{ color: "#242424", textAlign: "center" }}
                          >
                            <TextField
                              fullWidth
                              label=""
                              sx={{
                                "& .MuiInputBase-root": {
                                  color: "#242424",
                                  backgroundColor: "white",
                                  borderRadius: "7px",
                                  border: "2px solid #01FF72",
                                },
                                "& .MuiInputLabel-root": {
                                  color: "white",
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                  color: "#01FF72",
                                },
                                "& .MuiInputBase-root.Mui-focused": {
                                  borderColor: "#01FF72",
                                },
                                "& .MuiInput-underline:after": {
                                  borderBottom: "none",
                                },
                              }}
                              InputLabelProps={{ shrink: true }}
                              variant="standard"
                              type="number"
                              value={updatedBeerStock[index] || ""}
                              onChange={(e) =>
                                handleBeerStockChange(
                                  index,
                                  parseInt(e.target.value, 10)
                                )
                              }
                            />
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleUpdateBeerStock(index)}
                              sx={{
                                backgroundColor: "#01FF72",
                                fontFamily: "Nunito, sans-serif",
                                fontWeight: "bold",
                                "&:hover": {
                                  backgroundColor: "white",
                                  color: "#01FF72",
                                },
                              }}
                              disabled={isBeerUpdateDisabled[index]}
                            >
                              Actualizar Stock
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default ProviderStock;
