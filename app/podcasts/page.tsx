// --- INICIO DEL CÓDIGO FINAL Y UNIFICADO PARA: app/podcasts/page.tsx ---

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
// Importamos el componente de cliente que mostrará los datos
import PodcastListClient from '@/components/PodcastListClient';

// Importamos los componentes de UI que nuestro diseño de v0 necesita
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

export default async function PodcastsPage() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // 1. Obtenemos los datos (podcasts y perfil de usuario) en el servidor
  const { data: podcasts } = await supabase
    .from('podcasts')
    .select('*')
    .eq('status', 'completed') 
    .order('created_at', { ascending: false });
  
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = user
    ? await supabase.from('profiles').select('subscription_level, monthly_usage').eq('id', user.id).single()
    : { data: null };

  return (
    // 2. Usamos el JSX de la sección "Find Your Next Listen" de v0 como estructura
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background/80 backdrop-blur-lg">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <h2 className="heading-lg text-primary-accessible">Explora Micro-Pods</h2>
          <p className="text-lg text-secondary-accessible max-w-2xl">
            Descubre conocimiento conciso en nuestra librería de podcasts generados por la comunidad.
          </p>
          <div className="w-full max-w-md relative">
            <Input type="search" placeholder="Buscar podcasts..." className="w-full pr-10 glass-input" />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-7 gap-2 h-auto p-1 glass-card">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full">Todos</TabsTrigger>
              <TabsTrigger value="featured" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full">Destacados</TabsTrigger>
              <TabsTrigger value="technology" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full">Tecnología</TabsTrigger>
              <TabsTrigger value="science" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full">Ciencia</TabsTrigger>
              <TabsTrigger value="philosophy" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full">Filosofía</TabsTrigger>
              <TabsTrigger value="business" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full">Negocios</TabsTrigger>
              <TabsTrigger value="wellness" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full">Bienestar</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-8">
              {/* 
                3. ▼▼▼ ¡LA FUSIÓN CLAVE! ▼▼▼
                Aquí, en lugar de mostrar los podcasts de ejemplo de v0,
                renderizamos nuestro componente funcional y le pasamos los datos reales.
              */}
              <PodcastListClient 
                initialPodcasts={podcasts || []} 
                userProfile={profile} 
              />
            </TabsContent>
            {/* Aquí podrías añadir más TabsContent para filtrar por categoría en el futuro */}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
// --- FIN DEL CÓDIGO FINAL PARA: app/podcasts/page.tsx ---