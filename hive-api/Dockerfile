FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Use npm install instead of npm ci
RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["node", "dist/server.js"]
