import { Card, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import proveedorbanner from "/images/proveedorbanner.png";

const ProviderWelcome = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding="20px"
      minHeight="80vh"
      justifyContent="space-between"
      marginTop="50px"
    >
      <Grid container item xs={12}>
        <Card
          sx={{
            backgroundColor: "#242424",
            width: 1200,
            margin: "10px auto",
            borderRadius: "15px",
            color: "white",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              backgroundColor: "#01FF72",
              color: "#242424",
              padding: "10px",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
              textAlign: "center",
            }}
            style={{
              textAlign: "center",
              fontFamily: "Quicksand, sans-serif",
              fontWeight: "bold",
            }}
          >
            Bienvenido de Nuevo
          </Typography>
          <Divider />
          <Typography
            variant="body1"
            style={{
              marginTop: "10px",
              marginBottom: "20px",
              textAlign: "center",
              fontSize: "24px",
            }}
          >
            Nos alegra poder ofrecerte el servicio más innovador de Delivery de
            Coctelería y Cervecería.
            <br />
            Puedes publicar tu TIPO DE SERVICIO, con la cartilla detallada del
            mismo.
            <br />
            Recuerda que el servicio es GRATUITO.
          </Typography>
        </Card>
      </Grid>

      <Grid container item xs={12}>
        <Card
          sx={{
            backgroundColor: "#242424",
            width: 1200,
            margin: "10px auto",
            borderRadius: "15px",
            color: "white",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              backgroundColor: "#01FF72",
              color: "#242424",
              padding: "10px",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
              textAlign: "center",
            }}
            style={{
              textAlign: "center",
              fontFamily: "Quicksand, sans-serif",
              fontWeight: "bold",
            }}
          >
            Aquí Podrás:
          </Typography>
          <Divider />
          <Typography
            variant="body1"
            style={{
              marginTop: "10px",
              marginBottom: "20px",
              textAlign: "center",
              fontSize: "24px",
            }}
          >
            Contactar con tus clientes de forma directa y ordenada.
            <br />
            Mostrar detalles de tus distintos Cócteles y variedades de Cervezas.
            <br />
            Coordinar la entrega a través del calendario Interactivo.
          </Typography>
        </Card>
      </Grid>

      <img
        src={proveedorbanner}
        alt="Cliente Banner"
        style={{ maxWidth: "100%", marginTop: "20px" }}
      />
    </Box>
  );
};

export default ProviderWelcome;
