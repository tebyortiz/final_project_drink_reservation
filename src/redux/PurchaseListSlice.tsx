import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Cocktail,
  Beer,
  Provider,
  Client,
  Purchase,
} from "../models/UsersModels";

interface PurchaseListState {
  currentPurchaseProvider: Provider | null;
  currentPurchase: Purchase;
  purchases: Purchase[];
}
type SetProviderPayload = {
  provider: Provider;
};

const initialState: PurchaseListState = {
  currentPurchaseProvider: null,
  currentPurchase: {
    provider: null,
    cocktails: [],
    beers: [],
    client: null,
    totalPurchase: 0,
  },
  purchases: [],
};

const purchaseListSlice = createSlice({
  name: "purchaseList",
  initialState,
  reducers: {
    setProvider: (state, action: PayloadAction<SetProviderPayload>) => {
      const { provider } = action.payload;

      if (!state.currentPurchase.provider) {
        state.currentPurchase.provider = provider;
        state.currentPurchaseProvider = provider;
      } else {
        console.error(
          "Intento de cambiar el proveedor después de que se ha establecido."
        );
      }
    },

    addCocktailToCart: (
      state,
      action: PayloadAction<{ cocktail: Cocktail; provider: Provider }>
    ) => {
      const { cocktail, provider } = action.payload;

      if (!state.currentPurchase.provider) {
        state.currentPurchase.provider = provider;
      } else if (
        state.currentPurchase.provider.company.name !== provider.company.name
      ) {
        console.error(
          "Intento de añadir producto de otro proveedor al carrito"
        );
        return;
      }

      const existingCocktail = state.currentPurchase.cocktails.find(
        (item) => item.cocktail.name === cocktail.name
      );

      if (existingCocktail) {
        existingCocktail.quantity += 1;
      } else {
        state.currentPurchase.cocktails.push({
          cocktail,
          quantity: 1,
        });
      }
    },

    addBeerToCart: (
      state,
      action: PayloadAction<{ beer: Beer; provider: Provider }>
    ) => {
      const { beer, provider } = action.payload;

      if (!state.currentPurchase.provider) {
        state.currentPurchase.provider = provider;
      } else if (
        state.currentPurchase.provider.company.name !== provider.company.name
      ) {
        console.error(
          "Intento de añadir producto de otro proveedor al carrito"
        );
        return;
      }

      const existingBeer = state.currentPurchase.beers.find(
        (item) => item.beer.name === beer.name
      );

      if (existingBeer) {
        existingBeer.quantity += 1;
      } else {
        state.currentPurchase.beers.push({
          beer,
          quantity: 1,
        });
      }
    },

    updateCocktailQuantity: (
      state,
      action: PayloadAction<{ cocktail: Cocktail; quantity: number }>
    ) => {
      const { cocktail, quantity } = action.payload;
      const index = state.currentPurchase.cocktails.findIndex(
        (item) =>
          item.cocktail.name === cocktail.name &&
          item.cocktail.image === cocktail.image
      );
      if (index !== -1) {
        state.currentPurchase.cocktails[index].quantity = quantity;

        if (quantity === 0) {
          const name = cocktail.name;
          state.currentPurchase.cocktails =
            state.currentPurchase.cocktails.filter(
              (item) => item.cocktail.name !== name
            );
        }
      }
    },

    updateBeerQuantity: (
      state,
      action: PayloadAction<{ beer: Beer; quantity: number }>
    ) => {
      const { beer, quantity } = action.payload;
      const index = state.currentPurchase.beers.findIndex(
        (item) => item.beer.name === beer.name && item.beer.image === beer.image
      );
      if (index !== -1) {
        state.currentPurchase.beers[index].quantity = quantity;
        if (quantity === 0) {
          const name = beer.name;
          state.currentPurchase.beers = state.currentPurchase.beers.filter(
            (item) => item.beer.name !== name
          );
        }
      }
    },

    removeItem: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;
      state.currentPurchase.cocktails = state.currentPurchase.cocktails.filter(
        (item) => item.cocktail.name !== name
      );
      state.currentPurchase.beers = state.currentPurchase.beers.filter(
        (item) => item.beer.name !== name
      );
    },

    resetProviderIfEmpty: (state) => {
      if (
        state.currentPurchase.cocktails.length === 0 &&
        state.currentPurchase.beers.length === 0
      ) {
        state.currentPurchase.provider = null;
        state.currentPurchaseProvider = null;
      }
    },

    setClient: (state, action: PayloadAction<Client>) => {
      state.currentPurchase.client = action.payload;
    },

    resetPurchase: (state) => {
      state.currentPurchase.provider = null;
      state.currentPurchase.cocktails = [];
      state.currentPurchase.beers = [];
      state.currentPurchase.totalPurchase = 0;
    },

    updateTotalPurchase: (state, action: PayloadAction<number>) => {
      state.currentPurchase.totalPurchase = action.payload;
    },

    completePurchase: (state) => {
      const currentClient = state.currentPurchase.client;
      state.purchases.push(state.currentPurchase);
      state.currentPurchase = {
        provider: null,
        cocktails: [],
        beers: [],
        client: currentClient,
        totalPurchase: 0,
      };
    },
  },
});

export const {
  setProvider,
  addCocktailToCart,
  addBeerToCart,
  updateCocktailQuantity,
  updateBeerQuantity,
  removeItem,
  resetProviderIfEmpty,
  setClient,
  resetPurchase,
  updateTotalPurchase,
  completePurchase,
} = purchaseListSlice.actions;

export default purchaseListSlice.reducer;
