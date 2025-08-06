// --- INICIO DEL CÓDIGO PARA: types/index.ts ---

// Definiciones de tipos para Podcast
export type Podcast = {
  id: number;
  created_at: string;
  topic: string;
  status: 'pending' | 'generating_script' | 'generating_audio' | 'completed' | 'failed';
  audio_url: string | null;
};

// Definiciones de tipos para Perfil (de tu tabla 'profiles' en Supabase)
export type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  subscription_level: 'free' | 'thinker' | 'pro';
  monthly_usage: number;
};

// Definiciones de tipos para el formulario de creación (de tu componente PodcastCreationForm)
export type FormData = {
  topic: string;
  motivation: string;
  format: string;
  duration: string;
  audience: string;
  title: string; 
  description: string;
  tags: string[];
};

// --- FIN DEL CÓDIGO PARA: types/index.ts ---