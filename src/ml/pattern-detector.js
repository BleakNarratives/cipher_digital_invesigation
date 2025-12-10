export class MLPatternDetector {
  constructor() {
    this.patterns = {
      mixerScore: this.calculateMixerScore.bind(this),
      peelChainScore: this.calculatePeelChainScore.bind(this),
      exchangeScore: this.calculateExchangeScore.bind(this),
      anomalyScore: this.calculateAnomalyScore.bind(this)
    };
  }

  // Detect mixer behavior using heuristics
  calculateMixerScore(addressData) {
    const { inDegree, outDegree, avgInValue, avgOutValue, txCount } = addressData;
    
    let score = 0;
    
    // High in/out degree
    if (inDegree > 50 && outDegree > 50) score += 30;
    
    // Similar in/out values (mixing characteristic)
    const valueDiff = Math.abs(avgInValue - avgOutValue) / Math.max(avgInValue, avgOutValue);
    if (valueDiff < 0.1) score += 25;
    
    // High transaction count
    if (txCount > 1000) score += 20;
    
    // Time-based patterns (rapid in/out)
    if (addressData.avgTimeBetweenTx < 60) score += 25;
    
    return Math.min(score, 100);
  }

  // Detect peel chain patterns
  calculatePeelChainScore(addressData) {
    const { outEdges } = addressData;
    let score = 0;
    
    // Check for consistent 2-output pattern
    const twoOutputRatio = outEdges.filter(e => e.length === 2).length / outEdges.length;
    if (twoOutputRatio > 0.7) score += 40;
    
    // Check for large/small value splits
    let peelCount = 0;
    outEdges.forEach(edges => {
      if (edges.length === 2) {
        const ratio = Math.max(edges[0].value, edges[1].value) / 
                     Math.min(edges[0].value, edges[1].value);
        if (ratio > 10) peelCount++;
      }
    });
    
    if (peelCount / outEdges.length > 0.5) score += 60;
    
    return Math.min(score, 100);
  }

  // Detect exchange behavior
  calculateExchangeScore(addressData) {
    const { inDegree, outDegree, uniqueCounterparties, balance } = addressData;
    let score = 0;
    
    // Very high degree
    if (inDegree > 1000 || outDegree > 1000) score += 40;
    
    // Many unique counterparties
    if (uniqueCounterparties > 500) score += 30;
    
    // High balance
    if (balance > 100) score += 30;
    
    return Math.min(score, 100);
  }

  // Anomaly detection using statistical methods
  calculateAnomalyScore(addressData, populationStats) {
    let score = 0;
    
    // Z-score for transaction count
    const txZScore = Math.abs(
      (addressData.txCount - populationStats.avgTxCount) / populationStats.stdTxCount
    );
    if (txZScore > 3) score += 25;
    
    // Z-score for value
    const valueZScore = Math.abs(
      (addressData.totalValue - populationStats.avgValue) / populationStats.stdValue
    );
    if (valueZScore > 3) score += 25;
    
    // Unusual time patterns
    if (addressData.mostActiveHour < 2 || addressData.mostActiveHour > 22) score += 25;
    
    // Burst activity
    if (addressData.maxTxPerHour > populationStats.avgTxPerHour * 10) score += 25;
    
    return Math.min(score, 100);
  }

  analyzeAddress(addressData, populationStats = null) {
    const scores = {
      mixer: this.patterns.mixerScore(addressData),
      peelChain: this.patterns.peelChainScore(addressData),
      exchange: this.patterns.exchangeScore(addressData)
    };
    
    if (populationStats) {
      scores.anomaly = this.patterns.anomalyScore(addressData, populationStats);
    }
    
    // Determine primary classification
    const maxScore = Math.max(...Object.values(scores));
    const classification = Object.keys(scores).find(k => scores[k] === maxScore);
    
    return {
      scores,
      classification,
      confidence: maxScore,
      risk: maxScore > 70 ? 'high' : maxScore > 40 ? 'medium' : 'low'
    };
  }

  // Batch analysis for multiple addresses
  analyzeBatch(addresses, populationStats = null) {
    return addresses.map(addr => ({
      address: addr.address,
      analysis: this.analyzeAddress(addr, populationStats)
    }));
  }
}
