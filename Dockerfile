# Stage 1: Build Frontend
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production Server
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8800
ENV HOST=0.0.0.0

COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server

EXPOSE 8800

CMD ["node", "--experimental-strip-types", "server/server.ts"]
