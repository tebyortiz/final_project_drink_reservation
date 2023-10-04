import { Card, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import clienteBanner from "../../../public/images/clientebanner.png";

const ClientWelcome = () => {
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
            backgroundColor: "#EC299F",
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
          Puedes hacer tus Pedidos y decidir qué días y horarios puedes
          coordinar la entrega.
          <br />
          Recuerda que el servicio es GRATUITO.
        </Typography>
      </Card>

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
            backgroundColor: "#EC299F",
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
          Conocer Proveedores de Bebidas según el tipo de Servicio.
          <br />
          Conocer la cartilla de Productos y además la Info descriptiva de los
          mismos.
          <br />
          Coordinar la entrega a través del calendario Interactivo.
        </Typography>
      </Card>

      <img
        src={clienteBanner}
        alt="Cliente Banner"
        style={{ maxWidth: "100%", marginTop: "20px" }}
      />
    </Box>
  );
};

export default ClientWelcome;
