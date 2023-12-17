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
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Client } from "../models/UsersModels";

const textFieldStyles = {
  "& .MuiInputBase-root": {
    height: "35px",
    color: "#242424",
    backgroundColor: "white",
    borderRadius: "5px",
    marginBottom: "20px",
  },
  "& .MuiInputLabel-root": {
    color: "#EC299F",
    transform: "none",
    marginTop: "-5px",
    fontFamily: "Nunito, sans-serif",
    fontWeight: "bold",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#EC299F",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#EC299F",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#EC299F",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #EC299F",
    borderColor: "#EC299F",
  },
};

interface UsersRegistrationProps {
  isUserDialogOpen: boolean;
  setIsUserDialogOpen: (isOpen: boolean) => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required("* Campo requerido"),
  phone: Yup.number()
    .typeError("* Solo se permiten números")
    .required("* Campo requerido"),
  email: Yup.string()
    .email("* Correo electrónico no válido")
    .required("* Campo requerido"),
  photo: Yup.string().required("* Campo requerido"),
  address: Yup.string().required("* Campo requerido"),
  login: Yup.object({
    username: Yup.string().required("* Campo requerido"),
    password: Yup.string()
      .min(8, "* La contraseña debe tener al menos 8 caracteres")
      .required("* Campo requerido"),
  }),
});

const ClientsRegistration = ({
  isUserDialogOpen,
  setIsUserDialogOpen,
}: UsersRegistrationProps) => {
  const [isWelcomeDialogOpen, setIsWelcomeDialogOpen] = useState(false);
  const [welcomeDialogUserName, setWelcomeDialogUserName] = useState("");

  const dispatch = useDispatch();

  const handleUserDialogClose = () => {
    setIsUserDialogOpen(false);
  };

  const handleWelcomeDialogClose = () => {
    setIsWelcomeDialogOpen(false);
  };

  const handleUserRegistration = (values: Client) => {
    dispatch(addClient(values));

    handleUserDialogClose();

    setWelcomeDialogUserName(values.name);
    setIsWelcomeDialogOpen(true);
  };

  return (
    <div>
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

            <Formik
              initialValues={{
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
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => handleUserRegistration(values)}
            >
              <Form>
                <div style={{ padding: "20px" }}>
                  <Field
                    type="text"
                    name="name"
                    label="Nombre del Usuario"
                    fullWidth
                    as={TextField}
                    variant="standard"
                    sx={textFieldStyles}
                    style={{ marginBottom: "10px" }}
                  />
                  <div
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: "bold",
                      color: "red",
                      marginTop: "-25px",
                      marginBottom: "20px",
                    }}
                  >
                    <ErrorMessage name="name" component="div" />
                  </div>

                  <Field
                    type="text"
                    name="phone"
                    label="Teléfono del Usuario"
                    fullWidth
                    as={TextField}
                    variant="standard"
                    sx={textFieldStyles}
                    style={{ marginBottom: "10px" }}
                  />
                  <div
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: "bold",
                      color: "red",
                      marginTop: "-25px",
                      marginBottom: "20px",
                    }}
                  >
                    <ErrorMessage name="phone" component="div" />
                  </div>

                  <Field
                    type="text"
                    name="email"
                    label="Email del Usuario"
                    fullWidth
                    as={TextField}
                    variant="standard"
                    sx={textFieldStyles}
                    style={{ marginBottom: "10px" }}
                  />
                  <div
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: "bold",
                      color: "red",
                      marginTop: "-25px",
                      marginBottom: "20px",
                    }}
                  >
                    <ErrorMessage name="email" component="div" />
                  </div>

                  <Field
                    type="text"
                    name="photo"
                    label="Foto del Usuario"
                    fullWidth
                    as={TextField}
                    variant="standard"
                    sx={textFieldStyles}
                    style={{ marginBottom: "10px" }}
                  />
                  <div
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: "bold",
                      color: "red",
                      marginTop: "-25px",
                      marginBottom: "20px",
                    }}
                  >
                    <ErrorMessage name="photo" component="div" />
                  </div>

                  <Field
                    type="text"
                    name="address"
                    label="Dirección del Usuario"
                    fullWidth
                    as={TextField}
                    variant="standard"
                    sx={textFieldStyles}
                    style={{ marginBottom: "10px" }}
                  />
                  <div
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: "bold",
                      color: "red",
                      marginTop: "-25px",
                      marginBottom: "20px",
                    }}
                  >
                    <ErrorMessage name="address" component="div" />
                  </div>

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

                      <Field
                        type="text"
                        name="login.username"
                        label="Username"
                        fullWidth
                        as={TextField}
                        variant="standard"
                        sx={textFieldStyles}
                      />
                      <div
                        style={{
                          fontFamily: "Nunito, sans-serif",
                          fontWeight: "bold",
                          color: "red",
                          marginTop: "-10px",
                          marginBottom: "10px",
                        }}
                      >
                        <ErrorMessage name="login.username" component="div" />
                      </div>

                      <Field
                        type="password"
                        name="login.password"
                        label="Contraseña"
                        fullWidth
                        as={TextField}
                        variant="standard"
                        sx={textFieldStyles}
                      />
                      <div
                        style={{
                          fontFamily: "Nunito, sans-serif",
                          fontWeight: "bold",
                          color: "red",
                          marginTop: "-5px",
                          marginBottom: "10px",
                        }}
                      >
                        <ErrorMessage name="login.password" component="div" />
                      </div>

                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button
                          type="submit"
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
                        >
                          Registrarse
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Form>
            </Formik>
          </Dialog>
        </FormControl>
      </Grid>

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
