import { useState } from "react";
import {
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  TextField,
  Button,
  FormControl,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addClient } from "../redux/ClientsSlice";
import { Client } from "../models/UsersModels";

export interface UsersRegistrationProps {
  isUserDialogOpen: boolean;
  setIsUserDialogOpen: (isOpen: boolean) => void;
}

const ClientsRegistration = ({
  isUserDialogOpen,
  setIsUserDialogOpen,
}: UsersRegistrationProps) => {
  const [isWelcomeDialogOpen, setIsWelcomeDialogOpen] = useState(false);
  const [welcomeDialogUserName, setWelcomeDialogUserName] = useState("");

  const [formValues, setFormValues] = useState<Client>({
    name: "",
    phone: "",
    email: "",
    photo: "",
    address: "",
    login: {
      username: "",
      password: "",
    },
    markerPosition: {
      lat: 0,
      lng: 0,
    },
  });

  const handleUserDialogClose = () => {
    setIsUserDialogOpen(false);
  };

  const handleWelcomeDialogClose = () => {
    setIsWelcomeDialogOpen(false);
  };

  const dispatch = useDispatch();

  const handleUserRegistration = () => {
    if (
      !formValues.name ||
      !formValues.phone ||
      !formValues.email ||
      !formValues.photo ||
      !formValues.address ||
      !formValues.login.username ||
      !formValues.login.password
    ) {
      alert("Por favor, complete todos los campos");
      return;
    }

    if (formValues.login.password.length < 8) {
      alert("Para la contraseña debe ingresar al menos 8 caracteres");
      return;
    }

    const userName = formValues.name;
    const newUser: Client = { ...formValues };

    {
      /* Action de Redux Toolkit para agregar un nuevo Cliente */
    }
    dispatch(addClient(newUser));

    handleUserDialogClose();
    setFormValues({
      name: "",
      phone: "",
      email: "",
      photo: "",
      address: "",
      login: {
        username: "",
        password: "",
      },
      markerPosition: {
        lat: 0,
        lng: 0,
      },
    });

    setWelcomeDialogUserName(userName);
    setIsWelcomeDialogOpen(true);
  };

  return (
    <div>
      {/* Formulario de Registro Clientes */}
      <Grid item xs={12}>
        <FormControl fullWidth style={{ marginBottom: "10px" }}>
          <Dialog
            open={isUserDialogOpen}
            onClose={handleUserDialogClose}
            sx={{
              "& .MuiDialog-paper": {
                width: "80%",
                maxWidth: "700px",
                borderRadius: "15px",
              },
            }}
          >
            <DialogTitle
              sx={{
                backgroundColor: "#EC299F",
                textAlign: "center",
              }}
              style={{ marginBottom: "8px" }}
            >
              Para registrarte, completa los siguientes campos:
            </DialogTitle>

            <div style={{ padding: "20px" }}>
              <TextField
                fullWidth
                label="Nombre del Usuario"
                style={{ marginBottom: "10px" }}
                sx={{
                  "& input": {
                    height: "15px",
                    color: "#242424",
                    backgroundColor: "white",
                  },
                  "& label": {
                    color: "black",
                  },
                  "& label.Mui-focused": {
                    color: "#242424",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#EC299F",
                  },
                }}
                InputLabelProps={{ shrink: true }}
                variant="standard"
                value={formValues.name}
                onChange={(e) =>
                  setFormValues((prevFormValues) => ({
                    ...prevFormValues,
                    name: e.target.value,
                  }))
                }
              />
              <TextField
                fullWidth
                label="Teléfono del Usuario"
                style={{ marginBottom: "10px" }}
                sx={{
                  "& input": {
                    height: "15px",
                    color: "#242424",
                    backgroundColor: "white",
                  },
                  "& label": {
                    color: "black",
                  },
                  "& label.Mui-focused": {
                    color: "#242424",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#EC299F",
                  },
                }}
                InputLabelProps={{ shrink: true }}
                variant="standard"
                type="number"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                value={formValues.phone}
                onChange={(e) =>
                  setFormValues((prevFormValues) => ({
                    ...prevFormValues,
                    phone: e.target.value,
                  }))
                }
              />
              <TextField
                fullWidth
                label="Email del Usuario"
                style={{ marginBottom: "10px" }}
                sx={{
                  "& input": {
                    height: "15px",
                    color: "#242424",
                    backgroundColor: "white",
                  },
                  "& label": {
                    color: "black",
                  },
                  "& label.Mui-focused": {
                    color: "#242424",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#EC299F",
                  },
                }}
                InputLabelProps={{ shrink: true }}
                variant="standard"
                value={formValues.email}
                onChange={(e) =>
                  setFormValues((prevFormValues) => ({
                    ...prevFormValues,
                    email: e.target.value,
                  }))
                }
              />
              <TextField
                fullWidth
                label="Foto del Usuario"
                style={{ marginBottom: "10px" }}
                sx={{
                  "& input": {
                    height: "15px",
                    color: "#242424",
                    backgroundColor: "white",
                  },
                  "& label": {
                    color: "black",
                  },
                  "& label.Mui-focused": {
                    color: "#242424",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#EC299F",
                  },
                }}
                InputLabelProps={{ shrink: true }}
                variant="standard"
                value={formValues.photo}
                onChange={(e) =>
                  setFormValues((prevFormValues) => ({
                    ...prevFormValues,
                    photo: e.target.value,
                  }))
                }
              />
              <TextField
                fullWidth
                label="Dirección del Usuario"
                style={{ marginBottom: "10px" }}
                sx={{
                  "& input": {
                    height: "15px",
                    color: "#242424",
                    backgroundColor: "white",
                  },
                  "& label": {
                    color: "black",
                  },
                  "& label.Mui-focused": {
                    color: "#242424",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#EC299F",
                  },
                }}
                InputLabelProps={{ shrink: true }}
                variant="standard"
                value={formValues.address}
                onChange={(e) =>
                  setFormValues((prevFormValues) => ({
                    ...prevFormValues,
                    address: e.target.value,
                  }))
                }
              />

              {/* Card para definir Username y Contraseña */}
              <Card
                sx={{
                  backgroundColor: "#242424",
                  marginTop: "25px",
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
                    Ahora defina su Username y Contraseña para ingresar
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
                        border: "2px solid #EC299F",
                      },
                      "& .MuiInputLabel-root": {
                        color: "white",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#EC299F",
                      },
                      "& .MuiInputBase-root.Mui-focused": {
                        borderColor: "#EC299F",
                      },
                      "& .MuiInput-underline:after": {
                        borderBottom: "none",
                      },
                    }}
                    InputLabelProps={{ shrink: true }}
                    variant="standard"
                    value={formValues.login.username}
                    onChange={(e) =>
                      setFormValues((prevFormValues) => ({
                        ...prevFormValues,
                        login: {
                          ...prevFormValues.login,
                          username: e.target.value,
                        },
                      }))
                    }
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
                        border: "2px solid #EC299F",
                      },
                      "& .MuiInputLabel-root": {
                        color: "white",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#EC299F",
                      },
                      "& .MuiInputBase-root.Mui-focused": {
                        borderColor: "#EC299F",
                      },
                      "& .MuiInput-underline:after": {
                        borderBottom: "none",
                      },
                    }}
                    InputLabelProps={{ shrink: true }}
                    variant="standard"
                    value={formValues.login.password}
                    onChange={(e) =>
                      setFormValues((prevFormValues) => ({
                        ...prevFormValues,
                        login: {
                          ...prevFormValues.login,
                          password: e.target.value,
                        },
                      }))
                    }
                  />
                  {/* Botón de Registro + Evento */}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        backgroundColor: "#EC299F",
                        fontFamily: "Nunito, sans-serif",
                        fontWeight: "bold",
                        marginTop: "15px",
                        "&:hover": {
                          backgroundColor: "white",
                          color: "#EC299F",
                        },
                      }}
                      onClick={handleUserRegistration}
                    >
                      Registrarse
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Dialog>
        </FormControl>
      </Grid>

      {/* Cuadro de Diálogo de Bienvenida */}
      <Grid item xs={12}>
        <Dialog open={isWelcomeDialogOpen} onClose={handleWelcomeDialogClose}>
          <DialogTitle
            sx={{
              backgroundColor: "#EC299F",
              textAlign: "center",
            }}
            style={{ marginBottom: "8px" }}
          >
            {`BIENVENIDO "${welcomeDialogUserName}"`}
          </DialogTitle>
          <div style={{ padding: "20px" }}>
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              GRACIAS POR CONFIAR EN NOSOTROS.
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              En breve recibirá el e-mail para completar la registración.
            </Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src="/images/logo1.png"
                alt="Logo"
                style={{
                  width: "150px",
                  height: "150px",
                }}
              />
            </div>
            <Divider
              variant="middle"
              sx={{ marginTop: "20px", marginBottom: "20px" }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#EC299F",
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: "bold",
                  marginTop: "10px",
                  marginBottom: "10px",
                  "&:hover": {
                    backgroundColor: "#242424",
                    color: "#EC299F",
                  },
                }}
                onClick={handleWelcomeDialogClose}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </Dialog>
      </Grid>
    </div>
  );
};

export default ClientsRegistration;
