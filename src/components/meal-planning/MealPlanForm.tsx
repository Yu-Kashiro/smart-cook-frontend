"use client";

import { useState } from "react";

interface RemainingIngredient {
  name: string;
  quantity: string;
}

interface MealPlanData {
  favoriteFoods: string[];
  dislikedFoods: string[];
  remainingIngredients: RemainingIngredient[];
  numberOfPeople: number;
  mealsPerDay: number;
  daysCount: number;
  nutritionGoals: string[];
  preferSeasonalVegetables: boolean;
  availableEquipment: string[];
  basicSeasonings: string[];
  okayWithRepeatFoods: boolean;
  specificWantedFoods: string[];
}

interface MealPlanFormProps {
  onSubmit?: (data: MealPlanData) => void;
}

const NUTRITION_OPTIONS = [
  "高タンパク質",
  "低炭水化物",
  "低脂肪",
  "高繊維",
  "野菜多め",
  "塩分控えめ",
  "糖質制限",
  "バランス重視",
];

export default function MealPlanForm({ onSubmit }: MealPlanFormProps) {
  const [formData, setFormData] = useState<MealPlanData>({
    favoriteFoods: [""],
    dislikedFoods: [""],
    remainingIngredients: [{ name: "", quantity: "" }],
    numberOfPeople: 1,
    mealsPerDay: 3,
    daysCount: 1,
    nutritionGoals: [],
    preferSeasonalVegetables: true,
    availableEquipment: [""],
    basicSeasonings: [""],
    okayWithRepeatFoods: true,
    specificWantedFoods: [""],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // フィルタリングして空でない値のみを送信
      const cleanedData = {
        ...formData,
        favoriteFoods: formData.favoriteFoods.filter(
          (item) => item.trim() !== ""
        ),
        dislikedFoods: formData.dislikedFoods.filter(
          (item) => item.trim() !== ""
        ),
        remainingIngredients: formData.remainingIngredients.filter(
          (item) => item.name.trim() !== ""
        ),
        availableEquipment: formData.availableEquipment.filter(
          (item) => item.trim() !== ""
        ),
        basicSeasonings: formData.basicSeasonings.filter(
          (item) => item.trim() !== ""
        ),
        specificWantedFoods: formData.specificWantedFoods.filter(
          (item) => item.trim() !== ""
        ),
      };
      await onSubmit?.(cleanedData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleArrayChange = (
    field: keyof MealPlanData,
    index: number,
    value: string
  ) => {
    setFormData((prev) => {
      const newArray = [...(prev[field] as string[])];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayField = (field: keyof MealPlanData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""],
    }));
  };

  const removeArrayField = (field: keyof MealPlanData, index: number) => {
    setFormData((prev) => {
      const newArray = (prev[field] as string[]).filter((_, i) => i !== index);
      return { ...prev, [field]: newArray.length === 0 ? [""] : newArray };
    });
  };

  const handleRemainingIngredientChange = (
    index: number,
    field: "name" | "quantity",
    value: string
  ) => {
    setFormData((prev) => {
      const newIngredients = [...prev.remainingIngredients];
      newIngredients[index] = { ...newIngredients[index], [field]: value };
      return { ...prev, remainingIngredients: newIngredients };
    });
  };

  const addRemainingIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      remainingIngredients: [
        ...prev.remainingIngredients,
        { name: "", quantity: "" },
      ],
    }));
  };

  const removeRemainingIngredient = (index: number) => {
    setFormData((prev) => {
      const newIngredients = prev.remainingIngredients.filter(
        (_, i) => i !== index
      );
      return {
        ...prev,
        remainingIngredients:
          newIngredients.length === 0
            ? [{ name: "", quantity: "" }]
            : newIngredients,
      };
    });
  };

  const handleNutritionGoalChange = (goal: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      nutritionGoals: checked
        ? [...prev.nutritionGoals, goal]
        : prev.nutritionGoals.filter((g) => g !== goal),
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-primary-light">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-lighter rounded-full mb-4">
            <span className="text-3xl">🍳</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            スマート献立プランナー
          </h1>
          <p className="text-gray-600">
            食材情報を入力して、最適な献立を作成しましょう
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 食べたい食品 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              食べたい食品
            </label>
            <div className="space-y-2">
              {formData.favoriteFoods.map((food, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={food}
                    onChange={(e) =>
                      handleArrayChange("favoriteFoods", index, e.target.value)
                    }
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 outline-none placeholder:text-gray-500 text-gray-600"
                    placeholder="例：鶏肉"
                  />
                  {formData.favoriteFoods.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField("favoriteFoods", index)}
                      className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField("favoriteFoods")}
                className="w-full px-4 py-2 text-primary border border-primary-light rounded-lg hover:bg-primary-lighter transition-colors"
              >
                + 追加
              </button>
            </div>
          </div>

          {/* 食べられない食品 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              食べられない食品
            </label>
            <div className="space-y-2">
              {formData.dislikedFoods.map((food, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={food}
                    onChange={(e) =>
                      handleArrayChange("dislikedFoods", index, e.target.value)
                    }
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 outline-none placeholder:text-gray-500 text-gray-600"
                    placeholder="例：エビ"
                  />
                  {formData.dislikedFoods.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField("dislikedFoods", index)}
                      className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField("dislikedFoods")}
                className="w-full px-4 py-2 text-primary border border-primary-light rounded-lg hover:bg-primary-lighter transition-colors"
              >
                + 追加
              </button>
            </div>
          </div>

          {/* 残っている食材 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              残っている食材
            </label>
            <div className="space-y-2">
              {formData.remainingIngredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) =>
                      handleRemainingIngredientChange(
                        index,
                        "name",
                        e.target.value
                      )
                    }
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 outline-none placeholder:text-gray-500 text-gray-600"
                    placeholder="食材名（例：玉ねぎ）"
                  />
                  <input
                    type="text"
                    value={ingredient.quantity}
                    onChange={(e) =>
                      handleRemainingIngredientChange(
                        index,
                        "quantity",
                        e.target.value
                      )
                    }
                    className="w-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 outline-none placeholder:text-gray-500 text-gray-600"
                    placeholder="2個"
                  />
                  {formData.remainingIngredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRemainingIngredient(index)}
                      className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addRemainingIngredient()}
                className="w-full px-4 py-2 text-primary border border-primary-light rounded-lg hover:bg-primary-lighter transition-colors"
              >
                + 追加
              </button>
            </div>
          </div>

          {/* 人数・食数・日数 */}
          <div className="space-y-6">
            <div>
              <label
                htmlFor="numberOfPeople"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                何人分
              </label>
              <input
                type="number"
                id="numberOfPeople"
                name="numberOfPeople"
                value={formData.numberOfPeople}
                onChange={handleNumberChange}
                min="1"
                max="10"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 outline-none text-gray-600"
              />
            </div>

            <div>
              <label
                htmlFor="mealsPerDay"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                一日何食
              </label>
              <input
                type="number"
                id="mealsPerDay"
                name="mealsPerDay"
                value={formData.mealsPerDay}
                onChange={handleNumberChange}
                min="1"
                max="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 outline-none text-gray-600"
              />
            </div>

            <div>
              <label
                htmlFor="daysCount"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                何日分
              </label>
              <input
                type="number"
                id="daysCount"
                name="daysCount"
                value={formData.daysCount}
                onChange={handleNumberChange}
                min="1"
                max="14"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 outline-none text-gray-600"
              />
            </div>
          </div>

          {/* 栄養バランス */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              どういう栄養バランスを目指すか
            </label>
            <div className="grid grid-cols-2 gap-3">
              {NUTRITION_OPTIONS.map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`nutrition-${option}`}
                    checked={formData.nutritionGoals.includes(option)}
                    onChange={(e) =>
                      handleNutritionGoalChange(option, e.target.checked)
                    }
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
                  />
                  <label
                    htmlFor={`nutrition-${option}`}
                    className="ml-2 text-sm font-medium text-gray-700"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* 調理器具 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              準備されている調理器具
            </label>
            <div className="space-y-2">
              {formData.availableEquipment.map((equipment, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={equipment}
                    onChange={(e) =>
                      handleArrayChange(
                        "availableEquipment",
                        index,
                        e.target.value
                      )
                    }
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 outline-none placeholder:text-gray-500 text-gray-600"
                    placeholder="例：フライパン"
                  />
                  {formData.availableEquipment.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeArrayField("availableEquipment", index)
                      }
                      className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField("availableEquipment")}
                className="w-full px-4 py-2 text-primary border border-primary-light rounded-lg hover:bg-primary-lighter transition-colors"
              >
                + 追加
              </button>
            </div>
          </div>

          {/* 調味料 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              常備している調味料
            </label>
            <div className="space-y-2">
              {formData.basicSeasonings.map((seasoning, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={seasoning}
                    onChange={(e) =>
                      handleArrayChange(
                        "basicSeasonings",
                        index,
                        e.target.value
                      )
                    }
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 outline-none placeholder:text-gray-500 text-gray-600"
                    placeholder="例：醤油"
                  />
                  {formData.basicSeasonings.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField("basicSeasonings", index)}
                      className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField("basicSeasonings")}
                className="w-full px-4 py-2 text-primary border border-primary-light rounded-lg hover:bg-primary-lighter transition-colors"
              >
                + 追加
              </button>
            </div>
          </div>

          {/* チェックボックスオプション */}
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="preferSeasonalVegetables"
                name="preferSeasonalVegetables"
                checked={formData.preferSeasonalVegetables}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
              />
              <label
                htmlFor="preferSeasonalVegetables"
                className="ml-2 text-sm font-medium text-gray-700"
              >
                季節の野菜を優先する
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="okayWithRepeatFoods"
                name="okayWithRepeatFoods"
                checked={formData.okayWithRepeatFoods}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
              />
              <label
                htmlFor="okayWithRepeatFoods"
                className="ml-2 text-sm font-medium text-gray-700"
              >
                同じ食品を食べても飽きない
              </label>
            </div>
          </div>

          {/* 個別購入食品 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              個別に購入したい食品
            </label>
            <div className="space-y-2">
              {formData.specificWantedFoods.map((food, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={food}
                    onChange={(e) =>
                      handleArrayChange(
                        "specificWantedFoods",
                        index,
                        e.target.value
                      )
                    }
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 outline-none placeholder:text-gray-500 text-gray-600"
                    placeholder="例：特別な調味料"
                  />
                  {formData.specificWantedFoods.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeArrayField("specificWantedFoods", index)
                      }
                      className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField("specificWantedFoods")}
                className="w-full px-4 py-2 text-primary border border-primary-light rounded-lg hover:bg-primary-lighter transition-colors"
              >
                + 追加
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white font-semibold py-4 px-6 rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                献立を生成中...
              </div>
            ) : (
              "献立プランを生成"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
