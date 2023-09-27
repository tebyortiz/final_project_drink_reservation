import { Provider as Provider, Client as Client } from "./UsersModels";

interface RootState {
  clients: { clients: Client[] };
  providers: { providers: Provider[] };
}


export default RootState;