// --- INICIO DEL CÓDIGO FINAL Y COMPLETO PARA: middleware.ts ---

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // 1. Refrescamos la sesión del usuario en cada petición.
  //    Esto es crucial para mantener al usuario autenticado.
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 2. Si el usuario NO está autenticado, el middleware no hace nada aquí.
  //    La protección de rutas se define en el 'matcher' de abajo.
  //    Si una ruta coincide con el matcher y no hay sesión, se redirigirá.
  if (!session) {
    // Si la ruta está protegida por el matcher, redirigir al login.
    // Guardamos la URL a la que quería ir para devolverlo allí después.
    return NextResponse.redirect(new URL('/login?redirect=' + req.nextUrl.pathname, req.url));
  }

  // Si el usuario está autenticado, lo dejamos pasar.
  return res;
}

// 3. Configuración del Middleware:
//    Aquí le decimos QUÉ RUTAS debe proteger nuestro "guardián".
//    Cualquier ruta que no esté en esta lista será pública por defecto.
export const config = {
  matcher: [
    '/create/:path*',   // Proteger la página de creación
    '/profile/:path*',  // Proteger la página de perfil
    // Hemos eliminado '/podcasts' de esta lista para que sea pública.
  ],
};
// --- FIN DEL CÓDIGO FINAL Y COMPLETO PARA: middleware.ts ---