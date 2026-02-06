APP_ENV := DEVOPS/dev/.env

frontend-build:
	cd frontend && npm ci && npm run build
	rm -rf app/public/*
	cp -r frontend/dist/* app/public/

app: frontend-build
	cd app && cargo run

docker:
	docker compose -f ./DEVOPS/dev/docker-compose.yml --env-file ./DEVOPS/dev/.env up -d --build

docker-down:
	docker compose -f ./DEVOPS/dev/docker-compose.yml --env-file ./DEVOPS/dev/.env down

deploy-prod:
	./DEVOPS/build_all.sh prod
	./DEVOPS/deploy.sh prod
