# Le Relais des Compagnons — version de préparation (17 octobre 2026)

## Contenu livré
Site responsive : accueil, territoire rural, recyclerie, ateliers, fournisseurs à l’étude, questionnaire détaillé, actualités, contact, confidentialité, mentions légales.

## État réel
- Pages consultables localement : ouvrir `index.html` dans le navigateur.
- Questionnaire : **maquette volontairement désactivée**. Aucune collecte, aucun mail, aucune base de données. Ne pas présenter comme opérationnel.
- Administration : **non implémentée** ; ne pas mettre de données personnelles dans un dossier public GitHub.
- Indexation Google : bloquée temporairement (`noindex` et `robots.txt`) pour éviter une publication prématurée. À retirer seulement une fois le site prêt et son URL finale connue.

## Choix technique à valider
Pour conserver GitHub Pages comme à Bapaume, ajouter un service externe de formulaires et de stockage avec authentification administrateur (ex. solution hébergée dédiée), ainsi qu’une notification à l’adresse mail du Relais. Vérifier les fonctionnalités réelles, conditions RGPD, tarifs et limites du prestataire choisi avant intégration. Alternative : hébergement avec fonctions serveur et base de données, plus simple pour une administration unifiée mais différent de GitHub Pages.

## Circuit visé
1. Visiteur envoie son questionnaire via un formulaire sécurisé.
2. Serveur valide, limite les abus et enregistre la réponse en base privée.
3. Notification à l’adresse officielle du Relais (sans détail sensible dans le courriel).
4. Administrateur authentifié consulte, filtre, exporte, marque comme traité ; peut répondre depuis la messagerie officielle si le visiteur a donné son mail et souhaite un contact.
5. Données effacées selon durée de conservation définie ; statistiques agrégées possibles.

## Vérifications avant publication
- Confirmer adresse mail officielle, dénomination légale, siège, hébergeur, responsable de publication.
- Vérifier les URLs Facebook officielles, et les droits d’utilisation du logo/images.
- Valider les informations fabricants et éviter toute suggestion d’accord conclu.
- Compléter confidentialité/RGPD et mentions légales ; tester l’envoi et la réception des notifications, l’authentification, l’export et la suppression des réponses.
- Configurer l’URL définitive, les liens canoniques, `sitemap.xml`, retirer `noindex`, ouvrir `robots.txt`, connecter Google Search Console et demander l’indexation.
- Vérifier les pages sur téléphone et ordinateur, la navigation clavier et les erreurs 404.

## Actualités
Cette version prévoit une page éditoriale. Pour la mise à jour sans modifier le code, prévoir une interface d’administration ou un CMS avec contrôle d’accès, à installer avec la solution retenue pour les formulaires.

## Protection de l’association
Les fournisseurs sont décrits comme « à l’étude ». Aucun partenariat, stock, disponibilité ou date d’ouverture n’est annoncé. Éviter d’utiliser logos, photos et textes des fabricants sans droits appropriés.
