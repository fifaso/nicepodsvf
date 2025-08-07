// --- INICIO DEL CÓDIGO FINAL Y COMPLETO PARA: app/page.tsx ---

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import LandingPageClient from '@/components/LandingPageClient';
import { redirect } from 'next/navigation';
import type { Database } from '@/lib/database.types'; // Importamos los tipos de la DB

// Esta página se ejecuta SIEMPRE en el servidor
export default async function HomePage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  // 1. Verificamos si hay un usuario autenticado.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 2. Si HAY un usuario, lo redirigimos a la página de exploración principal.
  if (user) {
    redirect('/podcasts');
  }

  // 3. Si NO hay usuario, obtenemos los últimos podcasts para la landing page.
  const { data: podcasts } = await supabase
    .from('podcasts')
    .select('*')
    .eq('status', 'completed')
    .order('created_at', { ascending: false })
    .limit(8);

  // 4. Le pasamos los podcasts y el estado del usuario (nulo) al componente del cliente.
  return <LandingPageClient user={null} initialPodcasts={podcasts || []} />;
}
// --- FIN DEL CÓDIGO FINAL Y COMPLETO PARA: app/page.tsx ---