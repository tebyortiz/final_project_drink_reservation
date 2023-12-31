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
  Typography,
  keyframes,
  Divider,
  Grid,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { addProvider } from "../redux/ProvidersSlice";
import { Provider } from "../models/UsersModels";
import ClientsRegistration from "./ClientsRegistration";

const ProvidersRegistration = () => {
  const [isProviderDialogOpen, setIsProviderDialogOpen] = useState(false);
  const [isWelcomeDialogOpen, setIsWelcomeDialogOpen] = useState(false);
  const [welcomeDialogCompanyName, setWelcomeDialogCompanyName] = useState("");
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState<Provider>({
    company: {
      name: "",
      logo: "",
      phone: "",
      email: "",
    },
    service: {
      type: "Ambos",
      cocktails: [],
      beers: [],
      areas: [],
    },
    responsibleCompany: {
      name: "",
      phone: "",
      email: "",
      photo: "",
    },
    login: {
      username: "",
      password: "",
    },
  });

  const handleProviderDialogOpen = () => {
    setIsProviderDialogOpen(true);
  };

  const handleProviderDialogClose = () => {
    setIsProviderDialogOpen(false);
  };

  const handleWelcomeDialogClose = () => {
    setIsWelcomeDialogOpen(false);
  };

  const openUserForm = () => {
    setIsUserDialogOpen(true);
  };

  const dispatch = useDispatch();

  {
    /* Estilo de Card PROVEEDOR */
  }
  const cardStyleProvider = {
    width: "400px",
    height: "500px",
    margin: " auto",
    marginBottom: "20px",
    backgroundColor: "#242424",
    borderRadius: "15px",
    color: "white",
    transition: "transform 0.2s, box-shadow 0.2s",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "15px 15px 20px rgba(1, 255, 114, 0.8)",
    },
  };

  {
    /* Estilo de Card CLIENTE */
  }
  const cardStyleClient = {
    width: "400px",
    height: "500px",
    margin: "auto",
    marginBottom: "20px",
    backgroundColor: "#242424",
    borderRadius: "15px",
    color: "white",
    transition: "transform 0.2s, box-shadow 0.2s",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "15px 15px 20px rgba(202, 35, 132, 0.8)",
    },
  };

  {
    /* Estilos y transiciones */
  }

  const Title1 = styled(Typography)(() => ({
    color: "white",
    fontFamily: "Nunito, sans-serif!important",
    marginTop: "50px",
    "&:hover": {
      animation: `${textShadowPopBr1} 0.6s both`,
      cursor: "pointer",
    },
  }));

  const Title2 = styled(Typography)(() => ({
    color: "white",
    fontFamily: "Nunito, sans-serif!important",
    marginTop: "50px",
    "&:hover": {
      animation: `${textShadowPopBr2} 0.6s both`,
      cursor: "pointer",
    },
  }));

  const textShadowPopBr1 = keyframes`
  0% {
    text-shadow: 0 0 #01FF72, 0 0 #01FF72, 0 0 #01FF72, 0 0 #01FF72, 0 0 #01FF72, 0 0 #01FF72, 0 0 #01FF72, 0 0 #01FF72;
    -webkit-transform: translateX(0) translateY(0);
            transform: translateX(0) translateY(0);
    }
  100% {
    text-shadow: 1px 1px #01FF72, 2px 2px #01FF72, 3px 3px #01FF72, 4px 4px #01FF72, 5px 5px #01FF72, 6px 6px #01FF72, 7px 7px #01FF72, 8px 8px #01FF72;
    -webkit-transform: translateX(-8px) translateY(-8px);
            transform: translateX(-8px) translateY(-8px);
    }
  `;

  const textShadowPopBr2 = keyframes`
  0% {
    text-shadow: 0 0 #CA2384, 0 0 #CA2384, 0 0 #CA2384, 0 0 #CA2384, 0 0 #CA2384, 0 0 #CA2384, 0 0 #CA2384, 0 0 #CA2384;
    -webkit-transform: translateX(0) translateY(0);
            transform: translateX(0) translateY(0);
    }
  100% {
    text-shadow: 1px 1px #CA2384, 2px 2px #CA2384, 3px 3px #CA2384, 4px 4px #CA2384, 5px 5px #CA2384, 6px 6px #CA2384, 7px 7px #CA2384, 8px 8px #CA2384;
    -webkit-transform: translateX(-8px) translateY(-8px);
            transform: translateX(-8px) translateY(-8px);
    }
  `;

  const handleProviderRegistration = () => {
    const isAnyFieldEmpty = Object.values(formValues).some(
      (value) =>
        typeof value === "object" &&
        Object.values(value).some((innerValue) => innerValue === "")
    );

    if (isAnyFieldEmpty) {
      alert("Por favor, complete todos los campos");
      return;
    }

    if (formValues.login.password.length < 8) {
      alert("Para la contraseña debe ingresar al menos 8 caracteres");
      return;
    }

    const companyName = formValues.company.name;
    const newProvider: Provider = { ...formValues };

    {
      /* Action de Redux Toolkit para agregar un nuevo Proveedor */
    }
    dispatch(addProvider(newProvider));

    handleProviderDialogClose();
    setFormValues({
      company: {
        name: "",
        logo: "",
        phone: "",
        email: "",
      },
      service: {
        type: "Ambos",
        cocktails: [],
        beers: [],
        areas: [],
      },
      responsibleCompany: {
        name: "",
        phone: "",
        email: "",
        photo: "",
      },
      login: {
        username: "",
        password: "",
      },
    });

    setWelcomeDialogCompanyName(companyName);
    setIsWelcomeDialogOpen(true);
    setIsUserDialogOpen(false);
  };

  return (
    <Grid item xs={12}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
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
            Para Registrarte, selecciona tu tipo de Usuario.
          </Typography>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "auto",
            gap: "20px",
          }}
        >
          {/* Cards de selección de tipo de Usuario */}

          <Grid container item xs={12}>
            <Card
              sx={{
                ...cardStyleProvider,
                marginRight: "20px",
                marginLeft: "20px",
              }}
            >
              <Button onClick={handleProviderDialogOpen}>
                <CardContent
                  style={{
                    textAlign: "center",
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                >
                  <img
                    src="/images/proveedor.png"
                    alt="Proveedor"
                    style={{
                      width: "auto",
                      height: "auto",
                      maxHeight: "350px",
                    }}
                  />

                  <Title1 variant="h4">PROVEEDOR</Title1>
                </CardContent>
              </Button>
            </Card>

            <Card
              sx={{
                ...cardStyleClient,
                marginRight: "20px",
                marginLeft: "20px",
              }}
            >
              <Button onClick={openUserForm}>
                <CardContent
                  style={{
                    textAlign: "center",
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                >
                  <img
                    src="/images/cliente.png"
                    alt="Cliente"
                    style={{
                      width: "auto",
                      height: "auto",
                      maxHeight: "350px",
                    }}
                  />

                  <Title2 variant="h4">CLIENTE</Title2>
                </CardContent>
              </Button>
            </Card>
          </Grid>
        </div>

        {/* Formulario de Registro Proveedores */}
        <Grid item xs={12}>
          <FormControl fullWidth style={{ marginBottom: "10px" }}>
            <Dialog
              open={isProviderDialogOpen}
              onClose={handleProviderDialogClose}
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
                  backgroundColor: "#01FF72",
                  textAlign: "center",
                }}
                style={{ marginBottom: "8px" }}
              >
                Para ofrecer sus servicios, complete los siguientes campos:
              </DialogTitle>
              <div style={{ padding: "20px" }}>
                <TextField
                  fullWidth
                  label="Nombre de la Empresa"
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
                      borderBottomColor: "#01FF72",
                    },
                  }}
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  value={formValues.company.name}
                  onChange={(e) =>
                    setFormValues((prevFormValues) => ({
                      ...prevFormValues,
                      company: {
                        ...prevFormValues.company,
                        name: e.target.value,
                      },
                    }))
                  }
                />
                <TextField
                  fullWidth
                  label="Logo de la Empresa"
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
                      borderBottomColor: "#01FF72",
                    },
                  }}
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  value={formValues.company.logo}
                  onChange={(e) =>
                    setFormValues((prevFormValues) => ({
                      ...prevFormValues,
                      company: {
                        ...prevFormValues.company,
                        logo: e.target.value,
                      },
                    }))
                  }
                />
                <TextField
                  fullWidth
                  label="Teléfono de la Empresa"
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
                      borderBottomColor: "#01FF72",
                    },
                  }}
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  value={formValues.company.phone}
                  onChange={(e) =>
                    setFormValues((prevFormValues) => ({
                      ...prevFormValues,
                      company: {
                        ...prevFormValues.company,
                        phone: e.target.value,
                      },
                    }))
                  }
                />
                <TextField
                  fullWidth
                  label="Email de la Empresa"
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
                      borderBottomColor: "#01FF72",
                    },
                  }}
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  value={formValues.company.email}
                  onChange={(e) =>
                    setFormValues((prevFormValues) => ({
                      ...prevFormValues,
                      company: {
                        ...prevFormValues.company,
                        email: e.target.value,
                      },
                    }))
                  }
                />
                <FormControl
                  fullWidth
                  style={{ marginBottom: "10px", marginTop: "10px" }}
                >
                  <InputLabel
                    sx={{
                      color: "#242424",
                      "&.Mui-focused": {
                        color: "#242424",
                      },
                    }}
                  >
                    Servicio de
                  </InputLabel>
                  <Select
                    label="Servicio de"
                    sx={{
                      "& select": {
                        height: "15px",
                        color: "#242424",
                        backgroundColor: "white",
                      },
                      "& label": {
                        color: "#242424",
                      },
                      "&.Mui-focused": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#01FF72",
                        },
                      },
                    }}
                    value={formValues.service.type}
                    onChange={(e) =>
                      setFormValues((prevFormValues) => ({
                        ...prevFormValues,
                        service: {
                          ...prevFormValues.service,
                          type: e.target.value as
                            | "Coctelería"
                            | "Cervecería"
                            | "Ambos",
                        },
                      }))
                    }
                  >
                    <MenuItem value="Coctelería">Coctelería</MenuItem>
                    <MenuItem value="Cervecería">Cervecería</MenuItem>
                    <MenuItem value="Ambos">Ambos</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Responsable de la Empresa"
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
                      borderBottomColor: "#01FF72",
                    },
                  }}
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  value={formValues.responsibleCompany.name}
                  onChange={(e) =>
                    setFormValues((prevFormValues) => ({
                      ...prevFormValues,
                      responsibleCompany: {
                        ...prevFormValues.responsibleCompany,
                        name: e.target.value,
                      },
                    }))
                  }
                />
                <TextField
                  fullWidth
                  label="Teléfono del Responsable"
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
                      borderBottomColor: "#01FF72",
                    },
                  }}
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  value={formValues.responsibleCompany.phone}
                  onChange={(e) =>
                    setFormValues((prevFormValues) => ({
                      ...prevFormValues,
                      responsibleCompany: {
                        ...prevFormValues.responsibleCompany,
                        phone: e.target.value,
                      },
                    }))
                  }
                />
                <TextField
                  fullWidth
                  label="Email del Responsable"
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
                      borderBottomColor: "#01FF72",
                    },
                  }}
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  value={formValues.responsibleCompany.email}
                  onChange={(e) =>
                    setFormValues((prevFormValues) => ({
                      ...prevFormValues,
                      responsibleCompany: {
                        ...prevFormValues.responsibleCompany,
                        email: e.target.value,
                      },
                    }))
                  }
                />
                <TextField
                  fullWidth
                  label="foto del Responsable"
                  style={{ marginBottom: "25px" }}
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
                      borderBottomColor: "#01FF72",
                    },
                  }}
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  value={formValues.responsibleCompany.photo}
                  onChange={(e) =>
                    setFormValues((prevFormValues) => ({
                      ...prevFormValues,
                      responsibleCompany: {
                        ...prevFormValues.responsibleCompany,
                        photo: e.target.value,
                      },
                    }))
                  }
                />

                {/* Card para definir Username y Contraseña */}
                <Card
                  sx={{
                    backgroundColor: "#242424",
                    marginTop: "10px",
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
                          backgroundColor: "#01FF72",
                          fontFamily: "Nunito, sans-serif",
                          fontWeight: "bold",
                          marginTop: "15px",
                          "&:hover": {
                            backgroundColor: "white",
                            color: "#01FF72",
                          },
                        }}
                        onClick={handleProviderRegistration}
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
                backgroundColor: "#01FF72",
                textAlign: "center",
              }}
              style={{ marginBottom: "8px" }}
            >
              {`BIENVENIDO "${welcomeDialogCompanyName}"`}
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
                    backgroundColor: "#01FF72",
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: "bold",
                    marginTop: "10px",
                    marginBottom: "10px",
                    "&:hover": {
                      backgroundColor: "#242424",
                      color: "#01FF72",
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
        <ClientsRegistration
          isUserDialogOpen={isUserDialogOpen}
          setIsUserDialogOpen={setIsUserDialogOpen}
        />
      </Box>
    </Grid>
  );
};

export default ProvidersRegistration;
