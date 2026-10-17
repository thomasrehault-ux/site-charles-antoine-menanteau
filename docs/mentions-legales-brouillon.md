# Préparation des mentions légales

Document de suivi du 17 octobre 2026. La page correspondante est créée dans `src/pages/mentions-legales.astro` et accessible depuis le pied de page. Son déploiement est demandé sur GitHub Pages.

## Informations confirmées par Thomas

- Éditeur : Charles-Antoine Menanteau, entrepreneur individuel (EI).
- SIREN : 808 853 345, déduit des neuf premiers chiffres du SIRET communiqué.
- SIRET communiqué : 808 853 345 00029.
- Domiciliation de l’activité : 6 et 7 rue des Rochettes, 44000 Nantes.
- Téléphone professionnel à publier : 07 83 11 25 05.
- RPPS communiqué : 10009472142.
- Titres : psychologue et psychothérapeute ; enregistrement auprès de l’ARS des Pays de la Loire confirmé par Thomas.
- Présentation sur le site : psychologue clinicien, psychothérapeute et hypnothérapeute.
- Diplôme : Master 2 de psychologie clinique, UCO-IPSA (Université Catholique de l’Ouest), intitulé confirmé par Thomas.
- Directeur de la publication : Charles-Antoine Menanteau.

## Adresse e-mail prévue

Adresse retenue pour la future messagerie : `contact@charlesantoinemenanteau.fr`.

Cette adresse est un projet : le nom de domaine n’a pas été vérifié ou réservé dans cette conversation, et la boîte e-mail n’a pas été créée ni testée. Ne pas présenter cette adresse comme un contact opérationnel avant son activation et un test d’envoi et de réception.

## Informations restant à compléter pour finaliser la page

- Activation et vérification de l’adresse e-mail prévue.
- Numéro de TVA intracommunautaire, uniquement s’il en existe un applicable à l’activité.
- Actualiser l’hébergeur si le site est déplacé. La page utilise actuellement GitHub, Inc. (GitHub Pages) ; réserver un domaine ou une messagerie chez OVHcloud ne change pas, à lui seul, l’hébergement du site.

## Mise en œuvre

- Coordonnées de contact détaillées uniquement sur la page de mentions légales.
- Adresse e-mail prévue affichée avec la mention explicite « en cours d’activation », sans lien `mailto:` ; téléphone et Doctolib proposés pendant la transition.
- Références aux textes régissant les titres de psychologue et de psychothérapeute ajoutées à la page.
- Aucune mention de TVA inventée en l’absence de confirmation du régime applicable.

## Sources utilisées dans la conversation

- [Mentions obligatoires sur le site internet d’une entreprise — Service Public](https://entreprendre.service-public.gouv.fr/vosdroits/F37351)
- [Structure du numéro SIRET — Insee](https://www.insee.fr/fr/metadonnees/definition/c1841)
- [ARS des Pays de la Loire — Annuaire Service Public](https://lannuaire.service-public.gouv.fr/pays-de-la-loire/loire-atlantique/894a0f65-cdd3-4a58-b552-bfeb44ec037d)
- [Coordonnées de GitHub — déclaration de confidentialité](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement)
- [Téléphone publié par GitHub — présentation GitHub Enterprise](https://enterprise.github.com/downloads/en/enterprise-datasheet.pdf)
- [GitHub Pages et journalisation des adresses IP](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Titre de psychologue — article 44 de la loi n° 85-772](https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000033678864)
- [Titre de psychothérapeute — article 52 de la loi n° 2004-806](https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000031930044)

## Vérifications avant publication

- `npm run build` : huit pages générées, dont `/mentions-legales`.
- `git diff --check` : aucune erreur d’espacement.
- Aperçu local : réponse HTTP 200 et rendu vérifié dans le navigateur à 1280 px.
- Navigation depuis le lien « Mentions légales » du pied de page de l’accueil vérifiée.
- L’adresse e-mail prévue n’est pas un lien actif ; le lien téléphonique utilise le numéro international correspondant au numéro fourni.
