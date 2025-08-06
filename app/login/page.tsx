<<<<<<< HEAD
// --- INICIO DEL CÓDIGO FINAL PARA: app/login/page.tsx ---

"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
=======
// --- INICIO DEL CÓDIGO FINAL Y COMPLETO PARA: app/login/page.tsx ---

// 1. Declaramos que este es un componente interactivo que se ejecuta en el navegador
"use client";

// 2. Importamos todas las herramientas que necesitamos
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
// Importamos los componentes de UI de v0 para mantener el estilo
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Lock, Mail } from 'lucide-react';

// 3. Definimos nuestro componente de página de login
export default function LoginPage() {
  // 4. Lógica de estado para manejar los inputs y la UI
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
<<<<<<< HEAD
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  // Guardián del cliente: si un usuario ya logueado llega aquí, lo redirige.
=======
  // 5. Herramientas para la navegación, notificaciones y Supabase
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { toast } = useToast();

  // 6. Efecto para redirigir si el usuario YA está autenticado
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
<<<<<<< HEAD
        const redirectTo = searchParams.get("redirect") || "/create";
        router.push(redirectTo);
      }
    };
    checkUser();
  }, [router, supabase, searchParams]);

  // Maneja el inicio de sesión
=======
        router.push('/create');
      }
    };
    checkUser();
  }, [router, supabase]);

  // 7. Función para manejar el INICIO DE SESIÓN
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

<<<<<<< HEAD
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast({
        title: "Error al iniciar sesión",
        description: "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    } else {
      // Éxito: refrescamos el estado. El useEffect se encargará de la redirección.
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gradient-mesh text-white">
      <main className="w-full max-w-md z-10">
        <Card className="glass-card border-0 shadow-glass">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold text-primary-accessible">Bienvenido de Nuevo</CardTitle>
            <CardDescription className="text-secondary-accessible">Introduce tus credenciales para acceder</CardDescription>
=======
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({ title: "Error al iniciar sesión", description: "Credenciales incorrectas. Por favor, inténtalo de nuevo.", variant: "destructive" });
      setIsSubmitting(false);
    } else {
      router.push('/create'); // Redirigimos a la página de creación
      router.refresh(); // Importante para que el servidor actualice el estado
    }
  };

  // 8. Devolvemos el diseño visual de v0, ahora conectado a nuestra lógica
  return (
    <div className="min-h-screen gradient-mesh flex items-center justify-center p-4">
      <div className="w-full max-w-md relative z-10">
        <Card className="glass-card border-0 shadow-glass">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold text-primary-accessible">Bienvenido de Nuevo</CardTitle>
            <CardDescription className="text-secondary-accessible">
              Introduce tus credenciales para acceder a tu cuenta
            </CardDescription>
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
<<<<<<< HEAD
                <Label htmlFor="email">Email</Label>
                <div className="relative"><Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input id="email" type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 glass-input border-0 h-11" required disabled={isSubmitting} /></div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative"><Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 glass-input border-0 h-11" required disabled={isSubmitting} /></div>
              </div>
              <div className="flex items-center justify-end"><Link href="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300 font-medium">¿Olvidaste tu contraseña?</Link></div>
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-glass border-0 h-11" disabled={isSubmitting}>
=======
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email" type="email" placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 glass-input border-0 h-11" required disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password" type="password" placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 glass-input border-0 h-11" required disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="flex items-center justify-end">
                <Link href="/forgot-password"
                  className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Button type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-glass border-0 h-11"
                disabled={isSubmitting}
              >
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
                {isSubmitting ? 'Verificando...' : 'Iniciar Sesión'}
              </Button>
            </form>
            <div className="text-center mt-6">
<<<<<<< HEAD
              <p className="text-sm text-secondary-accessible">¿No tienes una cuenta? <Link href="/signup" className="font-medium text-purple-400 hover:text-purple-300 underline">Regístrate gratis</Link></p>
            </div>
          </CardContent>
        </Card>
      </main>
=======
              <p className="text-sm text-secondary-accessible">
                ¿No tienes una cuenta?{" "}
                <Link href="/signup"
                  className="font-medium text-purple-400 hover:text-purple-300 transition-colors underline"
                >
                  Regístrate gratis
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
    </div>
  );
}
// --- FIN DEL CÓDIGO FINAL PARA: app/login/page.tsx ---