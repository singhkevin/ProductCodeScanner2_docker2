#!/bin/bash

# GuardHub Deployment Script for Hostinger VPS

echo "🚀 Starting Deployment Process..."

# 1. Pull latest changes (assuming you are using Git)
# git pull origin main

# 2. Build and start containers in detached mode
echo "📦 Building and starting containers..."
docker compose up -d --build

# 3. Clean up unused images to save space on VPS
echo "🧹 Cleaning up old images..."
docker image prune -f

echo "✅ Deployment Complete!"
echo "📡 App is running at http://localhost:5000"
