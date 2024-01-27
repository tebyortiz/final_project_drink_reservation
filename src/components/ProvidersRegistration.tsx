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
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { addProvider } from "../redux/ProvidersSlice";
import { Provider } from "../models/UsersModels";
import ClientsRegistration from "./ClientsRegistration";
import { useFormik } from "formik";
import * as Yup from "yup";

const textFieldStyles = {
  "& .MuiInputBase-root": {
    height: "35px",
    color: "#242424",
    backgroundColor: "white",
    borderRadius: "5px",
    marginBottom: "20px",
  },
  "& .MuiInputLabel-root": {
    color: "#01FF72",
    transform: "none",
    marginTop: "-5px",
    fontFamily: "Nunito, sans-serif",
    fontWeight: "bold",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#01FF72",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#01FF72",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#01FF72",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #01FF72",
    borderColor: "#01FF72",
  },
};

const ProvidersRegistration = () => {
  const [isProviderDialogOpen, setIsProviderDialogOpen] = useState(false);
  const [isWelcomeDialogOpen, setIsWelcomeDialogOpen] = useState(false);
  const [welcomeDialogCompanyName, setWelcomeDialogCompanyName] = useState("");
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema: Yup.object({
      company: Yup.object({
        name: Yup.string().required("Nombre de la empresa es requerido"),
        logo: Yup.string().required("Logo de la empresa es requerido"),
        phone: Yup.number()
          .typeError("* Solo se permiten números")
          .required("* Campo requerido"),
        email: Yup.string()
          .email("Ingrese un correo electrónico válido")
          .required("Email de la empresa es requerido"),
      }),
      service: Yup.object({
        type: Yup.string().required("Seleccione un tipo de servicio"),
      }),
      responsibleCompany: Yup.object({
        name: Yup.string().required("Nombre del responsable es requerido"),
        phone: Yup.number()
          .typeError("* Solo se permiten números")
          .required("* Campo requerido"),
        email: Yup.string()
          .email("Ingrese un correo electrónico válido")
          .required("Email del responsable es requerido"),
        photo: Yup.string().required("Foto del responsable es requerida"),
      }),
      login: Yup.object({
        username: Yup.string().required("Nombre de usuario es requerido"),
        password: Yup.string()
          .min(8, "La contraseña debe tener al menos 8 caracteres")
          .required("Contraseña es requerida"),
      }),
    }),
    onSubmit: async (values) => {
      console.log("Enviando formulario...");

      dispatch(addProvider(values as Provider));

      handleProviderDialogClose();

      setIsWelcomeDialogOpen(true);
      setWelcomeDialogCompanyName(values.company.name);
      formik.resetForm();
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
                {/* Campos del formulario con Formik */}
                <TextField
                  fullWidth
                  label="Nombre de la Empresa"
                  style={{ marginBottom: "10px" }}
                  sx={textFieldStyles}
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  value={formik.values.company.name}
                  onChange={formik.handleChange}
                  name="company.name"
                  error={
                    formik.touched.company?.name &&
                    Boolean(formik.errors.company?.name)
                  }
                  helperText={
                    formik.touched.company?.name && formik.errors.company?.name
                  }
                />

                <TextField
                  fullWidth
                  label="Logo de la Empresa"
                  style={{ marginBottom: "10px" }}
                  sx={textFieldStyles}
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  value={formik.values.company.logo}
                  onChange={formik.handleChange}
                  name="company.logo"
                  error={
                    formik.touched.company?.logo &&
                    Boolean(formik.errors.company?.logo)
                  }
                  helperText={
                    formik.touched.company?.logo && formik.errors.company?.logo
                  }
                />

                <TextField
                  fullWidth
                  label="Teléfono de la Empresa"
                  style={{ marginBottom: "10px" }}
                  sx={textFieldStyles}
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  value={formik.values.company.phone}
                  onChange={formik.handleChange}
                  name="company.phone"
                  error={
                    formik.touched.company?.phone &&
                    Boolean(formik.errors.company?.phone)
                  }
                  helperText={
                    formik.touched.company?.phone &&
                    formik.errors.company?.phone
                  }
                />

                <TextField
                  fullWidth
                  label="Email de la Empresa"
                  style={{ marginBottom: "10px" }}
                  sx={textFieldStyles}
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  value={formik.values.company.email}
                  onChange={formik.handleChange}
                  name="company.email"
                  error={
                    formik.touched.company?.email &&
                    Boolean(formik.errors.company?.email)
                  }
                  helperText={
                    formik.touched.company?.email &&
                    formik.errors.company?.email
                  }
                />

                <FormControl
                  fullWidth
                  style={{ marginBottom: "10px", marginTop: "10px" }}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "50px",
                      color: "#242424",
                      backgroundColor: "white",
                    },
                    "& label": {
                      color: "#242424",
                    },
                    "& label.Mui-focused": {
                      color: "#242424",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#01FF72",
                    },
                  }}
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
                    label="Servicio de"
                    value={formik.values.service.type}
                    onChange={formik.handleChange}
                    name="service.type"
                    error={
                      formik.touched.service?.type &&
                      Boolean(formik.errors.service?.type)
                    }
                  >
                    <MenuItem value="Coctelería">Coctelería</MenuItem>
                    <MenuItem value="Cervecería">Cervecería</MenuItem>
                    <MenuItem value="Ambos">Ambos</MenuItem>
                  </Select>
                  <FormHelperText>
                    {formik.touched.service?.type &&
                      formik.errors.service?.type}
                  </FormHelperText>
                </FormControl>

                <TextField
                  fullWidth
                  label="Responsable de la Empresa"
                  style={{ marginBottom: "10px" }}
                  sx={textFieldStyles}
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  value={formik.values.responsibleCompany.name}
                  onChange={formik.handleChange}
                  name="responsibleCompany.name"
                  error={
                    formik.touched.responsibleCompany?.name &&
                    Boolean(formik.errors.responsibleCompany?.name)
                  }
                  helperText={
                    formik.touched.responsibleCompany?.name &&
                    formik.errors.responsibleCompany?.name
                  }
                />

                <TextField
                  fullWidth
                  label="Teléfono del Responsable"
                  style={{ marginBottom: "10px" }}
                  sx={textFieldStyles}
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  type="number"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  value={formik.values.responsibleCompany.phone}
                  onChange={formik.handleChange}
                  name="responsibleCompany.phone"
                  error={
                    formik.touched.responsibleCompany?.phone &&
                    Boolean(formik.errors.responsibleCompany?.phone)
                  }
                  helperText={
                    formik.touched.responsibleCompany?.phone &&
                    formik.errors.responsibleCompany?.phone
                  }
                />

                <TextField
                  fullWidth
                  label="Email del Responsable"
                  style={{ marginBottom: "10px" }}
                  sx={textFieldStyles}
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  value={formik.values.responsibleCompany.email}
                  onChange={formik.handleChange}
                  name="responsibleCompany.email"
                  error={
                    formik.touched.responsibleCompany?.email &&
                    Boolean(formik.errors.responsibleCompany?.email)
                  }
                  helperText={
                    formik.touched.responsibleCompany?.email &&
                    formik.errors.responsibleCompany?.email
                  }
                />

                <TextField
                  fullWidth
                  label="Foto del Responsable"
                  style={{ marginBottom: "10px" }}
                  sx={textFieldStyles}
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  value={formik.values.responsibleCompany.photo}
                  onChange={formik.handleChange}
                  name="responsibleCompany.photo"
                  error={
                    formik.touched.responsibleCompany?.photo &&
                    Boolean(formik.errors.responsibleCompany?.photo)
                  }
                  helperText={
                    formik.touched.responsibleCompany?.photo &&
                    formik.errors.responsibleCompany?.photo
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
                      sx={textFieldStyles}
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                      value={formik.values.login.username}
                      onChange={formik.handleChange}
                      name="login.username"
                      error={
                        formik.touched.login?.username &&
                        Boolean(formik.errors.login?.username)
                      }
                      helperText={
                        formik.touched.login?.username &&
                        formik.errors.login?.username
                      }
                    />

                    <TextField
                      fullWidth
                      label="Contraseña"
                      type="password"
                      style={{ marginBottom: "10px" }}
                      sx={textFieldStyles}
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                      value={formik.values.login.password}
                      onChange={formik.handleChange}
                      name="login.password"
                      error={
                        formik.touched.login?.password &&
                        Boolean(formik.errors.login?.password)
                      }
                      helperText={
                        formik.touched.login?.password &&
                        formik.errors.login?.password
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
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.preventDefault();
                          formik.handleSubmit();
                        }}
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
