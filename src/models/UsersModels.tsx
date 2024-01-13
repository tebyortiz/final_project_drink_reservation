interface Provider {
  company: {
    name: string;
    logo: string;
    phone: string;
    email: string;
  };
  service: {
    type: "Coctelería" | "Cervecería" | "Ambos";
    cocktails: Cocktail[];
    beers: Beer[];
    areas: Area[];
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

export type { Provider };

interface Client {
  username?: string;
  name: string;
  phone: string;
  email: string;
  photo: string;
  address: string;
  login: {
    username: string;
    password: string;
  };
  markerPosition: MarkerPosition;
}

export type { Client };

interface UserState {
  user: {
    username: string;
    userType: string;

    name: string;
    phone: string;
    email: string;
    photo: string;

    address?: string;

    company?: {
      name: string;
      logo: string;
      phone: string;
      email: string;
    };
    service?: {
      type: "Coctelería" | "Cervecería" | "Ambos";
      cocktails?: Cocktail[];
      beers?: Beer[];
      areas?: Area[];
    };
    responsibleCompany?: {
      name: string;
      phone: string;
      email: string;
      photo: string;
    };
  } | null;
}

export type { UserState };

export type Cocktail = {
  name: string;
  price: number;
  stock: number;
  image: string;
  ingredients: string[];
};

export type Beer = {
  name: string;
  price: number;
  stock: number;
  image: string;
  abv: string;
  ibu: string;
  ingredients: {
    malt: string[];
    hops: string[];
    yeast: string[];
  };
};

export type Area = {
  name: string;
  lat: string;
  lng: string;
  radius: number;
};

export type MarkerPosition = {
  lat: number;
  lng: number;
};

interface Purchase {
  provider: Provider | null;
  cocktails: {
    cocktail: Cocktail;
    quantity: number;
  }[];
  beers: {
    beer: Beer;
    quantity: number;
  }[];
  client: Client | null;
  totalPurchase: number;
  date: string;
}

export type { Purchase };

interface PurchaseListState {
  currentPurchaseProvider: Provider | null;
  currentPurchase: Purchase;
  purchases: Purchase[];
}

type SetProviderPayload = {
  provider: Provider;
};

export type { PurchaseListState, SetProviderPayload };
