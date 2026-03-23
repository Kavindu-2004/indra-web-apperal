// app/admin/login/page.tsx
"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen grid place-items-center px-6">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 space-y-4">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <p className="text-sm text-gray-600">
          Sign in with Google to access Admin.
        </p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/admin" })}
          className="w-full rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:opacity-90"
        >
          Continue with Google
        </button>

        <Link href="/" className="block text-sm text-gray-600 hover:text-black">
          ← Back to store
        </Link>
      </div>
    </div>
  );
}