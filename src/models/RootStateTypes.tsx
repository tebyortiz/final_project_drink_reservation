import { Provider as Provider, Client as Client } from "./UsersModels";
import { UserState } from "./UsersModels";
import { PurchaseListState } from "./UsersModels";

export interface RootState {
  user: UserState;
  clients: { clients: Client[] };
  providers: { providers: Provider[] };
  purchaseList: PurchaseListState;
}

export default RootState;