# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .
RUN pnpm run build

EXPOSE 1337

CMD ["pnpm", "run", "start:prod"]
