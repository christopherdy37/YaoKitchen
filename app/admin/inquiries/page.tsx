"use client";

import { useEffect, useState, useCallback } from "react";
import { X, ChevronDown } from "lucide-react";

interface Inquiry {
  id: string;
  bookingRef: string;
  fullName: string;
  mobile: string;
  viber: string | null;
  email: string | null;
  eventDate: string;
  eventStartTime: string;
  eventLocation: string;
  package: string;
  guestCount: number;
  notes: string | null;
  status: string;
  adminNotes: string | null;
  createdAt: string;
}

const STATUS_OPTS = ["all", "pending", "confirmed", "cancelled"];
const PACKAGE_OPTS = ["all", "Basic", "Standard", "Premium"];

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("all");
  const [pkg, setPkg] = useState("all");
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [saving, setSaving] = useState(false);
  const [editStatus, setEditStatus] = useState("");
  const [editNotes, setEditNotes] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (status !== "all") params.set("status", status);
    if (pkg !== "all") params.set("package", pkg);
    fetch(`/api/admin/inquiries?${params}`)
      .then((r) => r.json())
      .then((data) => { setInquiries(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [status, pkg]);

  useEffect(() => { load(); }, [load]);

  function openSlideOver(inq: Inquiry) {
    setSelected(inq);
    setEditStatus(inq.status);
    setEditNotes(inq.adminNotes ?? "");
  }

  async function saveChanges() {
    if (!selected) return;
    setSaving(true);
    await fetch(`/api/admin/inquiries/${selected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: editStatus, adminNotes: editNotes }),
    });
    setSaving(false);
    setSelected(null);
    load();
  }

  return (
    <div className="px-8 py-8">
      <div className="mb-6">
        <h1 className="font-playfair text-2xl font-bold text-charcoal">Inquiries</h1>
        <p className="mt-1 font-inter text-sm text-charcoal/50">
          {loading ? "Loading…" : `${inquiries.length} result${inquiries.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-5 flex flex-wrap gap-3">
        <div className="relative">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3.5 pr-8 font-inter text-sm text-charcoal outline-none focus:border-forest focus:ring-1 focus:ring-forest"
          >
            {STATUS_OPTS.map((s) => (
              <option key={s} value={s}>{s === "all" ? "All statuses" : s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-charcoal/40" />
        </div>

        <div className="relative">
          <select
            value={pkg}
            onChange={(e) => setPkg(e.target.value)}
            className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3.5 pr-8 font-inter text-sm text-charcoal outline-none focus:border-forest focus:ring-1 focus:ring-forest"
          >
            {PACKAGE_OPTS.map((p) => (
              <option key={p} value={p}>{p === "all" ? "All packages" : p}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-charcoal/40" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {["Ref", "Name", "Event Date", "Package", "Pax", "Status", ""].map((h) => (
                <th key={h} className="px-4 py-3 font-inter text-xs font-semibold uppercase tracking-widest text-charcoal/40">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center font-inter text-sm text-charcoal/40">Loading…</td>
              </tr>
            ) : inquiries.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center font-inter text-sm text-charcoal/40">No inquiries found</td>
              </tr>
            ) : (
              inquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-gray-50/60">
                  <td className="px-4 py-3 font-mono text-xs text-charcoal/60">{inq.bookingRef}</td>
                  <td className="px-4 py-3 font-inter text-sm font-medium text-charcoal">{inq.fullName}</td>
                  <td className="px-4 py-3 font-inter text-sm text-charcoal/70">
                    {new Date(inq.eventDate).toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric" })}
                  </td>
                  <td className="px-4 py-3 font-inter text-sm text-charcoal/70">{inq.package}</td>
                  <td className="px-4 py-3 font-inter text-sm text-charcoal/70">{inq.guestCount}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full border px-2.5 py-0.5 font-inter text-xs font-medium capitalize ${STATUS_COLORS[inq.status] ?? "bg-gray-50 text-gray-600 border-gray-200"}`}>
                      {inq.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => openSlideOver(inq)} className="font-inter text-xs font-medium text-forest hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Slide-over */}
      {selected && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/30" onClick={() => setSelected(null)} />
          <div className="w-full max-w-md overflow-y-auto bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h2 className="font-inter text-sm font-semibold text-charcoal">Inquiry Detail</h2>
              <button onClick={() => setSelected(null)} className="rounded p-1 hover:bg-gray-100">
                <X className="h-4 w-4 text-charcoal/60" />
              </button>
            </div>

            <div className="space-y-4 px-6 py-5">
              <div>
                <p className="font-inter text-xs font-semibold uppercase tracking-widest text-charcoal/40">Booking Ref</p>
                <p className="mt-0.5 font-mono text-sm text-charcoal">{selected.bookingRef}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-inter text-xs font-semibold uppercase tracking-widest text-charcoal/40">Name</p>
                  <p className="mt-0.5 font-inter text-sm text-charcoal">{selected.fullName}</p>
                </div>
                <div>
                  <p className="font-inter text-xs font-semibold uppercase tracking-widest text-charcoal/40">Mobile</p>
                  <p className="mt-0.5 font-inter text-sm text-charcoal">{selected.mobile}</p>
                </div>
                {selected.viber && (
                  <div>
                    <p className="font-inter text-xs font-semibold uppercase tracking-widest text-charcoal/40">Viber</p>
                    <p className="mt-0.5 font-inter text-sm text-charcoal">{selected.viber}</p>
                  </div>
                )}
                {selected.email && (
                  <div>
                    <p className="font-inter text-xs font-semibold uppercase tracking-widest text-charcoal/40">Email</p>
                    <p className="mt-0.5 font-inter text-sm text-charcoal">{selected.email}</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-inter text-xs font-semibold uppercase tracking-widest text-charcoal/40">Event Date</p>
                  <p className="mt-0.5 font-inter text-sm text-charcoal">
                    {new Date(selected.eventDate).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
                <div>
                  <p className="font-inter text-xs font-semibold uppercase tracking-widest text-charcoal/40">Start Time</p>
                  <p className="mt-0.5 font-inter text-sm text-charcoal">{selected.eventStartTime}</p>
                </div>
                <div>
                  <p className="font-inter text-xs font-semibold uppercase tracking-widest text-charcoal/40">Location</p>
                  <p className="mt-0.5 font-inter text-sm text-charcoal">{selected.eventLocation}</p>
                </div>
                <div>
                  <p className="font-inter text-xs font-semibold uppercase tracking-widest text-charcoal/40">Package</p>
                  <p className="mt-0.5 font-inter text-sm text-charcoal">{selected.package}</p>
                </div>
                <div>
                  <p className="font-inter text-xs font-semibold uppercase tracking-widest text-charcoal/40">Guests</p>
                  <p className="mt-0.5 font-inter text-sm text-charcoal">{selected.guestCount} pax</p>
                </div>
              </div>

              {selected.notes && (
                <div>
                  <p className="font-inter text-xs font-semibold uppercase tracking-widest text-charcoal/40">Notes from client</p>
                  <p className="mt-0.5 font-inter text-sm text-charcoal/70">{selected.notes}</p>
                </div>
              )}

              <hr className="border-gray-100" />

              <div>
                <label className="mb-1.5 block font-inter text-xs font-semibold uppercase tracking-widest text-charcoal/40">Status</label>
                <div className="relative">
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-3.5 pr-8 font-inter text-sm text-charcoal outline-none focus:border-forest focus:ring-1 focus:ring-forest"
                  >
                    {["pending", "confirmed", "cancelled"].map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-charcoal/40" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block font-inter text-xs font-semibold uppercase tracking-widest text-charcoal/40">Admin Notes</label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Internal notes…"
                  className="w-full resize-none rounded-lg border border-gray-200 px-3.5 py-2.5 font-inter text-sm text-charcoal outline-none focus:border-forest focus:ring-1 focus:ring-forest"
                />
              </div>

              <button
                onClick={saveChanges}
                disabled={saving}
                className="flex w-full items-center justify-center rounded-lg bg-forest py-2.5 font-inter text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
