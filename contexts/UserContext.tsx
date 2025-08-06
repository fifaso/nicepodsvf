// --- INICIO DEL CÓDIGO FINAL PARA: contexts/UserContext.tsx ---

"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
<<<<<<< HEAD
import type { Session, User } from '@supabase/auth-helpers-nextjs';
import type { Profile } from "@/types";

type UserContextType = { user: User | null; profile: Profile | null; isLoading: boolean; };
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children, initialSession, initialProfile }: { children: ReactNode; initialSession: Session | null; initialProfile: Profile | null }) => {
  const supabase = createClientComponentClient();
  const [userSession, setUserSession] = useState<Session | null>(initialSession);
  const [profile, setProfile] = useState<Profile | null>(initialProfile);
  // isLoading ahora empieza en 'false' porque confiamos en los datos del servidor
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Este useEffect ahora solo sirve para escuchar cambios FUTUROS
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUserSession(session);
      if (session?.user) {
        // Si hay un cambio (ej. login), volvemos a buscar el perfil
        const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        setProfile(data as Profile | null);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const value = { user: userSession?.user ?? null, profile, isLoading };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error('useUser must be used within a UserProvider');
=======
import type { User } from '@supabase/auth-helpers-nextjs';

// 1. Definimos la "forma" de los datos que compartiremos
type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  subscription_level: 'free' | 'thinker' | 'pro';
  monthly_usage: number;
};

type UserContextType = {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
};

// 2. Creamos el Contexto
const UserContext = createContext<UserContextType | undefined>(undefined);

// 3. Creamos el "Proveedor" que gestionará y compartirá los datos
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: userProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(userProfile as Profile | null);
      }
      setIsLoading(false);
    };

    fetchUserAndProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchUserAndProfile();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const value = { user, profile, isLoading };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// 4. Creamos un "hook" personalizado para acceder fácilmente a los datos
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
  return context;
};
// --- FIN DEL CÓDIGO FINAL PARA: contexts/UserContext.tsx ---