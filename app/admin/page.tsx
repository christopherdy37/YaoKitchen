"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ClipboardList, CheckCircle, Clock, XCircle, Calendar } from "lucide-react";

interface Inquiry {
  id: string;
  bookingRef: string;
  fullName: string;
  mobile: string;
  eventDate: string;
  eventLocation: string;
  package: string;
  guestCount: number;
  status: string;
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/inquiries")
      .then((r) => r.json())
      .then((data) => {
        setInquiries(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const total = inquiries.length;
  const pending = inquiries.filter((i) => i.status === "pending").length;
  const confirmed = inquiries.filter((i) => i.status === "confirmed").length;
  const cancelled = inquiries.filter((i) => i.status === "cancelled").length;
  const recent = inquiries.slice(0, 10);

  return (
    <div className="px-8 py-8">
      <div className="mb-8">
        <h1 className="font-playfair text-2xl font-bold text-charcoal">Dashboard</h1>
        <p className="mt-1 font-inter text-sm text-charcoal/50">Overview of all inquiries</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total", value: total, icon: ClipboardList, color: "text-charcoal" },
          { label: "Pending", value: pending, icon: Clock, color: "text-amber-600" },
          { label: "Confirmed", value: confirmed, icon: CheckCircle, color: "text-green-600" },
          { label: "Cancelled", value: cancelled, icon: XCircle, color: "text-red-500" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-xl border border-gray-200 bg-white px-5 py-4">
            <div className="flex items-center justify-between">
              <p className="font-inter text-xs font-semibold uppercase tracking-widest text-charcoal/40">
                {label}
              </p>
              <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <p className={`mt-2 font-playfair text-3xl font-bold ${color}`}>
              {loading ? "—" : value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent inquiries */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="font-inter text-sm font-semibold text-charcoal">Recent Inquiries</h2>
          <Link
            href="/admin/inquiries"
            className="font-inter text-xs font-medium text-forest hover:underline"
          >
            View all
          </Link>
        </div>

        {loading ? (
          <div className="px-5 py-10 text-center font-inter text-sm text-charcoal/40">
            Loading…
          </div>
        ) : recent.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-5 py-12 text-center">
            <Calendar className="h-8 w-8 text-charcoal/20" />
            <p className="font-inter text-sm text-charcoal/40">No inquiries yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recent.map((inq) => (
              <div key={inq.id} className="flex items-center justify-between px-5 py-3.5">
                <div className="min-w-0">
                  <p className="font-inter text-sm font-medium text-charcoal truncate">
                    {inq.fullName}
                  </p>
                  <p className="font-inter text-xs text-charcoal/50">
                    {new Date(inq.eventDate).toLocaleDateString("en-PH", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    · {inq.package} · {inq.guestCount} pax
                  </p>
                </div>
                <span
                  className={`ml-4 shrink-0 rounded-full border px-2.5 py-0.5 font-inter text-xs font-medium capitalize ${
                    STATUS_COLORS[inq.status] ?? "bg-gray-50 text-gray-600 border-gray-200"
                  }`}
                >
                  {inq.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
