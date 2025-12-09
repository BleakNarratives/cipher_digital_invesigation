# 🚀 SAAS Integration Guide

## Quick Start: Making This SAAS-Ready

### Prerequisites
```bash
npm install
npm install pg bcrypt jsonwebtoken stripe
```

### Step 1: Database Setup (15 minutes)

1. **Install PostgreSQL**
   ```bash
   # Mac
   brew install postgresql
   brew services start postgresql
   
   # Ubuntu
   sudo apt-get install postgresql
   sudo service postgresql start
   
   # Windows
   # Download from postgresql.org
   ```

2. **Create Database**
   ```bash
   createdb crypto_forensics_db
   psql crypto_forensics_db < saas/database/schema.sql
   ```

3. **Update .env**
   ```env
   DATABASE_URL=postgresql://localhost/crypto_forensics_db
   JWT_SECRET=your-super-secret-jwt-key-change-this
   STRIPE_SECRET_KEY=sk_test_your_stripe_key
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
   ```

### Step 2: Authentication (30 minutes)

1. **Add Auth Routes to API**
   ```javascript
   // src/api/server.js
   import { requireAuth, requireTier } from '../saas/auth/auth-middleware.js';
   
   // Signup
   fastify.post('/api/v1/auth/signup', async (request, reply) => {
     const { email, password, name } = request.body;
     // Create user, hash password, send verification email
   });
   
   // Login
   fastify.post('/api/v1/auth/login', async (request, reply) => {
     const { email, password } = request.body;
     // Verify credentials, return JWT token
   });
   
   // Protected route example
   fastify.get('/api/v1/user/profile', 
     { preHandler: requireAuth },
     async (request, reply) => {
       return request.user;
     }
   );
   ```

2. **Add Login UI**
   - Copy `saas/landing/index.html` to `public/`
   - Create login/signup forms
   - Handle JWT storage in localStorage

### Step 3: Stripe Integration (45 minutes)

1. **Create Stripe Account**
   - Go to stripe.com
   - Get API keys
   - Add to .env

2. **Create Products in Stripe**
   ```bash
   # Use Stripe CLI or dashboard
   stripe products create --name="Pro Plan" --description="Professional tier"
   stripe prices create --product=prod_xxx --unit-amount=4900 --currency=usd --recurring[interval]=month
   ```

3. **Add Subscription Endpoints**
   ```javascript
   // Create subscription
   fastify.post('/api/v1/subscriptions/create',
     { preHandler: requireAuth },
     async (request, reply) => {
       const { priceId } = request.body;
       // Create Stripe subscription
       // Update user tier in database
     }
   );
   
   // Webhook for Stripe events
   fastify.post('/api/v1/webhooks/stripe', async (request, reply) => {
     // Handle subscription.created, subscription.updated, etc.
   });
   ```

### Step 4: Feature Gating (20 minutes)

1. **Protect Routes by Tier**
   ```javascript
   // Require Pro tier
   fastify.post('/api/v1/wallet/recover',
     { preHandler: [requireAuth, requireTier('pro')] },
     async (request, reply) => {
       // Wallet recovery logic
     }
   );
   ```

2. **Check Usage Limits**
   ```javascript
   import { checkUsageLimit } from '../saas/auth/auth-middleware.js';
   
   fastify.post('/api/v1/analyze/:chain/:address',
     { preHandler: [requireAuth, checkUsageLimit('addressAnalysis')] },
     async (request, reply) => {
       // Increment usage counter
       // Perform analysis
     }
   );
   ```

### Step 5: User Dashboard (1 hour)

1. **Create Dashboard UI**
   ```html
   <!-- dashboard.html -->
   <div class="dashboard">
     <div class="sidebar">
       <div class="user-info">
         <h3 id="userName"></h3>
         <span class="tier-badge" id="userTier"></span>
       </div>
       <nav>
         <a href="#cases">My Cases</a>
         <a href="#usage">Usage</a>
         <a href="#settings">Settings</a>
         <a href="#billing">Billing</a>
       </nav>
     </div>
     
     <div class="main-content">
       <!-- Dynamic content -->
     </div>
   </div>
   ```

