import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import RootState from "../models/RootStateTypes";
import { setUser } from "../redux/UserSlice";

const UsersLogin = ({
  setLoginSuccess,
  onUserTypeChange,
}: {
  setLoginSuccess: (value: boolean) => void;
  onUserTypeChange: (type: string) => void;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirectTo, setRedirectTo] = useState("");
  const dispatch = useDispatch();

  const clients = useSelector((state: RootState) => state.clients.clients);
  const providers = useSelector(
    (state: RootState) => state.providers.providers
  );

  const handleLogin = () => {
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
      const newUserType = client ? "Cliente" : "Proveedor";
      onUserTypeChange(newUserType);

      let userData: any = {
        username,
        userType: newUserType,
        name: "",
        phone: "",
        email: "",
        photo: "",
      };

      if (client) {
        userData = {
          ...userData,
          name: client.name,
          phone: client.phone,
          email: client.email,
          photo: client.photo,
          address: client.address,
        };
      } else if (provider) {
        userData = {
          ...userData,
          name: provider.company.name,
          phone: provider.company.phone,
          email: provider.company.email,
          photo: provider.responsibleCompany.photo,
          company: provider.company,
          service: provider.service,
          responsibleCompany: provider.responsibleCompany,
        };
      }

      dispatch(setUser(userData));
      setLoginSuccess(true);
      if (newUserType === "Cliente") {
        setRedirectTo("/client_home");
      } else if (newUserType === "Proveedor") {
        setRedirectTo("/provider_home");
      }
    } else {
      setLoginSuccess(false);
      alert(
        "Usuario Inexistente o datos incorrectos. Por favor, inténtelo nuevamente."
      );
    }
  };

  if (redirectTo) {
    return <Navigate to={redirectTo} />;
  }

  return (
    <Grid item xs={12}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding="20px"
      >
        <Grid item xs={12}>
          <img
            src="/images/logo1.png"
            alt="Logo"
            style={{
              width: "250px",
              height: "250px",
              marginTop: "20px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
              borderRadius: "50%",
            }}
          />
        </Grid>
        <Grid item xs={12}>
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
        </Grid>

        {/* Card para ingreso */}

        <Grid container item xs={12}>
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
        </Grid>
        <br />
        <br />
        <br />

        <Grid item xs={12} textAlign="center">
          <Typography variant="h6" gutterBottom>
            ¿Todavía no estás registrado? Regístrate Gratis.
          </Typography>
        </Grid>

        <Link to="/registration" style={{ textDecoration: "none" }}>
          {/* Botón para ir al Registro */}

          <Grid item xs={12}>
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
          </Grid>
        </Link>
      </Box>
    </Grid>
  );
};

export default UsersLogin;
