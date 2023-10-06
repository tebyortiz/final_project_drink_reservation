import { Provider as Provider, Client as Client } from "./UsersModels";
import { UserState } from "./UsersModels";

interface RootState {
  user: UserState;
  clients: { clients: Client[] };
  providers: { providers: Provider[] };
}

export default RootState;