2. **Add Dashboard Routes**
   ```javascript
   fastify.get('/api/v1/dashboard/stats',
     { preHandler: requireAuth },
     async (request, reply) => {
       const userId = request.user.id;
       // Fetch user stats, cases, usage
       return {
         cases: await getCases(userId),
         usage: await getUsage(userId),
         tier: request.user.tier
       };
     }
   );
   ```

### Step 6: Deploy (30 minutes)

1. **Environment Variables**
   ```bash
   # Production .env
   NODE_ENV=production
   DATABASE_URL=postgresql://user:pass@host:5432/db
   JWT_SECRET=super-secret-production-key
   STRIPE_SECRET_KEY=sk_live_your_live_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

2. **Deploy to Heroku/Railway/Render**
   ```bash
   # Heroku example
   heroku create crypto-forensics-app
   heroku addons:create heroku-postgresql:hobby-dev
   git push heroku main
   heroku config:set JWT_SECRET=xxx STRIPE_SECRET_KEY=xxx
   ```

3. **Set up Domain**
   - Point domain to deployment
   - Add SSL certificate
   - Configure CORS

## Complete Integration Checklist

### Backend
- [ ] Set up PostgreSQL database
- [ ] Run schema.sql
- [ ] Add authentication endpoints
- [ ] Integrate Stripe
- [ ] Add feature gating
- [ ] Implement usage tracking
- [ ] Add webhook handlers
- [ ] Set up email service (SendGrid/Mailgun)
- [ ] Add error tracking (Sentry)
- [ ] Configure monitoring

### Frontend
- [ ] Create landing page
- [ ] Build signup/login forms
- [ ] Add user dashboard
- [ ] Implement pricing page
- [ ] Add billing management
- [ ] Create settings page
- [ ] Add usage visualization
- [ ] Implement team features

### Legal & Compliance
- [ ] Write Terms of Service
- [ ] Write Privacy Policy
- [ ] Add cookie consent
- [ ] Implement GDPR tools
- [ ] Set up data retention
- [ ] Add audit logging

### Marketing
- [ ] Set up analytics (Google Analytics)
- [ ] Add email marketing (Mailchimp)
- [ ] Create demo video
- [ ] Write case studies
- [ ] Set up blog
- [ ] Add referral program

### Testing
- [ ] Unit tests for auth
- [ ] Integration tests for payments
- [ ] E2E tests for user flows
- [ ] Load testing
- [ ] Security audit

## Revenue Optimization

### Pricing Strategy
1. **Free Tier**: Hook users, show value
2. **Pro Tier**: Sweet spot for individuals ($49/mo)
3. **Enterprise**: High-touch sales ($299/mo+)

### Conversion Tactics
- 14-day free trial (no credit card)
- Usage-based upsells
- Annual discount (2 months free)
- Referral credits
- Educational content
- Case studies

### Retention
- Onboarding emails
- Usage alerts
- Feature announcements
- Success stories
- Community building

## Scaling Considerations

### Performance
- Add Redis caching
- Implement CDN
- Database read replicas
- Queue system (Bull/BullMQ)
- Rate limiting per tier

### Monitoring
- Uptime monitoring (UptimeRobot)
- Error tracking (Sentry)
- Performance monitoring (New Relic)
- Log aggregation (Logtail)
- User analytics (Mixpanel)

### Security
- Regular security audits
- Penetration testing
- Bug bounty program
- SOC 2 compliance
- GDPR compliance

## Support & Documentation

### Help Center
- Getting started guide
- Video tutorials
- API documentation
- FAQ section
- Troubleshooting

### Support Channels
- Email support
- Live chat (Intercom)
- Community forum (Discourse)
- Status page (StatusPage.io)
- Changelog

## Next Steps

1. **Week 1**: Database + Auth
2. **Week 2**: Stripe + Feature Gating
3. **Week 3**: Dashboard + Billing
4. **Week 4**: Landing Page + Launch

**Goal**: Launch MVP in 4 weeks, get first paying customer!

---

## Quick Commands

```bash
# Development
npm run dev

# Run migrations
npm run migrate

# Seed database
npm run seed

# Run tests
npm test

# Deploy
npm run deploy

# Check health
curl https://api.yourapp.com/health
```

## Resources

- [Stripe Docs](https://stripe.com/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [JWT Best Practices](https://jwt.io/introduction)
- [SAAS Metrics](https://www.saastr.com)

---

**You're ready to build a SAAS! Let's ship it! 🚀**
