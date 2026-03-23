"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { sendCodeAtom, authLoadingAtom } from "@/src/store/authAtoms";
import Button from "../Button";

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToVerify?: (email: string) => void;
}

export default function LoginForm({ onSuccess, onSwitchToVerify }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [, sendCode] = useAtom(sendCodeAtom);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);
    const result = await sendCode(email);
    setLoading(false);

    if (result.success) {
      setSent(true);
      onSwitchToVerify?.(email);
    } else {
      setError(result.error);
    }
  };

  if (sent) {
    return (
      <div className="text-center">
        <p className="text-lg mb-4">Code sent to {email}</p>
        <p className="text-sm text-gray-600">Check your email for the verification code.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-bold mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full border-b border-primary py-3 px-0 bg-transparent outline-none text-lg"
          disabled={loading}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full py-4 mt-4">
        {loading ? "Sending..." : "Send Code"}
      </Button>
    </form>
  );
}
