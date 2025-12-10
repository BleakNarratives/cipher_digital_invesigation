// Landing Page JavaScript

// Load pricing tiers
async function loadPricing() {
  try {
    const response = await fetch('../pricing/tiers.json');
    const tiers = await response.json();
    
    const pricingGrid = document.querySelector('.pricing-grid');
    
    tiers.forEach(tier => {
      const card = document.createElement('div');
      card.className = 'pricing-card';
      card.innerHTML = `
        <div class="tier-header">
          <h3>${tier.name}</h3>
          <div class="price">
            <span class="currency">$</span>
            <span class="amount">${tier.price}</span>
            <span class="period">/month</span>
          </div>
        </div>
        <ul class="features-list">
          ${tier.features.map(f => `<li>✓ ${f}</li>`).join('')}
        </ul>
        <a href="/signup?tier=${tier.id}" class="btn-primary btn-full">
          ${tier.cta || 'Get Started'}
        </a>
      `;
      pricingGrid.appendChild(card);
    });
  } catch (error) {
    console.error('Failed to load pricing:', error);
    // Fallback pricing
    document.querySelector('.pricing-grid').innerHTML = `
      <div class="pricing-card">
        <div class="tier-header">
          <h3>Free</h3>
          <div class="price">
            <span class="currency">$</span>
            <span class="amount">0</span>
            <span class="period">/month</span>
          </div>
        </div>
        <ul class="features-list">
          <li>✓ Basic wallet recovery</li>
          <li>✓ 10 analyses per month</li>
          <li>✓ Community support</li>
        </ul>
        <a href="#" class="btn-primary btn-full">Start Free</a>
      </div>
      <div class="pricing-card featured">
        <div class="tier-header">
          <h3>Professional</h3>
          <div class="price">
            <span class="currency">$</span>
            <span class="amount">49</span>
            <span class="period">/month</span>
          </div>
        </div>
        <ul class="features-list">
          <li>✓ Unlimited analyses</li>
          <li>✓ All forensics tools</li>
          <li>✓ Priority support</li>
          <li>✓ Export reports</li>
        </ul>
        <a href="#" class="btn-primary btn-full">Start Trial</a>
      </div>
      <div class="pricing-card">
        <div class="tier-header">
          <h3>Enterprise</h3>
          <div class="price">
            <span class="amount">Custom</span>
          </div>
        </div>
        <ul class="features-list">
          <li>✓ Everything in Pro</li>
          <li>✓ Dedicated support</li>
          <li>✓ Custom integrations</li>
          <li>✓ SLA guarantee</li>
        </ul>
        <a href="#" class="btn-primary btn-full">Contact Sales</a>
      </div>
    `;
  }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add scroll effect to nav
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    nav.style.background = 'rgba(15, 23, 42, 0.95)';
    nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
  } else {
    nav.style.background = 'rgba(15, 23, 42, 0.8)';
    nav.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// Add pricing card styles
const style = document.createElement('style');
style.textContent = `
  .pricing-card {
    background: var(--dark);
    padding: 2rem;
    border-radius: 1rem;
    border: 1px solid rgba(99, 102, 241, 0.2);
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
  }
  
  .pricing-card:hover {
    transform: translateY(-5px);
    border-color: var(--primary);
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.2);
  }
  
  .pricing-card.featured {
    border-color: var(--primary);
    border-width: 2px;
    transform: scale(1.05);
  }
  
  .tier-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .tier-header h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: white;
  }
  
  .price {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 0.25rem;
  }
  
  .currency {
    font-size: 1.5rem;
    color: var(--gray);
  }
  
  .amount {
    font-size: 3rem;
    font-weight: 900;
    color: white;
  }
  
  .period {
    color: var(--gray);
  }
  
  .features-list {
    list-style: none;
    margin-bottom: 2rem;
    flex-grow: 1;
  }
  
  .features-list li {
    padding: 0.75rem 0;
    color: var(--light);
    border-bottom: 1px solid rgba(99, 102, 241, 0.1);
  }
  
  .btn-full {
    width: 100%;
    text-align: center;
  }
`;
document.head.appendChild(style);

// Initialize
loadPricing();

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all feature cards and testimonials
document.querySelectorAll('.feature-card, .testimonial, .pricing-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease-out';
  observer.observe(el);
});
