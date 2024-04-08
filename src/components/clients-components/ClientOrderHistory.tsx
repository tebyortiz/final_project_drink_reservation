import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ReceiptLongSharpIcon from "@mui/icons-material/ReceiptLongSharp";
import "tailwindcss/tailwind.css";

const ClientOrderHistory: React.FC = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const purchases = useSelector(
    (state: RootState) => state.purchaseList.purchases
  );

  const userPurchases = user
    ? purchases.filter(
        (purchase) =>
          purchase.client && purchase.client.username === user.username
      )
    : [];

  return (
    <div className="flex flex-col items-center p-4 space-y-8 mt-16">
      <div className="bg-[#242424] rounded-lg text-white max-w-screen-sm p-4 mb-8 text-center">
        <div className="flex items-center space-x-2">
          <ReceiptLongSharpIcon className="text-gray-300" />
          <h1
            className="text-2xl font-semibold"
            style={{ fontFamily: "Quicksand, sans-serif", fontWeight: "bold" }}
          >
            MIS PEDIDOS
          </h1>
        </div>
      </div>

      {userPurchases.length === 0 ? (
        <p
          className="text-lg font-semibold text-gray-800 text-center"
          style={{ fontFamily: "Quicksand, sans-serif", fontWeight: "bold" }}
        >
          Todavía no tienes pedidos realizados.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userPurchases.map((purchase, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border border-gray-300 border-2 p-4 mx-auto mb-8 transition-transform transform hover:scale-105"
              style={{ height: "fit-content", minWidth: "400px" }}
            >
              <div className="flex items-center space-x-4 mb-6">
                {purchase.provider && purchase.provider.company.logo && (
                  <div className="relative w-16 h-16">
                    <img
                      src={purchase.provider.company.logo}
                      alt={purchase.provider.company.name}
                      className="absolute inset-0 w-full h-full rounded-full object-cover shadow-md"
                      style={{
                        boxShadow: "0px 0px 10px rgba(1, 255, 114, 0.9)",
                      }}
                    />
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-semibold">
                    Pedido realizado a {purchase.provider?.company.name}
                  </h2>
                  <p className="text-sm font-semibold text-center">
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
                  </p>
                </div>
              </div>

              <hr className="border-b border-gray-300 my-6 w-full" />

              <table className="w-full mb-6 bg-gray-100">
                <thead>
                  <tr>
                    <th className="text-lg font-semibold text-gray-800 text-center mb-2">
                      Imagen
                    </th>
                    <th className="text-lg font-semibold text-gray-800 text-center mb-2">
                      Nombre
                    </th>
                    <th className="text-lg font-semibold text-gray-800 text-center mb-2">
                      Cantidad
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {purchase.cocktails.map((cocktail) => (
                    <tr key={cocktail.cocktail.name} className="text-center">
                      <td>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <img
                            src={cocktail.cocktail.image}
                            alt={cocktail.cocktail.name}
                            className="w-12 h-12"
                          />
                        </div>
                      </td>
                      <td>{cocktail.cocktail.name}</td>
                      <td>{cocktail.quantity}</td>
                    </tr>
                  ))}
                  {purchase.beers.map((beer) => (
                    <tr key={beer.beer.name} className="text-center">
                      <td>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <img
                            src={beer.beer.image}
                            alt={beer.beer.name}
                            className="w-12 h-12"
                          />
                        </div>
                      </td>
                      <td>{beer.beer.name}</td>
                      <td>{beer.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="bg-[#01FF72] rounded-lg mt-4 p-4 text-center">
                <p
                  className="text-lg font-semibold text-[#242424]"
                  style={{
                    fontFamily: "Quicksand, sans-serif",
                    fontWeight: "bold",
                  }}
                >
                  Total de compra: ${purchase.totalPurchase}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientOrderHistory;
