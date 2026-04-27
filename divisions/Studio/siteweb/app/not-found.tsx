import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">

      {/* Titre */}
      <h1 className="text-6xl font-bold text-nordik-glacier mb-4">
        404
      </h1>

      {/* Message principal */}
      <p className="text-xl text-nordik-snow/80 max-w-xl mb-8">
        Vous avez quitté les sentiers balisés.<br />
        Le blizzard a effacé cette page.
      </p>

      {/* Bouton retour */}
      <Link
        href="/"
        className="bg-nordik-glacier text-nordik-night font-bold px-6 py-3 rounded-lg hover:bg-white transition"
      >
        Retour à l’accueil
      </Link>

      {/* Ambiance boréale */}
      <div className="mt-16 text-nordik-snow/40 text-sm">
        ❄️ Le Nord est vaste… certaines routes disparaissent.
      </div>
    </div>
  );
}

