export default function RejoindrePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20 text-center">
      <h1 className="text-5xl font-bold text-h91-relativistic mb-6">
        Nous joindre
      </h1>

      <p className="text-lg text-h91-stellar/80 leading-relaxed mb-10">
        Pour toute demande, collaboration, partenariat ou information générale,
        vous pouvez nous contacter directement via les moyens suivants.
      </p>

      <div className="space-y-6 text-h91-stellar/90 text-lg">
        <p><strong>Téléphone :</strong> (418) 000‑0000</p>
        <p><strong>Courriel :</strong> contact@horizon91.com</p>
        <p><strong>Adresse :</strong> Sainte‑Marie, Chaudière‑Appalaches, Québec</p>
      </div>

      <a
        href="mailto:contact@horizon91.com"
        className="inline-block mt-12 px-8 py-4 bg-h91-relativistic text-h91-gravity font-bold rounded-lg text-xl hover:bg-h91-ion transition"
      >
        Envoyer un courriel
      </a>
    </main>
  );
}
