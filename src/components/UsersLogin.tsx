import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  DialogContent,
  DialogContentText,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import RootState from "../models/RootStateTypes";

const UsersLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userType, setUserType] = useState("");

  const clients = useSelector((state: RootState) => state.clients.clients);
  const providers = useSelector(
    (state: RootState) => state.providers.providers
  );

  const handleLogin = () => {
    console.log("Ingreso de usuario", clients);
    console.log("Ingreso de proveedor", providers);

    const client =
      clients &&
      clients.find(
        (c) => c.login.username === username && c.login.password === password
      );
    const provider =
      providers &&
      providers.find(
        (p) => p.login.username === username && p.login.password === password
      );

    if (client || provider) {
      setLoginSuccess(true);
      setUserType(client ? "Cliente" : "Proveedor");
    } else {
      setLoginSuccess(false);
    }

    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setLoginSuccess(false);
  };

  const getDialogContent = () => {
    if (loginSuccess) {
      return (
        <DialogContent>
          <DialogContentText>
            ¡Inicio de sesión exitoso como {userType}!
          </DialogContentText>
        </DialogContent>
      );
    } else {
      return (
        <DialogContent>
          <DialogContentText>Usuario no Existente.</DialogContentText>
        </DialogContent>
      );
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding="20px"
    >
      <img
        src="/images/logo1.png"
        alt="Logo"
        style={{
          width: "250px",
          height: "250px",
          marginBottom: "20px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          borderRadius: "50%",
        }}
      />
      <Typography
        variant="h4"
        style={{
          marginTop: "10px",
          marginBottom: "20px",
          textAlign: "center",
          fontFamily: "Quicksand, sans-serif",
          fontWeight: "bold",
        }}
      >
        Bienvenidos <br /> Para acceder a nuestro servicio, primero debes
        loguearte.
      </Typography>

      {/* Card para ingreso */}

      <Card
        sx={{
          backgroundColor: "#242424",
          width: 700,
          margin: "10px auto",
          borderRadius: "15px",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "white",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Ingresa tu Username y Contraseña para ingresar
          </Typography>
          <TextField
            fullWidth
            label="Username"
            style={{ marginBottom: "10px" }}
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            style={{ marginBottom: "10px" }}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#01FF72",
                fontFamily: "Nunito, sans-serif",
                fontWeight: "bold",
                marginTop: "15px",
                "&:hover": {
                  backgroundColor: "white",
                  color: "#01FF72",
                },
              }}
              onClick={handleLogin}
            >
              Ingresar
            </Button>
          </div>
        </CardContent>
      </Card>
      <br />
      <br />
      <br />

      <Typography variant="h6" gutterBottom>
        ¿Todavía no estás registrado? Regístrate Gratis
      </Typography>
      <Link to="/registration" style={{ textDecoration: "none" }}>
        {/* Botón para ir al Registro */}

        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#01FF72",
            fontFamily: "Nunito, sans-serif",
            fontWeight: "bold",
            marginTop: "10px",
            "&:hover": {
              backgroundColor: "white",
              color: "#01FF72",
            },
          }}
        >
          Regístrame
        </Button>
      </Link>
      <Dialog open={showDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {loginSuccess
            ? "Éxito de Inicio de Sesión"
            : "Error de Inicio de Sesión"}
        </DialogTitle>
        {getDialogContent()}
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersLogin;
