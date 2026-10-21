# Mise en ligne — Charles-Antoine Menanteau

Préparation du 19 octobre et exécution du 21 octobre 2026, limitées à l’hébergement, au domaine et à la messagerie. **Site public actif sur https://charlesantoinemenanteau.fr/ ; boîte contact active et testée par Thomas.** La dernière publication du lien e-mail est en cours. Le journal d’exécution ci-dessous fait foi ; les étapes initiales décrivent la procédure préparée avant achat.

## Base et différences avec Aude

Procédure source lue : `/Users/thomasrehault/Documents/Codex/site-aude-rehault/docs/mise-en-ligne.md` (mise en ligne du 17 octobre 2026).

Architecture retenue : **Cloudflare Pages pour le site et Cloudflare pour les DNS ; OVHcloud pour l’enregistrement du domaine et la boîte e-mail**. Charles n’a aucun ancien site, domaine ou courrier à migrer : aucun transfert IONOS, code de transfert, export DNS historique, résiliation, import de boîte ou redirection WordPress à prévoir. Ne pas recopier les identifiants, serveurs DNS ou clés DKIM d’Aude.

Domaine enregistré chez OVH : `charlesantoinemenanteau.fr`, avec `contact@charlesantoinemenanteau.fr`. Commande **261335704**, **5,99 € TTC pour un an**, renouvellement affiché **7,79 € HT/an** ; une boîte Starter incluse. Paiement validé le 21 octobre 2026.

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

**Remise à Charles :** remplacer l’e-mail et le téléphone provisoires du compte OVH, inviter Charles comme administrateur du seul compte Cloudflare dédié, et lui transmettre les accès hors du dépôt. Ne pas modifier le profil global Cloudflare de Thomas. Aucun déploiement automatique GitHub → Cloudflare n’est encore configuré : publication actuelle en Direct Upload. Search Console et son sitemap restent à remettre en place avec le compte Google retenu pour Charles.

## Références officielles vérifiées

