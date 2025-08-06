// --- INICIO DEL CÓDIGO FINAL PARA: components/PodcastListClient.tsx ---

"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useAudio } from "@/contexts/audio-context";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Play, Loader2 } from "lucide-react";
import { PodcastCard } from "@/components/podcast-card";
// ▼▼▼ ¡LA NUEVA PIEZA CLAVE! ▼▼▼
import { useUser } from "@/contexts/UserContext";

// Tipos de datos
type Podcast = { id: number; created_at: string; topic: string; status: string; audio_url: string | null; };

export default function PodcastListClient({ initialPodcasts }: { initialPodcasts: Podcast[] }) {
  const [podcasts, setPodcasts] = useState(initialPodcasts);
  const { playPodcast } = useAudio();
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClientComponentClient();
  
  // ▼▼▼ Obtenemos el perfil del usuario desde el contexto global ▼▼▼
  const { profile, isLoading } = useUser();

  // Suscripción a cambios en tiempo real (sin cambios)
  useEffect(() => {
    // ...
  }, [supabase]);

  const handlePlayClick = (podcast: Podcast) => {
    // La lógica de negocio ahora usa el 'profile' del contexto
    if (isLoading) return; // Esperar a que se cargue la información del usuario
    
    if (!profile) {
      toast({
        title: "¡Únete para escuchar!",
        action: <Button onClick={() => router.push('/login?redirect=/podcasts')}>Iniciar Sesión</Button>
      });
      return;
    }

    if (profile.subscription_level === 'free' && profile.monthly_usage >= 15) {
      toast({
        title: "Límite gratuito alcanzado",
        action: <Button onClick={() => router.push('/pricing')}>Ver Planes</Button>
      });
      return;
    }
    
    if (podcast.audio_url) {
        playPodcast({ /* ... */ });
    } else {
        toast({ title: "Audio no disponible", variant: "destructive"});
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {podcasts.map((podcast) => {
        const podcastForCard = { /* ... "traducción" de datos ... */ };
        return (
          <div key={podcast.id}>
            <PodcastCard 
              podcast={podcastForCard}
              onPlayClick={() => handlePlayClick(podcast)}
              isProcessing={podcast.status !== 'completed'}
            />
          </div>
        );
      })}
    </div>
  );
}
// --- FIN DEL CÓDIGO FINAL PARA: components/PodcastListClient.tsx ---