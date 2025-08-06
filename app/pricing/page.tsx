// --- INICIO DEL CÓDIGO FINAL PARA: app/pricing/page.tsx ---

// 1. Convertimos esta página en un Componente de Servidor eliminando "use client"
//    Esto es más rápido y seguro.

// 2. Importamos las herramientas necesarias
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
// Importamos los componentes de UI que tu página de precios necesita
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

export default async function PricingPage() {
  // 3. Creamos una conexión a Supabase en el servidor
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // 4. Verificamos si hay un usuario y obtenemos su perfil
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Obtenemos el perfil del usuario para saber su plan actual
  const { data: profile } = user 
    ? await supabase.from('profiles').select('subscription_level').eq('id', user.id).single()
    : { data: null };
  
  const currentPlan = profile?.subscription_level || 'free';

  // 5. Mantenemos tu lógica de planes, pero ahora usamos 'currentPlan' para la comparación
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Acceso básico a los micro-podcasts",
      features: ["Escucha 5 micro-podcasts al día", "Algoritmo de recomendación básico", "Calidad de audio estándar"],
      cta: "Plan Actual",
      disabled: currentPlan === "free",
      planId: "free", // ID para identificar el plan
    },
    {
      name: "Thinker",
      price: "$4.99",
      period: "por mes",
      description: "Acceso mejorado para mentes curiosas",
      features: [
        "Escucha ilimitada",
        "Crea hasta 10 micro-podcasts al mes",
        "Algoritmo de recomendación avanzado",
        "Audio de alta calidad",
        "Descarga para escuchar sin conexión",
      ],
      cta: currentPlan === "thinker" ? "Plan Actual" : "Suscribirse",
      disabled: currentPlan === "thinker",
      planId: "thinker",
      highlighted: true,
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "por mes",
      description: "Acceso completo a la plataforma para creadores",
      features: [
        "Todo lo del plan Thinker",
        "Creación de micro-podcasts ilimitada",
        "Prioridad en las recomendaciones",
        "Audio con calidad de estudio",
        "Panel de analíticas",
        "Opciones de marca personalizadas",
      ],
      cta: currentPlan === "pro" ? "Plan Actual" : "Suscribirse",
      disabled: currentPlan === "pro",
      planId: "pro",
    },
  ];

  // 6. Devolvemos el JSX. La lógica de los botones ahora es condicional.
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Planes de Precios</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Elige el plan perfecto para mejorar tu experiencia con los micro-podcasts
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`backdrop-blur-lg bg-card/80 border-muted/30 flex flex-col ${
              plan.highlighted ? "border-primary/50 shadow-lg shadow-primary/10" : ""
            }`}
          >
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground ml-1">{plan.period}</span>}
              </div>
              <CardDescription className="mt-2">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {user ? (
                // Si el usuario HA iniciado sesión, el botón es funcional (aunque la lógica de pago es para el futuro)
                <Button className="w-full" variant={plan.highlighted ? "default" : "outline"} disabled={plan.disabled}>
                  {plan.cta}
                </Button>
              ) : (
                // Si el usuario NO ha iniciado sesión, el botón lo lleva al login
                <Link href="/login?redirect=/pricing" className="w-full">
                  <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}>
                    Inicia sesión para suscribirte
                  </Button>
                </Link>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
// --- FIN DEL CÓDIGO FINAL PARA: app/pricing/page.tsx ---