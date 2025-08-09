interface AuthCredentials {
  email: string;
  password: string;
}

interface SignupCredentials extends AuthCredentials {
  passwordConfirmation: string;
}

interface UserData {
  id: number;
  email: string;
  confirmed: boolean;
  created_at: string;
  updated_at: string;
}

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

interface AuthResponse extends ApiResponse {
  data: {
    user: UserData;
    token: string;
  };
}

interface PasswordResetCredentials {
  email: string;
}

interface PasswordUpdateCredentials {
  reset_password_token: string;
  password: string;
  password_confirmation: string;
}

interface PasswordChangeCredentials {
  current_password: string;
  password: string;
  password_confirmation: string;
}

class AuthClient {
  private baseUrl: string;

  constructor(
    baseUrl: string = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
  ) {
    this.baseUrl = baseUrl;
  }

  // ユーザー登録
  async register(credentials: SignupCredentials): Promise<UserData> {
    const response = await fetch(`${this.baseUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: credentials.email,
          password: credentials.password,
          password_confirmation: credentials.passwordConfirmation,
        },
      }),
    });

    const data: AuthResponse = await response.json();

    if (!data.success) {
      const errorMessage =
        data.errors?.[0]?.message ||
        data.message ||
        "ユーザー登録に失敗しました";
      throw new Error(errorMessage);
    }

    if (data.data?.token) {
      this.saveToken(data.data.token);
    }

    return data.data!.user;
  }

  // ログイン
  async login(credentials: AuthCredentials): Promise<UserData> {
    const response = await fetch(`${this.baseUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data: AuthResponse = await response.json();

    if (!data.success) {
      const errorMessage =
        data.errors?.[0]?.message || data.message || "ログインに失敗しました";
      throw new Error(errorMessage);
    }

    if (data.data?.token) {
      this.saveToken(data.data.token);
    }

    return data.data!.user;
  }

  // ログアウト
  async logout(): Promise<void> {
    const token = this.getToken();
    if (!token) {
      throw new Error("認証情報が見つかりません");
    }

    const response = await fetch(`${this.baseUrl}/api/auth/logout`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data: ApiResponse = await response.json();

    if (!data.success) {
      throw new Error(data.message || "ログアウトに失敗しました");
    }

    this.clearToken();
  }

  // 現在のユーザー情報取得
  async getCurrentUser(): Promise<UserData> {
    const token = this.getToken();
    if (!token) {
      throw new Error("認証情報が見つかりません");
    }

    const response = await fetch(`${this.baseUrl}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data: ApiResponse<{ user: UserData }> = await response.json();

    if (!data.success) {
      throw new Error(data.message || "ユーザー情報の取得に失敗しました");
    }

    return data.data!.user;
  }

  // 確認メール再送信
  async sendConfirmation(email: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/auth/confirmation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data: ApiResponse = await response.json();

    if (!data.success) {
      throw new Error(data.message || "確認メールの送信に失敗しました");
    }
  }

  // メール確認
  async confirmEmail(confirmationToken: string): Promise<UserData> {
    const response = await fetch(
      `${this.baseUrl}/api/auth/confirmation?confirmation_token=${confirmationToken}`
    );

    const data: ApiResponse<{ user: UserData }> = await response.json();

    if (!data.success) {
      throw new Error(data.message || "メールアドレスの確認に失敗しました");
    }

    return data.data!.user;
  }

  // パスワードリセット要求
  async sendPasswordReset(
    credentials: PasswordResetCredentials
  ): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/auth/password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data: ApiResponse = await response.json();

    if (!data.success) {
      throw new Error(
        data.message || "パスワードリセットメールの送信に失敗しました"
      );
    }
  }

  // パスワードリセット実行
  async resetPassword(
    credentials: PasswordUpdateCredentials
  ): Promise<UserData> {
    const response = await fetch(`${this.baseUrl}/api/auth/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data: AuthResponse = await response.json();

    if (!data.success) {
      const errorMessage =
        data.errors?.[0]?.message ||
        data.message ||
        "パスワードのリセットに失敗しました";
      throw new Error(errorMessage);
    }

    if (data.data?.token) {
      this.saveToken(data.data.token);
    }

    return data.data!.user;
  }

  // パスワード変更（ログイン済みユーザー）
  async changePassword(
    credentials: PasswordChangeCredentials
  ): Promise<UserData> {
    const token = this.getToken();
    if (!token) {
      throw new Error("認証情報が見つかりません");
    }

    const response = await fetch(`${this.baseUrl}/api/auth/password/change`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(credentials),
    });

    const data: ApiResponse<{ user: UserData }> = await response.json();

    if (!data.success) {
      const errorMessage =
        data.errors?.[0]?.message ||
        data.message ||
        "パスワードの変更に失敗しました";
      throw new Error(errorMessage);
    }

    return data.data!.user;
  }

  // トークン管理
  private saveToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
    }
  }

  private getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
  }

  private clearToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}

export const authClient = new AuthClient();
export type {
  AuthCredentials,
  SignupCredentials,
  UserData,
  ApiResponse,
  AuthResponse,
  PasswordResetCredentials,
  PasswordUpdateCredentials,
  PasswordChangeCredentials,
};
