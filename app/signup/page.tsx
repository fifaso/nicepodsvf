// --- INICIO DEL CÓDIGO FINAL Y COMPLETO PARA: app/signup/page.tsx ---

<<<<<<< HEAD
// 1. Declaramos que este es un componente interactivo que se ejecuta en el navegador
"use client";

// 2. Importamos todas las herramientas necesarias
import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from "@/contexts/UserContext"; // Importamos nuestro hook de estado global

// Importamos los componentes de UI que v0 generó
=======
"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";

<<<<<<< HEAD
// 3. Definimos nuestro componente de página de registro
export default function SignupPage() {
  // 4. Lógica de estado: guardamos lo que el usuario escribe y el estado de la UI
=======
export default function SignupPage() {
  // Mantenemos todos los estados originales de v0
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
<<<<<<< HEAD
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // 5. Herramientas para la navegación, notificaciones y Supabase
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { toast } = useToast();
  const { user, isLoading } = useUser(); // Obtenemos el usuario y el estado de carga del contexto

  // 6. Guardián del cliente: si un usuario ya logueado llega aquí, lo redirige
  useEffect(() => {
    if (!isLoading && user) {
      router.push('/create');
    }
  }, [user, isLoading, router]);

  // 7. Mantenemos las funciones de UI de v0 para la fuerza de la contraseña
=======
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const supabase = createClientComponentClient();
  const { toast } = useToast();

  // Mantenemos la lógica de la fuerza de la contraseña
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, text: "" };
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    const strengthTexts = ["", "Débil", "Regular", "Buena", "Fuerte"];
    return { strength, text: strengthTexts[strength] };
  };

  const passwordStrength = getPasswordStrength(password);

  const getStrengthColor = (strength: number) => {
    return ["", "bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"][strength];
  };

<<<<<<< HEAD
  // 8. Función de registro robusta, conectada a Supabase y al sistema de notificaciones
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones con feedback claro para el usuario
    if (password !== confirmPassword) {
      toast({ title: "Las contraseñas no coinciden", description: "Por favor, asegúrate de que ambas contraseñas sean iguales.", variant: "destructive" });
      return;
    }
    if (!agreeToTerms) {
      toast({ title: "Debes aceptar los términos", description: "Por favor, acepta los Términos de Servicio y la Política de Privacidad para continuar.", variant: "destructive" });
=======
  // Usamos nuestra función handleSignUp conectada a Supabase
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({ title: "Las contraseñas no coinciden", variant: "destructive" });
      return;
    }
    if (!agreeToTerms) {
      toast({ title: "Debes aceptar los términos y condiciones", variant: "destructive" });
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
<<<<<<< HEAD
        // Pasamos el nombre completo para que nuestro trigger de DB lo guarde en el perfil
=======
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
        data: { full_name: fullName },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast({ title: "Fallo en el registro", description: error.message, variant: "destructive" });
    } else {
      toast({
<<<<<<< HEAD
        title: "¡Revisa tu email!",
        description: "Hemos enviado un enlace de confirmación a tu correo para activar tu cuenta.",
        duration: 9000, // Hacemos que esta notificación dure más
      });
      // No redirigimos, el usuario debe confirmar su email primero
=======
        title: "¡Cuenta Creada!",
        description: "Hemos enviado un enlace a tu correo. Por favor, confirma tu cuenta para poder iniciar sesión.",
      });
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
    }
    setIsSubmitting(false);
  };

<<<<<<< HEAD
  // 9. Devolvemos el JSX de v0, ahora perfectamente centrado y conectado
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gradient-mesh">
=======
  return (
    // ▼▼▼ ¡ESTA ES LA CORRECCIÓN CLAVE! ▼▼▼
    // Usamos el contenedor de Flexbox para centrar todo vertical y horizontalmente
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Todo el JSX del formulario original de v0 se mantiene intacto */}
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
      <Card className="w-full max-w-md backdrop-blur-lg bg-card/80 border-muted/30">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Crea una Cuenta</CardTitle>
          <CardDescription className="text-center">Introduce tu información para empezar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nombre Completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="fullName" placeholder="Tu Nombre" value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10" required disabled={isSubmitting}
                />
              </div>
            </div>
<<<<<<< HEAD
=======

>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email" type="email" placeholder="tu@email.com" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10" required disabled={isSubmitting}
                />
              </div>
            </div>
<<<<<<< HEAD
=======

>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10" required disabled={isSubmitting} minLength={8}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground" tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs">Fuerza:</div>
                    <div className="text-xs font-medium">{passwordStrength.text}</div>
                  </div>
                  <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getStrengthColor(passwordStrength.strength)} transition-all duration-300`}
                      style={{ width: `${passwordStrength.strength * 25}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
<<<<<<< HEAD
=======

>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10" required disabled={isSubmitting}
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground" tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {password && confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-destructive mt-1">Las contraseñas no coinciden</p>
              )}
            </div>
<<<<<<< HEAD
=======

>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                disabled={isSubmitting} required
              />
              <Label htmlFor="terms" className="text-sm font-normal">
<<<<<<< HEAD
                Acepto los <Link href="/terms" className="text-primary hover:underline">Términos</Link> y la <Link href="/privacy" className="text-primary hover:underline">Política de Privacidad</Link>
              </Label>
            </div>
=======
                Acepto los <Link href="/terms" className="text-primary hover:underline">Términos</Link> y <Link href="/privacy" className="text-primary hover:underline">Política de Privacidad</Link>
              </Label>
            </div>

>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creando cuenta..." : "Crear Cuenta"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-center text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Inicia sesión
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
// --- FIN DEL CÓDIGO FINAL PARA: app/signup/page.tsx ---