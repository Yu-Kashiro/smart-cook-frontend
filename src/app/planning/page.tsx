"use client";

import { useState } from "react";
import MealPlanForm from "@/components/meal-planning/MealPlanForm";
import MealPlanResult from "@/components/meal-planning/MealPlanResult";

interface MealPlan {
  shoppingList: string[];
  cookingMethods: string[];
  storageInstructions: string[];
}

export default function PlanningPage() {
  const [result, setResult] = useState<MealPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data: unknown) => {
    setIsLoading(true);
    setResult(null);

    try {
      console.log("献立データ:", data);

      // デモ用のサンプルデータ（実際はAI APIを呼び出す）
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const mockResult: MealPlan = {
        shoppingList: [
          "鶏もも肉 300g",
          "トマト 2個",
          "パスタ 200g",
          "にんにく 2片",
          "バジル 適量",
          "パルメザンチーズ 50g",
        ],
        cookingMethods: [
          "パスタを塩茹でして、アルデンテに仕上げる",
          "フライパンでにんにくを炒めて香りを出す",
          "鶏もも肉を一口大に切り、焼き色をつける",
          "トマトを加えて煮込み、バジルで香りづけ",
          "茹でたパスタと絡めて、チーズをかけて完成",
        ],
        storageInstructions: [
          "調理済みのパスタは冷蔵庫で2-3日保存可能",
          "トマトソースは冷凍保存で1ヶ月持ちます",
          "鶏肉は調理後すぐに食べるか、冷蔵保存してください",
        ],
      };

      setResult(mockResult);
    } catch (error) {
      console.error("献立生成エラー:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewPlan = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-primary-light">
      <div className="container mx-auto px-4 py-8">
        {!result && !isLoading && <MealPlanForm onSubmit={handleFormSubmit} />}
        <MealPlanResult result={result} isLoading={isLoading} />
        {result && (
          <div className="text-center mt-6">
            <button
              onClick={handleNewPlan}
              className="bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]"
            >
              新しい献立を作成
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
