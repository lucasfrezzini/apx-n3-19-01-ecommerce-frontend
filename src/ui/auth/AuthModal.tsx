"use client";

import { useState, useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import { drawerAtom, closeDrawerAtom } from "@/src/store/uiAtoms";
import { hydrateAuthAtom } from "@/src/store/authAtoms";
import LoginForm from "./LoginForm";
import VerifyCodeForm from "./VerifyCodeForm";

function AuthModal() {
  const [drawer] = useAtom(drawerAtom);
  const [, closeDrawer] = useAtom(closeDrawerAtom);
  const [, hydrateAuth] = useAtom(hydrateAuthAtom);

  const [step, setStep] = useState<"login" | "verify">("login");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (drawer !== "auth") return;
    hydrateAuth();
  }, [drawer, hydrateAuth]);

  useEffect(() => {
    if (drawer !== "auth") {
      setStep("login");
      setEmail("");
    }
  }, [drawer]);

  const handleClose = useCallback(() => {
    closeDrawer();
  }, [closeDrawer]);

  const handleSwitchToVerify = useCallback((email: string) => {
    setEmail(email);
    setStep("verify");
  }, []);

  const handleBack = useCallback(() => {
    setStep("login");
  }, []);

  const handleSuccess = useCallback(() => {
    closeDrawer();
  }, [closeDrawer]);

  const isOpen = drawer === "auth";

  return (
    <>
      <div
        onClick={handleClose}
        className={`
          fixed inset-0 z-[65] bg-black/40 backdrop-blur-sm
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      />
      <aside
        className={`
          fixed z-[70] right-0 w-full max-w-md h-screen
          bg-background border-l border-primary
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-[30px] border-b border-primary">
            <h2 className="font-bold text-xl">Login</h2>
            <button
              onClick={handleClose}
              className="text-2xl hover:opacity-60 transition-opacity"
            >
              ×
            </button>
          </div>

          <div className="flex-1 p-[30px] overflow-y-auto">
            {step === "login" ? (
              <LoginForm
                onSwitchToVerify={handleSwitchToVerify}
                onSuccess={handleSuccess}
              />
            ) : (
              <VerifyCodeForm
                email={email}
                onBack={handleBack}
                onSuccess={handleSuccess}
              />
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

export default AuthModal;
