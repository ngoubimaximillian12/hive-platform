# 🚀 CLOUD DEPLOYMENT GUIDE

## Database Options

### Option 1: AWS RDS (PostgreSQL)
1. Create RDS PostgreSQL instance
2. Get connection string
3. Update environment variables:
```
   DB_HOST=your-rds-endpoint.rds.amazonaws.com
   DB_PORT=5432
   DB_NAME=hive_db
   DB_USER=your_username
   DB_PASSWORD=your_password
```

### Option 2: Google Cloud SQL
1. Create Cloud SQL PostgreSQL instance
2. Get connection details
3. Update environment variables

### Option 3: Heroku Postgres
1. Add Heroku Postgres add-on
2. Use DATABASE_URL automatically set by Heroku

### Option 4: Railway.app
1. Deploy directly from GitHub
2. Add PostgreSQL plugin
3. Environment variables set automatically

## Deployment Steps

### 1. Prepare Database
- Database will auto-initialize on first run
- Seed data will be created automatically
- Demo user: demo@hive.app / demo123

### 2. Deploy Backend (API)
```bash
# Set environment variables in your cloud platform
export DB_HOST=your-cloud-db-host
export DB_PASSWORD=your-secure-password
export JWT_SECRET=your-random-secret

# Deploy (varies by platform)
# Heroku: git push heroku main
# Railway: Connected via GitHub
# AWS: Use Elastic Beanstalk or ECS
```

### 3. Deploy Frontend (Web)
```bash
# Update API URL
export NEXT_PUBLIC_API_URL=https://your-api-domain.com/api

# Deploy (Vercel recommended for Next.js)
npx vercel deploy
```

## Current Architecture
- ✅ Database schemas ready
- ✅ Auto-initialization on startup
- ✅ Seed data for testing
- ✅ Environment-based config
- ✅ Cloud-ready connection pooling

## All data will transfer to cloud automatically!
The same code works locally and in cloud.
Just update environment variables.
