// --- INICIO DEL CÓDIGO FINAL PARA: app/layout.tsx ---

import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/navigation";
import { AudioProvider } from "@/contexts/audio-context";
import { MiniAudioPlayer } from "@/components/mini-audio-player";
import { UserProvider } from "@/contexts/UserContext";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = { title: "NicePod", description: "Create & Share Micro-Podcasts" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>{/* ... tu script de tema ... */}</head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <UserProvider session={session}>
            <AudioProvider>
              <div className="min-h-screen gradient-mesh">
                <Navigation session={session} />
                <main className="relative z-10">{children}</main>
                <MiniAudioPlayer />
                <Toaster />
              </div>
            </AudioProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
// --- FIN DEL CÓDIGO FINAL PARA: app/layout.tsx ---