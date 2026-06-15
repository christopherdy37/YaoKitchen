"use client";

import { useEffect, useState, useCallback } from "react";
import QRCode from "qrcode";
import { Copy, Download, Plus, X, CheckCircle, Trash2 } from "lucide-react";

interface Partner {
  id: string;
  name: string;
  slug: string;
  location: string | null;
  active: boolean;
  createdAt: string;
  _count: { inquiries: number };
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [location, setLocation] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/partners")
      .then((r) => r.json())
      .then((data) => { setPartners(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  function handleNameChange(val: string) {
    setName(val);
    setSlug(slugify(val));
  }

  async function createPartner() {
    if (!name || !slug) { setCreateError("Name and slug required"); return; }
    setCreateError("");
    setCreating(true);
    const res = await fetch("/api/admin/partners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, slug, location: location || undefined }),
    });
    setCreating(false);
    if (!res.ok) {
      const d = await res.json();
      setCreateError(d.error ?? "Failed to create partner");
      return;
    }
    setName(""); setSlug(""); setLocation("");
    setShowModal(false);
    load();
  }

  async function deletePartner(partner: Partner) {
    if (!confirm(`Delete "${partner.name}"? This cannot be undone.`)) return;
    await fetch(`/api/admin/partners/${partner.id}`, { method: "DELETE" });
    load();
  }

  async function toggleActive(partner: Partner) {
    await fetch(`/api/admin/partners/${partner.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !partner.active }),
    });
    load();
  }

  async function copyLink(slug: string) {
    await navigator.clipboard.writeText(`${baseUrl}/partner/${slug}`);
    setCopied(slug);
    setTimeout(() => setCopied(null), 2000);
  }

  async function downloadQR(partner: Partner) {
    const url = `${baseUrl}/partner/${partner.slug}`;
    const dataUrl = await QRCode.toDataURL(url, { width: 400, margin: 2 });
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `qr-${partner.slug}.png`;
    a.click();
  }

  return (
    <div className="px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-charcoal">Partners</h1>
          <p className="mt-1 font-inter text-sm text-charcoal/50">
            {loading ? "Loading…" : `${partners.length} partner${partners.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <button
          onClick={() => { setShowModal(true); setCreateError(""); }}
          className="flex items-center gap-2 rounded-lg bg-forest px-4 py-2.5 font-inter text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          New Partner
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {["Name", "Slug / URL", "Location", "Inquiries", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 font-inter text-xs font-semibold uppercase tracking-widest text-charcoal/40">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-10 text-center font-inter text-sm text-charcoal/40">Loading…</td></tr>
            ) : partners.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-10 text-center font-inter text-sm text-charcoal/40">No partners yet</td></tr>
            ) : (
              partners.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/60">
                  <td className="px-4 py-3">
                    <p className="font-inter text-sm font-medium text-charcoal">{p.name}</p>
                    <p className="font-inter text-xs text-charcoal/40">
                      {new Date(p.createdAt).toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric" })}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-mono text-xs text-charcoal/60">{p.slug}</p>
                    <p className="font-inter text-xs text-charcoal/40 truncate max-w-[180px]">
                      {baseUrl}/partner/{p.slug}
                    </p>
                  </td>
                  <td className="px-4 py-3 font-inter text-sm text-charcoal/60">{p.location ?? "—"}</td>
                  <td className="px-4 py-3 font-inter text-sm text-charcoal/70">{p._count.inquiries}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleActive(p)}
                      className={`rounded-full border px-2.5 py-0.5 font-inter text-xs font-medium transition-colors ${
                        p.active
                          ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                          : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {p.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyLink(p.slug)}
                        className="flex items-center gap-1 rounded px-2 py-1 font-inter text-xs text-charcoal/60 hover:bg-gray-100 transition-colors"
                      >
                        {copied === p.slug
                          ? <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                          : <Copy className="h-3.5 w-3.5" />}
                        {copied === p.slug ? "Copied" : "Copy"}
                      </button>
                      <button
                        onClick={() => downloadQR(p)}
                        className="flex items-center gap-1 rounded px-2 py-1 font-inter text-xs text-charcoal/60 hover:bg-gray-100 transition-colors"
                      >
                        <Download className="h-3.5 w-3.5" />
                        QR
                      </button>
                      <button
                        onClick={() => deletePartner(p)}
                        className="flex items-center gap-1 rounded px-2 py-1 font-inter text-xs text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-inter text-base font-semibold text-charcoal">New Partner</h2>
              <button onClick={() => setShowModal(false)} className="rounded p-1 hover:bg-gray-100">
                <X className="h-4 w-4 text-charcoal/60" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block font-inter text-xs font-semibold uppercase tracking-widest text-charcoal/40">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Funeraria Paz"
                  className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 font-inter text-sm text-charcoal outline-none focus:border-forest focus:ring-1 focus:ring-forest"
                />
              </div>
              <div>
                <label className="mb-1.5 block font-inter text-xs font-semibold uppercase tracking-widest text-charcoal/40">
                  Slug <span className="normal-case font-normal text-charcoal/30">(auto-generated, editable)</span>
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. funeraria-paz"
                  className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 font-mono text-sm text-charcoal outline-none focus:border-forest focus:ring-1 focus:ring-forest"
                />
                {slug && (
                  <p className="mt-1 font-inter text-xs text-charcoal/40">
                    URL: {baseUrl}/partner/{slug}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block font-inter text-xs font-semibold uppercase tracking-widest text-charcoal/40">Location (optional)</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Quezon City"
                  className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 font-inter text-sm text-charcoal outline-none focus:border-forest focus:ring-1 focus:ring-forest"
                />
              </div>

              {createError && (
                <p className="rounded-lg bg-red-50 px-3.5 py-2.5 font-inter text-sm text-red-600">{createError}</p>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-lg border border-gray-200 py-2.5 font-inter text-sm font-medium text-charcoal/60 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createPartner}
                  disabled={creating}
                  className="flex-1 rounded-lg bg-forest py-2.5 font-inter text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {creating ? "Creating…" : "Create Partner"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
