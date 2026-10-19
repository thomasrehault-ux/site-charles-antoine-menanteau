# Mise en ligne — Charles-Antoine Menanteau

Préparation du 19 octobre 2026, limitée à l’hébergement, au domaine et à la messagerie. Rien n’a été créé ni acheté chez les prestataires ; aucun déploiement distant effectué dans cette préparation.

## Base et différences avec Aude

Procédure source lue : `/Users/thomasrehault/Documents/Codex/site-aude-rehault/docs/mise-en-ligne.md` (mise en ligne du 17 octobre 2026).

Architecture retenue : **Cloudflare Pages pour le site et Cloudflare pour les DNS ; OVHcloud pour l’enregistrement du domaine et la boîte e-mail**. Charles n’a aucun ancien site, domaine ou courrier à migrer : aucun transfert IONOS, code de transfert, export DNS historique, résiliation, import de boîte ou redirection WordPress à prévoir. Ne pas recopier les identifiants, serveurs DNS ou clés DKIM d’Aude.

Domaine cible repris des notes du projet : `charlesantoinemenanteau.fr`, avec `contact@charlesantoinemenanteau.fr`. **Disponibilité, prix initial et renouvellement à vérifier chez OVH avant achat** ; aucune réservation n’est affirmée. Si le nom change, adapter `SITE_URL` et l’adresse prévue dans les mentions avant publication.

## 1. Créer les comptes de Charles

