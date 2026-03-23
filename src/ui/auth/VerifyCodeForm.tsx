"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { verifyCodeAtom, authLoadingAtom } from "@/src/store/authAtoms";
import Button from "../Button";

interface VerifyCodeFormProps {
  email: string;
  onSuccess?: () => void;
  onBack?: () => void;
}

export default function VerifyCodeForm({ email, onSuccess, onBack }: VerifyCodeFormProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [, verifyCode] = useAtom(verifyCodeAtom);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!code.trim()) {
      setError("Please enter the code");
      return;
    }

    if (code.length !== 6) {
      setError("Code must be 6 digits");
      return;
    }

    setLoading(true);
    const result = await verifyCode({ email, code });
    setLoading(false);

    if (result.success) {
      onSuccess?.();
    } else {
      setError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-bold mb-2">Code sent to {email}</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="123456"
          className="w-full border-b border-primary py-3 px-0 bg-transparent outline-none text-lg text-center tracking-[0.5em] font-mono"
          maxLength={6}
          inputMode="numeric"
          autoFocus
          disabled={loading}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3 mt-4">
        <Button type="button" variant="secondary" onClick={onBack} className="flex-1 py-4">
          Back
        </Button>
        <Button type="submit" disabled={loading} className="flex-1 py-4">
          {loading ? "Verifying..." : "Verify"}
        </Button>
      </div>
    </form>
  );
}
