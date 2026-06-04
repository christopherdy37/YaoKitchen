"use client";

import { useEffect, useState, useCallback } from "react";
import { Trash2, Plus, X } from "lucide-react";

interface BlockedDate {
  id: string;
  blockedDate: string;
  reason: string | null;
}

interface ConfirmedBooking {
  id: string;
  bookingRef: string;
  fullName: string;
  eventDate: string;
  package: string;
  guestCount: number;
}

export default function CalendarPage() {
  const [blocked, setBlocked] = useState<BlockedDate[]>([]);
  const [confirmed, setConfirmed] = useState<ConfirmedBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newReason, setNewReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const [blockedRes, confirmedRes] = await Promise.all([
      fetch("/api/admin/blocked-dates"),
      fetch("/api/admin/inquiries?status=confirmed"),
    ]);
    setBlocked(await blockedRes.json());
    setConfirmed(await confirmedRes.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function addDate() {
    if (!newDate) { setError("Date is required"); return; }
    setError("");
    setSubmitting(true);
    const res = await fetch("/api/admin/blocked-dates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: newDate, reason: newReason || undefined }),
    });
    setSubmitting(false);
    if (!res.ok) {
      const d = await res.json();
      setError(d.error ?? "Failed to block date");
      return;
    }
    setNewDate("");
    setNewReason("");
    setShowForm(false);
    load();
  }

  async function removeDate(id: string) {
    await fetch(`/api/admin/blocked-dates/${id}`, { method: "DELETE" });
    load();
  }

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="px-8 py-8">
      <div className="mb-6">
        <h1 className="font-playfair text-2xl font-bold text-charcoal">Calendar</h1>
        <p className="mt-1 font-inter text-sm text-charcoal/50">Manage blocked dates and confirmed bookings</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Blocked Dates */}
        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h2 className="font-inter text-sm font-semibold text-charcoal">Blocked Dates</h2>
            <button
              onClick={() => { setShowForm((v) => !v); setError(""); }}
              className="flex items-center gap-1.5 rounded-lg bg-forest px-3 py-1.5 font-inter text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              {showForm ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              {showForm ? "Cancel" : "Block Date"}
            </button>
          </div>

          {showForm && (
            <div className="border-b border-gray-100 px-5 py-4 space-y-3 bg-gray-50">
              <div>
                <label className="mb-1 block font-inter text-xs font-semibold uppercase tracking-widest text-charcoal/40">
                  Date
                </label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  min={new Date().toISOString().slice(0, 10)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2 font-inter text-sm text-charcoal outline-none focus:border-forest focus:ring-1 focus:ring-forest"
                />
              </div>
              <div>
                <label className="mb-1 block font-inter text-xs font-semibold uppercase tracking-widest text-charcoal/40">
                  Reason (optional)
                </label>
                <input
                  type="text"
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  placeholder="e.g. Holiday, Full booking"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2 font-inter text-sm text-charcoal outline-none focus:border-forest focus:ring-1 focus:ring-forest"
                />
              </div>
              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 font-inter text-xs text-red-600">{error}</p>
              )}
              <button
                onClick={addDate}
                disabled={submitting}
                className="flex w-full items-center justify-center rounded-lg bg-forest py-2 font-inter text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {submitting ? "Blocking…" : "Block Date"}
              </button>
            </div>
          )}

          <div className="divide-y divide-gray-50">
            {loading ? (
              <p className="px-5 py-8 text-center font-inter text-sm text-charcoal/40">Loading…</p>
            ) : blocked.length === 0 ? (
              <p className="px-5 py-8 text-center font-inter text-sm text-charcoal/40">No blocked dates</p>
            ) : (
              blocked.map((d) => (
                <div key={d.id} className="flex items-center justify-between px-5 py-3">
                  <div>
                    <p className="font-inter text-sm font-medium text-charcoal">{fmt(d.blockedDate)}</p>
                    {d.reason && (
                      <p className="font-inter text-xs text-charcoal/50">{d.reason}</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeDate(d.id)}
                    className="rounded p-1.5 text-red-400 hover:bg-red-50 transition-colors"
                    aria-label="Remove block"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Confirmed Bookings */}
        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 px-5 py-4">
            <h2 className="font-inter text-sm font-semibold text-charcoal">Confirmed Bookings</h2>
          </div>

          <div className="divide-y divide-gray-50">
            {loading ? (
              <p className="px-5 py-8 text-center font-inter text-sm text-charcoal/40">Loading…</p>
            ) : confirmed.length === 0 ? (
              <p className="px-5 py-8 text-center font-inter text-sm text-charcoal/40">No confirmed bookings</p>
            ) : (
              confirmed.map((b) => (
                <div key={b.id} className="px-5 py-3">
                  <p className="font-inter text-sm font-medium text-charcoal">{fmt(b.eventDate)}</p>
                  <p className="font-inter text-xs text-charcoal/60">
                    {b.fullName} · {b.package} · {b.guestCount} pax
                  </p>
                  <p className="font-mono text-xs text-charcoal/40">{b.bookingRef}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
