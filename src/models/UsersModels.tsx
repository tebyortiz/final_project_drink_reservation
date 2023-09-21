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

interface User {
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

export type { User };
