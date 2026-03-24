"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom, tokenAtom } from "@/src/store/authAtoms";
import { apiClient, Address } from "../../apiClient";
import UserSidebar from "@/src/ui/user/UserSidebar";

export const dynamic = "force-dynamic";

export default function ProfilePage() {
  const [user] = useAtom(userAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [authLoading, setAuthLoading] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [address, setAddress] = useState<Address>({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (authLoading) return;

    const tokenToUse =
      token ||
      (typeof window !== "undefined" ? localStorage.getItem("auth:v1") : null);
    if (!tokenToUse || !user) return;

    setName(user.name || "");
    setPhone(user.phone || "");
    setAvatarUrl(user.avatarUrl || "");
    if (user.address) {
      setAddress({
        street: user.address.street || "",
        city: user.address.city || "",
        state: user.address.state || "",
        postalCode: user.address.postalCode || "",
        country: user.address.country || "",
      });
    }
  }, [user, authLoading, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError("");

    const tokenToUse =
      token ||
      (typeof window !== "undefined" ? localStorage.getItem("auth:v1") : null);
    if (!tokenToUse) {
      setError("You are not authenticated");
      setSaving(false);
      return;
    }

    try {
      if (
        name !== user?.name ||
        phone !== user?.phone ||
        avatarUrl !== user?.avatarUrl
      ) {
        const result = await apiClient.updateMe(tokenToUse, {
          name,
          phone,
          avatarUrl,
        });
        if (result.success) {
          const userResult = await apiClient.getMe(tokenToUse);
          if (userResult.success) {
            setToken(tokenToUse);
          }
        } else {
          throw new Error(result.error || "Failed to update profile");
        }
      }

      const result = await apiClient.updateAddress(tokenToUse, address);
      if (!result.success) {
        throw new Error(result.error || "Failed to update address");
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-[49px]">
      <h1 className="font-bold text-2xl mb-8">My Profile</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <UserSidebar activePage="profile" />

        <main className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-8">
            <section className="border border-primary p-6">
              <h2 className="font-bold text-lg mb-4">Personal Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full px-4 py-2 border border-primary bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Email cannot be changed
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Avatar URL
                  </label>
                  <input
                    type="url"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    className="w-full px-4 py-2 border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {avatarUrl && (
                    <div className="mt-2">
                      <img
                        src={avatarUrl}
                        alt="Avatar preview"
                        className="w-16 h-16 rounded-full object-cover border border-primary"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>

            <section className="border border-primary p-6">
              <h2 className="font-bold text-lg mb-4">Shipping Address</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Street
                  </label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) =>
                      setAddress({ ...address, street: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    State / Province
                  </label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) =>
                      setAddress({ ...address, state: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={address.postalCode}
                    onChange={(e) =>
                      setAddress({ ...address, postalCode: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={address.country}
                    onChange={(e) =>
                      setAddress({ ...address, country: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </section>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-600">
                {error}
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-50 border border-green-200 text-green-600">
                Profile updated successfully!
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full md:w-auto px-8 py-3 bg-primary text-background font-bold hover:opacity-90 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
