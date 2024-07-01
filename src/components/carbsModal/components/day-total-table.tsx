import React, { useEffect, useState } from "react";
import currency from "currency.js";
import { FoodLogQuery } from "hexis/generated/graphql";

type Props = {
  data: FoodLogQuery[];
};

export default function DayTotalTable({ data }: Props) {
  const [fatTracked, setFatTracked] = useState(0);
  const [caloriesTracked, setCaloriesTracked] = useState(0);
  const [proteinTracked, setProteinTracked] = useState(0);
  const [carbsTracked, setCarbsTracked] = useState(0);

  useEffect(() => {
    let kcals = 0;
    let carbs = 0;
    let protein = 0;
    let fats = 0;
    if (data) {
      data
        .map(log => log?.foodLog)
        .forEach(foodLog => {
          const foodObjects = foodLog?.foodObjects;
          const portions = foodLog?.portions;
          const quantities = foodLog?.quantities;

          foodObjects &&
            foodObjects.forEach((foodObject, index) => {
              const foodEnergy = foodObject?.nutrients.find(i => i?.slug == "Energy");
              const foodMacros = foodObject?.nutrients.find(i => i?.slug == "Macronutrients");

              const foodKcalsPer100g = foodEnergy?.nutrients?.find(value => value?.slug === "energyKcal");

              const foodCarbsPer100g = foodMacros?.nutrients?.find(value => value?.slug == "carbohydrate");

              const foodProteinsPer100g = foodMacros?.nutrients?.find(value => value?.slug == "protein");

              const foodFatsPer100g = foodMacros?.nutrients?.find(value => value?.slug == "fat");

              const foodKcals = currency(foodKcalsPer100g?.value || "")
                .multiply(currency(portions[index]?.value || ""))
                .multiply(currency(quantities[index] || ""))
                .divide(100);

              const foodCarbs = currency(foodCarbsPer100g?.value || "")
                .multiply(currency(portions[index]?.value || ""))
                .multiply(currency(quantities[index] || ""))
                .divide(100);
              const foodProteins = currency(foodProteinsPer100g?.value || "")
                .multiply(currency(portions[index]?.value || ""))
                .multiply(currency(quantities[index] || ""))
                .divide(100);
              const foodFats = currency(foodFatsPer100g?.value || "")
                .multiply(currency(portions[index]?.value || ""))
                .multiply(currency(quantities[index] || ""))
                .divide(100);

              kcals += foodKcals.value;
              carbs += foodCarbs.value;
              protein += foodProteins.value;
              fats += foodFats.value;
            });
        });
      setCarbsTracked(carbs);
      setProteinTracked(protein);
      setCaloriesTracked(kcals);
      setFatTracked(fats);
    }
  }, [data]);

  return (
    <div className={`overflow-x-auto w-full rounded-md border border-activeblue-100`}>
      <table className="table border-separate border-spacing-0 table-auto w-full">
        {/* head */}
        <thead className="text-white font-semibold text-base  bg-[#30314c]">
          <tr>
            <th className="w-[50%]">Day Totals</th>
            <th className="w-[13.3%]">Calories</th>
            <th className="w-[13.3%]">Carbs</th>
            <th className="w-[13.3%]">Protein</th>
            <th className="w-[13.3%]">Fat</th>
          </tr>
        </thead>
        {/* body */}
        <tbody className="text-white font-normal text-base">
          <tr>
            <td></td>
            <td>{`${Math.round(caloriesTracked)} kcal`}</td>
            <td>{`${Math.round(carbsTracked)} g`}</td>
            <td>{`${Math.round(proteinTracked)} g`}</td>
            <td>{`${Math.round(fatTracked)} g`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
