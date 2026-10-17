# Installation du Relais des Compagnons

Le site et le tableau de bord sont prêts côté code. Leur mise en service exige les **clés et comptes réels** (impossible de les inventer). Aucun service n'est actuellement connecté ni testé en production.

1. Créer un dépôt GitHub public et y placer le contenu de ce dossier à la racine. Activer GitHub Pages (branche main, dossier /root).
2. Créer un projet Supabase. Exécuter `supabase/schema.sql` dans SQL Editor. Dans Authentication, activer Email OTP / Magic Link et ajouter l'URL exacte du site aux URL de redirection autorisées.
3. Copier l'URL du projet et la clé **publishable / anon** dans `config.js`. Ne jamais y mettre `service_role` ni de secret Resend.
4. Ouvrir `administration.html`, demander un lien de connexion, puis exécuter dans SQL Editor la commande commentée en bas de `schema.sql` en remplaçant `ADRESSE_ADMIN` par le mail de l'administrateur. Vérifier que seul cet utilisateur lit les réponses.
5. Dans Supabase, déployer la fonction Edge `supabase/functions/notification-questionnaire/index.ts` avec vérification JWT désactivée pour l'appel webhook ; définir les secrets `RESEND_API_KEY`, `RELAIS_NOTIFICATION_EMAIL`, `RESEND_FROM`, `WEBHOOK_SECRET` (valeur aléatoire forte). Configurer Database Webhooks : table `questionnaires`, INSERT, URL de cette fonction et en-tête `x-webhook-secret` identique.
6. Chez Resend, vérifier un domaine d'expédition et utiliser une adresse autorisée dans `RESEND_FROM`. Effectuer une soumission réelle puis vérifier l'enregistrement, le mail et l'accès privé.
7. Avant ouverture publique : renseigner les mentions légales, les coordonnées réelles, la politique de confidentialité et sa durée de conservation, puis vérifier l'affichage mobile. Mettre à jour `robots.txt` et le sitemap avec l'URL réelle, puis déclarer le site dans Search Console.

**Sécurité et limites** : aucune donnée privée ne doit figurer dans le HTML ou dans GitHub. La clé anon est publique ; les politiques RLS protègent la lecture. L'insertion anonyme doit être surveillée contre le spam et pourra nécessiter une protection anti-robots. L'outil statistique regroupe les réponses par catégories de produits ; aucune attribution à un fournisseur précis n'est possible tant que le questionnaire ne demande pas de fournisseur. Le tableau de bord affiche les 5 000 dernières réponses. Le mail notifie seulement, sans données personnelles.
