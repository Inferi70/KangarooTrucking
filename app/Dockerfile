# === Stage 1: Build frontend ===
FROM node:20-bookworm-slim AS frontend-builder

WORKDIR /build/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

# === Stage 2: Build backend ===
FROM rust:1.91-slim-bookworm AS backend-builder

WORKDIR /build

RUN apt-get update && apt-get install -y \
    build-essential \
    pkg-config \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

COPY app/Cargo.toml app/Cargo.lock ./app/
COPY app/src ./app/src/

RUN cargo build --release --manifest-path app/Cargo.toml

# === Stage 3: Runtime ===
FROM debian:bookworm-slim

WORKDIR /usr/local/bin/app

RUN apt-get update && apt-get install -y \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr/local/bin/app/public

COPY --from=backend-builder /build/app/target/release/app ./app
COPY --from=frontend-builder /build/frontend/dist ./public

CMD ["./app"]
