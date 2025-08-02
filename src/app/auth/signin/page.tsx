"use client";

import { useRouter } from "next/navigation";
import SigninForm from "@/components/auth/SigninForm";

export default function SigninPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/planning");
  };

  const handleSwitchToSignup = () => {
    router.push("/auth/signup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-30">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.03'%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10">
        <SigninForm
          onSuccess={handleSuccess}
          onSwitchToSignup={handleSwitchToSignup}
        />
      </div>
    </div>
  );
}
