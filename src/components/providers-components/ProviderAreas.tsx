import { useState, useRef } from "react";
import GoogleMapReact from "google-map-react";
import {
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Box,
  Typography,
  Paper,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Area } from "../../models/UsersModels";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../models/RootStateTypes";
import { addArea, removeArea } from "../../redux/ProvidersSlice";

const defaultCenter = {
  lat: -32.8897,
  lng: -68.844629,
};

const ProviderAreas = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const providers = useSelector(
    (state: RootState) => state.providers.providers
  );
  const userCompanyName = user?.company?.name;
  const selectedProvider = providers.find(
    (provider) => provider.company.name === userCompanyName
  );
  const areas = selectedProvider?.service?.areas || [];

  const [_selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [circleCenter, setCircleCenter] = useState(defaultCenter);
  const [circleRadius, setCircleRadius] = useState(10000);
  const [areaName, setAreaName] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const mapRef = useRef(null);
  const circleRef = useRef<any | null>(null);

  const handleAddArea = () => {
    const companyName = user?.company?.name || "";
    const circle = circleRef.current;
    if (areaName && circle) {
      const newArea: Area = {
        name: areaName,
        lat: String(circle.getCenter().lat()),
        lng: String(circle.getCenter().lng()),
        radius: circle.getRadius(),
      };

      setSelectedArea(newArea);
      dispatch(addArea({ providerName: companyName, area: newArea }));
      handleShowArea(newArea);
      setAreaName("");
      setSnackbarMessage(`Área "${newArea.name}" añadida`);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCircleDrag = (circle: { getCenter: () => any }) => {
    const newCenter = circle.getCenter();
    setCircleCenter({ lat: newCenter.lat(), lng: newCenter.lng() });
  };

  const handleCircleRadiusChange = (circle: { getRadius: () => any }) => {
    const newRadius = circle.getRadius();
    setCircleRadius(newRadius);
  };

  const handleDeleteArea = (name: string) => {
    const companyName = user?.company?.name || "";
    dispatch(removeArea({ providerName: companyName, areaName: name }));
  };

  const handleShowArea = (area: Area) => {
    setSelectedArea(area);

    const newLatLng = new (window as any).google.maps.LatLng(
      parseFloat(area.lat),
      parseFloat(area.lng)
    );

    setCircleCenter({
      lat: parseFloat(area.lat),
      lng: parseFloat(area.lng),
    });

    const circle = circleRef.current;
    if (circle) {
      circle.setCenter(newLatLng);
      circle.setRadius(area.radius);
    }
  };

  const maprender = (map: any, maps: any) => {
    const circle = new maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      editable: true,
      draggable: true,
      map,
      center: circleCenter,
      radius: circleRadius,
    });

    circle.addListener("drag", () => {
      handleCircleDrag(circle);
    });

    maps.event.addListener(circle, "radius_changed", () => {
      handleCircleRadiusChange(circle);
    });

    mapRef.current = map;
    circleRef.current = circle;
  };

  return (
    <div>
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} md={6}>
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
                Áreas de Cobertura
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
                          Nombre
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
                          Lat
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
                          Lng
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
                          Eliminar
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
                          Ver
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {areas.map((area: Area, index: number) => (
                      <TableRow key={index}>
                        <TableCell
                          sx={{ color: "#242424", textAlign: "center" }}
                        >
                          {area.name}
                        </TableCell>
                        <TableCell
                          sx={{ color: "#242424", textAlign: "center" }}
                        >
                          {area.lat}
                        </TableCell>
                        <TableCell
                          sx={{ color: "#242424", textAlign: "center" }}
                        >
                          {area.lng}
                        </TableCell>
                        <TableCell
                          sx={{ color: "#242424", textAlign: "center" }}
                        >
                          <HighlightOffIcon
                            onClick={() => handleDeleteArea(area.name)}
                          />
                        </TableCell>
                        <TableCell
                          sx={{ color: "#242424", textAlign: "center" }}
                        >
                          <ArrowCircleRightIcon
                            onClick={() => handleShowArea(area)}
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
      <Grid item xs={12} md={6}>
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
            <div
              style={{ height: "500px", width: "100%", borderRadius: "15px" }}
            >
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyBfjO7sxd8P6HDrF1lmvLV151z7ocauPD0",
                }}
                defaultCenter={defaultCenter}
                defaultZoom={11}
                center={circleCenter}
                yesIWantToUseGoogleMapApiInternals={true}
                onGoogleApiLoaded={({ map, maps }) => maprender(map, maps)}
              />
            </div>
            <Divider />
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
                variant="h6"
                sx={{
                  color: "white",
                  marginRight: "10px",
                  padding: "5px 10px",
                  borderRadius: "7px",
                  textAlign: "center",
                }}
              >
                Nombre Área
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
                type="text"
                value={areaName}
                onChange={(e) => setAreaName(e.target.value)}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddArea()}
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
            >
              Guardar Área
            </Button>
          </CardContent>
        </Card>
      </Grid>
      </Grid>
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
  </div>
);
};

export default ProviderAreas;