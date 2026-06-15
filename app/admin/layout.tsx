import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { UtensilsCrossed, ClipboardList, CalendarDays, Users, LogOut } from "lucide-react";

const NAV = [
  { href: "/admin/inquiries", label: "Inquiries", icon: ClipboardList },
  { href: "/admin/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/admin/partners", label: "Partners", icon: Users },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session.adminId) {
    redirect("/admin/login");
  }
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-gray-200 bg-white flex flex-col">
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-forest">
            <UtensilsCrossed className="h-4 w-4 text-gold" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-playfair text-sm font-bold text-charcoal tracking-wide">
              YAO&apos;S
            </span>
            <span className="font-inter text-[8px] font-semibold uppercase tracking-widest text-forest/60">
              Admin
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-inter text-sm font-medium text-charcoal/70 hover:bg-gray-50 hover:text-charcoal transition-colors"
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-gray-100">
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-inter text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {children}
      </div>
    </div>
  );
}
