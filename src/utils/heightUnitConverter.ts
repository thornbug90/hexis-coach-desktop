import currency from "currency.js";
import { Height_Unit } from "hexis/generated/graphql";
import { heightUnit as units } from "hexis/constants/user";

export function heightUnitConverter(unit: Height_Unit, height?: number): string {
  if (height) {
    if (unit === Height_Unit.M) return `${height} ${units.CM}`;
    if (unit === Height_Unit.Ft) {
      const totalInches = Math.round(currency(height).divide(2.54).value);
      const inches = totalInches % 12;
      const feet = Math.floor(currency(totalInches).divide(12).value);
      return `${feet} ${units.FT}  ${inches} ${units.in}`;
    }
  }
  return "";
}
