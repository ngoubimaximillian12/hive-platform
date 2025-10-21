#!/bin/zsh

echo "🚀 Starting Hive Platform..."

# Start API
cd hive-api
npm run dev > ../api.log 2>&1 &

# Start AI
cd ../hive-ai-service
python3 main.py > ../ai.log 2>&1 &

# Start Web
cd ../hive-web
npm run dev > ../web.log 2>&1 &

echo ""
echo "✅ All services started!"
echo ""
echo "📱 Web:  http://localhost:3000"
echo "🔧 API:  http://localhost:3001"
echo "🤖 AI:   http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop all services"

wait
