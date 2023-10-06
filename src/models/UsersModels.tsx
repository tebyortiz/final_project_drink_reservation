interface Provider {
  company: {
    name: string;
    logo: string;
    phone: string;
    email: string;
  };
  service: {
    type: string;
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
      type: string;
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
