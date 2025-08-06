// --- INICIO DEL CÓDIGO PARA EL NUEVO: components/PodcastList.tsx ---

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
// Importamos el componente del cliente que acabamos de renombrar
import PodcastListClient from './PodcastListClient';

// Este es un Componente de Servidor, por eso la función es 'async'
export default async function PodcastList() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // 1. Obtenemos la lista inicial de podcasts en el servidor
  const { data: podcasts } = await supabase
    .from('podcasts')
    .select('*')
    .order('created_at', { ascending: false });
  
  // 2. Obtenemos el perfil del usuario para pasárselo al cliente
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = user
    ? await supabase.from('profiles').select('subscription_level, monthly_usage').eq('id', user.id).single()
    : { data: null };

  // 3. Renderizamos el componente del cliente, pasándole los datos ya cargados
  return <PodcastListClient initialPodcasts={podcasts || []} userProfile={profile} />;
}
// --- FIN DEL CÓDIGO PARA EL NUEVO: components/PodcastList.tsx ---