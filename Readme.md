```js

20. Dockerfile
    FROM node:20

WORKDIR /app

COPY package\*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]



21. docker-compose.yml
version: '3'

services:
app:
build: .
ports: - '5000:5000'
depends_on: - mongo - redis

mongo:
image: mongo
ports: - '27017:27017'

redis:
image: redis
ports: - '6379:6379' 22. Jest Test Example
src/tests/auth.test.js
const request = require('supertest');
const app = require('../app');

describe('Auth API', () => {
test('Register User', async () => {
const response = await request(app)
.post('/api/v1/auth/register')
.send({
name: 'Ramesh',
email: 'ramesh@gmail.com',
password: '123456'
});

    expect(response.statusCode).toBe(201);

});
});

 23. API Versioning
/api/v1/users
/api/v2/users

This helps:

backward compatibility
enterprise upgrades
safe migrations





24. Production Improvements
Add Later
Refresh token rotation
Redis session store
Kafka event streaming
Queue system using BullMQ
Structured logging using Winston
Kubernetes deployment
CI/CD pipelines
Microservices split
OpenTelemetry monitoring







25. Common Interview Questions
Why Refresh Tokens?

Access tokens expire quickly. Refresh tokens generate new access tokens securely.

Why Redis Blacklist?

JWT is stateless. Redis helps invalidate tokens after logout.

Why Soft Delete?

Production systems avoid hard delete for:

recovery
auditing
compliance
Why Audit Logs?

Tracks:

who changed what
security incidents
admin activity
Why API Versioning?

Prevents frontend apps from breaking during upgrades.

29. AWS EC2 Deployment Steps

# SSH into server

ssh -i key.pem ubuntu@your-ec2-ip

# Install Node.js

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2

sudo npm install -g pm2

# Clone project

git clone <repo-url>

# Install packages

npm install

# Run server

pm2 start server.js

# Save PM2

pm2 save

30. NGINX Reverse Proxy
    /etc/nginx/sites-available/default
    server {
    listen 80;

        server_name your-domain.com;

        location / {
            proxy_pass http://localhost:5000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

    }

31. GitHub Actions CI/CD
    .github/workflows/deploy.yml
    name: Node.js CI

on:
push:
branches: - main

jobs:
build:
runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4


      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20


      - name: Install Dependencies
        run: npm install


      - name: Run Tests
        run: npm test

32. Environment Variables
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/advancedbackend
    JWT_SECRET=your_jwt_secret
    JWT_REFRESH_SECRET=your_refresh_secret
    REDIS_URL=redis://localhost:6379
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_password
    AWS_REGION=ap-south-1
    AWS_ACCESS_KEY=aws_access_key
    AWS_SECRET_KEY=aws_secret_key
    AWS_BUCKET_NAME=your_bucket_name

    <!--  -->

33. Full Feature Checklist
    Authentication
    Register
    Login
    JWT Auth
    Refresh Tokens
    Logout
    Redis Blacklist
    RBAC
    Security
    Helmet
    Rate Limiting
    Password Hashing
    Validation
    Protected Routes
    Cloud Features
    AWS S3 Upload
    Docker
    EC2 Deployment
    NGINX
    PM2
    Engineering Features
    Audit Logs
    Swagger Docs
    Pagination
    Soft Delete
    API Versioning
    Centralized Error Handling
    Unit Testing
    CI/CD
34. Interview-Level Upgrades

If interviewer asks:

“How would you scale this?”

You can discuss:

PM2 clustering
NGINX load balancer
Redis cache layer
CDN
MongoDB indexing
Read replicas
Worker threads
Queue systems
Horizontal scaling

That instantly pushes you toward product-company engineering discussions.

I’ve now expanded the project with additional production-grade backend features including:

Nodemailer email service
OTP verification using Redis
Multer upload middleware
AWS S3 configuration
EC2 deployment steps
NGINX reverse proxy setup
PM2 process manager
GitHub Actions CI/CD
Environment variables setup
Production checklist

This is now much closer to a real-world backend architecture used in product companies and scalable SaaS systems.
```
