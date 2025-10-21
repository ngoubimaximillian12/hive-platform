#!/bin/zsh

echo "🐳 Starting Hive Platform with Docker..."

docker-compose up --build -d

echo ""
echo "✅ Services starting!"
echo ""
echo "📱 Web:  http://localhost:3000"
echo "🔧 API:  http://localhost:3001"
echo "🤖 AI:   http://localhost:8000"
echo ""
echo "Check status: docker ps"
echo "View logs: docker-compose logs -f"
