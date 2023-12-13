import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  Card,
  CardContent,
  Typography,
  Table,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Grid,
  Avatar,
} from "@mui/material";
import ReceiptLongSharpIcon from "@mui/icons-material/ReceiptLongSharp";

const ClientOrderHistory: React.FC = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const purchases = useSelector(
    (state: RootState) => state.purchaseList.purchases
  );

  const userPurchases = user
    ? purchases.filter(
        (purchase) =>
          purchase.provider &&
          purchase.provider.company.name === user.company?.name
      )
    : [];

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding="20px"
      justifyContent="space-between"
      marginTop="30px"
    >
      <Card
        sx={{
          backgroundColor: "#242424",
          borderRadius: "15px",
          color: "white",
          maxWidth: 490,
          padding: "20px",
          marginBottom: "50px",
          textAlign: "center",
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <ReceiptLongSharpIcon style={{ marginBottom: "15px" }} />
          </Grid>
          <Grid item>
            <Typography
              variant="h5"
              style={{
                marginBottom: "20px",
                fontFamily: "Quicksand, sans-serif",
                fontWeight: "bold",
              }}
            >
              LISTA DE PEDIDOS
            </Typography>
          </Grid>
        </Grid>
      </Card>

      {userPurchases.length === 0 ? (
        <Typography
          variant="h6"
          style={{
            fontFamily: "Quicksand, sans-serif",
            fontWeight: "bold",
            color: "#242424",
            textAlign: "center",
          }}
        >
          Todavía no hay pedidos realizados.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {userPurchases.map((purchase, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                key={`card-${index}`}
                sx={{
                  backgroundColor: "#242424",
                  borderRadius: "15px",
                  color: "white",
                  maxWidth: 480,
                  width: "100%",
                  margin: "0 auto",
                  padding: "10px",
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                <CardContent>
                  <Card
                    sx={{
                      backgroundColor: "#EC299F",
                      margin: "10px auto",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
                      marginTop: "2px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      marginBottom="10px"
                      marginTop="10px"
                    >
                      {purchase.client && purchase.client.photo && (
                        <Avatar
                          alt={purchase.client.name}
                          src={purchase.client.photo}
                        />
                      )}
                    </Box>
                    <Typography
                      variant="h6"
                      style={{
                        fontFamily: "Quicksand, sans-serif",
                        fontWeight: "bold",
                        marginTop: "-5px",
                      }}
                    >
                      Pedido para {purchase.client?.name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      style={{
                        fontFamily: "Quicksand, sans-serif",
                        fontWeight: "bold",
                        marginBottom: "10px",
                      }}
                    >
                      {new Date(purchase.date)
                        .toLocaleString("es-ES", {
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })
                        .split(",")
                        .join("")}
                    </Typography>
                  </Card>

                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <Typography
                              variant="h6"
                              sx={{ color: "#242424", textAlign: "center" }}
                              style={{
                                fontFamily: "Quicksand, sans-serif",
                                fontWeight: "bold",
                              }}
                            >
                              Imagen
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="h6"
                              sx={{ color: "#242424", textAlign: "center" }}
                              style={{
                                fontFamily: "Quicksand, sans-serif",
                                fontWeight: "bold",
                              }}
                            >
                              Nombre
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="h6"
                              sx={{ color: "#242424", textAlign: "center" }}
                              style={{
                                fontFamily: "Quicksand, sans-serif",
                                fontWeight: "bold",
                              }}
                            >
                              Cantidad
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {purchase.cocktails.map((cocktail) => (
                          <TableRow key={cocktail.cocktail.name}>
                            <TableCell style={{ textAlign: "center" }}>
                              <img
                                src={cocktail.cocktail.image}
                                alt={cocktail.cocktail.name}
                                style={{ width: "50px", height: "50px" }}
                              />
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              {cocktail.cocktail.name}
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              {cocktail.quantity}
                            </TableCell>
                          </TableRow>
                        ))}

                        {purchase.beers.map((beer) => (
                          <TableRow key={beer.beer.name}>
                            <TableCell style={{ textAlign: "center" }}>
                              <img
                                src={beer.beer.image}
                                alt={beer.beer.name}
                                style={{ height: "50px" }}
                              />
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              {beer.beer.name}
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              {beer.quantity}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Card
                    sx={{
                      backgroundColor: "#EC299F",
                      margin: "10px auto",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
                      marginTop: "10px",
                      marginBottom: "-5px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      style={{
                        fontFamily: "Quicksand, sans-serif",
                        fontWeight: "bold",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      Total de compra: ${purchase.totalPurchase}
                    </Typography>
                  </Card>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ClientOrderHistory;
