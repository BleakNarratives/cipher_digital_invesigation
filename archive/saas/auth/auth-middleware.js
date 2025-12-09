import jwt from 'jsonwebtoken';

export function requireAuth(request, reply, done) {
  try {
    const token = request.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      reply.code(401).send({ error: 'No token provided' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
    done();
  } catch (error) {
    reply.code(401).send({ error: 'Invalid token' });
  }
}

export function requireTier(minTier) {
  const tierLevels = { free: 0, pro: 1, enterprise: 2 };
  
  return function(request, reply, done) {
    const userTier = request.user.tier;
    
    if (tierLevels[userTier] < tierLevels[minTier]) {
      reply.code(403).send({ 
        error: 'Upgrade required',
        message: `This feature requires ${minTier} tier or higher`,
        currentTier: userTier,
        requiredTier: minTier
      });
      return;
    }
    
    done();
  };
}

export function checkUsageLimit(action) {
  return async function(request, reply, done) {
    // In production, fetch user from database
    const user = request.user;
    
    if (!user.canPerform(action)) {
      reply.code(429).send({
        error: 'Usage limit exceeded',
        message: `You've reached your ${action} limit for this month`,
        tier: user.tier,
        upgrade: '/pricing'
      });
      return;
    }
    
    done();
  };
}
