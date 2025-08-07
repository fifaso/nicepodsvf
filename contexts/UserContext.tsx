// --- INICIO DEL CÓDIGO FINAL PARA: contexts/UserContext.tsx ---

"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Session, User } from '@supabase/auth-helpers-nextjs';
import type { Profile } from "@/types";

type UserContextType = { user: User | null; profile: Profile | null; isLoading: boolean; };
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children, session }: { children: ReactNode; session: Session | null }) => {
  const supabase = createClientComponentClient();
  const [userSession, setUserSession] = useState<Session | null>(session);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(!session);

  useEffect(() => {
    const fetchProfile = async (currentUser: User) => {
      const { data } = await supabase.from('profiles').select('*').eq('id', currentUser.id).single();
      setProfile(data as Profile | null);
    };
    if (userSession?.user) fetchProfile(userSession.user);
    else setProfile(null);
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUserSession(session);
    });
    return () => subscription.unsubscribe();
  }, [supabase, userSession]);

  const value = { user: userSession?.user ?? null, profile, isLoading };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error('useUser must be used within a UserProvider');
  return context;
};
// --- FIN DEL CÓDIGO FINAL PARA: contexts/UserContext.tsx ---