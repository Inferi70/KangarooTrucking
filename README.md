
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

## Vultr Ubuntu Setup (Docker + Deploy)

These steps assume a fresh Ubuntu server on Vultr.

1. Install Docker (official packages):
```
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg

sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo \"$VERSION_CODENAME\") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

2. Start Docker and enable it on boot:
```
sudo systemctl enable --now docker
```

3. (Optional) Allow your user to run Docker without sudo:
```
sudo usermod -aG docker $USER
newgrp docker
```

4. Clone this repo on the server:
```
git clone git@github.com:Inferi70/KangarooTrucking.git
cd KangarooTrucking
```

5. Create prod env:
```
cp DEVOPS/prod/.example.env DEVOPS/prod/.env
```
Edit `DEVOPS/prod/.env` and set:
`DOMAIN`, `DEFAULT_EMAIL`, `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_TO`.

6. Run production:
```
docker compose -f DEVOPS/prod/docker-compose.yml --env-file DEVOPS/prod/.env up -d --build
```

7. DNS at Porkbun:
   - Add an `A` record for `kangarootrucking.com` pointing to your Vultr IP.
   - Optional: add `CNAME` for `www` → `kangarootrucking.com`.

# Project Structure
```
├── app/                # Axum server (serves frontend + /api/contact)
├── frontend/           # React/Vite/Tailwind app
├── DEVOPS/             # Deployment scripts and env templates
└── README.md           # Project documentation
```
