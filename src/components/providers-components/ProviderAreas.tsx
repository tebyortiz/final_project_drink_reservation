import { useState, useRef, useEffect } from "react";
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
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
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
  const user = useSelector((state: RootState) => {
    console.log("User:", state.user.user);
    return state.user.user;
  });

  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [circleCenter, setCircleCenter] = useState(defaultCenter);
  const [circleRadius, setCircleRadius] = useState(10000);
  const [areaName, setAreaName] = useState("");
  const [areas, setAreas] = useState<Area[]>([]);


  const mapRef = useRef(null);
  const circleRef = useRef(null);

  const handleAddArea = () => {
    const companyName = user?.company?.name || "";
    console.log("areaName:", areaName);
    console.log("selectedArea:", selectedArea);

    const circle = circleRef.current;
    if (areaName && circle) {
      const newArea: Area = {
        name: areaName,
        lat: String(circle.getCenter().lat()),
        lng: String(circle.getCenter().lng()),
      };
      console.log("Nueva área:", newArea);

      setAreas((prevAreas) => {
        const updatedAreas = [...prevAreas, newArea];
        console.log("Áreas actualizadas:", updatedAreas);
        return updatedAreas;
      });
      dispatch(addArea({ providerName: companyName, area: newArea }));

      console.log("Nombre de la nueva área:", areaName);
      setAreaName("");
    }
  };

  const handleDeleteArea = (name: string) => {
    const companyName = user?.company?.name || "";
    const updatedAreas = areas.filter((area) => area.name !== name);
    console.log("Área eliminada:", name);
    setAreas(updatedAreas);
    dispatch(removeArea({ providerName: companyName, areaName: name }));
  };

  const handleShowArea = (area: Area) => {
    console.log(area);
    setSelectedArea(area);
    setCircleCenter({ lat: parseFloat(area.lat), lng: parseFloat(area.lng) });
    setCircleRadius(10000);
  };

  const maprender = (map: any, maps: any) => {
    if (!circleRef.current || !map) return;
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
    circleRef.current = circle;
    
    const handleCircleDrag = () => {
      const newCenter = circle.getCenter();
      setCircleCenter({ lat: newCenter.lat(), lng: newCenter.lng() });
      console.log("Nueva ubicación del círculo:", {
        lat: newCenter.lat(),
        lng: newCenter.lng(),
      });
      if (areaName) {
        handleAddArea();
      }
    };

    const handleCircleRadiusChange = () => {
      const newRadius = circle.getRadius();
      setCircleRadius(newRadius);
    };

    circle.addListener("drag", handleCircleDrag);
    maps.event.addListener(circle, "radius_changed", handleCircleRadiusChange);

    maps.event.addDomListener(map, "click", () => {
      window.alert("Map was clicked!");
    });

    mapRef.current = map;
    circleRef.current = circle;
  };

  useEffect(() => {
    maprender(mapRef.current, null);
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <Card>
            <CardContent>
              <h2>Áreas de Cobertura</h2>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nombre</TableCell>
                      <TableCell>Lat</TableCell>
                      <TableCell>Lng</TableCell>
                      <TableCell>Eliminar</TableCell>
                      <TableCell>Ver</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {areas.map((area) => (
                      <TableRow key={area.name}>
                        <TableCell>{area.name}</TableCell>
                        <TableCell>{area.lat}</TableCell>
                        <TableCell>{area.lng}</TableCell>
                        <TableCell>
                          <HighlightOffIcon
                            onClick={() => handleDeleteArea(area.name)}
                          />
                        </TableCell>
                        <TableCell>
                          <ArrowCircleRightIcon
                            onClick={() => handleShowArea(area)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </div>
        <div className="col-md-6">
          <Card>
            <CardContent>
              <div style={{ height: "500px", width: "100%" }}>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: "AIzaSyBfjO7sxd8P6HDrF1lmvLV151z7ocauPD0",
                  }}
                  defaultCenter={defaultCenter}
                  defaultZoom={11}
                  yesIWantToUseGoogleMapApiInternals={true}
                  onGoogleApiLoaded={({ map, maps }) => maprender(map, maps)}
                />
              </div>
            </CardContent>
            <Divider />
            <TextField
              label="Nombre de la Nueva Área"
              variant="outlined"
              value={areaName}
              onChange={(e) => {
                const newValue = e.target.value;
                console.log("Texto ingresado:", newValue);
                setAreaName(newValue);
              }}
            />
            <Button onClick={() => handleAddArea()}>Guardar Área</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProviderAreas;
