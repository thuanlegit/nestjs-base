#!/bin/sh
set -e

LOGTAG_DOCKER_ENTRYPOINT_SCRIPT="[Docker Entrypoint Script]"
DB_RETRY_INTERVAL=5
DB_MAX_RETRIES=3

echo "$LOGTAG_DOCKER_ENTRYPOINT_SCRIPT Starting container..."

if [ -f ".env" ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Run database migrations using Knex.js
echo "$LOGTAG_DOCKER_ENTRYPOINT_SCRIPT Running Knex.js migrations..."
echo "Waiting for databases to be ready..."
run_migration() {
  pnpm run migration:run
}
retry_count=0
until run_migration || [ $retry_count -eq $DB_MAX_RETRIES ]; do
  echo "Database is not ready, retrying in 5 seconds..."
  retry_count=$((retry_count + 1))
  sleep $DB_RETRY_INTERVAL
done

if [ $retry_count -eq $DB_MAX_RETRIES ]; then
  echo "Max retries reached, exiting..."
  exit 1
fi

# If there's a seed command (optional), uncomment this:
# echo "$LOGTAG_DOCKER_ENTRYPOINT_SCRIPT Running database seeds..."
# pnpm run seed:run

# Execute the main application process
echo "$LOGTAG_DOCKER_ENTRYPOINT_SCRIPT Starting application..."

pm2-runtime dist/main.js