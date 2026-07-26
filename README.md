# HermanScience Discovery Experience

An interactive introduction to HermanScience, its human–AI interaction
approach, controlled research, products, and demonstrations.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

## Validation

```bash
npm test
npm run build:pages
```

`npm test` validates the full vinext/Cloudflare build used by the original
hosted experience. `npm run build:pages` produces the static site in
`dist-pages/`.

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds and deploys the
site whenever `main` changes. In the repository settings, set **Pages → Build
and deployment → Source** to **GitHub Actions**.

The expected project-site URL is:

https://hermanscience-git.github.io/HermanScienceDiscoveryExperience/
