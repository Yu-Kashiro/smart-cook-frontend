'use client';

import { useState } from 'react';
import { authClient, SignupCredentials } from '@/lib/auth';

interface SignupFormProps {
  onSuccess?: () => void;
  onSwitchToSignin?: () => void;
}

export default function SignupForm({ onSuccess, onSwitchToSignin }: SignupFormProps) {
  const [credentials, setCredentials] = useState<SignupCredentials>({
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (credentials.password !== credentials.passwordConfirmation) {
      setError('パスワードが一致しません');
      setIsLoading(false);
      return;
    }

    try {
      await authClient.register(credentials);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : '新規登録に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
            <span className="text-3xl">👨‍🍳</span>
          </div>
          <p className="text-gray-600">最小作業で、最高の美味しさを</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 outline-none placeholder:text-gray-500 text-gray-600"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              パスワード
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 outline-none placeholder:text-gray-500 text-gray-600"
              placeholder="6文字以上で入力してください"
            />
          </div>

          <div>
            <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700 mb-2">
              パスワード確認
            </label>
            <input
              type="password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              value={credentials.passwordConfirmation}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 outline-none placeholder:text-gray-500 text-gray-600"
              placeholder="パスワードを再入力してください"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <span className="text-red-500 mr-2">⚠️</span>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                登録中...
              </div>
            ) : (
              '新規登録'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            すでにアカウントをお持ちの方は
            <button
              onClick={onSwitchToSignin}
              className="text-orange-600 hover:text-orange-700 font-medium ml-1 underline underline-offset-2"
            >
              サインイン
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}