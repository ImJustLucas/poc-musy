FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .
RUN rm -rf .next && pnpm run build

FROM node:20-alpine
WORKDIR /app

RUN npm install -g pnpm
COPY --from=builder /app ./
RUN pnpm install --production

EXPOSE 3000
CMD ["pnpm", "run", "start"]