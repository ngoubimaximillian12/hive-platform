#!/bin/bash

set -e

echo "🏗️  Setting up AWS Infrastructure..."

AWS_REGION="us-east-1"
AWS_ACCOUNT_ID="804826263224"
VPC_NAME="hive-vpc"
CLUSTER_NAME="hive-cluster"

echo "📋 AWS Account: $AWS_ACCOUNT_ID"
echo "🌍 Region: $AWS_REGION"
echo ""

echo "Step 1: Creating ECR Repositories..."

aws ecr create-repository --repository-name hive-web --region $AWS_REGION 2>/dev/null || echo "Repository hive-web already exists"
aws ecr create-repository --repository-name hive-api --region $AWS_REGION 2>/dev/null || echo "Repository hive-api already exists"
aws ecr create-repository --repository-name hive-ai --region $AWS_REGION 2>/dev/null || echo "Repository hive-ai already exists"

echo "✅ ECR repositories ready"

echo ""
echo "Step 2: Creating VPC..."

VPC_ID=$(aws ec2 create-vpc \
  --cidr-block 10.0.0.0/16 \
  --region $AWS_REGION \
  --tag-specifications "ResourceType=vpc,Tags=[{Key=Name,Value=$VPC_NAME}]" \
  --query 'Vpc.VpcId' \
  --output text 2>/dev/null || echo "")

if [ -z "$VPC_ID" ]; then
  echo "VPC might already exist, checking..."
  VPC_ID=$(aws ec2 describe-vpcs --filters "Name=tag:Name,Values=$VPC_NAME" --query 'Vpcs[0].VpcId' --output text)
fi

echo "VPC ID: $VPC_ID"

aws ec2 modify-vpc-attribute --vpc-id $VPC_ID --enable-dns-hostnames
aws ec2 modify-vpc-attribute --vpc-id $VPC_ID --enable-dns-support

echo "✅ VPC configured"

echo ""
echo "Step 3: Creating Subnets..."

SUBNET_PUBLIC_1=$(aws ec2 create-subnet \
  --vpc-id $VPC_ID \
  --cidr-block 10.0.1.0/24 \
  --availability-zone ${AWS_REGION}a \
  --query 'Subnet.SubnetId' \
  --output text 2>/dev/null || echo "")

SUBNET_PUBLIC_2=$(aws ec2 create-subnet \
  --vpc-id $VPC_ID \
  --cidr-block 10.0.2.0/24 \
  --availability-zone ${AWS_REGION}b \
  --query 'Subnet.SubnetId' \
  --output text 2>/dev/null || echo "")

echo "Public Subnets: $SUBNET_PUBLIC_1, $SUBNET_PUBLIC_2"

SUBNET_PRIVATE_1=$(aws ec2 create-subnet \
  --vpc-id $VPC_ID \
  --cidr-block 10.0.10.0/24 \
  --availability-zone ${AWS_REGION}a \
  --query 'Subnet.SubnetId' \
  --output text 2>/dev/null || echo "")

SUBNET_PRIVATE_2=$(aws ec2 create-subnet \
  --vpc-id $VPC_ID \
  --cidr-block 10.0.11.0/24 \
  --availability-zone ${AWS_REGION}b \
  --query 'Subnet.SubnetId' \
  --output text 2>/dev/null || echo "")

echo "Private Subnets: $SUBNET_PRIVATE_1, $SUBNET_PRIVATE_2"

echo "✅ Subnets created"

echo ""
echo "Step 4: Creating Internet Gateway..."

IGW_ID=$(aws ec2 create-internet-gateway \
  --query 'InternetGateway.InternetGatewayId' \
  --output text 2>/dev/null || echo "")

aws ec2 attach-internet-gateway --vpc-id $VPC_ID --internet-gateway-id $IGW_ID 2>/dev/null || echo "IGW already attached"

echo "Internet Gateway: $IGW_ID"
echo "✅ Internet Gateway configured"

echo ""
echo "Step 5: Creating ECS Cluster..."

aws ecs create-cluster --cluster-name $CLUSTER_NAME --region $AWS_REGION 2>/dev/null || echo "Cluster already exists"

echo "✅ ECS Cluster ready"

echo ""
echo "🎉 Infrastructure setup complete!"
echo ""
echo "Next steps:"
echo "1. Build and push Docker images: ./deploy-docker-to-aws.sh"
echo "2. Set up RDS database (optional for production)"
echo "3. Create ECS services"
