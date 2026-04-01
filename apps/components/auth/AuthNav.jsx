import Link from "next/link";

const NAV_LINKS = ["Shop", "Categories", "Deals"];

export default function AuthNav() {
  return (
    <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2 no-underline">
        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-600 to-blue-400 flex items-center justify-center text-base">
          📦
        </div>
        <span className="font-extrabold text-lg text-slate-900">TechNest</span>
      </Link>

      <div className="flex items-center gap-8">
        {NAV_LINKS.map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase()}`}
            className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors no-underline"
          >
            {item}
          </Link>
        ))}
      </div>
    </nav>
  );
}
