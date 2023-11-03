import { useState } from "react";
import GoogleMapReact from "google-map-react";
import { useDispatch } from "react-redux";
import { MarkerPosition } from "../../models/UsersModels";
import RoomTwoToneIcon from "@mui/icons-material/RoomTwoTone";

const defaultCenter = {
  lat: -32.8897,
  lng: -68.844629,
};

const apikey = "AIzaSyBfjO7sxd8P6HDrF1lmvLV151z7ocauPD0";

const Marker = ({ position }: { position: MarkerPosition }) => (
  <div className="marker" style={{ position: "relative", left: -15, top: -15 }}>
    <RoomTwoToneIcon
      style={{
        width: 30,
        height: 30,
        color: "red",
        transform: "translate(-50%, -100%)",
      }}
    />
  </div>
);

const ClientWelcome2 = () => {
  const [lat, setLat] = useState(defaultCenter.lat);
  const [lng, setLng] = useState(defaultCenter.lng);

  const dispatch = useDispatch();

  const handleMarkerClick = () => {
    const location = new (window as any).google.maps.LatLng(lat, lng);
    setLat(location.lat());
    setLng(location.lng());
  };

  const handleSaveLocation = () => {
    dispatch({
      type: "setLocation",
      lat: lat,
      lng: lng,
    });
  };

  return (
    <div className="client-welcome">
      <GoogleMapReact
        key={apikey}
        center={defaultCenter}
        zoom={10}
      >
        <div onClick={handleMarkerClick as () => void | undefined}>
        <Marker
          position={new (window as any).google.maps.LatLng(lat, lng)}
        />
        </div>
      </GoogleMapReact>
      <button onClick={handleSaveLocation}>Guardar mi Ubicación</button>
    </div>
  );
};

export default ClientWelcome2;