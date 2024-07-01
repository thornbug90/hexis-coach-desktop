import currency from "currency.js";
import { Weight_Unit } from "hexis/generated/graphql";
import { weightUnit as units } from "hexis/constants/user";

export function weightUnitConverter(unit: Weight_Unit, weight?: number): string {
  if (weight) {
    if (unit === Weight_Unit.Kg) return `${weight} ${units.KG}`;
    if (unit === Weight_Unit.Lbs) {
      const lbs = currency(weight, { precision: 0 }).multiply(2.205).value;
      return `${lbs} ${units.LBS}`;
    }
  }
  return "";
}