- Recueillir une **adresse e-mail existante contrôlée par Charles**, indépendante du futur domaine, pour créer et récupérer les deux comptes. La future adresse `contact@…` n’existe pas encore.
- Créer un nouveau compte [Cloudflare](https://dash.cloudflare.com/sign-up) et un nouveau compte [OVHcloud](https://www.ovhcloud.com/fr/), au nom de Charles, avec ses coordonnées de titulaire et de facturation. Utiliser les informations professionnelles déjà confirmées dans `docs/mentions-legales-brouillon.md` ; faire compléter les champs personnels manquants directement par Charles.
- Faire valider les e-mails, définir les mots de passe et activer la double authentification ; Charles conserve les codes de récupération hors du dépôt.
- Donner ensuite à Thomas un accès de gestion nominatif adapté. Ne pas utiliser les comptes d’Aude ou ajouter les services de Charles à ceux-ci.
- Autoriser l’intégration GitHub pour le seul dépôt `thomasrehault-ux/site-charles-antoine-menanteau`. La propriété des nouveaux comptes ne nécessite pas de transférer ce dépôt.

## 2. Acheter le nouveau domaine chez OVH

1. Chercher **l’enregistrement d’un nouveau domaine**, pas un transfert. Vérifier l’orthographe, la disponibilité et le titulaire Charles-Antoine Menanteau.
2. Relever dans le panier : montant TTC initial, durée, montant du renouvellement, renouvellement automatique et offre e-mail réellement incluse. Le tarif et l’offre obtenus pour Aude ne valent pas devis pour Charles.
3. Prendre le domaine seul avec la messagerie nécessaire ; aucun hébergement web OVH payant n’est nécessaire pour Cloudflare Pages. Examiner les options ajoutées au panier.
4. Faire valider le panier concret avant règlement. Après commande, vérifier sa livraison et les éventuelles demandes de validation du titulaire.

## 3. Déployer sur Cloudflare Pages

Préparation du code à intégrer/pousser sur `main` avant de connecter la production.

| Réglage | Valeur |
| --- | --- |
| Service | Pages, site statique (pas un Worker) |
| Projet proposé | `site-charles-antoine-menanteau` (disponibilité à vérifier) |
| Dépôt | `thomasrehault-ux/site-charles-antoine-menanteau` |
| Branche de production | `main` |
| Répertoire racine | Racine du dépôt |
| Commande | `npm run build` |
| Sortie | `dist` |
| Node | 22 (`.nvmrc`) |
| `SITE_URL` | `https://charlesantoinemenanteau.fr` (valeur par défaut du code) |
| `SITE_BASE_PATH` | Ne pas définir : Cloudflare sert `/` |

Créer le projet dans le nouveau compte de Charles avec l’intégration GitHub. Vérifier le premier déploiement sur **l’URL pages.dev effectivement attribuée** : navigation, images et mentions. Aucun adaptateur serveur ni secret de compilation n’est requis.

Le workflow GitHub conserve explicitement son URL et son sous-répertoire actuels ; il affiche les coordonnées de GitHub. La version à la racine prépare les coordonnées de Cloudflare. Les deux profils ont été compilés localement. `_headers` demande de ne pas indexer les hôtes `pages.dev` ; ce comportement HTTP reste à vérifier après déploiement.

## 4. Relier le domaine et les DNS

1. Ajouter le domaine acheté comme zone Cloudflare Free dans le compte de Charles. Relever **les deux serveurs attribués à cette nouvelle zone**.
2. Vérifier les entrées éventuellement créées automatiquement chez OVH (parking, redirection et e-mail). Conserver les entrées utiles de messagerie si elles existent déjà ; retirer uniquement les entrées web qui empêchent Pages de gérer `@` et `www`.
3. Dans OVH, remplacer les **serveurs DNS du domaine** par les deux valeurs Cloudflare. Modifier la zone DNS OVH seule ne délègue pas les DNS. Vérifier l’absence de DS incompatible avant changement ; configurer DNSSEC Cloudflare et son DS chez OVH après activation de la délégation si souhaité.
4. Attendre la zone Cloudflare active. Dans Pages → Custom domains, déclarer `charlesantoinemenanteau.fr` et `www.charlesantoinemenanteau.fr`, puis contrôler les enregistrements Pages proposés. Un CNAME créé seul ne suffit pas.
5. Attendre les deux domaines **Active / SSL enabled**. Activer HTTP → HTTPS et la redirection 301 de `www` vers le domaine sans `www`, en conservant chemin et paramètres. Comme pour Aude, exclure `/.well-known/` et `/cdn-cgi/` du filtre de redirection pour laisser les validations fonctionner. Vérifier l’absence de boucle.
6. Une fois le domaine validé, rediriger l’hôte principal `pages.dev` vers le domaine avec une Bulk Redirect (301, chemin et paramètres conservés), sans inclure les sous-domaines d’aperçu.

Aucun serveur DNS ou CNAME propre à Charles ne peut être renseigné avant sa création effective.

## 5. Activer la boîte OVH

- Utiliser l’offre Zimbra incluse **si le panier et le compte confirment sa disponibilité**, sinon examiner l’offre nécessaire avant toute commande supplémentaire.
- Créer l’organisation et rattacher le domaine. Reporter dans **Cloudflare**, désormais DNS autoritaire, le CNAME de validation fourni par OVH, en DNS only.
- Créer `contact@charlesantoinemenanteau.fr` ; Charles saisit le mot de passe. Vérifier le statut Actif.
- Reporter les valeurs exactes du diagnostic de cette nouvelle organisation : MX et priorités, SPF unique, SRV/autodiscover, CNAME DKIM propres à Charles. Les noms mail et validations doivent rester en DNS only. Activer la signature DKIM dans OVH ; ne pas réutiliser les cibles d’Aude.
- Ajouter une politique DMARC initiale `v=DMARC1; p=none;`, puis vérifier MX/SPF/DKIM/DMARC publiés et les diagnostics OVH.
- Tester un message entrant et un message sortant avec une boîte externe ; vérifier la réception et les résultats SPF/DKIM/DMARC du message reçu.
- Après vérification, rendre l’adresse active dans les mentions (lien `mailto:` et retrait du texte « en cours d’activation »). Le code conserve actuellement ce texte et aucun lien mail actif.

## 6. Recette et suivi

- HTTPS valide, HTTP → HTTPS, www → domaine principal ; vérifier aussi `/contact?verification=charles` et la conservation du paramètre.
- Les huit pages existantes, leurs images/CSS, `robots.txt` et `sitemap.xml` répondent en 200. Les URL canoniques et le sitemap désignent le domaine définitif sans préfixe GitHub.
- Une URL inexistante répond réellement en 404 (présence de `404.html`, sans repli de type application monopage). L’accueil du domaine reste indexable ; les aperçus pages.dev portent `X-Robots-Tag: noindex, nofollow`.
- Vérifier les mentions Cloudflare et le fonctionnement réel de la messagerie. Créer ensuite la propriété Search Console de Charles, conserver sa validation DNS et soumettre le sitemap.
- Consigner ici l’URL réelle, le commit publié, l’état des domaines/certificats, les serveurs DNS attribués, la livraison OVH et le résultat du test e-mail. Ne consigner aucun secret.

**État actuel :** préparation locale terminée. Restent à fournir : e-mail existant de Charles pour les comptes, validations d’inscription et coordonnées de facturation manquantes ; puis domaine disponible et panier vérifié. Aucun compte, domaine, DNS, boîte ou certificat de production n’a été créé ou vérifié.

## Références officielles vérifiées

- [Cloudflare : Astro et réglages Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)
- [Cloudflare : domaines personnalisés](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [Cloudflare : redirection www](https://developers.cloudflare.com/pages/how-to/www-redirect/)
- [Cloudflare : en-têtes HTTP](https://developers.cloudflare.com/pages/configuration/headers/) et [page 404](https://developers.cloudflare.com/pages/configuration/serving-pages/)
- [Cloudflare : coordonnées et confidentialité](https://www.cloudflare.com/privacypolicy/)
- [OVHcloud : recherche et achat d’un domaine](https://www.ovhcloud.com/fr/domains/)
- [OVHcloud : premiers pas Zimbra](https://docs.ovhcloud.com/fr/guides/web-cloud/email-and-collaborative-solutions/zimbra/getting-started-zimbra)
