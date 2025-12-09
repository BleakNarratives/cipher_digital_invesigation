# Deployment Guide

## Local Development

```bash
npm install
npm start
```

Open `frontend/index.html` in your browser.

## Production Deployment

### Option 1: Docker (Recommended)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "run", "api"]
```

Build and run:
```bash
docker build -t crypto-forensics .
docker run -p 3000:3000 -v $(pwd)/data:/app/data crypto-forensics
```

### Option 2: PM2

```bash
npm install -g pm2
pm2 start src/api/server.js --name crypto-forensics
pm2 save
pm2 startup
```

### Option 3: Systemd Service

Create `/etc/systemd/system/crypto-forensics.service`:

```ini
[Unit]
Description=Crypto Forensics Workbench
After=network.target

[Service]
Type=simple
User=forensics
WorkingDirectory=/opt/crypto-forensics
ExecStart=/usr/bin/node src/api/server.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable crypto-forensics
sudo systemctl start crypto-forensics
```

## Environment Variables

Required:
- `NODE_ENV=production`
- `API_PORT=3000`

Optional:
- `ETHEREUM_RPC_URL` (defaults to free endpoint)
- `REDIS_URL` (for job queue)
- `LOG_LEVEL=info`

## Security Checklist

- [ ] Use HTTPS in production
- [ ] Set strong JWT_SECRET
- [ ] Configure firewall rules
- [ ] Enable audit logging
- [ ] Rotate encryption keys
- [ ] Monitor logs for threats
- [ ] Keep dependencies updated
- [ ] Backup data directory

## Monitoring

Watch logs:
```bash
tail -f data/audit-logs/*.jsonl
```

Check health:
```bash
curl http://localhost:3000/health
```

## Scaling

For high traffic:
1. Use Redis for rate limiting
2. Deploy multiple instances behind load balancer
3. Use CDN for frontend assets
4. Enable caching for blockchain queries

## Backup

Important directories:
- `data/cases/` - Investigation cases
- `data/audit-logs/` - Audit trail
- `.env` - Configuration

Backup command:
```bash
tar -czf backup-$(date +%Y%m%d).tar.gz data/ .env
```
