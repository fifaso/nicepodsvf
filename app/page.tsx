<<<<<<< HEAD
// --- INICIO DEL CÓDIGO FINAL PARA: app/page.tsx ---

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
// Importamos el componente visual de la landing page
import LandingPageClient from '@/components/LandingPageClient';
import type { Database } from '@/lib/database.types'; // Importamos los tipos de la DB

// Esta página se ejecuta SIEMPRE en el servidor
export default async function HomePage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  // 1. Verificamos si hay un usuario autenticado. No redirigimos.
=======
// --- INICIO DEL CÓDIGO FINAL Y ACTUALIZADO PARA: app/page.tsx ---

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Importamos ambos componentes visuales
import LandingPageClient from '@/components/LandingPageClient'; // Para visitantes
import PodcastListClient from '@/components/PodcastListClient'; // Para usuarios logueados
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Esta página se ejecuta SIEMPRE en el servidor
export default async function HomePage() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // 1. Verificamos si hay un usuario autenticado
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
  const {
    data: { user },
  } = await supabase.auth.getUser();

<<<<<<< HEAD
  // 2. Obtenemos los últimos podcasts para mostrarlos en la landing page.
  const { data: podcasts } = await supabase
    .from('podcasts')
    .select('*')
    .eq('status', 'completed') // Mostramos solo los completados
    .order('created_at', { ascending: false })
    .limit(8); // Mostramos solo los últimos 8 para que la página cargue rápido

  // 3. Le pasamos tanto el usuario como los podcasts al componente del cliente.
  return <LandingPageClient user={user} initialPodcasts={podcasts || []} />;
=======
  // 2. Lógica Condicional: ¿Qué mostramos?
  if (user) {
    // --- SI EL USUARIO HA INICIADO SESIÓN ---
    // Obtenemos los datos necesarios para la vista del usuario logueado

    const { data: podcasts } = await supabase
      .from('podcasts')
      .select('*')
      .eq('status', 'completed')
      .order('created_at', { ascending: false });

    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_level, monthly_usage')
      .eq('id', user.id)
      .single();

    // Renderizamos la vista del "Dashboard" o "Explora" para el usuario
    return (
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
            Bienvenido de Nuevo, {profile?.full_name || user.email}
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Explora los últimos micro-pods o crea uno nuevo.
          </p>
          <div className="mt-6">
            <Link href="/create">
              <Button size="lg">Crear un Nuevo Podcast</Button>
            </Link>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-6 text-white">Últimos Micro-Pods de la Comunidad</h2>
        <PodcastListClient 
          initialPodcasts={podcasts || []} 
          userProfile={profile} 
        />
      </div>
    );
  }

  // --- SI EL USUARIO NO HA INICIADO SESIÓN ---
  // Le mostramos la hermosa landing page de marketing
  return <LandingPageClient />;
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
}
// --- FIN DEL CÓDIGO FINAL PARA: app/page.tsx ---