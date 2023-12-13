import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { RootState } from "../../models/RootStateTypes";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  MarkerPosition,
  Area,
  Provider,
  Client,
} from "../../models/UsersModels";

const getUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

const ClientLocalProviders = () => {
  const navigate = useNavigate();
  const user = getUserFromLocalStorage();
  const clients = useSelector((state: RootState) => state.clients.clients);
  const userName = user?.name;

  const selectedClient: Client | undefined = clients.find(
    (client) => client.name === userName
  );

  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [message, setMessage] = useState("");

  const providers = useSelector(
    (state: RootState) => state.providers.providers
  );

  const isMarkerInArea = (marker: MarkerPosition, area: Area) => {
    const radius = area.radius;

    const km = radius / 1000;
    const kx = Math.cos((Math.PI * Number(area.lat)) / 180) * 111;
    const dx = Math.abs(Number(area.lng) - marker.lng) * kx;
    const dy = Math.abs(Number(area.lat) - marker.lat) * 111;

    return Math.sqrt(dx * dx + dy * dy) <= km;
  };

  useEffect(() => {
    if (
      !selectedClient ||
      (selectedClient.markerPosition &&
        selectedClient.markerPosition.lat === 0 &&
        selectedClient.markerPosition.lng === 0)
    ) {
      setMessage(
        "Para conocer los proveedores cercanos, primero debes brindarnos tu ubicación."
      );
      return;
    }

    const clientMarker: MarkerPosition = selectedClient.markerPosition;

    const providersInClientArea = providers.filter((provider: Provider) =>
      provider.service?.areas.some((area: Area) =>
        isMarkerInArea(clientMarker, area)
      )
    );

    const providersInClientAreaWithStock = providersInClientArea.filter(
      (provider) => {
        const allProducts = [
          ...(provider.service?.cocktails || []),
          ...(provider.service?.beers || []),
        ];
        return allProducts.some((product) => product.stock > 0);
      }
    );

    setFilteredProviders(providersInClientAreaWithStock);

    if (providersInClientAreaWithStock.length === 0) {
      setMessage("No hay proveedores disponibles en tu área.");
    } else if (providersInClientAreaWithStock.length === 1) {
      setMessage("Se ha encontrado 1 proveedor:");
    } else {
      setMessage(
        `Se han encontrado ${providersInClientAreaWithStock.length} proveedores:`
      );
    }
  }, [selectedClient, providers]);

  const handleProviderSelection = (provider: Provider) => {
    const formattedProviderName = provider.company.name.replace(/\s/g, "-");
    navigate(`/provider-details/${formattedProviderName}`);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding="20px"
      justifyContent="space-between"
      marginTop="30px"
    >
      <Card
        sx={{
          backgroundColor: "#242424",
          borderRadius: "15px",
          color: "white",
          maxWidth: 490,
          padding: "20px",
          marginBottom: "50px",
        }}
      >
        <Typography
          variant="h5"
          style={{
            marginBottom: "20px",
            textAlign: "center",
            fontFamily: "Quicksand, sans-serif",
            fontWeight: "bold",
          }}
        >
          {message}
        </Typography>
      </Card>

      {filteredProviders.length > 0 && (
        <Grid container spacing={2}>
          {filteredProviders.map((provider: Provider) => (
            <Grid container item xs={12} key={provider.company.name}>
              <Card
                onClick={() => handleProviderSelection(provider)}
                sx={{
                  backgroundColor: "#242424",
                  width: 1200,
                  margin: "10px auto",
                  borderRadius: "15px",
                  color: "white",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
                  display: "flex",
                }}
              >
                <CardContent
                  sx={{
                    backgroundColor: "#EC299F",
                    color: "#242424",
                    padding: "10px",
                    borderTopLeftRadius: "15px",
                    borderBottomLeftRadius: "15px",
                    flex: "2",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      textAlign: "right",
                      fontFamily: "Quicksand, sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    {provider.company.name}
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  height="140"
                  image={provider.company.logo}
                  alt={provider.company.name}
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
      )}
    </Box>
  );
};

export default ClientLocalProviders;
