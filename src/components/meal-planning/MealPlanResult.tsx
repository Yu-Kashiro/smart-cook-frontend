'use client';

interface MealPlan {
  shoppingList: string[];
  cookingMethods: string[];
  storageInstructions: string[];
}

interface MealPlanResultProps {
  result: MealPlan | null;
  isLoading: boolean;
}

export default function MealPlanResult({ result, isLoading }: MealPlanResultProps) {
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-primary-light">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-lg text-gray-600">AIが献立を生成中です...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-yellow-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-lighter rounded-full mb-4">
            <span className="text-3xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">献立プランが完成しました！</h2>
          <p className="text-gray-600">以下の情報を参考に、美味しい料理を作ってください</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🛒</span>
              <h3 className="text-xl font-semibold text-gray-800">買い物リスト</h3>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <ul className="space-y-2">
                {result.shoppingList.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">👨‍🍳</span>
              <h3 className="text-xl font-semibold text-gray-800">調理方法</h3>
            </div>
            <div className="bg-primary-lighter rounded-lg p-4">
              <ol className="space-y-3">
                {result.cookingMethods.map((method, index) => (
                  <li key={index} className="flex space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white text-sm rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 leading-relaxed">{method}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">📦</span>
              <h3 className="text-xl font-semibold text-gray-800">保存方法</h3>
            </div>
            <div className="bg-secondary-light rounded-lg p-4">
              <ul className="space-y-2">
                {result.storageInstructions.map((instruction, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button className="bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]">
            新しい献立を作成
          </button>
        </div>
      </div>
    </div>
  );
}