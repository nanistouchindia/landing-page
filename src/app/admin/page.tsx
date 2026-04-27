"use client";

import { useState } from "react";
import { getWaitlist, deleteWaitlistEntry, getSiteSettings, updateSiteSetting } from "@/app/actions";

const DEFAULT_BAR_TEXT = "⚡ Only 4 new family slots remaining in Pune this week — Secure yours now →";

type Tab = "waitlist" | "site-dynamics";

export default function AdminPage() {
  const [accessCode, setAccessCode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<Tab>("waitlist");

  // Waitlist state
  const [waitlist, setWaitlist] = useState<any[]>([]);
  const [waitlistLoading, setWaitlistLoading] = useState(false);
  const [waitlistError, setWaitlistError] = useState("");

  // Site dynamics state
  const [barText, setBarText] = useState(DEFAULT_BAR_TEXT);
  const [barVisible, setBarVisible] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthLoading(true);
    setAuthError("");

    // Verify access code via auth-gated write
    const check = await updateSiteSetting("__ping__", "1", accessCode);
    if (check.error) {
      setAuthError("Invalid access code.");
      setIsAuthLoading(false);
      return;
    }

    // Load both datasets in parallel
    const [wlResult, settingsResult] = await Promise.all([
      getWaitlist(accessCode),
      getSiteSettings(),
    ]);

    if (wlResult.error) {
      setAuthError("Failed to load data.");
      setIsAuthLoading(false);
      return;
    }

    setWaitlist(wlResult.data || []);

    if (settingsResult.data) {
      if (settingsResult.data.scarcity_bar_text) setBarText(settingsResult.data.scarcity_bar_text);
      if (settingsResult.data.scarcity_bar_visible !== undefined) {
        setBarVisible(settingsResult.data.scarcity_bar_visible !== "false");
      }
    }

    setIsAuthenticated(true);
    setIsAuthLoading(false);
  };

  const fetchWaitlist = async () => {
    setWaitlistLoading(true);
    setWaitlistError("");
    const result = await getWaitlist(accessCode);
    if (result.error) {
      setWaitlistError("Failed to refresh. Try again.");
    } else {
      setWaitlist(result.data || []);
    }
    setWaitlistLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this entry?")) return;
    const result = await deleteWaitlistEntry(id, accessCode);
    if (result.error) {
      alert("Failed to delete entry.");
    } else {
      setWaitlist(waitlist.filter((e) => e.id !== id));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus("idle");
    const [r1, r2] = await Promise.all([
      updateSiteSetting("scarcity_bar_text", barText, accessCode),
      updateSiteSetting("scarcity_bar_visible", barVisible ? "true" : "false", accessCode),
    ]);
    setSaveStatus(r1.error || r2.error ? "error" : "success");
    setIsSaving(false);
    if (!r1.error && !r2.error) setTimeout(() => setSaveStatus("idle"), 3000);
  };

  // ── Login screen ────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
          <h1 className="font-serif text-3xl text-brand-teal font-semibold mb-6 text-center">Admin Access</h1>
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
              disabled={isAuthLoading || !accessCode}
              className="w-full py-3 bg-brand-teal text-white rounded-xl font-semibold disabled:opacity-50 transition-opacity"
            >
              {isAuthLoading ? "Verifying..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Authenticated layout ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-brand-cream flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-white border-r border-brand-teal/10 flex flex-col py-8 px-4">
        <p className="text-xs font-bold text-brand-slate/40 uppercase tracking-widest px-3 mb-4">Admin</p>
        <nav className="space-y-1 flex-1">
          {(
            [
              { id: "waitlist", label: "Waitlist", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" },
              { id: "site-dynamics", label: "Site Dynamics", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
            ] as { id: Tab; label: string; icon: string }[]
          ).map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === id
                  ? "bg-brand-teal/10 text-brand-teal"
                  : "text-brand-slate/60 hover:bg-brand-cream hover:text-brand-slate"
              }`}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
              </svg>
              {label}
            </button>
          ))}
        </nav>
        <p className="text-xs text-brand-slate/30 px-3">Nani&apos;s Touch</p>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 md:p-12 overflow-auto">

        {/* ── Waitlist tab ──────────────────────────────────────────────────── */}
        {activeTab === "waitlist" && (
          <div className="max-w-5xl">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h1 className="font-serif text-4xl text-brand-teal font-bold mb-1">Waitlist</h1>
                <p className="text-brand-slate/60 text-sm">View and manage waitlist entries.</p>
              </div>
              <button
                onClick={fetchWaitlist}
                className="px-4 py-2 bg-brand-peach/10 text-brand-peach hover:bg-brand-peach/20 rounded-lg font-semibold text-sm transition-colors"
              >
                Refresh
              </button>
            </div>

            {waitlistError && <p className="text-red-500 text-sm mb-4">{waitlistError}</p>}

            {waitlistLoading ? (
              <div className="text-center py-20 text-brand-slate/50">Loading entries...</div>
            ) : (
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-brand-teal/10">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-brand-teal/5 text-brand-slate">
                      <tr>
                        <th className="px-6 py-4 font-semibold text-sm">Date</th>
                        <th className="px-6 py-4 font-semibold text-sm">Name</th>
                        <th className="px-6 py-4 font-semibold text-sm">Phone</th>
                        <th className="px-6 py-4 font-semibold text-sm">Location</th>
                        <th className="px-6 py-4 font-semibold text-sm text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-teal/10">
                      {waitlist.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-brand-slate/50">
                            No one has joined the waitlist yet.
                          </td>
                        </tr>
                      ) : (
                        waitlist.map((entry) => (
                          <tr key={entry.id} className="hover:bg-brand-cream/50 transition-colors">
                            <td className="px-6 py-4 text-sm text-brand-slate/70">
                              {new Date(entry.created_at).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 font-medium text-brand-teal">{entry.name}</td>
                            <td className="px-6 py-4 text-brand-slate">{entry.phone}</td>
                            <td className="px-6 py-4 text-brand-slate/80">{entry.location}</td>
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => handleDelete(entry.id)}
                                className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Site Dynamics tab ─────────────────────────────────────────────── */}
        {activeTab === "site-dynamics" && (
          <div className="max-w-2xl">
            <div className="mb-8">
              <h1 className="font-serif text-4xl text-brand-teal font-bold mb-1">Site Dynamics</h1>
              <p className="text-brand-slate/60 text-sm">Control live site content without a deploy.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg border border-brand-teal/10 p-8 space-y-8">
              {/* Scarcity Bar */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-serif text-xl text-brand-teal font-semibold">Scarcity Bar</h2>
                    <p className="text-xs text-brand-slate/50 mt-0.5">Top announcement strip shown to new visitors</p>
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

                {/* Preview */}
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
        )}

      </main>
    </div>
  );
}
