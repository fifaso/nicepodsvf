// --- INICIO DEL CÓDIGO FINAL Y COMPLETO PARA: components/LandingPageClient.tsx ---

"use client";

// Importaciones de UI de v0 y sistema
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PodcastCard } from "@/components/podcast-card";
import { Mic, Play, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAudio } from "@/contexts/audio-context";

// Importaciones para la lógica de Supabase
import type { User } from '@supabase/auth-helpers-nextjs';
import type { Podcast } from "@/types"; // Importamos nuestro tipo de Podcast centralizado

// 1. El componente ahora acepta 'user' y 'initialPodcasts' como propiedades
export default function LandingPageClient({ user, initialPodcasts }: { user: User | null, initialPodcasts: Podcast[] }) {
  const { playPodcast } = useAudio();

  // 2. La función de reproducción ahora usa la URL real del podcast
  const handlePlayPodcast = (podcast: Podcast) => {
    if (podcast.audio_url) {
      playPodcast({
        id: podcast.id.toString(),
        title: podcast.topic.split(';')[0].replace('Tema:', '').trim(),
        description: `Creado el ${new Date(podcast.created_at).toLocaleDateString()}`,
        category: "Community Podcast",
        duration: "5:00", // Placeholder, podríamos añadir una columna 'duration' a la DB en el futuro
        audioUrl: podcast.audio_url,
      });
    }
  };

  // 3. Eliminamos los datos de ejemplo 'featuredPodcasts' y 'samplePodcasts'
  //    porque ahora usamos los datos reales de 'initialPodcasts'.

  return (
    // Hemos eliminado el div contenedor conflictivo para arreglar el layout
    <>
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center text-center overflow-hidden">
        <div className="relative z-10 px-4 md:px-6 max-w-4xl mx-auto space-y-6">
          <h1 className="heading-xl text-gray-900 dark:text-gray-50 drop-shadow-lg">
            Bite-sized Insights, Anytime, Anywhere.
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto drop-shadow-md">
            Discover and create micro-podcasts that fit into your busy life. Learn, share, and grow with concise audio content.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* 
              ▼▼▼ LÓGICA INTELIGENTE #1 ▼▼▼
              Este botón ahora decide a dónde ir basándose en si el 'user' ha iniciado sesión.
            */}
            <Link
              href={user ? "/create" : "/signup"}
              className="relative group inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 overflow-hidden transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-950"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 dark:from-white/15 dark:to-white/8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent dark:via-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div
                className="relative z-10 flex items-center w-full h-full bg-transparent border-none p-0 cursor-pointer text-white"
                aria-label="Start Creating your podcast"
              >
                <div className="mr-3 p-1.5 bg-white/15 dark:bg-white/20 rounded-full group-hover:bg-white/25 dark:group-hover:bg-white/30 transition-all duration-300 shadow-inner">
                  <Mic className="h-5 w-5 drop-shadow-sm" />
                </div>
                <span className="tracking-wide drop-shadow-sm">Start Creating</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Search and Categories Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background/80 backdrop-blur-lg">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <h2 className="heading-lg text-primary-accessible">Find Your Next Listen</h2>
            <p className="text-lg text-secondary-accessible max-w-2xl">
              Search for specific topics or browse through our curated categories.
            </p>
            <div className="w-full max-w-md relative">
              <Input type="search" placeholder="Search podcasts..." className="w-full pr-10 glass-input" />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <div className="mt-12">
            <Tabs defaultValue="latest" className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-2 h-auto p-1 glass-card">
                <TabsTrigger value="latest" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full transition-all duration-200">Latest</TabsTrigger>
                <TabsTrigger value="technology" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full transition-all duration-200">Technology</TabsTrigger>
                <TabsTrigger value="science" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full transition-all duration-200">Science</TabsTrigger>
                <TabsTrigger value="philosophy" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full transition-all duration-200">Philosophy</TabsTrigger>
                <TabsTrigger value="business" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full transition-all duration-200">Business</TabsTrigger>
                <TabsTrigger value="wellness" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full transition-all duration-200">Wellness</TabsTrigger>
              </TabsList>
              <TabsContent value="latest" className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {initialPodcasts.map((podcast) => {
                    const podcastForCard = {
                      id: podcast.id.toString(),
                      title: podcast.topic.split(';')[0].replace('Tema:', '').trim(),
                      description: `Creado el ${new Date(podcast.created_at).toLocaleDateString()}`,
                      author: "Nicepods AI",
                      category: "Community",
                      duration: "5:00",
                      imageUrl: "/images/podcast-covers/default.jpg",
                      authorImageUrl: "/images/authors/default.jpg",
                    };
                    return (
                      <PodcastCard 
                        key={podcast.id} 
                        podcast={podcastForCard}
                        onPlayClick={() => handlePlayPodcast(podcast)}
                        isProcessing={podcast.status !== 'completed'}
                      />
                    )
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 dark:from-purple-900/20 dark:to-indigo-900/20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <h2 className="heading-lg text-primary-accessible">How It Works</h2>
            <p className="text-lg text-secondary-accessible max-w-2xl">
              Creating and discovering micro-podcasts is simple and intuitive.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-card p-6 text-center space-y-4"><CardHeader className="flex flex-col items-center"><div className="p-4 rounded-full bg-primary/10 dark:bg-primary/20 text-primary mb-4"><Mic className="h-8 w-8" /></div><CardTitle className="text-xl font-semibold text-primary-accessible">Record & Edit</CardTitle></CardHeader><CardContent><CardDescription className="text-secondary-accessible">Use our intuitive tools to record your thoughts and trim them to perfection.</CardDescription></CardContent></Card>
            <Card className="glass-card p-6 text-center space-y-4"><CardHeader className="flex flex-col items-center"><div className="p-4 rounded-full bg-primary/10 dark:bg-primary/20 text-primary mb-4"><ArrowRight className="h-8 w-8" /></div><CardTitle className="text-xl font-semibold text-primary-accessible">Publish & Share</CardTitle></CardHeader><CardContent><CardDescription className="text-secondary-accessible">Easily publish your micro-podcast and share it with the world.</CardDescription></CardContent></Card>
            <Card className="glass-card p-6 text-center space-y-4"><CardHeader className="flex flex-col items-center"><div className="p-4 rounded-full bg-primary/10 dark:bg-primary/20 text-primary mb-4"><Search className="h-8 w-8" /></div><CardTitle className="text-xl font-semibold text-primary-accessible">Discover & Learn</CardTitle></CardHeader><CardContent><CardDescription className="text-secondary-accessible">Explore a vast library of bite-sized audio content on diverse topics.</CardDescription></CardContent></Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background/80 backdrop-blur-lg">
        <div className="container px-4 md:px-6 mx-auto text-center space-y-6">
          <h2 className="heading-lg text-primary-accessible">Ready to Start Listening or Creating?</h2>
          <p className="text-lg text-secondary-accessible max-w-3xl mx-auto">
            Join NicePod today and dive into a world of concise knowledge and engaging discussions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={user ? "/create" : "/signup"}
              className="relative group inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 overflow-hidden transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-950"
            >
              <div className="relative z-10 flex items-center w-full h-full bg-transparent border-none p-0 cursor-pointer text-white">
                <div className="mr-3 p-1.5 bg-white/15 dark:bg-white/20 rounded-full group-hover:bg-white/25 dark:group-hover:bg-white/30 transition-all duration-300 shadow-inner">
                  <Mic className="h-5 w-5 drop-shadow-sm" />
                </div>
                <span className="tracking-wide drop-shadow-sm">Start Creating</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 bg-gray-100 dark:bg-gray-950 text-center text-sm text-gray-600 dark:text-gray-400">
        <div className="container px-4 md:px-6 mx-auto">
          <p>&copy; {new Date().getFullYear()} NicePod. All rights reserved.</p>
          <nav className="mt-4 flex justify-center space-x-4">
            <Link href="/terms" className="hover:text-gray-900 dark:hover:text-gray-50 transition-colors">Privacy Policy</Link>
            <Link href="/service" className="hover:text-gray-900 dark:hover:text-gray-50 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-gray-900 dark:hover:text-gray-50 transition-colors">Contact</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
// --- FIN DEL CÓDIGO FINAL Y COMPLETO PARA: components/LandingPageClient.tsx ---