// --- INICIO DEL CÓDIGO FINAL PARA: components/navigation.tsx ---

"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
<<<<<<< HEAD
import { useUser } from "@/contexts/UserContext";
=======
import { useUser } from "@/contexts/UserContext"; // Importamos el hook
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Mic, Menu, X, User as UserIcon } from "lucide-react";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
<<<<<<< HEAD
  const { user, profile, isLoading } = useUser();
  
  const pathname = usePathname();
  const navItems = user
    ? [ { href: "/create", label: "Create" }, { href: "/podcasts", label: "Micro-pods" } ]
    : [ { href: "/podcasts", label: "Micro-pods" }, { href: "/pricing", label: "Pricing" } ];

=======
  const { user, profile, isLoading } = useUser(); // Obtenemos el usuario y el perfil del contexto global
  
  const pathname = usePathname();
  const navItems = [
    { href: "/create", label: "Create" },
    { href: "/podcasts", label: "Micro-pods" },
    { href: "/pricing", label: "Pricing" },
  ];
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
  const isActive = (href: string) => pathname === href;

  return (
    <nav className="sticky top-0 z-50 bg-white/20 backdrop-blur-xl border-b border-white/30 shadow-glass dark:bg-gray-900/20 dark:border-gray-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 group">
<<<<<<< HEAD
             <div className="p-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 animate-glow"><Mic className="h-6 w-6 text-white" /></div>
=======
             <div className="p-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 animate-glow">
               <Mic className="h-6 w-6 text-white" />
             </div>
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
             <span className="text-2xl font-bold text-gradient">NicePod</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
<<<<<<< HEAD
              <Link key={item.href} href={item.href} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(item.href) ? "bg-white/30 text-primary-accessible" : "text-gray-300 hover:text-white"}`}>
=======
              <Link key={item.href} href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href) ? "bg-white/30 text-primary-accessible" : "text-gray-300 hover:text-white"
                }`}
              >
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
<<<<<<< HEAD
            <div className="hidden sm:flex items-center gap-2">
              {isLoading ? (
                <div className="flex items-center gap-2"><div className="w-20 h-9 bg-gray-700/50 rounded-md animate-pulse"></div><div className="w-24 h-9 bg-gray-700/50 rounded-md animate-pulse"></div></div>
              ) : user ? (
                <div className="flex items-center gap-4">
                  <Link href="/profile">
                    <Avatar className="h-9 w-9 cursor-pointer">
                      <AvatarImage src={profile?.avatar_url || ''} alt={profile?.full_name || 'User Avatar'} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"><UserIcon className="h-5 w-5" /></AvatarFallback>
                    </Avatar>
                  </Link>
                  <Link href="/create"><Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">Create New Podcast</Button></Link>
                </div>
              ) : (
                <>
                  <Link href="/login"><Button variant="ghost">Log In</Button></Link>
                  <Link href="/signup"><Button>Sign Up</Button></Link>
                </>
              )}
            </div>
            <div className="md:hidden"><Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>{isMobileMenuOpen ? <X /> : <Menu />}</Button></div>
          </div>
        </div>
        {/* Aquí puedes añadir la lógica para el menú móvil, que también usaría 'navItems' y 'user' */}
=======
            {isLoading ? (
              // Muestra un esqueleto de carga mientras se verifica la sesión
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-20 h-9 bg-gray-700/50 rounded-md animate-pulse"></div>
                <div className="w-24 h-9 bg-gray-700/50 rounded-md animate-pulse"></div>
              </div>
            ) : user ? (
              // Si HAY usuario, muestra el avatar y el botón de crear
              <div className="hidden sm:flex items-center gap-4">
                <Link href="/profile">
                  <Avatar className="h-9 w-9 cursor-pointer">
                    <AvatarImage src={profile?.avatar_url || ''} alt={profile?.full_name || 'User Avatar'} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                      <UserIcon className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <Link href="/create">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">Create New Podcast</Button>
                </Link>
              </div>
            ) : (
              // Si NO hay usuario, muestra Log In / Sign Up
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login"><Button variant="ghost">Log In</Button></Link>
                <Link href="/signup"><Button>Sign Up</Button></Link>
              </div>
            )}
            
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </div>
        {/* ... Menú Móvil Desplegable (debería replicar la lógica condicional de arriba) ... */}
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
      </div>
    </nav>
  );
}
// --- FIN DEL CÓDIGO FINAL PARA: components/navigation.tsx ---