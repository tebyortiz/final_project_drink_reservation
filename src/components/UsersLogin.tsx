import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Drawer,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RootState from "../models/RootStateTypes";
import { useFormik } from "formik";
import * as Yup from "yup";

const UsersLogin = ({
  setLoginSuccess,
  onUserTypeChange,
}: {
  setLoginSuccess: (value: boolean) => void;
  onUserTypeChange: (type: string) => void;
}) => {
  const [redirectTo, setRedirectTo] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const clients = useSelector((state: RootState) => state.clients.clients);
  const providers = useSelector(
    (state: RootState) => state.providers.providers
  );

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("* Campo requerido"),
      password: Yup.string().required("* Campo requerido"),
    }),
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const handleLogin = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const client = clients.find(
      (c) => c.login.username === username && c.login.password === password
    );
    const provider = providers.find(
      (p) => p.login.username === username && p.login.password === password
    );

    if (client || provider) {
      const newUserType = client ? "Cliente" : "Proveedor";
      onUserTypeChange(newUserType);

      let userData: any;

      if (client) {
        userData = {
          username,
          userType: newUserType,
          ...client,
        };
      } else if (provider) {
        userData = {
          username,
          userType: newUserType,
          ...provider,
        };
      }

      localStorage.setItem("user", JSON.stringify(userData));

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

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsDrawerOpen(open);
    };

  const drawerContent = (
    <Box
      sx={{ width: 300, height: "100%" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Card
        sx={{
          marginTop: "50px",
          maxWidth: 280,
          mx: "auto",
          backgroundColor: "#242424",
          borderRadius: "15px",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          textAlign="center"
          sx={{
            color: "#01FF72",
            fontFamily: "Quicksand, sans-serif",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          CLIENTES
        </Typography>
        <Card
          sx={{
            marginTop: "10px",
            maxWidth: 260,
            marginBottom: "10px",
            mx: "auto",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "#242424",
                fontFamily: "Quicksand, sans-serif",
                fontWeight: "bold",
              }}
            >
              Cliente n°1
            </Typography>
            <Typography
              sx={{
                color: "#242424",
                fontFamily: "Quicksand, sans-serif",
                fontWeight: "bold",
              }}
            >
              Username: anapaz1
            </Typography>
            <Typography
              sx={{
                color: "#242424",
                fontFamily: "Quicksand, sans-serif",
                fontWeight: "bold",
              }}
            >
              Contraseña: asdasd
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            marginTop: "10px",
            maxWidth: 260,
            marginBottom: "10px",
            mx: "auto",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "#242424",
                fontFamily: "Quicksand, sans-serif",
                fontWeight: "bold",
              }}
            >
              Cliente n°2
            </Typography>
            <Typography
              sx={{
                color: "#242424",
                fontFamily: "Quicksand, sans-serif",
                fontWeight: "bold",
              }}
            >
              Username: luisgil1
            </Typography>
            <Typography
              sx={{
                color: "#242424",
                fontFamily: "Quicksand, sans-serif",
                fontWeight: "bold",
              }}
            >
              Contraseña: asdasd
            </Typography>
          </CardContent>
        </Card>
      </Card>

      <Card
        sx={{
          marginTop: "50px",
          maxWidth: 280,
          mx: "auto",
          backgroundColor: "#242424",
          borderRadius: "15px",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          textAlign="center"
          sx={{
            color: "#01FF72",
            fontFamily: "Quicksand, sans-serif",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          PROVEEDORES
        </Typography>
        <Card
          sx={{
            marginTop: "10px",
            maxWidth: 260,
            marginBottom: "10px",
            mx: "auto",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "#242424",
                fontFamily: "Quicksand, sans-serif",
                fontWeight: "bold",
              }}
            >
              Proveedor n°1
            </Typography>
            <Typography
              sx={{
                color: "#242424",
                fontFamily: "Quicksand, sans-serif",
                fontWeight: "bold",
              }}
            >
              Username: cervelandia1
            </Typography>
            <Typography
              sx={{
                color: "#242424",
                fontFamily: "Quicksand, sans-serif",
                fontWeight: "bold",
              }}
            >
              Contraseña: asdasd
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            marginTop: "10px",
            maxWidth: 260,
            marginBottom: "10px",
            mx: "auto",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "#242424",
                fontFamily: "Quicksand, sans-serif",
                fontWeight: "bold",
              }}
            >
              Proveedor n°2
            </Typography>
            <Typography
              sx={{
                color: "#242424",
                fontFamily: "Quicksand, sans-serif",
                fontWeight: "bold",
              }}
            >
              Username: coctelandia1
            </Typography>
            <Typography
              sx={{
                color: "#242424",
                fontFamily: "Quicksand, sans-serif",
                fontWeight: "bold",
              }}
            >
              Contraseña: asdasd
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            marginTop: "10px",
            maxWidth: 260,
            marginBottom: "10px",
            mx: "auto",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "#242424",
                fontFamily: "Quicksand, sans-serif",
                fontWeight: "bold",
              }}
            >
              Proveedor n°3
            </Typography>
            <Typography
              sx={{
                color: "#242424",
                fontFamily: "Quicksand, sans-serif",
                fontWeight: "bold",
              }}
            >
              Username: neonbar1
            </Typography>
            <Typography
              sx={{
                color: "#242424",
                fontFamily: "Quicksand, sans-serif",
                fontWeight: "bold",
              }}
            >
              Contraseña: asdasd
            </Typography>
          </CardContent>
        </Card>
      </Card>
    </Box>
  );

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
              marginTop: "10px",
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
            Bienvenidos. <br /> Para acceder a nuestro servicio, primero debes
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
                  marginBottom: "30px",
                }}
              >
                Ingresa tu Username y Contraseña para ingresar
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  type="text"
                  name="username"
                  fullWidth
                  label="Username"
                  variant="standard"
                  style={{ marginBottom: "10px" }}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "40px",
                      color: "#242424",
                      backgroundColor: "white",
                      borderRadius: "5px",
                      marginBottom: "20px",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#01FF72",
                      transform: "none",
                      marginTop: "-10px",
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: "bold",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#01FF72",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#01FF72",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#01FF72",
                      },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #01FF72",
                      borderColor: "#01FF72",
                    },
                  }}
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: "bold",
                      color: "red",
                      marginTop: "-25px",
                      marginBottom: "30px",
                    }}
                  >
                    {formik.errors.username}
                  </div>
                ) : null}

                <TextField
                  type="password"
                  name="password"
                  fullWidth
                  label="Contraseña"
                  variant="standard"
                  style={{ marginBottom: "10px" }}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "40px",
                      color: "#242424",
                      backgroundColor: "white",
                      borderRadius: "5px",
                      marginBottom: "20px",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#01FF72",
                      transform: "none",
                      marginTop: "-10px",
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: "bold",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#01FF72",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#01FF72",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#01FF72",
                      },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #01FF72",
                      borderColor: "#01FF72",
                    },
                  }}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: "bold",
                      color: "red",
                      marginTop: "-25px",
                      marginBottom: "20px",
                    }}
                  >
                    {formik.errors.password}
                  </div>
                ) : null}

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      backgroundColor: "#01FF72",
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "#01FF72",
                      },
                    }}
                  >
                    Ingresar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </Grid>
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

        <Grid item xs={12}>
          <Button
            onClick={toggleDrawer(true)}
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#242424",
              fontFamily: "Nunito, sans-serif",
              fontWeight: "bold",
              marginTop: "10px",
              "&:hover": {
                backgroundColor: "#242424",
                color: "#01FF72",
              },
            }}
          >
            Credenciales Usuarios de Ejemplo
          </Button>
        </Grid>

        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
        >
          {drawerContent}
        </Drawer>
      </Box>
    </Grid>
  );
};

export default UsersLogin;
