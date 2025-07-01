Fataplus – Plateforme Agricole Numérique de Madagascar

Fataplus est une application SaaS nouvelle génération dédiée à l’agriculture à Madagascar. Elle connecte les agriculteurs, formateurs et vendeurs autour d’un marché digital, d’une communauté active, de parcours de formation et d’un agent IA spécialisé. L’app s’appuie sur l’infrastructure Whop pour la gestion des accès, des paiements, de la communauté et du contenu.

🚀 Déploiement rapide sur Vercel

Déployer sur Vercel ↗

Configuration

Créez un fichier ‎⁠.env.local⁠ à la racine du projet avec les variables suivantes :NEXT_PUBLIC_WHOP_CLIENT_ID="Votre client ID Whop"
WHOP_CLIENT_SECRET="Votre client secret Whop"
WHOP_API_KEY="Votre API key Whop"
NEXTAUTH_URL="https://app.fata.plus"
NEXTAUTH_SECRET="Votre secret NextAuth"
NEXT_PUBLIC_RECOMMENDED_PLAN_ID="ID du plan recommandé"
NEXT_PUBLIC_REQUIRED_PRODUCT="ID(s) du produit requis"

Vous trouverez ces informations dans votre dashboard Whop.

Lancer en local
	1.	Clonez ce dépôt
	2.	Installez les dépendances :pnpm install
# ou
npm install

	3.	Lancez le serveur de développement :pnpm run dev
# ou
npm run dev

	4.	Ouvrez http://localhost:3000 ↗ pour voir l’application.

Fonctionnalités principales
	•	Authentification sécurisée Whop OAuth
	•	Paywall / Gating produit : accès aux contenus, marketplace, communauté, formations, selon les droits Whop
	•	Marketplace agricole : achat/vente de produits (module Whop)
	•	Formations & guides : accès à des parcours thématiques, quiz, certifications (module Whop)
	•	Communauté : forums, groupes, événements, chat (module Whop)
	•	Assistant IA : agent IA thématique (chatbot) avec quota gratuit puis accès premium payant (orchestration via N8N)
	•	Gestion du quota et upsell automatique : l’utilisateur peut tester l’IA gratuitement, puis est invité à souscrire à Fataplus Pro via Whop pour un accès illimité
	•	Automatisation N8N : gestion de la waitlist, des quotas, des notifications, et des workflows IA

Pages clés
	•	‎⁠/⁠ – Accueil Fataplus : vision, CTA, accès rapide aux modules
	•	‎⁠/waitlist⁠ – Formulaire d’inscription à la liste d’attente (early access)
	•	‎⁠/demo⁠ ou ‎⁠/agent⁠ – Démo de l’agent IA (chat, quota, upsell Whop)
	•	‎⁠/marketplace⁠ – Marché agricole (Whop)
	•	‎⁠/courses⁠ – Formations et guides (Whop)
	•	‎⁠/community⁠ – Forums, groupes, événements (Whop)
	•	‎⁠/account⁠ – Profil utilisateur, historique, gestion des accès


Déploiement production
	1.	Forkez ce repo et importez-le sur Vercel.
	2.	Renseignez les variables d’environnement dans les settings Vercel.
	3.	Ajoutez votre domaine personnalisé (‎⁠app.fata.plus⁠) dans Vercel.
	4.	Déployez : votre application sera en ligne et prête à accueillir vos utilisateurs.

Ressources utiles
	•	Documentation Whop SDK ↗
	•	Documentation Next.js ↗
	•	N8N (Cloudron) ↗
	•	Support Fataplus ↗

À venir
	•	Intégration avancée de l’IA et de l’automatisation via N8N
	•	Amélioration continue de l’expérience utilisateur et du parcours d’apprentissage
	•	Ouverture progressive via la waitlist et feedbacks utilisateurs

Fataplus – La plateforme numérique tout-en-un pour l’agriculture à Madagascar.