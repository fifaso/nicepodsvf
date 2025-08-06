// --- INICIO DEL CÓDIGO FINAL PARA: app/profile/page.tsx ---

<<<<<<< HEAD
import ProfileClient from '@/components/ProfileClient';

// El middleware ya protege esta página.
// Este componente de servidor solo necesita renderizar la estructura y el componente cliente.
export default function ProfilePage() {
=======
// 1. Importamos el componente de cliente que mostrará los datos
import ProfileClient from '@/components/ProfileClient';

// El middleware ya protege esta página, por lo que este componente de servidor
// es muy simple. Su única misión es renderizar la estructura de la página.
export default function ProfilePage() {
  
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
  return (
    <div className="container py-12 text-white">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">Tu Perfil</h1>
          <p className="text-gray-400 mt-2">Gestiona la información de tu cuenta y tu suscripción.</p>
        </header>
<<<<<<< HEAD
        <main>
=======

        <main>
          {/* 2. Renderizamos el componente de cliente, que se encargará de todo lo demás */}
>>>>>>> 0b69be100ef956a8ac039dff0e81e7067bcc2a78
          <ProfileClient />
        </main>
      </div>
    </div>
  );
}
// --- FIN DEL CÓDIGO FINAL PARA: app/profile/page.tsx ---