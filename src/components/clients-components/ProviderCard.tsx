import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Avatar,
} from "@mui/material";

import { Provider } from "../../models/UsersModels";

interface ProviderCardProps {
  provider: Provider;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  if (!provider || !provider.company) {
    return null;
  }
  return (
    <Grid container spacing={2} marginTop="20px">
      <Grid container item xs={12}>
        <Card
          sx={{
            backgroundColor: "#242424",
            width: 500,
            margin: "10px auto",
            borderRadius: "15px",
            color: "white",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
            display: "flex",
            height: "140px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CardContent
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              gap: "0px",
            }}
          >
            <Box>
              <Typography
                variant="body1"
                sx={{
                  color: "white",
                  fontFamily: "Quicksand, sans-serif",
                  fontWeight: "bold",
                  marginBottom: "0px",
                  alignContent: "center",
                }}
              >
                Pedido para:
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="h4"
                sx={{
                  color: "#01FF72",
                  fontFamily: "Quicksand, sans-serif",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                {provider.company.name}
              </Typography>
            </Box>

            <Avatar
              alt={provider.company.name}
              src={provider.company.logo}
              sx={{
                width: 100,
                height: 100,
                marginTop: "8px",
                boxShadow: "0px 0px 10px rgba(1, 255, 114, 0.9)",
                borderRadius: "50%",
                marginLeft: "8px",
              }}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProviderCard;
