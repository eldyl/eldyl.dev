# eldyl.dev

Personal portfolio site with a terminal aesthetic and minimal client side
javascript deployed on Cloudflare.

[eldyl.dev](https://eldyl.dev)

## Stack

- [Astro](https://astro.build) - static site framework
- [Tailwind CSS](https://tailwindcss.com) - styling
- [Satori](https://github.com/vercel/satori) - dynamic OG image generation
- [Umami](https://umami.is) - privacy-friendly analytics
- [Vitest](https://vitest.dev) - unit testing
- [Cloudflare Workers](https://workers.cloudflare.com) - deployment

## Prerequisites

- [Node.js](https://nodejs.org)
- [pnpm](https://pnpm.io)

## Development

Install dependencies

```bash
pnpm i
```

Start local dev server

```bash
pnpm dev
```

Format

```bash
pnpm format
```

Lint

```bash
pnpm lint
```

Run tests

```bash
pnpm test
```

Build

```bash
pnpm build
```

### Environment Variables

`env.template` is available for reference.

`env.development` is utilized for local development.

`env.production` is utilized for production deployments.

## Project Structure

```
src/
├── components/    # Astro components (cards, SEO, terminal UI)
├── constants/     # Site-wide constants
├── content/       # Content collections (blog, projects, links, tech)
├── icons/         # Custom SVG icons
├── layouts/       # Page layouts
├── pages/         # Routes and API endpoints
├── styles/        # Global CSS and Tailwind theme
├── utils/         # Helper functions and related tests
└── zod/           # Shared Zod schemas
```

## Deployment

Site is deployed via Cloudflare workers.

Deploy command

```bash
pnpm deploy-site
```

## Contributing

This is a personal website, but feel free to submit an issue for bugs or
potential improvements.

Feel free to fork this repo and use the template for personal use. See the
license below.

### Relevant Issues

- [Warning "'Props' is declared but never used."](https://github.com/withastro/compiler/issues/927)
  - The above warning appears when building. A fix has been merged, but is not
    in the latest version of astro at this time.

## License

[GPL-3.0](LICENSE)
