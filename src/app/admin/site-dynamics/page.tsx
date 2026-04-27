"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getSiteSettings, updateSiteSetting } from "@/app/actions";

const DEFAULT_BAR_TEXT = "⚡ Only 4 new family slots remaining in Pune this week — Secure yours now →";

export default function SiteDynamicsPage() {
  const [accessCode, setAccessCode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  const [barText, setBarText] = useState(DEFAULT_BAR_TEXT);
  const [barVisible, setBarVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError("");
    // Verify access code via a write (the only auth-gated operation)
    const check = await updateSiteSetting("__ping__", "1", accessCode);
    if (check.error) {
      setAuthError("Invalid access code.");
      setIsLoading(false);
      return;
    }
    // Load current settings
    const result = await getSiteSettings();
    if (result.data) {
      if (result.data.scarcity_bar_text) setBarText(result.data.scarcity_bar_text);
      if (result.data.scarcity_bar_visible !== undefined) {
        setBarVisible(result.data.scarcity_bar_visible !== "false");
      }
    }
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus("idle");
    const [r1, r2] = await Promise.all([
      updateSiteSetting("scarcity_bar_text", barText, accessCode),
      updateSiteSetting("scarcity_bar_visible", barVisible ? "true" : "false", accessCode),
    ]);
    if (r1.error || r2.error) {
      setSaveStatus("error");
    } else {
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
    setIsSaving(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
          <h1 className="font-serif text-3xl text-brand-teal font-semibold mb-2 text-center">Site Dynamics</h1>
          <p className="text-brand-slate/50 text-sm text-center mb-6">Admin access required</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-brand-slate uppercase tracking-wider mb-2">
                Access Code
              </label>
              <input
                type="password"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-brand-teal/20 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
                placeholder="Enter access code"
                autoFocus
              />
            </div>
            {authError && <p className="text-red-500 text-sm">{authError}</p>}
            <button
              type="submit"
              disabled={isLoading || !accessCode}
              className="w-full py-3 bg-brand-teal text-white rounded-xl font-semibold disabled:opacity-50 transition-opacity"
            >
              {isLoading ? "Checking..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="font-serif text-4xl text-brand-teal font-bold mb-1">Site Dynamics</h1>
            <p className="text-brand-slate/60 text-sm">Control live site content without a deploy.</p>
          </div>
          <Link
            href="/admin"
            className="text-sm text-brand-slate/50 hover:text-brand-teal transition-colors"
          >
            ← Waitlist
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-brand-teal/10 p-8 space-y-8">
          {/* Scarcity Bar Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-serif text-xl text-brand-teal font-semibold">Scarcity Bar</h2>
                <p className="text-xs text-brand-slate/50 mt-0.5">The top announcement strip shown to new visitors</p>
              </div>
              {/* Toggle */}
              <button
                onClick={() => setBarVisible((v) => !v)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  barVisible ? "bg-brand-teal" : "bg-brand-slate/20"
                }`}
                aria-label="Toggle scarcity bar visibility"
              >
                <span
                  className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform ${
                    barVisible ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-brand-slate uppercase tracking-wider">
                Bar Text
              </label>
              <textarea
                value={barText}
                onChange={(e) => setBarText(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-brand-teal/20 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none resize-none text-sm text-brand-slate"
              />
              <p className="text-xs text-brand-slate/40">
                {barVisible ? "Showing on site" : "Hidden from site"}
              </p>
            </div>

            {/* Live preview */}
            <div className="mt-4">
              <p className="text-xs font-semibold text-brand-slate/40 uppercase tracking-wider mb-2">Preview</p>
              <div
                className={`rounded-xl px-4 py-2.5 text-white text-xs font-semibold tracking-wide text-center transition-opacity ${
                  barVisible ? "opacity-100" : "opacity-30"
                }`}
                style={{ background: "linear-gradient(90deg, #0d9488, #14b8a6)" }}
              >
                {barText || <span className="opacity-40">No text set</span>}
              </div>
            </div>
          </div>

          {/* Save */}
          <div className="flex items-center gap-4 pt-2 border-t border-brand-teal/10">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-8 py-3 bg-brand-teal text-white rounded-xl font-semibold text-sm hover:bg-brand-teal/90 transition-colors disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
            {saveStatus === "success" && (
              <span className="text-sm text-green-600 font-medium">Saved! Changes are live.</span>
            )}
            {saveStatus === "error" && (
              <span className="text-sm text-red-500 font-medium">Save failed. Try again.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
