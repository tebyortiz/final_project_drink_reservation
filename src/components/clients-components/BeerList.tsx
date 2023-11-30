import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import { Beer, Provider } from "../../models/UsersModels";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { alpha } from "@mui/material/styles";

interface BeerListProps {
  provider: Provider;
  onBeerClick: (beer: Beer) => void;
}

const BeerList: React.FC<BeerListProps> = ({ provider, onBeerClick }) => {
  const filterUniqueIngredients = (ingredients: string[]) => {
    const uniqueIngredients = new Set<string>();
    ingredients.forEach((ingredient) => {
      uniqueIngredients.add(ingredient);
    });
    return [...uniqueIngredients];
  };

  return (
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
            <SportsBarIcon style={{ color: "#01FF72" }} />
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
              Listado de Cervezas
            </Typography>
          </Grid>
        </Grid>
      </Card>

      <Grid container spacing={2}>
        {provider.service.beers.map((beer) => (
          <Grid container item xs={12} key={beer.name}>
            <Card
              sx={{
                backgroundColor: "white",
                width: 800,
                margin: " auto",
                borderRadius: "15px",
                color: "white",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
                display: "flex",
                height: "400px",
                position: "relative",
              }}
              onClick={() => onBeerClick(beer)}
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
                    {beer.name}
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
                    Precio: ${beer.price}
                  </Typography>
                </Grid>
                <Divider
                  sx={{
                    width: "100%",
                    borderWidth: "1px",
                    borderColor: "#242424",
                  }}
                ></Divider>

                <Grid sx={{ marginLeft: "15px" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Quicksand, sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    % Alcohol: {beer.abv}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Quicksand, sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    % Amargor: {beer.ibu}
                  </Typography>
                </Grid>

                <CardContent>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "white",
                      marginBottom: "5px",
                      marginTop: "-12px",
                      fontFamily: "Quicksand, sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    Ingredientes
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Quicksand, sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    Malta:
                  </Typography>
                  {filterUniqueIngredients(beer.ingredients.malt).map(
                    (malt, index) => (
                      <Chip
                        key={index}
                        label={String(malt)}
                        sx={{
                          fontSize: "0.60rem",
                          marginBottom: "1px",
                          marginRight: "2px",
                          backgroundColor: "#242424",
                          "& .MuiChip-label": { color: "white" },
                        }}
                      />
                    )
                  )}

                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Quicksand, sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    Lúpulo:
                  </Typography>
                  {filterUniqueIngredients(beer.ingredients.hops).map(
                    (hops, index) => (
                      <Chip
                        key={index}
                        label={String(hops)}
                        sx={{
                          fontSize: "0.60rem",
                          marginBottom: "1px",
                          marginRight: "2px",
                          backgroundColor: "#242424",
                          "& .MuiChip-label": { color: "white" },
                        }}
                      />
                    )
                  )}

                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Quicksand, sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    Levadura:
                  </Typography>
                  {beer.ingredients.yeast.map((yeast, index) => (
                    <Chip
                      key={index}
                      label={yeast}
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
              <Card
                sx={{
                  backgroundColor: "#F5F5F5",
                  width: 140,
                  height: 400,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  height="100%"
                  image={beer.image}
                  alt={beer.name}
                  sx={{
                    width: "auto",
                    height: "100%",
                    objectFit: "contain",
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
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default BeerList;
