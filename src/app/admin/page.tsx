"use client";

import { useState } from "react";
import { getWaitlist, deleteWaitlistEntry } from "@/app/actions";

export default function AdminPage() {
  const [accessCode, setAccessCode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [waitlist, setWaitlist] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode) {
      setIsAuthenticated(true);
      fetchWaitlist();
    }
  };

  const fetchWaitlist = async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await getWaitlist(accessCode);
      if (result.error) {
        throw new Error(result.error);
      }
      setWaitlist(result.data || []);
    } catch (err: any) {
      console.error(err);
      setError("Invalid access code or failed to fetch data.");
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    try {
      const result = await deleteWaitlistEntry(id, accessCode);
      if (result.error) {
        throw new Error(result.error);
      }
      setWaitlist(waitlist.filter((entry) => entry.id !== id));
    } catch (err: any) {
      console.error(err);
      alert("Failed to delete entry.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
          <h1 className="font-serif text-3xl text-brand-teal font-semibold mb-6 text-center">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-brand-slate uppercase tracking-wider mb-2">Access Code</label>
              <input
                type="password"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-brand-teal/20 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
                placeholder="Enter access code"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full py-3 bg-brand-teal text-white rounded-xl font-semibold">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="font-serif text-4xl text-brand-teal font-bold mb-2">Waitlist Admin</h1>
            <p className="text-brand-slate/60">View and manage waitlist entries.</p>
          </div>
          <button onClick={fetchWaitlist} className="px-4 py-2 bg-brand-peach/10 text-brand-peach hover:bg-brand-peach/20 rounded-lg font-semibold transition-colors flex items-center gap-2">
            Refresh
          </button>
        </div>

        {isLoading ? (
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
    </div>
  );
}
