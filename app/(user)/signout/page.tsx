"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const SignOut = () => {
  const router = useRouter();

  useEffect(() => {
    // Sign out using NextAuth
    const performSignOut = async () => {
      await signOut({ redirect: false });
      // Redirect to home page after signing out
      router.push("/");
    };
    
    performSignOut();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F5F9]">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#2e4369] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-[#2e4369] mb-4">Signing Out...</h2>
        <p className="text-gray-500">Please wait while we sign you out.</p>
      </div>
    </div>
  );
};

export default SignOut;