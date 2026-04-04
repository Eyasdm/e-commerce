"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { Search, ShoppingCart, User, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/hooks/cart/useCart";
import { useAuth } from "@/context/AuthContext";
import Logo from "./Logo";

export default function Navbar() {
  const { data: cart = [] } = useCart();
  const { isAuthenticated } = useAuth();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const pathname = usePathname();
  const router = useRouter();

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const navLink = (condition) =>
    clsx(
      "text-gray-600 hover:text-gray-800 transition-colors",
      condition && "text-gray-900",
    );

  const handleSearch = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    router.push(`/search?q=${query}`);
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <header className="w-full border-b border-border bg-card">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <Logo />

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className={navLink(pathname === "/")}>
            Home
          </Link>
          <Link href="/shop" className={navLink(pathname.startsWith("/shop"))}>
            Shop
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger
              className={clsx(
                "flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors",
                pathname.startsWith("/categories") && "text-gray-900",
              )}
            >
              Categories <ChevronDown size={16} />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="start"
              className="w-64 p-2 rounded-xl border border-gray-200 shadow-xl backdrop-blur bg-white/95"
            >
              <div className="grid gap-1">
                <DropdownMenuItem asChild>
                  <Link
                    href="/categories/headphones"
                    className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    <span>Headphones</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/categories/chargers"
                    className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    <span>Chargers</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/categories/powerbanks"
                    className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    <span>Power Banks</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/categories/keyboards"
                    className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    <span>Keyboards</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/categories/mouse"
                    className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    <span>Mouse</span>
                  </Link>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/deals"
            className={navLink(pathname.startsWith("/deals"))}
          >
            Deals
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div
            className={clsx(
              "flex items-center transition-all duration-300",
              searchOpen ? "w-64" : "w-auto",
            )}
          >
            {searchOpen ? (
              <form
                onSubmit={handleSearch}
                className="flex items-center bg-gray-100 rounded-full px-3 py-1 w-full"
              >
                <Search size={18} className="text-gray-500" />

                <input
                  autoFocus
                  type="text"
                  placeholder="Search accessories..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-transparent outline-none px-2 text-sm w-full"
                />

                <button type="button" onClick={() => setSearchOpen(false)}>
                  <X size={18} />
                </button>
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
              >
                <Search size={20} />
              </Button>
            )}
          </div>

          <div className="h-6 w-px bg-border" />

          <Link href={isAuthenticated ? "/account" : "/auth"}>
            <Button variant="ghost" size="icon">
              <User size={20} />
            </Button>
          </Link>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 text-xs bg-primary text-white px-1.5 rounded-full">
                {cartCount}
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
