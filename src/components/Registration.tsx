import { useState } from "react";
import {
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

function Registration() {
  const [isProviderDialogOpen, setIsProviderDialogOpen] = useState(false);

  const handleProviderDialogOpen = () => {
    setIsProviderDialogOpen(true);
  };

  const handleProviderDialogClose = () => {
    setIsProviderDialogOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100vh",
        marginTop: "20px",
      }}
    >
      <img
        src="/images/logo1.png"
        alt="Logo"
        style={{ width: "250px", height: "250px", marginBottom: "40px" }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "40px",
        }}
      >
        <Card style={{ width: "300px", height: "500px", marginBottom: "20px" }}>
          <CardContent
            style={{
              textAlign: "center",
              flex: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <h2>Soy Proveedor</h2>
            <Button variant="outlined" onClick={handleProviderDialogOpen}>
              Registrarse
            </Button>
          </CardContent>
        </Card>
        <Card style={{ width: "300px", height: "500px", marginBottom: "20px" }}>
          <CardContent
            style={{
              textAlign: "center",
              flex: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <h2>Soy Cliente</h2>
            <Button variant="outlined">Registrarse</Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isProviderDialogOpen} onClose={handleProviderDialogClose}>
        <DialogTitle>
          Para ofrecer sus servicios, por favor complete los siguientes campos:
        </DialogTitle>
        <div style={{ padding: "20px" }}>
          <TextField
            fullWidth
            label="Nombre de la Empresa"
            style={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            label="Teléfono de la Empresa"
            style={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            label="Email de la Empresa"
            style={{ marginBottom: "10px" }}
          />
          <FormControl fullWidth style={{ marginBottom: "10px" }}>
            <InputLabel>Servicio de</InputLabel>
            <Select label="Servicio de">
              <MenuItem value="Coctelería">Coctelería</MenuItem>
              <MenuItem value="Cervecería">Cervecería</MenuItem>
              <MenuItem value="Ambos">Ambos</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Responsable de la Empresa"
            style={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            label="Teléfono del Responsable"
            style={{ marginBottom: "10px" }}
          />
          <TextField
            fullWidth
            label="Email del Responsable"
            style={{ marginBottom: "10px" }}
          />
          <Button variant="contained" color="primary">
            Registrarse
          </Button>
        </div>
      </Dialog>
    </div>
  );
}

export default Registration;
