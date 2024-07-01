import { NUTRITICS } from "hexis/constants/carbCoding";

export interface IFoodLog {
  foodObjects: INutritics[];
  quantities: number[];
  portions: IPortion[];
}

export interface INutritics {
  id: string;
  type: NUTRITICS;
  name: string;
  description: string;
  quantity: IPortion;
  nutrients: INutrients[];
  portions: IPortion[];
  tags: ITag[];
  liquid: boolean;
}

export interface IPortion {
  unit: string;
  value: number;
  name: string;
}

export interface INutrients {
  name: string;
  slug: string;
  value: number;
  unit: string;
  nutrients?: INutrients[];
}

export interface ITag {
  name: string;
  checked: boolean;
}
