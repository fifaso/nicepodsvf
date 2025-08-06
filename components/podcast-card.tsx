// --- INICIO DEL CÓDIGO FINAL Y UNIFICADO PARA: components/podcast-card.tsx ---

"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Clock, User, Pause, Loader2 } from "lucide-react"; // Importamos el icono de carga
import { useAudio } from "@/contexts/audio-context";
import type { Podcast as PodcastType } from "@/types/podcast"; // Asumimos que tienes este tipo definido

// 1. Actualizamos las propiedades que el componente recibe
interface PodcastCardProps {
  podcast: {
    id: string;
    title: string;
    author: string;
    category: string;
    duration: string;
    imageUrl: string;
    description: string;
  };
  onPlayClick: () => void; // Una función que se ejecutará al hacer clic en Play
  isProcessing: boolean;    // Un booleano que nos dice si el podcast se está procesando
}

export function PodcastCard({ podcast, onPlayClick, isProcessing }: PodcastCardProps) {
  const { currentPodcast, isPlaying } = useAudio();
  const isCurrentlyPlaying = currentPodcast?.id === podcast.id && isPlaying;

  return (
    <Card className="glass-card border-0 shadow-glass hover:shadow-soft transition-all duration-300 hover:-translate-y-2 group overflow-hidden flex flex-col">
      <div className="relative w-full h-48">
        <Image
          src={podcast.imageUrl || "/placeholder.svg"}
          alt={podcast.title}
          fill={true} // 2. Propiedad actualizada para Next.js moderno
          className="object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          {/* 
            ▼▼▼ CAMBIO CRÍTICO #1 ▼▼▼
            El botón ahora es condicional y usa las nuevas propiedades
          */}
          <Button
            onClick={onPlayClick}
            size="icon"
            className="w-14 h-14 rounded-full bg-white/90 text-gray-900 hover:bg-white transition-all duration-300 shadow-lg"
            aria-label={isCurrentlyPlaying ? "Pausar podcast" : "Reproducir podcast"}
            disabled={isProcessing} // El botón se deshabilita si se está procesando
          >
            {isProcessing ? (
              <Loader2 className="h-6 w-6 animate-spin" /> // Muestra un icono de carga
            ) : isCurrentlyPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-1" />
            )}
          </Button>
        </div>
        <Badge className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-medium">{podcast.category}</Badge>
      </div>
      <CardContent className="p-4 space-y-2 flex-grow">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-50 line-clamp-2">
          {podcast.title}
        </CardTitle>
        <CardDescription className="text-sm text-secondary-accessible line-clamp-2">
          {podcast.description}
        </CardDescription>
        <div className="flex items-center text-sm text-muted-accessible pt-2">
          <User className="h-4 w-4 mr-1" />
          <span>{podcast.author}</span>
          <span className="mx-2">•</span>
          {/* 
            ▼▼▼ CAMBIO CRÍTICO #2 ▼▼▼
            Mostramos el estado de procesamiento en lugar de la duración si no está completo
          */}
          {isProcessing ? (
            <Badge variant="secondary">Procesando</Badge>
          ) : (
            <>
              <Clock className="h-4 w-4 mr-1" />
              <span>{podcast.duration}</span>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
// --- FIN DEL CÓDIGO FINAL Y UNIFICADO PARA: components/podcast-card.tsx ---