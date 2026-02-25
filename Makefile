APP_ENV := DEVOPS/dev/.env

frontend-build:
	cd frontend && npm ci && npm run build
	rm -rf app/public/*
	cp -r frontend/dist/* app/public/

app: frontend-build
	set -a; source $(APP_ENV); set +a; cd app && cargo run

docker:
	docker compose -f ./DEVOPS/dev/docker-compose.yml --env-file ./DEVOPS/dev/.env up -d --build

docker-down:
	docker compose -f ./DEVOPS/dev/docker-compose.yml --env-file ./DEVOPS/dev/.env down

docker-restart:
	docker compose -f ./DEVOPS/dev/docker-compose.yml --env-file ./DEVOPS/dev/.env up -d --build

prod-up:
	docker compose -f ./DEVOPS/prod/docker-compose.yml --env-file ./DEVOPS/prod/.env up -d --build

prod-down:
	docker compose -f ./DEVOPS/prod/docker-compose.yml --env-file ./DEVOPS/prod/.env down

prod-restart:
	docker compose -f ./DEVOPS/prod/docker-compose.yml --env-file ./DEVOPS/prod/.env up -d --build
