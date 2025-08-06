// --- CÓDIGO SIMPLIFICADO PARA: app/create/page.tsx ---

// Ya no es 'async', ya no necesita las importaciones de Supabase/cookies
import { PodcastCreationForm } from "@/components/podcast-creation-form";
import PodcastList from '@/components/PodcastList'; // Lo devolvemos aquí
import { Sparkles } from "lucide-react";

export default function CreatePage() {
  // El middleware ya ha hecho el trabajo de seguridad.
  // Esta página solo se renderizará si el usuario está autenticado.
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        {/* ... Tu JSX del header ... */}
      </div>
      <PodcastCreationForm />
      {/* 
        Todavía no podemos mostrar la lista de podcasts aquí
        porque este ya no es un componente de servidor.
        Dejaremos esto para el siguiente paso.
      */}
      {/* <PodcastList initialPodcasts={[]} /> */}
    </div>
  );
}