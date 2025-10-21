#!/bin/bash

set -e

AWS_REGION="us-east-1"
AWS_ACCOUNT_ID="804826263224"
ECR_REGISTRY="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com"

echo "🐳 Deploying Docker containers to AWS ECR..."
echo ""

echo "Step 1: Logging into ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REGISTRY
echo "✅ Logged in to ECR"

echo ""
echo "Step 2: Building Docker images..."

echo "Building hive-web..."
docker build -t hive-web:latest ./hive-web

echo "Building hive-api..."
docker build -t hive-api:latest ./hive-api

echo "Building hive-ai..."
docker build -t hive-ai:latest ./hive-ai-service

echo "✅ All images built"

echo ""
echo "Step 3: Tagging images..."

docker tag hive-web:latest $ECR_REGISTRY/hive-web:latest
docker tag hive-api:latest $ECR_REGISTRY/hive-api:latest
docker tag hive-ai:latest $ECR_REGISTRY/hive-ai:latest

echo "✅ Images tagged"

echo ""
echo "Step 4: Pushing images to ECR..."

echo "Pushing hive-web..."
docker push $ECR_REGISTRY/hive-web:latest

echo "Pushing hive-api..."
docker push $ECR_REGISTRY/hive-api:latest

echo "Pushing hive-ai..."
docker push $ECR_REGISTRY/hive-ai:latest

echo ""
echo "🎉 All Docker images pushed to AWS ECR!"
echo ""
echo "Your images are now at:"
echo "  - $ECR_REGISTRY/hive-web:latest"
echo "  - $ECR_REGISTRY/hive-api:latest"
echo "  - $ECR_REGISTRY/hive-ai:latest"
echo ""
echo "Next: Create ECS task definitions and services"
