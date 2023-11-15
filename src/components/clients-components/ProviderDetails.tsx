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
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import RootState from "../../models/RootStateTypes";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BeerList from "./BeerList";

const ProviderDetails = () => {
  const location = useLocation();
  const pathParts = location.pathname.split("/");

  if (pathParts.length > 1) {
    const providerName = pathParts.pop()?.replace(/-/g, " ");
    const providers = useSelector(
      (state: RootState) => state.providers.providers
    );

    const provider = providers.find(
      (provider) =>
        provider.company.name.toLowerCase() ===
        (providerName ? providerName.toLowerCase() : "")
    );

    if (!provider) {
      return <div>Proveedor no encontrado</div>;
    }

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
                  <LocalBarIcon style={{ color: "#EC299F" }} />
                </Grid>
                <Grid item>
                  <Typography
                    variant="h5"
                    style={{
                      marginBottom: "8px",
                      fontFamily: "Quicksand, sans-serif",
                      fontWeight: "bold",
                      color: "#EC299F",
                    }}
                  >
                    Listado de Cócteles
                  </Typography>
                </Grid>
              </Grid>
            </Card>

            <Grid container spacing={2}>
              {provider.service.cocktails.map((cocktail) => (
                <Grid container item xs={12} key={cocktail.name}>
                  <Card
                    sx={{
                      backgroundColor: "#01FF72",
                      width: 800,
                      margin: "10px auto",
                      borderRadius: "15px",
                      color: "white",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
                      display: "flex",
                      height: "140px",
                    }}
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
                      }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}

        {provider.service.beers.length > 0 && <BeerList provider={provider} />}
      </Box>
    );
  }
};

export default ProviderDetails;
