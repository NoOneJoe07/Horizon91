export default function Footer() {
  return (
    <footer className="mt-20 border-t border-h91-relativistic/20 py-10 bg-h91-gravity">
      <div className="max-w-6xl mx-auto px-6 text-center text-h91-stellar/70">
        <p className="font-semibold text-h91-stellar">
          Horizon 91 — Groupe Créatif & Technologique
        </p>
        <p className="text-sm mt-2">
          © {new Date().getFullYear()} Horizon 91. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
