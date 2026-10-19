# Site Charles-Antoine Menanteau

Base Astro pour le site vitrine de Charles-Antoine Menanteau.

## Pages prévues

- `/`
- `/approche`
- `/motifs`
- `/seances`
- `/parcours`
- `/contact`
- `/mentions-legales`

## Scripts

```bash
npm install
npm run dev
```

## Remarques

- Les visuels de maquette ont été migrés dans `public/assets/`.
- Le projet est structuré pour une évolution SEO multipage.
- La page de mentions légales reprend les coordonnées et titres confirmés par le client.
- L’adresse e-mail prévue doit encore être activée et testée avant de devenir un contact opérationnel.

## Préparation Cloudflare / OVH

Procédure adaptée de celle d’Aude, création des nouveaux comptes de Charles et contrôles : [docs/mise-en-ligne.md](docs/mise-en-ligne.md).

Cloudflare Pages : `npm run build`, sortie `dist`, Node 22, branche `main`. Ne pas définir `SITE_BASE_PATH` ; le site sert la racine. `SITE_URL` vaut par défaut `https://charlesantoinemenanteau.fr` (domaine à vérifier et acheter). L’aperçu GitHub garde son sous-répertoire via le workflow. La compilation à la racine utilise les mentions d’hébergement Cloudflare ; celle de l’aperçu conserve GitHub.
