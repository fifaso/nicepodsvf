// --- INICIO DEL CÓDIGO FINAL Y POTENCIADO PARA: app/login/page.tsx ---

"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  // Estados para manejar el formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // MEJORA 1: Añadimos un estado específico para los mensajes de error en el formulario
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  // Guardián del cliente: si un usuario ya logueado llega a esta página, lo redirige.
  // Esta lógica es robusta y no necesita cambios.
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const redirectTo = searchParams.get("redirect") || "/create";
        router.push(redirectTo);
      }
    };
    checkUser();
  }, [router, supabase, searchParams]);

  // Maneja el inicio de sesión
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null); // Limpiamos errores anteriores al iniciar un nuevo intento

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      // MEJORA 1: Usamos tanto el toast como el estado de error para un feedback completo
      toast({
        title: "Error al iniciar sesión",
        description: "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
      setErrorMsg("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    } else {
      // Éxito: refrescamos el estado. El useEffect se encargará de la redirección.
      router.refresh();
    }

    // MEJORA 2: Aseguramos que el estado de carga siempre se desactive
    // al final de la operación, tanto en caso de éxito como de error.
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gradient-mesh text-white">
      <main className="w-full max-w-md z-10">
        <Card className="glass-card border-0 shadow-glass">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold text-primary-accessible">Bienvenido de Nuevo</CardTitle>
            <CardDescription className="text-secondary-accessible">Introduce tus credenciales para acceder</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 glass-input border-0 h-11" required disabled={isSubmitting} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 glass-input border-0 h-11" required disabled={isSubmitting} />
                </div>
              </div>
              
              {/* MEJORA 1: Mostramos el mensaje de error directamente en el formulario */}
              {errorMsg && (
                <p className="text-sm text-center text-red-400 pt-2">{errorMsg}</p>
              )}

              <div className="flex items-center justify-end">
                <Link href="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300 font-medium">¿Olvidaste tu contraseña?</Link>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-glass border-0 h-11" disabled={isSubmitting}>
                {isSubmitting ? 'Verificando...' : 'Iniciar Sesión'}
              </Button>
            </form>
            <div className="text-center mt-6">
              <p className="text-sm text-secondary-accessible">
                ¿No tienes una cuenta? <Link href="/signup" className="font-medium text-purple-400 hover:text-purple-300 underline">Regístrate gratis</Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
// --- FIN DEL CÓDIGO FINAL PARA: app/login/page.tsx ---