// --- INICIO DEL CÓDIGO PARA: app/api/trigger-podcast-job/route.ts ---

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { podcastId } = await request.json();
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // 1. Verificamos que el usuario está autenticado antes de continuar
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    // 2. Verificamos que tenemos las variables de entorno necesarias
    if (!process.env.GCF_TRIGGER_URL || !process.env.GCF_AUTH_TOKEN) {
      console.error("Server misconfiguration: GCF_TRIGGER_URL or GCF_AUTH_TOKEN is missing.");
      return new NextResponse(JSON.stringify({ error: 'Server configuration error' }), { status: 500 });
    }

    // 3. (Temporalmente) Simulamos la llamada a la Google Cloud Function
    //    Esto nos permite probar el flujo sin tener el agente de IA aún.
    console.log(`SIMULACIÓN: Llamando a la GCF para el podcastId: ${podcastId}`);
    console.log(`URL de destino: ${process.env.GCF_TRIGGER_URL}`);
    
    // --- DESCOMENTA ESTA SECCIÓN CUANDO EL AGENTE DE IA ESTÉ LISTO ---
    /*
    const response = await fetch(process.env.GCF_TRIGGER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GCF_AUTH_TOKEN}`,
      },
      body: JSON.stringify({ podcastId }),
    });

    if (!response.ok) {
      throw new Error(`La llamada a la GCF falló con estado: ${response.status}`);
    }
    */
    // --- FIN DE LA SECCIÓN A DESCOMENTAR ---

    // 4. Devolvemos una respuesta de éxito inmediata al cliente
    return new NextResponse(JSON.stringify({ message: 'Job started successfully (simulation)' }), { status: 202 });

  } catch (error: any) {
    console.error("Error en la API trigger-podcast-job:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
// --- FIN DEL CÓDIGO PARA: app/api/trigger-podcast-job/route.ts ---