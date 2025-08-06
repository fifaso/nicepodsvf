// --- INICIO DEL CÓDIGO FINAL PARA: app/layout.tsx ---

import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
<<<<<<< HEAD
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
=======
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/navigation";
import { AudioProvider } from "@/contexts/audio-context";
import { MiniAudioPlayer } from "@/components/mini-audio-player";
<<<<<<< HEAD
import { UserProvider } from "@/contexts/UserContext";
=======
import { ErrorBoundary } from "@/components/error-boundary";
import { UserProvider } from "@/contexts/UserContext"; // Importamos el proveedor
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = { title: "NicePod", description: "Create & Share Micro-Podcasts" };

<<<<<<< HEAD
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  
  // 1. Obtenemos la sesión del usuario
  const { data: { session } } = await supabase.auth.getSession();

  // 2. Si hay sesión, también obtenemos el perfil del usuario
  const { data: profile } = session?.user
    ? await supabase.from('profiles').select('*').eq('id', session.user.id).single()
    : { data: null };

=======
export default function RootLayout({ children }: { children: React.ReactNode }) {
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
  return (
    <html lang="en" suppressHydrationWarning>
      <head>{/* ... tu script de tema ... */}</head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
<<<<<<< HEAD
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* 3. Pasamos TANTO la sesión como el perfil inicial al UserProvider */}
          <UserProvider initialSession={session} initialProfile={profile}>
            <AudioProvider>
              <div className="min-h-screen gradient-mesh">
                <Navigation />
                <main className="relative z-10">{children}</main>
                <MiniAudioPlayer />
                <Toaster />
              </div>
            </AudioProvider>
          </UserProvider>
        </ThemeProvider>
=======
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <UserProvider>
              <AudioProvider>
                <div className="min-h-screen gradient-mesh">
                  <div className="fixed inset-0 pointer-events-none overflow-hidden">{/* ... decoraciones ... */}</div>
                  <Navigation />
                  <main className="relative z-10">{children}</main>
                  <MiniAudioPlayer />
                  <Toaster />
                </div>
              </AudioProvider>
            </UserProvider>
          </ThemeProvider>
        </ErrorBoundary>
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
      </body>
    </html>
  );
}
// --- FIN DEL CÓDIGO FINAL PARA: app/layout.tsx ---