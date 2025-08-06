<<<<<<< HEAD
// --- INICIO DEL CÓDIGO FINAL Y COMPLETO PARA: components/LandingPageClient.tsx ---

"use client";

// Importaciones originales de v0
=======
// --- INICIO DEL CÓDIGO COMPLETO PARA: components/LandingPageClient.tsx ---

// 1. Declaramos que este es un componente interactivo que se ejecuta en el navegador
"use client";

// 2. Mantenemos todas las importaciones originales de v0 para la UI y la interactividad
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
<<<<<<< HEAD
import { PodcastCard } from "@/components/podcast-card";
import { Mic, Play, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAudio } from "@/contexts/audio-context";
import type { User } from '@supabase/auth-helpers-nextjs';
import type { Podcast } from "@/types"; // Importamos el tipo desde nuestro archivo centralizado

// ▼▼▼ CAMBIO #1: El componente ahora ACEPTA 'user' y 'initialPodcasts' como propiedades ▼▼▼
export default function LandingPageClient({ user, initialPodcasts }: { user: User | null, initialPodcasts: Podcast[] }) {
  const { playPodcast } = useAudio();

  // La función de reproducción ahora usa la URL real
  const handlePlayPodcast = (podcast: Podcast) => {
    if (podcast.audio_url) {
      playPodcast({
        id: podcast.id.toString(),
        title: podcast.topic.split(';')[0].replace('Tema:', '').trim(),
        description: `Creado el ${new Date(podcast.created_at).toLocaleDateString()}`,
        category: "Community Podcast",
        duration: "5:00", // Placeholder
        audioUrl: podcast.audio_url,
      });
    }
  };

  const samplePodcasts = [
    { id: "1", title: "The Science of Habit Formation", description: "Unlock the secrets behind building lasting habits and breaking bad ones.", category: "Psychology", duration: "5:23", color: "from-purple-500 to-pink-500" },
    { id: "2", title: "Mindfulness in the Digital Age", description: "Learn how to stay present and focused amidst constant digital distractions.", category: "Wellness", duration: "4:15", color: "from-blue-500 to-cyan-500" },
    { id: "3", title: "The Power of Stoic Philosophy", description: "Discover ancient wisdom for modern challenges: resilience, virtue, and tranquility.", category: "Philosophy", duration: "6:42", color: "from-indigo-500 to-purple-500" },
    { id: "4", title: "Understanding Cognitive Biases", description: "Explore the mental shortcuts that influence our decisions and how to overcome them.", category: "Psychology", duration: "5:18", color: "from-pink-500 to-rose-500" },
  ];

  return (
    <>
=======
import { PodcastCard } from "@/components/podcast-card"; // Corrected import path
import { Mic, Play, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAudio } from "@/contexts/audio-context";

// 3. Renombramos la función para que sea más descriptiva
export default function LandingPageClient() {
  const { playPodcast } = useAudio();

  // 4. Mantenemos todos los datos de ejemplo y funciones originales de v0
  const samplePodcasts = [
    {
      id: "1",
      title: "The Science of Habit Formation",
      description: "Unlock the secrets behind building lasting habits and breaking bad ones.",
      category: "Psychology",
      duration: "5:23",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "2",
      title: "Mindfulness in the Digital Age",
      description: "Learn how to stay present and focused amidst constant digital distractions.",
      category: "Wellness",
      duration: "4:15",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "3",
      title: "The Power of Stoic Philosophy",
      description: "Discover ancient wisdom for modern challenges: resilience, virtue, and tranquility.",
      category: "Philosophy",
      duration: "6:42",
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "4",
      title: "Understanding Cognitive Biases",
      description: "Explore the mental shortcuts that influence our decisions and how to overcome them.",
      category: "Psychology",
      duration: "5:18",
      color: "from-pink-500 to-rose-500",
    },
  ];

  const featuredPodcasts = [
    {
      id: "1",
      title: "Mindful Leadership",
      author: "Sarah Chen",
      category: "Wellness",
      duration: "15 min",
      imageUrl: "/images/podcast-covers/mindful-leadership.jpg",
      authorImageUrl: "/images/authors/sarah-chen.jpg",
      description: "Explore the principles of mindful leadership to enhance focus and decision-making.",
    },
    {
      id: "2",
      title: "Quantum Computing Explained",
      author: "Alan Kumar",
      category: "Technology",
      duration: "12 min",
      imageUrl: "/images/podcast-covers/quantum-computing.jpg",
      authorImageUrl: "/images/authors/alan-kumar.jpg",
      description: "Demystifying the complex world of quantum computing for everyone.",
    },
    {
      id: "3",
      title: "Stoicism for Modern Life",
      author: "Marcus Williams",
      category: "Philosophy",
      duration: "10 min",
      imageUrl: "/images/podcast-covers/stoicism.jpg",
      authorImageUrl: "/images/authors/marcus-williams.jpg",
      description: "Ancient wisdom for contemporary challenges, inspired by Stoic philosophy.",
    },
    {
      id: "4",
      title: "Deep Work Habits",
      author: "Emma Rodriguez",
      category: "Business",
      duration: "18 min",
      imageUrl: "/images/podcast-covers/deep-work.jpg",
      authorImageUrl: "/images/authors/emma-rodriguez.jpg",
      description: "Strategies to cultivate intense focus and productivity in a distracted world.",
    },
    {
      id: "5",
      title: "Cognitive Biases",
      author: "James Liu",
      category: "Psychology",
      duration: "14 min",
      imageUrl: "/images/podcast-covers/cognitive-biases.jpg",
      authorImageUrl: "/images/authors/james-liu.jpg",
      description: "Understanding the mental shortcuts that influence our decisions.",
    },
    {
      id: "6",
      title: "AI Ethics in Practice",
      author: "Maria Santos",
      category: "Technology",
      duration: "16 min",
      imageUrl: "/images/podcast-covers/ai-ethics.jpg",
      authorImageUrl: "/images/authors/maria-santos.jpg",
      description: "Navigating the moral landscape of artificial intelligence development.",
    },
  ];

  const handlePlayPodcast = (podcast: any) => {
    // Create a demo audio URL for demonstration
    const demoAudioUrl =
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmHgU_7k9n1unEiBC13yO/eizEIHWq+8+OWT";

    playPodcast({
      id: podcast.id,
      title: podcast.title,
      description: podcast.description,
      category: podcast.category,
      duration: podcast.duration,
      audioUrl: demoAudioUrl,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center text-center overflow-hidden">
        <div className="relative z-10 px-4 md:px-6 max-w-4xl mx-auto space-y-6">
          <h1 className="heading-xl text-gray-900 dark:text-gray-50 drop-shadow-lg">
            Bite-sized Insights, Anytime, Anywhere.
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto drop-shadow-md">
            Discover and create micro-podcasts that fit into your busy life. Learn, share, and grow with concise audio
            content.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
<<<<<<< HEAD
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
=======
            {/* 
              ▼▼▼ CAMBIO CRÍTICO #1 ▼▼▼
              Este botón ahora es un Link que apunta a '/signup'.
              Como el usuario no está autenticado, lo llevamos a la página de registro para que pueda empezar.
            */}
            <Link
              href="/signup"
              className="relative group inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 overflow-hidden transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-950"
              aria-label="Start Creating your podcast"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 dark:from-white/15 dark:to-white/8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent dark:via-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex items-center w-full h-full bg-transparent border-none p-0 cursor-pointer text-white">
                <div className="mr-3 p-1.5 bg-white/15 dark:bg-white/20 rounded-full group-hover:bg-white/25 dark:group-hover:bg-white/30 transition-all duration-300 shadow-inner">
                  <Mic className="h-5 w-5 drop-shadow-sm" />
                </div>
                <span className="tracking-wide drop-shadow-sm">Start</span>
                <span className="ml-1 tracking-wide drop-shadow-sm">Creating</span>
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
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
<<<<<<< HEAD
            <Tabs defaultValue="latest" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 h-auto p-1 glass-card">
                <TabsTrigger value="latest" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full transition-all duration-200">Latest</TabsTrigger>
                <TabsTrigger value="technology" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full transition-all duration-200">Technology</TabsTrigger>
                <TabsTrigger value="science" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full transition-all duration-200">Science</TabsTrigger>
                <TabsTrigger value="philosophy" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full transition-all duration-200">Philosophy</TabsTrigger>
              </TabsList>
              <TabsContent value="latest" className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {/* ▼▼▼ CAMBIO #2: Pasamos las propiedades que faltan a PodcastCard ▼▼▼ */}
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
=======
            <Tabs defaultValue="featured" className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-2 h-auto p-1 glass-card">
                <TabsTrigger value="featured" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full transition-all duration-200">Featured</TabsTrigger>
                <TabsTrigger value="technology" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full transition-all duration-200">Technology</TabsTrigger>
                <TabsTrigger value="science" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full transition-all duration-200">Science</TabsTrigger>
                <TabsTrigger value="philosophy" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full transition-all duration-200">Philosophy</TabsTrigger>
                <TabsTrigger value="business" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full transition-all duration-200">Business</TabsTrigger>
                <TabsTrigger value="wellness" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full transition-all duration-200">Wellness</TabsTrigger>
              </TabsList>
              <TabsContent value="featured" className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {featuredPodcasts.map((podcast) => (
                    <PodcastCard key={podcast.id} podcast={podcast} />
                  ))}
                </div>
              </TabsContent>
              {/* Add more TabsContent for other categories as needed */}
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
            </Tabs>
          </div>
        </div>
      </section>
<<<<<<< HEAD
      
      {/* El resto de las secciones estáticas (Features, How it works, etc.) no necesitan cambios */}

=======

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-white/40 dark:bg-black/20 backdrop-blur-sm"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-gray-900 dark:text-gray-50 mb-4">Why Choose NicePod?</h2>
            <p className="text-lg text-secondary-accessible max-w-2xl mx-auto font-medium">
              Designed specifically for educators, students, and knowledge enthusiasts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {samplePodcasts.map((podcast) => (
              <Card
                key={podcast.id}
                className="text-center glass-card border-0 hover:shadow-glass transition-all duration-500 hover:-translate-y-2 group overflow-hidden"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs glass text-purple-accessible-dark border-0">{podcast.category}</Badge>
                    <span className="text-sm text-muted-accessible font-medium">{podcast.duration}</span>
                  </div>
                  <CardTitle className="text-lg leading-tight text-gray-900 dark:text-gray-50">{podcast.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm text-secondary-accessible mb-4 font-medium">{podcast.description}</CardDescription>
                  <Button
                    onClick={() => handlePlayPodcast(podcast)}
                    className={`w-full bg-gradient-to-r ${podcast.color} hover:opacity-90 text-white shadow-soft border-0 group-hover:scale-105 transition-transform duration-300`}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Listen Now
                  </Button>
                </CardContent>
              </Card>
            ))}
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
            <Card className="glass-card p-6 text-center space-y-4">
              <CardHeader className="flex flex-col items-center"><div className="p-4 rounded-full bg-primary/10 dark:bg-primary/20 text-primary mb-4"><Mic className="h-8 w-8" /></div><CardTitle className="text-xl font-semibold text-primary-accessible">Record & Edit</CardTitle></CardHeader>
              <CardContent><CardDescription className="text-secondary-accessible">Use our intuitive tools to record your thoughts and trim them to perfection.</CardDescription></CardContent>
            </Card>
            <Card className="glass-card p-6 text-center space-y-4">
              <CardHeader className="flex flex-col items-center"><div className="p-4 rounded-full bg-primary/10 dark:bg-primary/20 text-primary mb-4"><ArrowRight className="h-8 w-8" /></div><CardTitle className="text-xl font-semibold text-primary-accessible">Publish & Share</CardTitle></CardHeader>
              <CardContent><CardDescription className="text-secondary-accessible">Easily publish your micro-podcast and share it with the world.</CardDescription></CardContent>
            </Card>
            <Card className="glass-card p-6 text-center space-y-4">
              <CardHeader className="flex flex-col items-center"><div className="p-4 rounded-full bg-primary/10 dark:bg-primary/20 text-primary mb-4"><Search className="h-8 w-8" /></div><CardTitle className="text-xl font-semibold text-primary-accessible">Discover & Learn</CardTitle></CardHeader>
              <CardContent><CardDescription className="text-secondary-accessible">Explore a vast library of bite-sized audio content on diverse topics.</CardDescription></CardContent>
            </Card>
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
            {/* 
              ▼▼▼ CAMBIO CRÍTICO #2 ▼▼▼
              Este botón también lo convertimos en un Link que apunta a '/signup'.
            */}
            <Link
              href="/signup"
              className="relative group inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 overflow-hidden transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-950"
              aria-label="Start Creating your podcast"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 dark:from-white/15 dark:to-white/8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent dark:via-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
      <footer className="w-full py-8 bg-gray-100 dark:bg-gray-950 text-center text-sm text-gray-600 dark:text-gray-400">
        <div className="container px-4 md:px-6 mx-auto">
          <p>© {new Date().getFullYear()} NicePod. All rights reserved.</p>
          <nav className="mt-4 flex justify-center space-x-4">
            <Link href="/terms" className="hover:text-gray-900 dark:hover:text-gray-50 transition-colors">Privacy Policy</Link>
            <Link href="/service" className="hover:text-gray-900 dark:hover:text-gray-50 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-gray-900 dark:hover:text-gray-50 transition-colors">Contact</Link>
          </nav>
        </div>
      </footer>
<<<<<<< HEAD
    </>
  );
}
// --- FIN DEL CÓDIGO FINAL PARA: components/LandingPageClient.tsx ---
=======
    </div>
  );
}
// --- FIN DEL CÓDIGO FINAL PARA: components/LandingPageClient.tsx ---
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
