
# Project Overview

This project is a web application with a Rust (Axum) API that serves a React/Vite frontend as static files.

## Tech Stack

- [**Axum**](https://github.com/tokio-rs/axum) — HTTP web framework
- **React** + **Vite** + **Tailwind CSS** — Frontend
- **Resend** — Email delivery for the contact form

## Architecture

The Axum server serves the built frontend from `app/public` and exposes a single API endpoint:
`POST /api/contact` for sending emails via Resend.


### Prerequisites

- Rust
- Docker (for container builds/deploy)
- Node.js (for local frontend builds)

## Local Setup

1. Copy env templates:
   - `cp app/example.env app/.env`
   - `cp DEVOPS/dev/.example.env DEVOPS/dev/.env`

2. Run locally:
```
make app
```

This builds the React app into `app/public` and starts the Axum server.

## Docker Dev
```
docker compose -f DEVOPS/dev/docker-compose.yml --env-file DEVOPS/dev/.env up -d --build
```

## Production (HTTPS with nginx-proxy)

The production compose in `DEVOPS/prod/docker-compose.yml` uses:
- `nginx-proxy` (reverse proxy)
- `acme-companion` (automatic HTTPS via Let's Encrypt)

1. Copy prod env template:
   - `cp DEVOPS/prod/.example.env DEVOPS/prod/.env`

2. Edit `DEVOPS/prod/.env`:
   - `DOMAIN=your-domain.com`
   - `DEFAULT_EMAIL=you@example.com` (used by Let's Encrypt)
   - `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_TO`

3. Run production compose:
```
docker compose -f DEVOPS/prod/docker-compose.yml --env-file DEVOPS/prod/.env up -d --build
```

4. DNS (Porkbun):
   - Create an `A` record pointing `kangarootrucking.com` to your Vultr server IP.
   - Optionally create `CNAME` for `www` → `kangarootrucking.com`.

Once DNS propagates, `nginx-proxy` + Let's Encrypt will issue HTTPS certificates automatically.

# Project Structure
```
├── app/                # Axum server (serves frontend + /api/contact)
├── frontend/           # React/Vite/Tailwind app
├── DEVOPS/             # Deployment scripts and env templates
└── README.md           # Project documentation
```
