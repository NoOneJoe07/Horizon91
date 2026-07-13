// ─────────────────────────────────────────────────────────
// Données des articles — Actualités Groupe Étoile Boréale
// Pour ajouter un article : ajouter un objet au tableau articles[]
// Le plus récent en premier.
// ─────────────────────────────────────────────────────────

export interface ArticleContent {
  title: string;
  excerpt: string;
  paragraphs: string[];
  cta: { text: string; url: string; external?: boolean };
}

export interface Article {
  slug: string;
  date: string; // ISO AAAA-MM-JJ
  readTime: number; // minutes
  tags: string[];
  accentColor: string;
  /** Chemin relatif depuis /public — ex: "/images/articles/citadelle-bjj.jpg" */
  image?: string;
  imageAlt?: string;
  fr: ArticleContent;
  en: ArticleContent;
  es: ArticleContent;
}

export const articles: Article[] = [
  // ── Article 3 — Loi 25 (2026-07-13) ─────────────────────────────────────
  {
    slug: "loi-25-guide-pme-quebec",
    date: "2026-07-13",
    readTime: 6,
    tags: ["Cybersécurité", "Conformité", "PME", "Loi 25"],
    accentColor: "#203478",
    fr: {
      title: "Loi 25 : ce que chaque PME québécoise doit savoir — et faire — maintenant",
      excerpt:
        "La Loi 25 est en vigueur. Les amendes peuvent atteindre 25 millions de dollars. Pourtant, la majorité des PME québécoises ne sont pas encore conformes. Voici ce qui vous attend — et comment vous protéger.",
      paragraphs: [
        "En septembre 2023, la dernière vague d'obligations de la Loi 25 est entrée en vigueur au Québec. Officiellement connue sous le nom de Loi modernisant des dispositions législatives en matière de protection des renseignements personnels (Loi 25), elle transforme en profondeur la façon dont les entreprises doivent collecter, traiter et protéger les données personnelles de leurs clients, employés et fournisseurs.",
        "Contrairement à ce que plusieurs croient, la Loi 25 ne vise pas seulement les grandes entreprises. Elle s'applique à toute organisation qui recueille des renseignements personnels dans le cadre de ses activités commerciales — y compris les PME, les travailleurs autonomes, les organismes sans but lucratif et les municipalités.",
        "Les obligations concrètes sont nombreuses. Chaque entreprise doit désigner un responsable de la protection des renseignements personnels (RPRP) — dans les petites structures, c'est souvent le dirigeant lui-même. Elle doit publier une politique de confidentialité accessible, obtenir un consentement clair et explicite avant toute collecte de données, et informer la Commission d'accès à l'information (CAI) ainsi que les personnes concernées dans les 72 heures suivant toute atteinte à la sécurité.",
        "Les droits accordés aux individus ont également été considérablement renforcés : droit d'accès à leurs données, droit de rectification, droit à la désindexation (être « oublié »), et droit à la portabilité — c'est-à-dire de récupérer leurs données dans un format réutilisable.",
        "Les sanctions en cas de non-conformité sont sévères. Les pénalités administratives peuvent atteindre 10 millions de dollars ou 2 % du chiffre d'affaires mondial. Les sanctions pénales grimpent jusqu'à 25 millions de dollars ou 4 % du chiffre d'affaires. La CAI dispose de pouvoirs d'enquête élargis et peut agir proactivement.",
        "La bonne nouvelle : la conformité n'est pas inatteignable pour une PME bien accompagnée. Division Carillon de Groupe Étoile Boréale aide les entreprises de Beauce et de Chaudière-Appalaches à faire le point sur leur posture actuelle, à implanter les mesures requises et à documenter leurs pratiques pour pouvoir le prouver en cas d'audit. Parce que dans le monde numérique d'aujourd'hui, la confiance se construit — ou se perd — en quelques clics.",
      ],
      cta: { text: "Parler à Division Carillon →", url: "/contacts", external: false },
    },
    en: {
      title: "Law 25: What Every Quebec SMB Needs to Know — and Do — Right Now",
      excerpt:
        "Law 25 is in effect. Fines can reach $25 million. Yet most Quebec SMBs are still not compliant. Here's what's at stake — and how to protect yourself.",
      paragraphs: [
        "In September 2023, the final wave of obligations under Quebec's Law 25 came into force. Officially known as An Act to modernize legislative provisions as regards the protection of personal information, Law 25 fundamentally transforms how organizations must collect, process, and protect the personal data of their clients, employees, and suppliers.",
        "Contrary to popular belief, Law 25 does not only target large corporations. It applies to any organization that collects personal information in the course of its commercial activities — including SMBs, self-employed workers, non-profit organizations, and municipalities.",
        "The concrete obligations are numerous. Every business must designate a person in charge of the protection of personal information (PCPI) — in smaller organizations, this is often the owner or manager. They must publish an accessible privacy policy, obtain clear and explicit consent before any data collection, and notify the Commission d'accès à l'information (CAI) and affected individuals within 72 hours of any privacy breach.",
        "Individual rights have also been significantly strengthened: the right to access their data, the right to rectification, the right to de-indexation (the right to be 'forgotten'), and the right to data portability — meaning the ability to recover their data in a reusable format.",
        "Penalties for non-compliance are serious. Administrative sanctions can reach $10 million or 2% of worldwide revenue. Criminal penalties climb to $25 million or 4% of revenue. The CAI has expanded investigative powers and can act proactively.",
        "The good news: compliance is achievable for a well-supported SMB. Carillon Division at Boreal Star Group helps businesses in Beauce and Chaudière-Appalaches assess their current posture, implement required measures, and document their practices to demonstrate compliance in case of an audit. Because in today's digital world, trust is built — or lost — in just a few clicks.",
      ],
      cta: { text: "Talk to Carillon Division →", url: "/contacts", external: false },
    },
    es: {
      title: "Ley 25: Lo que toda pyme quebequense debe saber — y hacer — ahora",
      excerpt:
        "La Ley 25 está en vigor. Las multas pueden llegar a 25 millones de dólares. Sin embargo, la mayoría de las pymes quebequenses aún no cumplen con sus requisitos. Esto es lo que está en juego — y cómo protegerse.",
      paragraphs: [
        "En septiembre de 2023, entró en vigor en Quebec la última oleada de obligaciones de la Ley 25, oficialmente conocida como Ley de modernización de disposiciones legislativas en materia de protección de información personal. Esta ley transforma profundamente la forma en que las organizaciones deben recopilar, tratar y proteger los datos personales de sus clientes, empleados y proveedores.",
        "Contrariamente a lo que muchos creen, la Ley 25 no se aplica únicamente a las grandes empresas. Se aplica a toda organización que recopile información personal en el marco de sus actividades comerciales, incluidas las pymes, los trabajadores autónomos, los organismos sin fines de lucro y los municipios.",
        "Las obligaciones concretas son numerosas. Toda empresa debe designar un responsable de la protección de la información personal (RPIP) — en las estructuras pequeñas, suele ser el propio dirigente. Debe publicar una política de privacidad accesible, obtener un consentimiento claro y explícito antes de cualquier recopilación de datos, e informar a la Commission d'accès à l'information (CAI) y a las personas afectadas en un plazo de 72 horas tras cualquier violación de seguridad.",
        "Los derechos otorgados a las personas también se han reforzado considerablemente: derecho de acceso a sus datos, derecho de rectificación, derecho a la desindexación (el derecho al olvido) y derecho a la portabilidad de los datos, es decir, la posibilidad de recuperar sus datos en un formato reutilizable.",
        "Las sanciones por incumplimiento son severas. Las penalidades administrativas pueden alcanzar los 10 millones de dólares o el 2% del volumen de negocios mundial. Las sanciones penales ascienden hasta 25 millones de dólares o el 4% del volumen de negocios. La CAI dispone de amplios poderes de investigación y puede actuar de forma proactiva.",
        "La buena noticia: el cumplimiento es alcanzable para una pyme bien acompañada. La División Carillon de Grupo Estrella Boreal ayuda a las empresas de Beauce y Chaudière-Appalaches a evaluar su postura actual, implantar las medidas requeridas y documentar sus prácticas para poder demostrarlo en caso de auditoría. Porque en el mundo digital de hoy, la confianza se construye — o se pierde — en unos pocos clics.",
      ],
      cta: { text: "Hablar con División Carillon →", url: "/contacts", external: false },
    },
  },

  // ── Article 2 — Citadelle BJJ (2026-06-21) ───────────────────────────────
  {
    slug: "citadelle-bjj-premier-site",
    date: "2026-06-21",
    readTime: 4,
    tags: ["Portfolio", "Web", "Arts martiaux"],
    accentColor: "#0099D1",
    image: "/photos_images/citadelle-bjj-screenshot.png",
    imageAlt: "Citadelle Jiu-Jitsu — Page d'accueil citadellebjj.com",
    fr: {
      title: "Premier site livré : Citadelle Jiu-Jitsu s'installe dans le numérique",
      excerpt:
        "Le 21 juin 2026, la Division Draveur livre citadellebjj.com — un portail web complet pour le dojo de jiu-jitsu brésilien de la ville de Québec. Notre premier projet client. Notre première preuve.",
      paragraphs: [
        "Toute grande aventure commence quelque part. Pour Groupe Étoile Boréale, elle a commencé dans un dojo.",
        "Citadelle Jiu-Jitsu est un dojo de jiu-jitsu brésilien basé dans la ville de Québec, dirigé par un professeur passionné qui peinait à rejoindre sa clientèle en ligne. C'est exactement le type de client pour lequel le groupe a été fondé : quelqu'un qui est excellent dans son domaine, mais dont la présence numérique ne reflétait pas la qualité de ce qu'il offre.",
        "Le projet livré le 21 juin 2026 inclut un site web complet avec abonnements en ligne, intégration de paiement Stripe, espace administrateur, version bilingue FR/EN et optimisation SEO locale. Tout le cycle — de la maquette à la mise en ligne — a été complété par l'équipe de la Division Draveur.",
        "Le résultat : une vitrine numérique à la hauteur de l'art qu'elle représente. Un professeur passionné qui peut maintenant se consacrer à enseigner — pendant que son site travaille pour lui.",
        "C'est ça, le modèle Groupe Étoile Boréale. Pas juste livrer un site. Guider un entrepreneur vers une présence numérique qui lui ressemble et qui lui rapporte. Citadelle n'est que le premier. D'autres suivront. Découvrez notre approche complète sur etoileboreale.ca.",
      ],
      cta: { text: "Visiter citadellebjj.com →", url: "https://www.citadellebjj.com/", external: true },
    },
    en: {
      title: "First Website Delivered: Citadelle Jiu-Jitsu Goes Digital",
      excerpt:
        "On June 21, 2026, Draveur Division delivers citadellebjj.com — a complete web portal for Quebec City's Brazilian jiu-jitsu dojo. Our first client project. Our first proof.",
      paragraphs: [
        "Every great adventure starts somewhere. For Boreal Star Group, it started in a dojo.",
        "Citadelle Jiu-Jitsu is a Brazilian jiu-jitsu dojo based in Quebec City, led by a passionate instructor who was struggling to reach his audience online. This is exactly the type of client the group was founded for: someone excellent at what they do, but whose digital presence didn't reflect the quality of what they offer.",
        "The project, delivered June 21, 2026, includes a complete website with online memberships, Stripe payment integration, an admin dashboard, a bilingual FR/EN version, and local SEO optimization. The full cycle — from wireframe to launch — was completed by the Draveur Division team.",
        "The result: a digital showcase worthy of the art it represents. A passionate instructor who can now focus on teaching — while his website works for him.",
        "That's the Boreal Star Group model. Not just delivering a website. Guiding an entrepreneur toward a digital presence that looks like them and works for them. Citadelle is just the first. More will follow. Learn more about our approach at borealstar.ca.",
      ],
      cta: { text: "Visit citadellebjj.com →", url: "https://www.citadellebjj.com/", external: true },
    },
    es: {
      title: "Primer Sitio Entregado: Citadelle Jiu-Jitsu Entra al Mundo Digital",
      excerpt:
        "El 21 de junio de 2026, la División Draveur entrega citadellebjj.com — un portal web completo para el dojo de jiu-jitsu brasileño de la ciudad de Quebec. Nuestro primer proyecto de cliente. Nuestra primera prueba.",
      paragraphs: [
        "Toda gran aventura comienza en algún lugar. Para Grupo Estrella Boreal, comenzó en un dojo.",
        "Citadelle Jiu-Jitsu es un dojo de jiu-jitsu brasileño ubicado en la ciudad de Quebec, dirigido por un profesor apasionado que tenía dificultades para llegar a su clientela en línea. Es exactamente el tipo de cliente para el que se fundó el grupo: alguien excelente en su campo, pero cuya presencia digital no reflejaba la calidad de lo que ofrece.",
        "El proyecto, entregado el 21 de junio de 2026, incluye un sitio web completo con suscripciones en línea, integración de pagos con Stripe, panel de administración, versión bilingüe FR/EN y optimización SEO local. Todo el ciclo — desde la maqueta hasta el lanzamiento — fue completado por el equipo de la División Draveur.",
        "El resultado: una vitrina digital a la altura del arte que representa. Un profesor apasionado que ahora puede dedicarse a enseñar — mientras su sitio web trabaja para él.",
        "Ese es el modelo de Grupo Estrella Boreal. No solo entregar un sitio web. Guiar a un emprendedor hacia una presencia digital que lo represente y que le genere resultados. Citadelle es solo el primero. Habrá más. Descubra nuestro enfoque completo en etoileboreale.ca.",
      ],
      cta: { text: "Visitar citadellebjj.com →", url: "https://www.citadellebjj.com/", external: true },
    },
  },

  // ── Article 1 — Fondation (2026-05-15) ───────────────────────────────────
  {
    slug: "fondation-groupe-etoile-boreale",
    date: "2026-05-15",
    readTime: 3,
    tags: ["Entreprise", "Annonce"],
    accentColor: "#C9A84C",
    image: "/photos_images/Etoile_Boreale.png",
    imageAlt: "Groupe Étoile Boréale — Page d'accueil etoileboreale.ca",
    fr: {
      title: "Groupe Étoile Boréale naît officiellement — Une nouvelle étoile guide le numérique de la Beauce",
      excerpt:
        "Le 15 mai 2026, Groupe Étoile Boréale Inc. est officiellement inscrit au registre fédéral des entreprises canadiennes. Une agence créative et technologique née en Beauce, pour la Beauce — et au-delà.",
      paragraphs: [
        "Il y a des entreprises qui naissent d'une opportunité. Il y en a d'autres qui naissent d'une conviction. Groupe Étoile Boréale appartient à la deuxième catégorie.",
        "Le 15 mai 2026, l'entreprise est officiellement inscrite au registre fédéral des entreprises canadiennes sous le nom Groupe Étoile Boréale Inc. Ce n'est pas un nouveau début — c'est l'aboutissement d'un chemin commencé des années plus tôt, fait de reconversions, d'apprentissages et d'une question obstinée : comment mettre la technologie au service des gens d'ici ?",
        "Le groupe se structure autour de trois divisions complémentaires. Division Arpenteur prend en charge le graphisme et l'identité de marque — traçant les contours visuels des entreprises comme Jean Bourdon a tracé les premières rues de la Nouvelle-France. Division Draveur s'occupe du développement web — maîtrisant le flux numérique comme les draveurs maîtrisaient les rivières tumultueuses du Québec. Division Carillon veille sur la cybersécurité — défendant les données de nos clients avec la rigueur de Montcalm à la Bataille de Carillon en 1758.",
        "Notre marché cible : les PME et entrepreneurs de Beauce, Bellechasse et Chaudière-Appalaches. Non pas parce que c'est le marché le plus facile, mais parce que c'est le marché le plus ignoré. Les grandes agences regardent vers Montréal et Québec. Nous regardons vers ceux qui restent entre les deux. Et nous leur offrons un service trilingue — français, anglais, espagnol — parce que notre région accueille des talents venus du monde entier.",
        "L'Étoile Polaire ne brille pas pour elle-même. Elle guide. C'est ce que Groupe Étoile Boréale fait — et continuera de faire. Visitez notre site au etoileboreale.ca pour découvrir nos divisions et notre approche.",
      ],
      cta: { text: "Explorer nos divisions →", url: "/divisions", external: false },
    },
    en: {
      title: "Boreal Star Group Officially Founded — A New Star Guides Beauce's Digital Future",
      excerpt:
        "On May 15, 2026, Boreal Star Group Inc. was officially registered in the Canadian federal business registry. A creative and technology agency born in Beauce, for Beauce — and beyond.",
      paragraphs: [
        "Some companies are born from opportunity. Others are born from conviction. Boreal Star Group belongs to the second category.",
        "On May 15, 2026, the company was officially registered in the Canadian federal business registry under the name Boreal Star Group Inc. This isn't a new beginning — it's the culmination of a path started years earlier, built on career pivots, continuous learning, and one persistent question: how do we put technology at the service of the people here?",
        "The group is structured around three complementary divisions. Arpenteur Division handles graphic design and brand identity — charting the visual contours of businesses much like Jean Bourdon charted the first streets of New France. Draveur Division handles web development — mastering the digital flow the way the log drivers mastered Quebec's turbulent rivers. Carillon Division watches over cybersecurity — defending our clients' data with the rigour Montcalm showed at the 1758 Battle of Carillon.",
        "Our target market: SMBs and entrepreneurs in Beauce, Bellechasse, and Chaudière-Appalaches. Not because it's the easiest market, but because it's the most overlooked. Large agencies look toward Montreal and Quebec City. We look toward those who remain in between — and we serve them in three languages (French, English, Spanish) because our region welcomes talent from around the world.",
        "Polaris doesn't shine for itself. It guides. That's what Boreal Star Group does — and will continue to do. Visit us at borealstar.ca to learn more about our divisions and approach.",
      ],
      cta: { text: "Explore our divisions →", url: "/divisions", external: false },
    },
    es: {
      title: "Nace Oficialmente Grupo Estrella Boreal — Una Nueva Estrella Guía el Futuro Digital de Beauce",
      excerpt:
        "El 15 de mayo de 2026, Grupo Estrella Boreal Inc. fue inscrito oficialmente en el registro federal de empresas canadienses. Una agencia creativa y tecnológica nacida en Beauce, para Beauce — y más allá.",
      paragraphs: [
        "Hay empresas que nacen de una oportunidad. Otras nacen de una convicción. Grupo Estrella Boreal pertenece a la segunda categoría.",
        "El 15 de mayo de 2026, la empresa fue inscrita oficialmente en el registro federal de empresas canadienses bajo el nombre Grupo Estrella Boreal Inc. No es un nuevo comienzo — es la culminación de un camino iniciado años antes, construido sobre reconversiones profesionales, aprendizaje continuo y una pregunta persistente: ¿cómo poner la tecnología al servicio de la gente de aquí?",
        "El grupo se estructura en torno a tres divisiones complementarias. La División Arpenteur se encarga del diseño gráfico y la identidad de marca — trazando los contornos visuales de las empresas como Jean Bourdon trazó las primeras calles de la Nueva Francia. La División Draveur se ocupa del desarrollo web — dominando el flujo digital como los draveurs dominaban los turbulentos ríos de Quebec. La División Carillon vela por la ciberseguridad — defendiendo los datos de nuestros clientes con el rigor que demostró Montcalm en la Batalla de Carillon de 1758.",
        "Nuestro mercado objetivo: pymes y emprendedores de Beauce, Bellechasse y Chaudière-Appalaches. No porque sea el mercado más fácil, sino porque es el más ignorado. Las grandes agencias miran hacia Montreal y Ciudad de Quebec. Nosotros miramos hacia quienes permanecen entre ambas — y les ofrecemos un servicio trilingüe (francés, inglés, español) porque nuestra región acoge talentos venidos de todo el mundo.",
        "La Estrella Polar no brilla para sí misma. Guía. Eso es lo que Grupo Estrella Boreal hace — y continuará haciendo. Visítenos en etoileboreale.ca para descubrir nuestras divisiones y nuestro enfoque.",
      ],
      cta: { text: "Explorar nuestras divisiones →", url: "/divisions", external: false },
    },
  },
];

// Helper — trouve un article par slug
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

// Helper — formate la date selon la locale
export function formatDate(isoDate: string, locale: string): string {
  return new Date(isoDate).toLocaleDateString(
    locale === "en" ? "en-CA" : locale === "es" ? "es-MX" : "fr-CA",
    { year: "numeric", month: "long", day: "numeric" }
  );
}
