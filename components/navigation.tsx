// --- INICIO DEL CÓDIGO FINAL PARA: components/navigation.tsx ---

"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Session } from '@supabase/auth-helpers-nextjs';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Mic, Menu, X, User as UserIcon } from "lucide-react";

export function Navigation({ session }: { session: Session | null }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = session?.user;
  const pathname = usePathname();
  
  const navItems = user
    ? [ { href: "/create", label: "Create" }, { href: "/podcasts", label: "Micro-pods" } ]
    : [ { href: "/podcasts", label: "Micro-pods" }, { href: "/pricing", label: "Pricing" } ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="sticky top-0 z-50 ...">
      <div className="max-w-7xl mx-auto ...">
        <div className="flex justify-between items-center h-16 ...">
          <Link href="/" className="..."><Mic/><span>NicePod</span></Link>
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => ( <Link key={item.href} href={item.href} className="..."> {item.label} </Link> ))}
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <div className="hidden sm:flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-4">
                  <Link href="/profile"><Avatar><AvatarImage src={user.user_metadata?.avatar_url} /><AvatarFallback><UserIcon /></AvatarFallback></Avatar></Link>
                  <Link href="/create"><Button>Create New Podcast</Button></Link>
                </div>
              ) : (
                <>
                  <Link href="/login"><Button variant="ghost">Log In</Button></Link>
                  <Link href="/signup"><Button>Sign Up</Button></Link>
                </>
              )}
            </div>
            {/* ... Menú Móvil ... */}
          </div>
        </div>
      </div>
    </nav>
  );
}
// --- FIN DEL CÓDIGO FINAL PARA: components/navigation.tsx ---