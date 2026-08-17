# Felix Support

Public support site for Felix.

## Architecture

- `main` is the canonical source branch.
- The site is plain HTML, CSS, and JavaScript with no build system.
- GitHub Pages deployment is defined in `.github/workflows/pages.yml` and deploys directly from `main`.
- Payment credentials are never stored in this repository. Only public hosted-payment URLs and public receiving addresses may be configured.

## GitHub Pages

Repository Settings → Pages should use **GitHub Actions** as the publishing source.

The previous `gh-pages` branch is legacy and is no longer the source of truth. It can be deleted after Pages has been switched to GitHub Actions and a deployment from `main` succeeds.
