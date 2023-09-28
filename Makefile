include .envrc

nodemon:
	cd backend/api-server/  && go vet && golangci-lint run src && nodemon --watch './**/*.go' --signal SIGTERM --exec 'go' run main.go && cd ../..

nodemon-race:
	cd backend/api-server/ && nodemon --watch './**/*.go' --signal SIGTERM --exec 'go' run -race main.go && cd ../..

tidy:
	cd backend/api-server/ && go mod tidy && cd ../..

build-container:
	sudo docker build . -t alokpandit/auctioneer

run-container:
	sudo docker run --rm -it -p 5000:5000 alokpandit/auctioneer

container:
	make build-container && make run-container

deploy:
	make build-container && sudo docker push alokpandit/auctioneer

migration-create:
	@read -p "Enter Migration Name (In Snake Case): " name; \
	migrate create -ext sql -dir backend/api-server/src/db/migrations/ -seq $$name

migration-up:
	migrate -path backend/api-server/src/db/migrations/ -database ${DB_MIGRATION_URL} -verbose up

migration-down:
	migrate -path backend/api-server/src/db/migrations/ -database ${DB_MIGRATION_URL} -verbose down

migration-fix:
	@read -p "Enter Migration Version Number: " version; \
	migrate -path backend/api-server/src/db/migrations/ -database ${DB_MIGRATION_URL} force $$version

sqlc-compile:
	cd backend/api-server/ && sqlc compile && cd ../..

sqlc-gen:
	cd backend/api-server/ && sqlc generate && cd ../..

fe:
	cd frontend && yarn dev && cd ..

lint:
	cd backend/api-server/ && golangci-lint run ./src && cd ../..