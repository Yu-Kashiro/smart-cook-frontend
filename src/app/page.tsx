import Link from "next/link";
import NavButton from "@/components/NavButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-primary-light">
      {/* ナビゲーション */}
      <nav className="bg-white shadow-sm border-b border-primary-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl mr-2">🍳</span>
                <span className="text-xl font-bold text-gray-800">
                  SmartCook
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <NavButton href="/auth/signin" variant="primary">
                ログイン
              </NavButton>
            </div>
          </div>
        </div>
      </nav>

      {/* ヒーローセクション */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-lighter rounded-full mb-8">
            <span className="text-4xl">👨‍🍳</span>
          </div> */}
          <h1
            className="font-bold text-gray-900 mb-6 leading-tight"
            style={{ fontSize: "clamp(2rem, 7vw, 4rem)" }}
          >
            最小作業で
            <br />
            <span className="text-primary whitespace-nowrap block w-full overflow-hidden text-ellipsis">
              最高の美味しさを
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            SmartCookは、1人1人に合わせた
            <br />
            最適な献立・買い物リスト・調理方法等を一括で提案します。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/planning"
              className="bg-primary text-white font-semibold py-4 px-8 rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] text-lg"
            >
              献立を作成する
            </Link>
            <Link
              href="/auth/signup"
              className="border-2 border-primary text-primary font-semibold py-4 px-8 rounded-lg bg-white hover:bg-primary-lighter focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 text-lg"
            >
              アカウント作成
            </Link>
          </div>
          <div className="block text-xs text-gray-500 mt-4 text-center">
            アカウントを作成すると、レシピ等を保存できます。
          </div>
        </div>
      </section>

      {/* 機能紹介セクション */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              SmartCookとは？
            </h2>
            {/* <p className="text-lg text-gray-600">
              料理の悩みを一気に解決する、AI搭載の献立プランナー
            </p> */}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-yellow-50 border border-primary-light">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-6">
                <span className="text-3xl">📝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                スマート献立作成
              </h3>
              <p className="text-gray-600 leading-relaxed">
                <span>
                  残っている食材を考慮したうえで、料理の献立を提案します。
                </span>
                <span>
                  目的の栄養バランス(ダイエット、高たんぱく等)を考慮することも可能です。
                </span>
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-yellow-50 border border-primary-light">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-6">
                <span className="text-3xl">📝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                スマート買い物リスト
              </h3>
              <p className="text-gray-600 leading-relaxed">
                <span>
                  人数・日数を考慮し、必要な食材・数量をリスト化します。
                </span>
                <span>スーパーで買う食材を迷うことが無くなります。</span>
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-yellow-50 border border-primary-light">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-500 rounded-full mb-6">
                <span className="text-3xl">👨‍🍳</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                調理・保存ガイド
              </h3>
              <p className="text-gray-600 leading-relaxed">
                調理法と保存方法を併せて提案し、効率的な調理を実現します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 使い方セクション */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              使い方
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-6 flex items-center justify-center text-white font-bold text-2xl">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                食材情報を入力
              </h3>
              <p className="text-gray-600 leading-relaxed">
                食べたい食品、残り食材、人数などの基本情報を入力します
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-6 flex items-center justify-center text-white font-bold text-2xl">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                AIが献立を生成
              </h3>
              <p className="text-gray-600 leading-relaxed">
                入力情報をもとに、AIが最適な献立プランを自動生成します
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-6 flex items-center justify-center text-white font-bold text-2xl">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">調理開始</h3>
              <p className="text-gray-600 leading-relaxed">
                買い物リストで材料を調達し、ガイドに従って調理を開始
              </p>
            </div>
          </div>

          {/* ボタンを中央配置のコンテナで囲む */}
          <div className="flex justify-center">
            {/* <Link
              href="/planning"
              className="bg-primary text-white font-semibold py-4 px-8 rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] text-lg inline-block"
            >
              献立を作成してみる
            </Link> */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/planning"
                className="bg-primary text-white font-semibold py-4 px-8 rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] text-lg"
              >
                献立を作成する
              </Link>
              <Link
                href="/auth/signup"
                className="border-2 border-primary text-primary font-semibold py-4 px-8 rounded-lg bg-white hover:bg-primary-lighter focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 text-lg"
              >
                アカウント作成
              </Link>
            </div>
          </div>
          <div className="block text-xs text-gray-500 mt-4 text-center">
            アカウントを作成すると、レシピ等を保存できます。
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-white shadow-sm border-t border-primary-light py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 SmartCook. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
