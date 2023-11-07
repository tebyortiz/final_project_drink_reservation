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
};

export type Beer = {
  name: string;
  price: number;
  stock: number;
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
