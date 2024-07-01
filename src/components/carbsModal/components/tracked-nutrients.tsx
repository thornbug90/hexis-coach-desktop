"use client";
import { FoodLogQuery, Nutrient } from "hexis/generated/graphql";
import currency from "currency.js";
import isEmpty from "lodash/isEmpty";

type Props = {
  data: FoodLogQuery[];
};

export default function TrackedNutrients({ data }: Props) {
  const trackedNutrients: { [key: string]: number } = {};
  const trackedPercentageRI: { [key: string]: number } = {};

  data.forEach(log => {
    if (!log) return;
    const foodObjects = log.foodLog?.foodObjects;
    const foodPortions = log.foodLog?.portions;
    const foodQuantities = log.foodLog?.quantities;
    foodObjects.forEach((foodObject, index) => {
      foodObject?.nutrients.forEach(nutrient => {
        if (!nutrient) return;
        if (!nutrient?.nutrients) {
          const trackedNutrientValue = currency(nutrient.value || 0)
            .multiply(foodPortions[index]?.value || 0)
            .multiply(foodQuantities[index] || 0)
            .divide(100).value;
          trackedNutrients[nutrient.slug!] = trackedNutrients[nutrient.slug!]
            ? currency(trackedNutrients[nutrient.slug!]).add(trackedNutrientValue).value
            : trackedNutrientValue;
          const trackedRIValue = currency(nutrient.percentRI || 0)
            .multiply(foodPortions[index]?.value || 0)
            .multiply(foodQuantities[index] || 0)
            .divide(100).value;
          trackedPercentageRI[nutrient.slug!] = trackedPercentageRI[nutrient.slug!]
            ? currency(trackedPercentageRI[nutrient.slug!]).add(trackedRIValue).value
            : trackedRIValue;
        } else if (nutrient?.nutrients) {
          if (nutrient.value !== null) {
            const trackedNutrientValue = currency(nutrient.value || 0)
              .multiply(foodPortions[index]?.value || 0)
              .multiply(foodQuantities[index] || 0)
              .divide(100).value;
            trackedNutrients[nutrient.slug!] = trackedNutrients[nutrient.slug!]
              ? currency(trackedNutrients[nutrient.slug!]).add(trackedNutrientValue).value
              : trackedNutrientValue;
            const trackedRIValue = currency(nutrient.percentRI || 0)
              .multiply(foodPortions[index]?.value || 0)
              .multiply(foodQuantities[index] || 0)
              .divide(100).value;
            trackedPercentageRI[nutrient.slug!] = trackedPercentageRI[nutrient.slug!]
              ? currency(trackedPercentageRI[nutrient.slug!]).add(trackedRIValue).value
              : trackedRIValue;
          }
          nutrient?.nutrients.forEach(nutrient2 => {
            if (!nutrient2) return;
            if (!nutrient2?.nutrients) {
              const trackedNutrientValue = currency(nutrient2.value || 0)
                .multiply(foodPortions[index]?.value || 0)
                .multiply(foodQuantities[index] || 0)
                .divide(100).value;
              trackedNutrients[nutrient2.slug!] = trackedNutrients[nutrient2.slug!]
                ? currency(trackedNutrients[nutrient2.slug!]).add(trackedNutrientValue).value
                : trackedNutrientValue;
              const trackedRIValue = currency(nutrient2.percentRI || 0)
                .multiply(foodPortions[index]?.value || 0)
                .multiply(foodQuantities[index] || 0)
                .divide(100).value;
              trackedPercentageRI[nutrient2.slug!] = trackedPercentageRI[nutrient2.slug!]
                ? currency(trackedPercentageRI[nutrient2.slug!]).add(trackedRIValue).value
                : trackedRIValue;
            } else if (nutrient2?.nutrients) {
              if (nutrient2.value !== null) {
                const trackedNutrientValue = currency(nutrient2?.value || 0)
                  .multiply(foodPortions[index]?.value || 0)
                  .multiply(foodQuantities[index] || 0)
                  .divide(100).value;
                trackedNutrients[nutrient2.slug!] = trackedNutrients[nutrient2.slug!]
                  ? currency(trackedNutrients[nutrient2.slug!]).add(trackedNutrientValue).value
                  : trackedNutrientValue;
              }
              const trackedRIValue = currency(nutrient2.percentRI || 0)
                .multiply(foodPortions[index]?.value || 0)
                .multiply(foodQuantities[index] || 0)
                .divide(100).value;
              trackedPercentageRI[nutrient2.slug!] = trackedPercentageRI[nutrient2.slug!]
                ? currency(trackedPercentageRI[nutrient2.slug!]).add(trackedRIValue).value
                : trackedRIValue;
              nutrient2?.nutrients.forEach(nutrient3 => {
                if (!nutrient3) return;
                if (nutrient3.value !== null) {
                  const trackedNutrientValue = currency(nutrient3?.value || 0)
                    .multiply(foodPortions[index]?.value || 0)
                    .multiply(foodQuantities[index] || 0)
                    .divide(100).value;
                  trackedNutrients[nutrient3.slug!] = trackedNutrients[nutrient3.slug!]
                    ? currency(trackedNutrients[nutrient3.slug!]).add(trackedNutrientValue).value
                    : trackedNutrientValue;
                  const trackedRIValue = currency(nutrient3.percentRI || 0)
                    .multiply(foodPortions[index]?.value || 0)
                    .multiply(foodQuantities[index] || 0)
                    .divide(100).value;
                  trackedPercentageRI[nutrient3.slug!] = trackedPercentageRI[nutrient3.slug!]
                    ? currency(trackedPercentageRI[nutrient3.slug!]).add(trackedRIValue).value
                    : trackedRIValue;
                }
              });
            }
          });
        }
      });
    });
  });

  const shouldShowRI: (slug: string) => boolean = function (slug) {
    const slugsToShowRI = [
      "fibre",
      "sugars",
      "satfat",
      "monos",
      "poly",
      "n3poly",
      "n6poly",
      "sodium",
      "potassium",
      "chloride",
      "calcium",
      "phosphorus",
      "magnesium",
      "iron",
      "zinc",
      "copper",
      "manganese",
      "selenium",
      "iodine",
      "vita",
      "vitd",
      "vite",
      "vitk",
      "thiamin",
      "riboflavin",
      "niacin",
      "niacineqv",
      "pantothenate",
      "vitb6",
      "folate",
      "vitb12",
      "biotin",
      "vitc",
    ];
    return slugsToShowRI.includes(slug);
  };

  const formatNutrient: (slug: string) => string = function (slug) {
    const slugToNameObject: { [key: string]: string } = {
      energyKcal: "Energy (Kcal)",
      energyKj: "Energy (Kj)",
      carbohydrate: "Carbohydrates",
      protein: "Protein",
      fat: "Fat",
      water: "Water",
      waterDr: "Water from Drinks",
      alcohol: "Alcohol",
      starch: "Starch",
      oligosaccharide: "Oligosaccharide",
      fibre: "Fibre",
      nsp: "NSP",
      sugars: "Sugars",
      glucose: "Glucose",
      galactose: "Galactose",
      fructose: "Fructose",
      sucrose: "Sucrose",
      maltose: "Maltose",
      lactose: "Lactose",
      satfat: "Saturated Fat",
      monos: "Monounsaturated Fat",
      poly: "Polyunsaturated Fat",
      n3poly: "Omega 3",
      n6poly: "Omega 6",
      trans: "Trans Fatty Acids",
      cholesterol: "Cholesterol",
      sodium: "Sodium",
      potassium: "Potassium",
      chloride: "Chloride",
      calcium: "Calcium",
      phosphorus: "Phosphorus",
      magnesium: "Magnesium",
      iron: "Iron",
      zinc: "Zinc",
      copper: "Copper",
      manganese: "Manganese",
      selenium: "Selenium",
      iodine: "Iodine",
      vita: "Vitamin A",
      retinol: "Retinol",
      carotene: "Carotene",
      vitd: "Vitamin D",
      vite: "Vitamin E",
      vitk: "Vitamin K",
      thiamin: "Thiamin",
      riboflavin: "Riboflavin",
      niacin: "Niacin Total",
      niacineqv: "Niacin",
      tryptophan: "Tryptophan",
      pantothenate: "Pantothenic Acid",
      vitb6: "Vitamin B6",
      folate: "Folate",
      vitb12: "Vitamin B12",
      biotin: "Biotin",
      vitc: "Vitamin C",
      gi: "GI (estimated)",
      gl: "GL",
      caffeine: "Caffeine",
      salt: "Salt",
    };
    return slug === "" ? "-" : slugToNameObject[slug];
  };

  const foodLogs = data?.map(items => items?.foodLog).map(item => item);

  const foodObjectsArray =
    foodLogs && foodLogs?.flatMap(item => item && item.foodObjects).map(item => (item?.nutrients ? item.nutrients : []));

  const aggregatedFoodObjects: {
    [key: string]: {
      name: string;
      nutrients: Array<Nutrient | null>;
    };
  } = {};

  foodObjectsArray &&
    foodObjectsArray.forEach(foodObject => {
      foodObject.forEach(i => {
        const name = i?.name!;
        const nutrients = i?.nutrients ? i?.nutrients : [];

        if (aggregatedFoodObjects.hasOwnProperty(name)) {
          nutrients?.forEach(nutrient => {
            aggregatedFoodObjects?.[name]?.nutrients?.find(n => n?.slug === nutrient?.slug)!;
          });
        } else {
          aggregatedFoodObjects[name] = { name, nutrients: nutrients! };
        }
      });
    });

  const aggregatedFoodArray = Object.values(aggregatedFoodObjects);

  const energyMacroCarbsArray = aggregatedFoodArray.filter(
    foodObject => foodObject.name === "Energy" || foodObject.name === "Macronutrients" || foodObject.name === "Carbohydrate",
  );

  const fatsMineralsArray = aggregatedFoodArray.filter(
    foodObject => foodObject.name === "Fat" || foodObject.name === "Minerals & Trace Elements",
  );

  const vitaminsOtherArray = aggregatedFoodArray.filter(foodObject => foodObject.name === "Vitamins" || foodObject.name === "Other");

  return (
    <div className=" border-t border-lightgrey1-700/20 m-6 py-6">
      <p className="text-xl">Tracked Nutrients</p>
      <div className="bg-[#20213C] rounded-md w-full flex justify-between h-auto mt-6 p-6">
        {isEmpty(foodObjectsArray.flat()) ? (
          <div className="w-1/2 px-6 text-lg font-semibold italic">No tracked nutrients</div>
        ) : (
          <>
            <div className="w-1/3 px-6">
              {energyMacroCarbsArray.map((item, index) => (
                <div className="text-sm pb-6" key={index}>
                  <div className="border-b w-2/3 border-white py-2 mb-2">
                    <p className="font-semibold">{item.name}</p>
                  </div>
                  {item.nutrients &&
                    item.nutrients.map((nutrient, index) => (
                      <>
                        <div key={index} className="flex justify-between font-normal tracking-wide">
                          <p>
                            {formatNutrient(nutrient?.slug || "")}{" "}
                            {shouldShowRI(nutrient?.slug!) && (
                              <span style={{ color: "#359CEF" }} className="font-[500]">
                                {Math.round(trackedPercentageRI[nutrient?.slug!])}% RI
                              </span>
                            )}
                          </p>
                          <p>
                            {Math.round(trackedNutrients[nutrient?.slug!])}
                            {nutrient?.unit}
                          </p>
                        </div>
                        {nutrient?.nutrients &&
                          nutrient?.nutrients.map((item, index) => {
                            return (
                              <div className="flex justify-between italic font-normal" key={index}>
                                <p>
                                  {formatNutrient(item?.slug || "")}{" "}
                                  {shouldShowRI(item?.slug!) && (
                                    <span style={{ color: "#359CEF" }} className="font-[500]">
                                      {Math.round(trackedPercentageRI[item?.slug!])}% RI
                                    </span>
                                  )}
                                </p>
                                <p>
                                  {parseFloat(trackedNutrients?.[item?.slug!]?.toFixed(4))}
                                  {item?.unit}
                                </p>
                              </div>
                            );
                          })}
                      </>
                    ))}
                </div>
              ))}
            </div>
            <div className="w-1/3 px-6">
              {fatsMineralsArray.map((item, index) => (
                <div className="text-sm pb-6" key={index}>
                  <div className="border-b w-2/3 border-white py-2 mb-2">
                    <p className="font-semibold w-full">{item?.name}</p>
                  </div>
                  {item?.nutrients &&
                    item?.nutrients.map((nutrient, index) => (
                      <>
                        <div key={index} className="flex justify-between font-normal">
                          <p>
                            {formatNutrient(nutrient?.slug || "")}{" "}
                            {shouldShowRI(nutrient?.slug!) && (
                              <span style={{ color: "#359CEF" }} className="font-[500]">
                                {Math.round(trackedPercentageRI[nutrient?.slug!])}% RI
                              </span>
                            )}
                          </p>
                          <p>
                            {parseFloat(trackedNutrients?.[nutrient?.slug!]?.toFixed(4))}
                            {nutrient?.unit}
                          </p>
                        </div>
                        {nutrient?.nutrients &&
                          nutrient?.nutrients.map((item, index) => {
                            return (
                              <div className="flex justify-between italic font-normal" key={index}>
                                <p>
                                  {formatNutrient(item?.slug || "")}{" "}
                                  {shouldShowRI(item?.slug!) && (
                                    <span style={{ color: "#359CEF" }} className="font-[500]">
                                      {Math.round(trackedPercentageRI[item?.slug!])}% RI
                                    </span>
                                  )}
                                </p>
                                <p>
                                  {parseFloat(trackedNutrients?.[item?.slug!]?.toFixed(4))}
                                  {item?.unit}
                                </p>
                              </div>
                            );
                          })}
                      </>
                    ))}
                </div>
              ))}
            </div>
            <div className="w-1/3 px-6">
              {vitaminsOtherArray.map((item, index) => (
                <div className="text-sm pb-6" key={index}>
                  <div className="border-b w-2/3 border-white py-2 mb-2">
                    <p className="font-semibold">{item.name}</p>
                  </div>
                  {item.nutrients &&
                    item.nutrients.map((nutrient, index) => (
                      <>
                        <div key={index} className="flex justify-between font-normal">
                          <p>
                            {formatNutrient(nutrient?.slug || "")}{" "}
                            {shouldShowRI(nutrient?.slug!) && (
                              <span style={{ color: "#359CEF" }} className="font-[500]">
                                {Math.round(trackedPercentageRI[nutrient?.slug!])}% RI
                              </span>
                            )}
                          </p>
                          <p>
                            {parseFloat(trackedNutrients?.[nutrient?.slug!]?.toFixed(4))}
                            {nutrient?.unit}
                          </p>
                        </div>
                        {nutrient?.nutrients &&
                          nutrient?.nutrients.map((item, index) => (
                            <div className="flex justify-between italic font-normal" key={index}>
                              <p>
                                {formatNutrient(item?.slug || "")}{" "}
                                {shouldShowRI(item?.slug!) && (
                                  <span style={{ color: "#359CEF" }} className="font-[500]">
                                    {Math.round(trackedPercentageRI[item?.slug!])}% RI
                                  </span>
                                )}
                              </p>
                              <p>
                                {parseFloat(trackedNutrients?.[item?.slug!]?.toFixed(4))}
                                {item?.unit}
                              </p>
                            </div>
                          ))}
                      </>
                    ))}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
