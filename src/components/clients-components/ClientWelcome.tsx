import { useState, useRef } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import clienteBanner from "../../../public/images/clientebanner.png";
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

  const user = useSelector((state: RootState) => state.user.user);
  const clients = useSelector((state: RootState) => state.clients.clients);
  const userName = user?.name;
  const selectedClient = clients.find((client) => client.name === userName);

  const [newPosition, setNewPosition] = useState<MarkerPosition | null>(
    selectedClient?.markerPosition || null
  );

  const mapRef = useRef(null);

  // Referencia al objeto del marcador
  const markerRef = useRef<any | null>(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMarkerPositionChange = (position: MarkerPosition) => {
    setNewPosition(position);
  };

  const handleSaveLocation = () => {
    if (userName && newPosition) {
      dispatch(updatePosition({ clientName: userName, newPosition }));
      setNewPosition({ ...newPosition });
    }
  };

  const handleMapClick = () => {
    setMapOpen(!isMapOpen);
  };

  const maprender = (map: any, maps: any) => {
    // Evento que se ejecuta cuando se carga la API de Google Maps
    mapRef.current = map; // Guardar referencia al objeto del mapa
    // Crear un marcador en la posición inicial y hacerlo arrastrable
    markerRef.current = new maps.Marker({
      position: { lat: -32.912915, lng: -68.855614 },
      map,
      draggable: true,
      title: "ENCONTRADO EN ",
    });

    // Evento que se ejecuta al arrastrar el marcador
    markerRef.current.addListener("drag", () => {
      console.log(
        "Posición del marcador:",
        JSON.stringify(markerRef.current.getPosition())
      );
    });

    // Evento que se ejecuta al hacer clic en el mapa
    map.addListener("click", (mapsMouseEvent: any) => {
      handleSelectPublication(mapsMouseEvent);
    });
  };

  //parametro que contiene la informacion del evento click
  const handleSelectPublication = (mapsMouseEvent: any) => {
    // Obtiene las coordenadas de la posición seleccionada
    const clickedPosition: any = {
      lat: mapsMouseEvent.latLng.lat(),
      lng: mapsMouseEvent.latLng.lng(),
    };

    if (markerRef.current && mapRef.current) {
      // Mueve el marcador a la posición seleccionada
      markerRef.current.setPosition(clickedPosition);

      // Establece la ubicación seleccionada en el estado
      setSelectedLocation(clickedPosition);
      console.log("Ubicación seleccionada:", clickedPosition);
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
      marginTop="50px"
    >
      <Grid item xs={12}>
        <Accordion expanded={isMapOpen} onChange={handleMapClick}>
          <AccordionSummary>
            <Typography variant="h4">Mi Ubicación</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveLocation}
            >
              Guardar Ubicación
            </Button>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ height: "400px", width: "100%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyBfjO7sxd8P6HDrF1lmvLV151z7ocauPD0",
                }}
                defaultCenter={defaultCenter}
                defaultZoom={11}
                onClick={(event) => {
                  const newPosition: MarkerPosition = {
                    lat: event.lat,
                    lng: event.lng,
                  };
                  handleMarkerPositionChange(newPosition);
                }}
                yesIWantToUseGoogleMapApiInternals={true}
                onGoogleApiLoaded={({ map, maps }) => maprender(map, maps)}
              ></GoogleMapReact>
            </div>
          </AccordionDetails>
        </Accordion>
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
            Puedes hacer tus Pedidos y decidir qué días y horarios puedes
            coordinar la entrega.
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
            Conocer Proveedores de Bebidas según el tipo de Servicio.
            <br />
            Conocer la cartilla de Productos y además la Info descriptiva de los
            mismos.
            <br />
            Coordinar la entrega a través del calendario Interactivo.
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
