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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { addProvider } from "../redux/providersSlice";

interface Provider {
  company: {
    name: string;
    logo: string;
    phone: string;
    email: string;
  };
  service: {
    type: string;
  };
  responsibleCompany: {
    name: string;
    phone: string;
    email: string;
    photo: string;
  };
  login: {
    username: string;
    password: string;
  };
}

function Registration() {
  const [isProviderDialogOpen, setIsProviderDialogOpen] = useState(false);
  const [isWelcomeDialogOpen, setIsWelcomeDialogOpen] = useState(false);
  const [welcomeDialogCompanyName, setWelcomeDialogCompanyName] = useState("");
  const [formValues, setFormValues] = useState<Provider>({
    company: {
      name: "",
      logo: "",
      phone: "",
      email: "",
    },
    service: {
      type: "",
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

  const dispatch = useDispatch();

  const cardStyleProvider = {
    width: "400px",
    height: "500px",
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

  const cardStyleClient = {
    width: "400px",
    height: "500px",
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
        type: "",
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
        style={{ width: "250px", height: "250px", marginBottom: "20px" }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          margin: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "120px",
          }}
        >
          <Card sx={cardStyleProvider}>
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
                  src="/images/proveedor1.png"
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
          <Card sx={cardStyleClient}>
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
                src="/images/cliente1.png"
                alt="Cliente"
                style={{
                  width: "auto",
                  height: "auto",
                  maxHeight: "350px",
                }}
              />

              <Title2 variant="h4">CLIENTE</Title2>
            </CardContent>
          </Card>
        </div>
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
          Selecciona el tipo de usuario.
        </Typography>
      </div>

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
                      type: e.target.value as string,
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
                  label="Nombre de Usuario"
                  style={{ marginBottom: "10px" }}
                  sx={{
                    "& input": {
                      height: "30px",
                      color: "#242424",
                      backgroundColor: "white",
                      borderRadius: "7px",
                      border: "2px solid #01FF72",
                    },
                    "& label": {
                      color: "#01FF72",
                    },
                    "& label.Mui-focused": {
                      color: "white",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#01FF72",
                    },
                    borderRadius: "7px",
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
                    "& input": {
                      height: "30px",
                      color: "#242424",
                      backgroundColor: "white",
                      borderRadius: "7px",
                      border: "2px solid #01FF72",
                    },
                    "& label": {
                      color: "#01FF72",
                    },
                    "& label.Mui-focused": {
                      color: "white",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#01FF72",
                    },
                    borderRadius: "7px",
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
      </FormControl>
    </div>
  );
}

export default Registration;
