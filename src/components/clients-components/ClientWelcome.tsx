import { useState, useRef, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Divider,
  Grid,
  Typography,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import { Box } from "@mui/system";
import clienteBanner from "/images/clientebanner.png";
import HouseIcon from "@mui/icons-material/House";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GoogleMapReact from "google-map-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../models/RootStateTypes";
import { updatePosition } from "../../redux/ClientsSlice";
import { MarkerPosition } from "../../models/UsersModels";

const defaultCenter = {
  lat: -32.8897,
  lng: -68.844629,
};

const ClientWelcome = () => {
  const dispatch = useDispatch();
  const [isMapOpen, setMapOpen] = useState(false);
  const [isLocationSelected, setLocationSelected] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const clients = useSelector((state: RootState) => state.clients.clients);
  const userName = user?.name;
  const selectedClient = clients.find((client) => client.name === userName);

  const [newPosition, setNewPosition] = useState<MarkerPosition | null>(
    selectedClient?.markerPosition || defaultCenter
  );

  const initialCenter = newPosition || defaultCenter;

  const mapRef = useRef<any | null>(null);
  const markerRef = useRef<any | null>(null);

  useEffect(() => {
    if (markerRef.current && newPosition) {
      markerRef.current.setPosition(newPosition);
    }
  }, [newPosition]);

  const handleSaveLocation = () => {
    if (userName && markerRef.current) {
      const lat = markerRef.current?.getPosition()?.lat();
      const lng = markerRef.current?.getPosition()?.lng();
      const updatedPosition: MarkerPosition = { lat, lng };

      dispatch(
        updatePosition({ clientName: userName, newPosition: updatedPosition })
      );
      defaultCenter.lat = lat;
      defaultCenter.lng = lng;
      setSnackbarMessage("Nueva Ubicación almacenada");
      setSnackbarOpen(true);
    } else {
      console.error("markerRef.current is null or userName is undefined");
    }
  };

  const handleMapClick = () => {
    setMapOpen(!isMapOpen);
  };

  const maprender = (map: any, maps: any) => {
    mapRef.current = map;
    markerRef.current = new maps.Marker({
      position: initialCenter,
      map,
      draggable: true,
      title: "Ubicación actual",
    });

    markerRef.current.addListener("drag", () => {
      JSON.stringify(markerRef.current.getPosition());
    });

    map.addListener("click", (mapsMouseEvent: any) => {
      handleSelectPublication(mapsMouseEvent);
    });
  };

  const handleSelectPublication = (mapsMouseEvent: any) => {
    const clickedPosition: MarkerPosition = {
      lat: mapsMouseEvent.latLng.lat(),
      lng: mapsMouseEvent.latLng.lng(),
    };

    if (markerRef.current && mapRef.current) {
      markerRef.current.setPosition(clickedPosition);
      setNewPosition(clickedPosition);
      setLocationSelected(true);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding="20px"
      minHeight="80vh"
      justifyContent="space-between"
      marginTop="30px"
    >
      <Grid item xs={12}>
        <div style={{ width: "100%", marginBottom: "30px" }}>
          <Accordion
            expanded={isMapOpen}
            onChange={handleMapClick}
            sx={{
              width: "100%",
              marginBottom: "20px",
              padding: "5px",
              borderRadius: "15px",
              backgroundColor: "#242424",
            }}
          >
            <AccordionSummary
              sx={{ justifyContent: "space-between", color: "#fff" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography
                  variant="h5"
                  style={{
                    textAlign: "center",
                    fontFamily: "Quicksand, sans-serif",
                    fontWeight: "bold",
                    lineHeight: "2",
                  }}
                >
                  Mi Ubicación
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: "#EC299F",
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "#EC299F",
                    },
                  }}
                  onClick={handleSaveLocation}
                  disabled={!isLocationSelected}
                >
                  Guardar Ubicación
                  <HouseIcon
                    fontSize="large"
                    style={{ marginLeft: "3px", marginBottom: "5px" }}
                  />
                </Button>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ height: "400px", width: "100%" }}>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: "AIzaSyBfjO7sxd8P6HDrF1lmvLV151z7ocauPD0",
                  }}
                  defaultCenter={defaultCenter}
                  defaultZoom={11}
                  yesIWantToUseGoogleMapApiInternals
                  onGoogleApiLoaded={({ map, maps }) => maprender(map, maps)}
                />
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </Grid>

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

      <Grid container item xs={12}>
        <Card
          sx={{
            backgroundColor: "#242424",
            width: 1200,
            margin: "10px auto",
            borderRadius: "15px",
            color: "white",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              backgroundColor: "#EC299F",
              color: "#242424",
              padding: "10px",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
              textAlign: "center",
            }}
            style={{
              textAlign: "center",
              fontFamily: "Quicksand, sans-serif",
              fontWeight: "bold",
            }}
          >
            Bienvenido de Nuevo
          </Typography>
          <Divider />
          <Typography
            variant="body1"
            style={{
              marginTop: "10px",
              marginBottom: "20px",
              textAlign: "center",
              fontSize: "24px",
            }}
          >
            Nos alegra poder ofrecerte el servicio más innovador de Delivery de
            Coctelería y Cervecería.
            <br />
            Podrás realizar pedidos a proveedores, y visualizar en la sección
            "Pedidos" todos tus pedidos.
            <br />
            Recuerda que el servicio es GRATUITO.
          </Typography>
        </Card>
      </Grid>

      <Grid container item xs={12}>
        <Card
          sx={{
            backgroundColor: "#242424",
            width: 1200,
            margin: "10px auto",
            borderRadius: "15px",
            color: "white",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              backgroundColor: "#EC299F",
              color: "#242424",
              padding: "10px",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
              textAlign: "center",
            }}
            style={{
              textAlign: "center",
              fontFamily: "Quicksand, sans-serif",
              fontWeight: "bold",
            }}
          >
            Aquí Podrás:
          </Typography>
          <Divider />
          <Typography
            variant="body1"
            style={{
              marginTop: "10px",
              marginBottom: "20px",
              textAlign: "center",
              fontSize: "24px",
            }}
          >
            Conocer Proveedores de Bebidas y los tipos de servicios que ofrecen.
            <br />
            Conocer la cartilla de Productos y además la Info descriptiva de los
            mismos.
            <br />
            Agregar los cócteles o cervezas al carrito de compras, para efectuar
            tu pedido.
          </Typography>
        </Card>
      </Grid>

      <img
        src={clienteBanner}
        alt="Cliente Banner"
        style={{ maxWidth: "100%", marginTop: "20px" }}
      />
    </Box>
  );
};

export default ClientWelcome;
