import Graph from 'graphology';
import forceAtlas2 from 'graphology-layout-forceatlas2';

export class GraphAnalyzer {
  constructor() {
    this.graph = new Graph({ multi: false, type: 'directed' });
  }

  // Build transaction graph
  buildTransactionGraph(transactions) {
    transactions.forEach(tx => {
      if (!this.graph.hasNode(tx.from)) {
        this.graph.addNode(tx.from, { 
          type: 'address',
          totalSent: 0,
          totalReceived: 0,
          txCount: 0
        });
      }
      
      if (!this.graph.hasNode(tx.to)) {
        this.graph.addNode(tx.to, { 
          type: 'address',
          totalSent: 0,
          totalReceived: 0,
          txCount: 0
        });
      }

      const edgeKey = `${tx.from}-${tx.to}`;
      if (this.graph.hasEdge(edgeKey)) {
        const edge = this.graph.getEdgeAttributes(edgeKey);
        this.graph.setEdgeAttribute(edgeKey, 'value', edge.value + parseFloat(tx.value));
        this.graph.setEdgeAttribute(edgeKey, 'count', edge.count + 1);
      } else {
        this.graph.addEdge(tx.from, tx.to, {
          value: parseFloat(tx.value),
          count: 1,
          firstSeen: tx.timestamp
        });
      }

      // Update node stats
      this.graph.updateNodeAttribute(tx.from, 'totalSent', n => (n || 0) + parseFloat(tx.value));
      this.graph.updateNodeAttribute(tx.to, 'totalReceived', n => (n || 0) + parseFloat(tx.value));
      this.graph.updateNodeAttribute(tx.from, 'txCount', n => (n || 0) + 1);
      this.graph.updateNodeAttribute(tx.to, 'txCount', n => (n || 0) + 1);
    });

    return this.graph;
  }

  // Detect address clusters (common ownership heuristics)
  detectClusters() {
    const clusters = new Map();
    let clusterId = 0;

    this.graph.forEachNode((node, attrs) => {
      if (clusters.has(node)) return;

      const cluster = new Set([node]);
      const queue = [node];

      while (queue.length > 0) {
        const current = queue.shift();
        
        // Multi-input heuristic: addresses used together in inputs likely same owner
        const neighbors = this.graph.neighbors(current);
        
        neighbors.forEach(neighbor => {
          const edge = this.graph.getEdgeAttributes(current, neighbor);
          
          // Strong connection heuristic
          if (edge.count > 5 && edge.value > 1) {
            if (!cluster.has(neighbor)) {
              cluster.add(neighbor);
              queue.push(neighbor);
            }
          }
        });
      }

      cluster.forEach(addr => clusters.set(addr, clusterId));
      clusterId++;
    });

    return clusters;
  }

  // Find suspicious patterns
  findSuspiciousPatterns() {
    const patterns = {
      mixers: [],
      rapidMovement: [],
      highVolume: [],
      peelChains: []
    };

    this.graph.forEachNode((node, attrs) => {
      const inDegree = this.graph.inDegree(node);
      const outDegree = this.graph.outDegree(node);

      // Potential mixer: high in/out degree with similar values
      if (inDegree > 10 && outDegree > 10) {
        patterns.mixers.push({
          address: node,
          inDegree,
          outDegree,
          suspicionScore: (inDegree + outDegree) / 2
        });
      }

      // High volume
      if (attrs.totalSent > 1000 || attrs.totalReceived > 1000) {
        patterns.highVolume.push({
          address: node,
          totalSent: attrs.totalSent,
          totalReceived: attrs.totalReceived
        });
      }
    });

    // Detect peel chains (sequential splitting of funds)
    this.detectPeelChains(patterns);

    return patterns;
  }

  detectPeelChains(patterns) {
    this.graph.forEachNode((node) => {
      const outEdges = this.graph.outEdges(node);
      
      if (outEdges.length === 2) {
        const [edge1, edge2] = outEdges.map(e => this.graph.getEdgeAttributes(e));
        
        // One large, one small (change) - typical peel chain pattern
        const ratio = Math.max(edge1.value, edge2.value) / Math.min(edge1.value, edge2.value);
        
        if (ratio > 10) {
          patterns.peelChains.push({
            address: node,
            ratio,
            values: [edge1.value, edge2.value]
          });
        }
      }
    });
  }

  // Calculate centrality metrics
  calculateCentrality() {
    const centrality = {};

    this.graph.forEachNode((node) => {
      const degree = this.graph.degree(node);
      const inDegree = this.graph.inDegree(node);
      const outDegree = this.graph.outDegree(node);

      centrality[node] = {
        degree,
        inDegree,
        outDegree,
        betweenness: this.approximateBetweenness(node)
      };
    });

    return centrality;
  }

  approximateBetweenness(node) {
    // Simplified betweenness centrality
    let score = 0;
    const neighbors = this.graph.neighbors(node);
    
    neighbors.forEach(n1 => {
      neighbors.forEach(n2 => {
        if (n1 !== n2 && !this.graph.hasEdge(n1, n2)) {
          score += 1; // Node is on path between n1 and n2
        }
      });
    });

    return score;
  }

  // Export graph for visualization
  exportForVisualization() {
    const positions = forceAtlas2(this.graph, {
      iterations: 100,
      settings: {
        gravity: 1,
        scalingRatio: 10
      }
    });

    return {
      nodes: this.graph.nodes().map(node => ({
        id: node,
        ...this.graph.getNodeAttributes(node),
        ...positions[node]
      })),
      edges: this.graph.edges().map(edge => ({
        source: this.graph.source(edge),
        target: this.graph.target(edge),
        ...this.graph.getEdgeAttributes(edge)
      }))
    };
  }

  getStatistics() {
    return {
      nodeCount: this.graph.order,
      edgeCount: this.graph.size,
      density: this.graph.size / (this.graph.order * (this.graph.order - 1)),
      avgDegree: this.graph.size / this.graph.order
    };
  }
}