- [Cloudflare : Astro et réglages Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)
- [Cloudflare : domaines personnalisés](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [Cloudflare : redirection www](https://developers.cloudflare.com/pages/how-to/www-redirect/)
- [Cloudflare : en-têtes HTTP](https://developers.cloudflare.com/pages/configuration/headers/) et [page 404](https://developers.cloudflare.com/pages/configuration/serving-pages/)
- [Cloudflare : coordonnées et confidentialité](https://www.cloudflare.com/privacypolicy/)
- [OVHcloud : recherche et achat d’un domaine](https://www.ovhcloud.com/fr/domains/)
- [OVHcloud : premiers pas Zimbra](https://docs.ovhcloud.com/fr/guides/web-cloud/email-and-collaborative-solutions/zimbra/getting-started-zimbra)

## Exécution du 19 octobre 2026

- Thomas autorise le lancement et l’utilisation provisoire de son adresse Gmail pour les nouveaux comptes ; les services doivent pouvoir être repris par Charles ensuite. Ne pas modifier l’adresse du profil Cloudflare personnel de Thomas : inviter ultérieurement Charles comme Super Administrator du seul compte dédié, puis ajuster les membres. Le contact principal OVH du nouveau compte pourra être changé avec validation.
- Compte Cloudflare séparé **Charles-Antoine Menanteau** créé : `b8f85d827e831d517d1b7ab0e07e0ea1`. Les sites d’Aude et les autres sites restent dans le compte existant.
- PR [#5](https://github.com/thomasrehault-ux/site-charles-antoine-menanteau/pull/5) intégrée ; commit de fusion `7bb936013ca8b4ac79738fe70965020337e1231b`. Déploiement GitHub Pages réussi ([exécution](https://github.com/thomasrehault-ux/site-charles-antoine-menanteau/actions/runs/39231105436)).
- La connexion GitHub a demandé une authentification mobile, effectuée par Thomas. L’application Cloudflare est déjà installée pour son autre compte. Aucun droit GitHub n’a été modifié. La [documentation Cloudflare](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/) recommande de lier un compte GitHub à un seul compte Cloudflare. Pour garder un compte Charles séparé, le premier déploiement est préparé en **Direct Upload**. L’automatisation future pourra utiliser GitHub Actions et Wrangler avec un jeton limité au compte Charles ; elle n’est pas configurée. Un projet Direct Upload ne se convertit pas ensuite en intégration Git native.
- Projet Pages `site-charles-antoine-menanteau` créé ; hôte annoncé `site-charles-antoine-menanteau.pages.dev`. **Aucun déploiement réussi n’est encore confirmé**. Archive statique de production compilée localement ; import par l’extension bloqué par l’autorisation d’accès aux fichiers locaux. Tentative de sélection par le sélecteur système interrompue par un changement de fenêtre ; aucun envoi n’est affirmé.
- Inscription OVH ouverte en France, EUR, site français, adresse provisoire de Thomas préparée. Thomas doit saisir et soumettre lui-même le nouveau mot de passe et accepter les conditions ; validation e-mail à effectuer ensuite. Aucun compte OVH créé n’est encore confirmé.
- La recherche du domaine chez OVH reste sans résultat exploitable (chargement / interception de sécurité). Disponibilité, tarif et achat non confirmés. Aucun paiement, DNS, certificat ou compte mail configuré.

### Inscription OVH — reprise

Thomas confirme avoir créé les identifiants, validé l’e-mail et choisi « Entreprise ». Le SIRET `80885334500029` a été saisi : OVH retrouve **CHARLES-ANTOINE MENANTEAU**, SIREN `808853345`, et affiche le formulaire final de vérification. L’adresse remontée diffère de celle du cabinet : confirmation demandée, ainsi que le statut TVA. Le numéro de TVA calculé automatiquement par OVH n’a pas été sélectionné. Le contrôle automatique a refusé la saisie des nom/prénom et du téléphone sans accord explicite ; cet accord a été demandé. Aucun formulaire final validé à ce stade.

L’envoi de l’archive Pages attend une sélection manuelle par Thomas : le transfert via l’extension est désactivé et la tentative avec le sélecteur système a été interrompue par l’utilisation concurrente de Chrome. Aucun nouveau droit de navigateur n’a été accordé.


### Confirmations de Thomas et prochaine reprise

- Adresse de Clisson remontée par le SIRET autorisée pour le compte OVH, distincte de l’adresse du cabinet publiée sur le site.
- Charles n’a pas de numéro de TVA : sélectionner « Mon entreprise n’est pas immatriculée à la TVA » ; ne pas utiliser le numéro calculé automatiquement.
- Saisie de Charles-Antoine Menanteau autorisée chez OVH. Téléphone obligatoire (champ marqué d’un astérisque) : utiliser le numéro provisoire fourni par Thomas dans le chat le 19 octobre, pas le numéro professionnel du site. **À remplacer lors de la remise du compte à Charles**, comme l’adresse e-mail de contact. Ne pas modifier le téléphone du site.
- Thomas ne voit plus l’onglet Cloudflare. Trois tentatives de connexion/réouverture avec l’outil navigateur ont expiré sans résultat ; aucune saisie OVH ni réouverture Cloudflare confirmée depuis ces accords. Réactiver la connexion de l’extension pour reprendre, sans redemander ces autorisations.

### Connexion rétablie — comptes et premier déploiement

- Le redémarrage de Codex a rétabli le contrôle de Chrome.
- Compte OVH **`yc33934-ovh`** créé et vérifié dans le manager. Prénom **Charles-Antoine**, nom **Menanteau** et libellé **Charles-Antoine Menanteau** corrigés puis enregistrés ; le tableau de bord affiche désormais l’identité exacte. Adresse de Clisson et absence de TVA conservées conformément aux confirmations. Le téléphone provisoire communiqué par Thomas est enregistré ; le remplacer à la remise du compte, ainsi que l’e-mail provisoire. Aucun changement du téléphone public du site.
- Premier déploiement Cloudflare **réussi**, via Direct Upload : `6c5a63a1-8ccf-47dd-8740-688d9ea23034`. Site accessible sur https://site-charles-antoine-menanteau.pages.dev/ ; URL immuable https://6c5a63a1.site-charles-antoine-menanteau.pages.dev/. Archive compilée à partir du code de la PR #5 intégrée, sans modification visuelle.
- Vérification distante : huit pages, robots et sitemap en HTTP 200 ; ressources de l’accueil en 200 ; URL inconnue en 404 ; canonique du futur domaine et mentions Cloudflare vérifiées. `X-Robots-Tag: noindex, nofollow` confirmé sur l’aperçu. Ouverture du site dans Chrome réussie.
- Domaine `charlesantoinemenanteau.fr` affiché disponible chez OVH. Panier connecté au compte de Charles, durée ramenée de 3 ans (proposition automatique) à **1 an**, **4,99 € HT / 5,99 € TTC**, renouvellement affiché **7,79 € HT/an**. Une boîte Zimbra Starter incluse ; aucun hébergement ni compte mail payant ajouté. Option DNSSEC OVH automatique retirée du panier avant achat, pour préparer la délégation Cloudflare ; aucun DNSSEC actif désactivé.
- Titulaire, administrateur et contact technique : compte Charles `yc33934-ovh`, adresse de contact provisoire de Thomas. Achat demandé à validation de Thomas ; **aucun paiement effectué**, domaine non encore enregistré. Zone DNS Cloudflare et boîte e-mail restent à configurer après livraison.

### Panier validé — paiement préparé

Thomas valide l’achat après explication du parcours de paiement. Page **Paiement** OVH ouverte, total **5,99 € TTC**, domaine pour un an et compte Zimbra Starter inclus. Adresse et identité du compte Charles confirmées à l’écran. Aucun moyen de paiement sélectionné ou saisi par l’agent, aucune case contractuelle cochée et aucun règlement envoyé. Les conditions affichées comprennent l’exécution immédiate et la renonciation au droit de rétractation pour le domaine. Thomas doit examiner/accepter ces conditions, choisir et saisir le moyen de paiement, puis confirmer lui-même le règlement. Attendre la confirmation de livraison avant de configurer les DNS et la messagerie.

### Reprise du 21 octobre 2026

Thomas indique avoir fermé les pages avant de pouvoir contacter sa banque. Aucune livraison ni aucun règlement ne sont donc présumés. Le projet Cloudflare et le déploiement du 19 octobre sont toujours visibles dans le compte dédié. La session OVH a expiré : page de connexion ouverte avec `yc33934-ovh`, reconnexion demandée à Thomas. Prochaine action après connexion : vérifier les commandes existantes et leur état avant de reprendre le panier ou un paiement, pour éviter tout doublon. L’accord sur le panier du 19 octobre et les coordonnées confirmées reste acquis, sous réserve de vérifier le montant réel à la reprise.

### Commande existante retrouvée le 21 octobre

- Connexion au compte Charles effectuée par Thomas. Historique OVH : une seule commande non expirée, **261335704**, datée du 19 octobre 2026 à 12 h 07 min 05 s, statut **Paiement non reçu**, montant **5,99 € TTC**.
- Bon de commande ouvert puis contrôlé : domaine exact `charlesantoinemenanteau.fr`, enregistrement 12 mois, Zimbra Starter à 3,60 € HT compensé par la remise « Free starter account with domain » de -3,60 € HT, DNS et installations à 0 €. Total 4,99 € HT + 1 € de TVA. Expiration affichée : **2 novembre 2026 à 23 h 29 min 59 s**.
- Page de règlement de cette commande existante rouverte. Aucun nouveau panier ni aucune commande supplémentaire créés. Aucun moyen de paiement sélectionné et aucun règlement soumis par l’agent. Thomas doit choisir son moyen et confirmer le paiement ; prochaine étape : vérifier l’acceptation et la livraison, puis configurer la délégation Cloudflare et la boîte incluse.

### Paiement validé et livraison en cours — 21 octobre

- Thomas confirme le règlement. OVH affiche la confirmation de traitement de la commande **261335704** ; suivi : **Commande acceptée à 10 h 51**, **Paiement validé à 10 h 53 min 05 s**, **Préparation à 10 h 53 min 06 s** (Paris). La livraison du domaine et de Zimbra est encore en cours ; aucune nouvelle commande n’est nécessaire.
- Zone `charlesantoinemenanteau.fr` préparée dans le compte Cloudflare Charles, formule **Free**. Scan initial : zéro enregistrement. Serveurs attribués, relevés dans la page Cloudflare : **`demi.ns.cloudflare.com`** et **`titan.ns.cloudflare.com`**. Délégation OVH non modifiée à ce stade ; les enregistrements Pages et mail doivent être ajoutés avant activation complète.
- Premier contrôle du registre AFNIC pendant la livraison : domaine encore absent de RDAP et pas de délégation publique. Il ne s’agit pas d’un échec de paiement ; attendre la livraison effective avant de prétendre que le domaine est actif.

- AFNIC confirme ensuite le domaine **ACTIVE**, bureau d’enregistrement OVH, créé le **21 octobre 2026 à 10 h 53 min 53 s (Paris)**, expiration le 21 octobre 2027. Délégation initiale : `dns103.ovh.net` et `ns103.ovh.net`.
- Zone Cloudflare : CNAME racine et `www` enregistrés vers `site-charles-antoine-menanteau.pages.dev`, proxy activé, TTL automatique. **Leur présence ne suffit pas à activer Pages** : le formulaire Pages exige d’abord la délégation Cloudflare active, puis il faudra reprendre l’association des deux domaines personnalisés.
- Le DNS OVH initial contient les MX `1 mx1.mail.ovh.net.`, `5 mx2.mail.ovh.net.`, `100 mx3.mail.ovh.net.` et SPF `v=spf1 include:mx.ovh.com -all`. Ces valeurs sont un relevé de la zone initiale, pas encore le diagnostic Zimbra de Charles. TXT de parking `1|www.charlesantoinemenanteau.fr` à ne pas recopier dans la zone de production.

- Règle Cloudflare **`www vers charlesantoinemenanteau.fr`** déployée et visible activée : filtre `(http.host eq "www.charlesantoinemenanteau.fr") and not starts_with(http.request.uri.path, "/.well-known/") and not starts_with(http.request.uri.path, "/cdn-cgi/")`, destination dynamique `concat("https://charlesantoinemenanteau.fr", http.request.uri.path)`, statut 301, paramètres conservés. Vérification HTTP à effectuer après activation DNS/certificats.

### Délégation et préparation Zimbra

- OVH a accepté la délégation vers `demi.ns.cloudflare.com` et `titan.ns.cloudflare.com`. Les deux apparaissent « En cours d’activation » ; les anciens serveurs sont « En cours de suppression ». DNSSEC était désactivé avant la modification. Cloudflare attend encore la propagation ; vérification des serveurs demandée depuis son tableau de bord.
- Organisation Zimbra « Charles-Antoine Menanteau » et domaine préparés dans l’assistant du service inclus (`889c7f96-600e-41f8-a449-2e5acbc7adc1`). Formulaire de boîte `contact`, prénom/nom exacts, offre **Starter (1)** sélectionnée. Mot de passe laissé vide : saisie et validation « Configurer » confiées à Thomas. La création de la boîte et le diagnostic DNS restent à vérifier après son action. Aucune messagerie opérationnelle n’est encore affirmée.

### Site et messagerie actifs — 21 octobre

- Délégation publique désormais Cloudflare, zone activée. Domaine principal associé au projet Pages : **Active / SSL enabled**. `www` également déclaré, vérification Pages en cours au dernier relevé ; sa redirection HTTPS fonctionne déjà.
- Boîte **contact@charlesantoinemenanteau.fr**, **Starter 15 Gio**, statut **Actif**, un compte inclus utilisé sur un. Thomas confirme le fonctionnement de l’envoi et de la réception après le test externe demandé. Aucun contenu de message ni résultat détaillé d’authentification des en-têtes n’a été inspecté par l’agent.
- Configuration issue de la zone OVH créée pour Charles, recopiée dans Cloudflare : MX `1 mx0.mail.ovh.net`, `5 mx1.mail.ovh.net`, `50 mx2.mail.ovh.net`, `100 mx3.mail.ovh.net` ; TXT SPF unique `v=spf1 include:mx.ovh.com ~all` ; SRV `_autodiscover._tcp` : `0 0 443 zimbra1.mail.ovh.net`. TXT `_dmarc` : `v=DMARC1; p=none`. Toutes les entrées mail restent en **DNS only**.
- CNAME DKIM en DNS only : `ovhmo-selector-1._domainkey` → `ovhmo-selector-1._domainkey.5031215.fn.dkim.mail.ovh.net` et `ovhmo-selector-2._domainkey` → `ovhmo-selector-2._domainkey.5031216.fn.dkim.mail.ovh.net`. Signature activée ; diagnostics OVH **Configuration OK** pour MX, SRV, SPF et DKIM. Interrogation directe des DNS Cloudflare confirme les valeurs publiées. Pas de CNAME de validation supplémentaire demandé par ce parcours, le domaine OVH ayant été reconnu automatiquement.
- **Always Use HTTPS** activé. Contrôles publics avec validation TLS : huit pages, robots, sitemap, CSS et portrait en 200 ; URL inexistante en 404 ; canoniques du domaine ; aucun `noindex` sur le site public. HTTP et `www` redirigent en 301 vers le domaine canonique, chemin et paramètres conservés.
- Bulk Redirect **charles_pages_vers_domaine** activée : liste `b29bcc2938e946f4a951b7abd090ead6`, règle `e78eae4b0a024d20b4ce18cdb0aad5c5`. Source `site-charles-antoine-menanteau.pages.dev`, cible `https://charlesantoinemenanteau.fr`, 301, sous-chemins et paramètres conservés, sous-domaines d’aperçu exclus. Test `/contact/?test=charles` : 301 exact ; aperçu immuable toujours 200 avec `noindex, nofollow`.
- Lien mail activé dans le code des mentions et message d’attente supprimé, sans refonte. Build réussi et archive `/tmp/charles-cloudflare-final.zip` prête. Sélection manuelle du fichier dans Cloudflare demandée à Thomas à cause de la restriction d’import de l’extension ; dernier déploiement et contrôle distant du lien encore à effectuer.
