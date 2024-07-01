import { GlobalState } from "hexis/state/global/slice";
import { UserState } from "hexis/state/user/slice";
import { CarbCodingState } from "hexis/state/carb-coding/slice";
import { IClientsState } from "./clients/slice";
import { IClientNotesState } from "./client-notes/slice";
import { IGroupState } from "./groups/slice";

export interface IState {
  global: GlobalState;
  user: UserState;
  carbCoding: CarbCodingState;
  clients: IClientsState;
  clientNotes: IClientNotesState;
  groups: IGroupState;
}
