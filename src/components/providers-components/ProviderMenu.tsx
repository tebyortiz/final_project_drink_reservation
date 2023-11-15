import { useEffect, useState } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  TableHead,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../models/RootStateTypes";
import {
  addCocktail,
  removeCocktail,
  addBeer,
  removeBeer,
} from "../../redux/ProvidersSlice";
import { Cocktail, Beer } from "../../models/UsersModels";
import {
  useFetchCocktailOptions,
  useFetchBeerOptions,
} from "../services/ApiCalls";

const ProviderMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const providers = useSelector(
    (state: RootState) => state.providers.providers
  );
  const userCompanyName = user?.company?.name;
  const selectedProvider = providers.find(
    (provider) => provider.company.name === userCompanyName
  );
  const service = selectedProvider?.service;
  const [selectedCocktail, setSelectedCocktail] = useState<string | null>(null);
  const [selectedBeer, setSelectedBeer] = useState<string | null>(null);
  const [cocktailPrice, setCocktailPrice] = useState<number | null>(null);
  const [beerPrice, setBeerPrice] = useState<number | null>(null);
  const [selectedCocktails, setSelectedCocktails] = useState<Cocktail[]>(
    service?.cocktails || []
  );
  const [selectedBeers, setSelectedBeers] = useState<Beer[]>(
    service?.beers || []
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { cocktailOptions, fetchCocktailDetails } = useFetchCocktailOptions();
  const { beerOptions, fetchBeerDetails } = useFetchBeerOptions();

  useEffect(() => {}, [selectedCocktails, selectedBeers]);

  const handleAddCocktail = async () => {
    const companyName = userCompanyName || "";
    if (companyName && selectedCocktail && cocktailPrice !== null) {
      if (!selectedCocktails.some((c) => c.name === selectedCocktail)) {
        const cocktailDetails = await fetchCocktailDetails(selectedCocktail);
        if (cocktailDetails) {
          const newCocktail: Cocktail = {
            name: selectedCocktail,
            price: cocktailPrice,
            stock: 0,
            image: cocktailDetails[0].image,
            ingredients: cocktailDetails[0].ingredients,
          };
          dispatch(
            addCocktail({
              providerName: companyName,
              cocktail: newCocktail,
            })
          );
          setSelectedCocktails([...selectedCocktails, newCocktail]);
          setSnackbarMessage(`Cóctel "${selectedCocktail}" añadido`);
          setSnackbarOpen(true);
        }
      }
    }
    setSelectedCocktail(null);
    setCocktailPrice(null);
  };

  const handleAddBeer = async () => {
    const companyName = userCompanyName || "";
    if (companyName && selectedBeer && beerPrice !== null) {
      if (!selectedBeers.some((b) => b.name === selectedBeer)) {
        const beerDetails = await fetchBeerDetails(selectedBeer);
        if (beerDetails) {
          const newBeer: Beer = {
            name: selectedBeer,
            price: beerPrice,
            stock: 0,
            image: beerDetails[0].image,
            abv: beerDetails[0].abv,
            ibu: beerDetails[0].ibu,
            ingredients: beerDetails[0].ingredients,
          };

          dispatch(addBeer({ providerName: companyName, beer: newBeer }));
          setSelectedBeers([...selectedBeers, newBeer]);
          setSnackbarMessage(`Cerveza "${selectedBeer}" añadida`);
          setSnackbarOpen(true);
        }
      }
    }
    setSelectedBeer(null);
    setBeerPrice(null);
  };

  const handleRemoveCocktail = (cocktail: string) => {
    const companyName = userCompanyName || "";
    if (companyName) {
      dispatch(removeCocktail({ providerName: companyName, cocktail }));
      setSelectedCocktails(
        selectedCocktails.filter((c) => c.name !== cocktail)
      );
    }
  };

  const handleRemoveBeer = (beer: string) => {
    const companyName = userCompanyName || "";
    if (companyName) {
      dispatch(removeBeer({ providerName: companyName, beer }));
      setSelectedBeers(selectedBeers.filter((b) => b.name !== beer));
    }
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
                  Selecciona Cócteles
                </Typography>
                <Autocomplete
                  id="coctel-autocomplete"
                  options={cocktailOptions}
                  value={selectedCocktail}
                  onChange={(_, newValue) => setSelectedCocktail(newValue)}
                  sx={{
                    backgroundColor: "white",
                    "& select": {
                      height: "45px",
                      color: "#242424",
                    },
                    "& label": {
                      color: "#242424",
                    },
                    "&.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#01FF72 !important",
                      },
                    },
                  }}
                  style={{ marginBottom: "10px" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      InputLabelProps={{
                        shrink: true,
                        focused: false,
                      }}
                    />
                  )}
                />

                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    "& label": {
                      marginRight: "10px",
                      color: "white",
                      width: "70px",
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: "white",
                      marginRight: "10px",
                      padding: "5px 10px",
                      borderRadius: "7px",
                      textAlign: "center",
                    }}
                  >
                    Precio
                  </Typography>
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
                    value={cocktailPrice || ""}
                    onChange={(e) =>
                      setCocktailPrice(parseFloat(e.target.value))
                    }
                  />
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddCocktail}
                  sx={{
                    backgroundColor: "#01FF72",
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: "bold",
                    marginTop: "15px",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "#01FF72",
                    },
                    "& .MuiButton-endIcon": {
                      marginLeft: "10px",
                    },
                  }}
                  endIcon={<LocalBarIcon />}
                >
                  Agregar Cóctel
                </Button>
              </Box>
              <Box p={2} sx={{ marginTop: "15px" }}>
                {" "}
                <Typography
                  variant="h5"
                  sx={{ color: "white", marginBottom: "20px" }}
                >
                  Cócteles Seleccionados
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
                            Precio
                          </Typography>
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedCocktails.map(
                        (cocktail: Cocktail, index: number) => (
                          <TableRow key={index}>
                            <TableCell
                              sx={{ color: "#242424", textAlign: "center" }}
                            >
                              {cocktail.name}
                            </TableCell>
                            <TableCell
                              sx={{ color: "#242424", textAlign: "center" }}
                            >
                              ${cocktail.price.toFixed(2)}
                            </TableCell>
                            <TableCell
                              sx={{ color: "#242424", textAlign: "center" }}
                            >
                              <HighlightOffIcon
                                onClick={() =>
                                  handleRemoveCocktail(cocktail.name)
                                }
                              />
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
                  Selecciona Cervezas
                </Typography>
                <Autocomplete
                  id="cerveza-autocomplete"
                  options={beerOptions}
                  value={selectedBeer}
                  onChange={(_, newValue) => setSelectedBeer(newValue)}
                  sx={{
                    backgroundColor: "white",
                    "& select": {
                      height: "45px",
                      color: "#242424",
                    },
                    "& label": {
                      color: "#242424",
                    },
                    "&.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#01FF72 !important",
                      },
                    },
                  }}
                  style={{ marginBottom: "10px" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      InputLabelProps={{
                        shrink: true,
                        focused: false,
                      }}
                    />
                  )}
                />

                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    "& label": {
                      marginRight: "10px",
                      color: "white",
                      width: "70px",
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: "white",
                      marginRight: "10px",
                      padding: "5px 10px",
                      borderRadius: "7px",
                      textAlign: "center",
                    }}
                  >
                    Precio
                  </Typography>
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
                    value={beerPrice || ""}
                    onChange={(e) => setBeerPrice(parseFloat(e.target.value))}
                  />
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddBeer}
                  sx={{
                    backgroundColor: "#01FF72",
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: "bold",
                    marginTop: "15px",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "#01FF72",
                    },
                    "& .MuiButton-endIcon": {
                      marginLeft: "10px",
                    },
                  }}
                  endIcon={<SportsBarIcon />}
                >
                  Agregar Cerveza
                </Button>
              </Box>
              <Box p={2} sx={{ marginTop: "15px" }}>
                {" "}
                <Typography
                  variant="h5"
                  sx={{ color: "white", marginBottom: "20px" }}
                >
                  Cervezas Seleccionadas
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
                            Precio
                          </Typography>
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedBeers.map((beer: Beer, index: number) => (
                        <TableRow key={index}>
                          <TableCell
                            sx={{ color: "#242424", textAlign: "center" }}
                          >
                            {beer.name}
                          </TableCell>
                          <TableCell
                            sx={{ color: "#242424", textAlign: "center" }}
                          >
                            ${beer.price.toFixed(2)}
                          </TableCell>
                          <TableCell
                            sx={{ color: "#242424", textAlign: "center" }}
                          >
                            <HighlightOffIcon
                              onClick={() => handleRemoveBeer(beer.name)}
                            />
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

export default ProviderMenu;
