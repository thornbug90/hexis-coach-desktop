import { ENTITLEMENTS_ID } from "hexis/constants/user";
import { IUser } from "hexis/state/user/slice";

export function isCoach(user: IUser) {
  const coach = user?.entitlements?.filter(entitlement => entitlement?.id === ENTITLEMENTS_ID.COACH);
  if (coach && coach.length === 0) return false;
  return true;
}
