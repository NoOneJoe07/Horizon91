import { redirect } from "next/navigation";

// /accueil redirige vers / — la page d'accueil est app/page.tsx
export default function AccueilPage() {
  redirect("/");
}
