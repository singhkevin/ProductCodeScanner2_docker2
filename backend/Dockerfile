# Multi-stage build for GuardHub

# Stage 1: Build the Frontends
FROM node:20-slim AS frontend-builder
WORKDIR /app

# Copy the backend folder contents (which includes dashboard and public-verifier)
COPY . .

# Sync environment variables for frontends
RUN node sync-envs.js

# Build Dashboard
RUN cd dashboard && npm install && npm run build

# Build Public Verifier
RUN cd public-verifier && npm install && npm run build

# Stage 2: Build the Backend
FROM node:20-slim AS backend-builder
WORKDIR /app

# Copy backend files
COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./
COPY src ./src/
COPY sync-envs.js ./

# Install dependencies and build backend
RUN npm install --ignore-scripts
RUN npx prisma generate
RUN npm run build

# Stage 3: Production Image
FROM node:20-slim
WORKDIR /app

# Install system dependencies for Prisma
RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Install production dependencies only
COPY package*.json ./
RUN npm install --omit=dev --ignore-scripts

# Copy built files from previous stages
COPY --from=backend-builder /app/dist ./dist
COPY --from=backend-builder /app/prisma ./prisma
COPY --from=backend-builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=frontend-builder /app/dashboard/dist ./dashboard/dist
COPY --from=frontend-builder /app/public-verifier/dist ./public-verifier/dist

# Expose the API port
EXPOSE 5000

# Start the application
CMD ["node", "dist/index.js"]
