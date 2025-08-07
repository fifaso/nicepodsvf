// --- INICIO DEL CÓDIGO FINAL PARA: app/profile/page.tsx ---

import ProfileClient from '@/components/ProfileClient';

// El middleware ya protege esta página.
// Este componente de servidor solo necesita renderizar la estructura y el componente cliente.
export default function ProfilePage() {
  return (
    <div className="container py-12 text-white">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">Tu Perfil</h1>
          <p className="text-gray-400 mt-2">Gestiona la información de tu cuenta y tu suscripción.</p>
        </header>
        </main>
      </div>
    </div>
  );
}
// --- FIN DEL CÓDIGO FINAL PARA: app/profile/page.tsx ---