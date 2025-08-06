// --- INICIO DEL CÓDIGO FINAL PARA: components/ProfileClient.tsx ---

"use client";

import { useUser } from '@/contexts/UserContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
<<<<<<< HEAD
import Link from 'next/link';
=======
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78

export default function ProfileClient() {
  const { user, profile, isLoading } = useUser();

<<<<<<< HEAD
  // Muestra un esqueleto de carga mientras se obtienen los datos
  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-gray-700/50 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-6 w-48 bg-gray-700/50 rounded-md"></div>
            <div className="h-4 w-64 bg-gray-700/50 rounded-md"></div>
          </div>
        </div>
        <div className="h-32 w-full bg-gray-700/50 rounded-lg"></div>
        <div className="h-32 w-full bg-gray-700/50 rounded-lg"></div>
=======
  // Si aún está cargando la información, muestra un esqueleto
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-1/4 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-6 w-1/2 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-6 w-1/3 bg-gray-700 rounded animate-pulse"></div>
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
      </div>
    );
  }
  
<<<<<<< HEAD
  // Muestra un mensaje de error si, por alguna razón, no se pudieron cargar los datos
  if (!user || !profile) {
    return (
        <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
                <CardTitle>Error</CardTitle>
            </CardHeader>
            <CardContent>
                <p>No se pudo cargar la información del perfil. Por favor, intenta iniciar sesión de nuevo.</p>
                <Link href="/login" className="mt-4 inline-block">
                    <Button>Ir a Iniciar Sesión</Button>
                </Link>
            </CardContent>
        </Card>
    );
=======
  // Si no hay usuario (aunque el middleware debería prevenir esto, es una buena práctica)
  if (!user || !profile) {
    return <p>No se pudo cargar la información del perfil.</p>;
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
  }

  return (
    <div className="space-y-8">
<<<<<<< HEAD
      {/* Tarjeta de Información del Usuario */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile.avatar_url || ''} alt={profile.full_name || 'User avatar'} />
            <AvatarFallback className="text-2xl bg-gray-700">
              {profile.full_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-2xl">{profile.full_name || user.email}</CardTitle>
            <CardDescription className="mt-1">{user.email}</CardDescription>
          </div>
        </CardHeader>
      </Card>

      {/* Tarjeta de Suscripción */}
=======
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={profile.avatar_url || ''} />
            <AvatarFallback className="text-xl bg-gray-700">
              {profile.full_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{profile.full_name || 'Usuario de Nicepods'}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">ID de Usuario: {user.id}</p>
        </CardContent>
      </Card>

>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle>Plan de Suscripción</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold capitalize">{profile.subscription_level}</p>
            <p className="text-sm text-gray-400">Uso este mes: {profile.monthly_usage} podcasts generados</p>
          </div>
<<<<<<< HEAD
          <Link href="/pricing">
            <Button variant="outline">Gestionar Suscripción</Button>
          </Link>
        </CardContent>
      </Card>
      
      {/* Tarjeta para Cerrar Sesión */}
      <Card className="border-red-500/30 bg-red-900/20">
        <CardHeader>
          <CardTitle>Zona de Peligro</CardTitle>
        </CardHeader>
        <CardContent>
            <CardDescription className="mb-4">Esto finalizará tu sesión actual en todos tus dispositivos.</CardDescription>
            <form action="/auth/sign-out" method="post">
                <Button variant="destructive" type="submit" className="w-full sm:w-auto">
                Cerrar Sesión
                </Button>
            </form>
=======
          <Button variant="outline">Gestionar Suscripción</Button>
        </CardContent>
      </Card>
      
      <Card className="border-red-500/30 bg-red-900/20">
        <CardHeader>
          <CardTitle>Cerrar Sesión</CardTitle>
          <CardDescription>Esto finalizará tu sesión actual en este dispositivo.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="/auth/sign-out" method="post">
            <Button variant="destructive" type="submit" className="w-full sm:w-auto">
              Cerrar Sesión
            </Button>
          </form>
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
        </CardContent>
      </Card>
    </div>
  );
}
// --- FIN DEL CÓDIGO FINAL PARA: components/ProfileClient.tsx ---