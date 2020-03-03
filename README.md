# community-pool-backend

## Running the project

1. Create a .env file using the .env-example in the root of the project
2. Make sure docker and docker-compose are installed on your machine

`docker-compose up --build`

## Running test against the container

`docker-compose exec backend npm run test:watch`
