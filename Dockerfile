FROM node:20.18.3-alpine3.21
WORKDIR /opt/app

EXPOSE 3000

# Install PM2 and pnpm
RUN npm install -g pm2 pnpm

WORKDIR /nestjs-app

# Fetch dependencies
COPY ./pnpm-lock.yaml .
RUN pnpm fetch

# Install dependencies
COPY ./package.json .
RUN pnpm install --offline

# Build
COPY . .
RUN pnpm run build

# Copy scripts
COPY scripts /scripts
RUN ["chmod", "-R", "+x", "/scripts"]

# Run
ENTRYPOINT ["/scripts/entrypoint.sh"]
