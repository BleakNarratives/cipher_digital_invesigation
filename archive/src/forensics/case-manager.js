import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export class CaseManager {
  constructor(baseDir = './data/cases') {
    this.baseDir = baseDir;
  }

  async createCase(metadata) {
    const caseId = this.generateCaseId();
    const caseDir = path.join(this.baseDir, caseId);
    
    await fs.mkdir(caseDir, { recursive: true });
    await fs.mkdir(path.join(caseDir, 'evidence'), { recursive: true });
    await fs.mkdir(path.join(caseDir, 'reports'), { recursive: true });
    await fs.mkdir(path.join(caseDir, 'exports'), { recursive: true });
    
    const caseData = {
      caseId,
      createdAt: new Date().toISOString(),
      status: 'open',
      metadata,
      evidence: [],
      findings: [],
      timeline: [],
      auditLog: [{
        timestamp: new Date().toISOString(),
        action: 'case_created',
        user: metadata.investigator
      }]
    };
    
    await this.saveCaseData(caseId, caseData);
    return caseData;
  }

  generateCaseId() {
    const timestamp = Date.now().toString(36);
    const random = crypto.randomBytes(4).toString('hex');
    return `CASE-${timestamp}-${random}`.toUpperCase();
  }

  async getCaseData(caseId) {
    const casePath = path.join(this.baseDir, caseId, 'case.json');
    const data = await fs.readFile(casePath, 'utf8');
    return JSON.parse(data);
  }

  async saveCaseData(caseId, data) {
    const casePath = path.join(this.baseDir, caseId, 'case.json');
    await fs.writeFile(casePath, JSON.stringify(data, null, 2), 'utf8');
  }

  async addEvidence(caseId, evidence) {
    const caseData = await this.getCaseData(caseId);
    const evidenceId = `EVD-${Date.now().toString(36)}`;
    
    const evidenceEntry = {
      evidenceId,
      timestamp: new Date().toISOString(),
      type: evidence.type,
      description: evidence.description,
      hash: evidence.hash,
      metadata: evidence.metadata
    };
    
    caseData.evidence.push(evidenceEntry);
    caseData.auditLog.push({
      timestamp: new Date().toISOString(),
      action: 'evidence_added',
      evidenceId
    });
    
    await this.saveCaseData(caseId, caseData);
    return evidenceEntry;
  }

  async addFinding(caseId, finding) {
    const caseData = await this.getCaseData(caseId);
    
    const findingEntry = {
      findingId: `FND-${Date.now().toString(36)}`,
      timestamp: new Date().toISOString(),
      severity: finding.severity,
      category: finding.category,
      description: finding.description,
      evidence: finding.evidence,
      confidence: finding.confidence
    };
    
    caseData.findings.push(findingEntry);
    await this.saveCaseData(caseId, caseData);
    return findingEntry;
  }

  async closeCase(caseId, conclusion) {
    const caseData = await this.getCaseData(caseId);
    caseData.status = 'closed';
    caseData.closedAt = new Date().toISOString();
    caseData.conclusion = conclusion;
    caseData.auditLog.push({
      timestamp: new Date().toISOString(),
      action: 'case_closed'
    });
    
    await this.saveCaseData(caseId, caseData);
    return caseData;
  }

  async listCases(filter = {}) {
    const cases = [];
    const entries = await fs.readdir(this.baseDir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        try {
          const caseData = await this.getCaseData(entry.name);
          
          if (filter.status && caseData.status !== filter.status) continue;
          
          cases.push({
            caseId: caseData.caseId,
            status: caseData.status,
            createdAt: caseData.createdAt,
            investigator: caseData.metadata?.investigator,
            evidenceCount: caseData.evidence.length,
            findingsCount: caseData.findings.length
          });
        } catch (error) {
          // Skip invalid case directories
        }
      }
    }
    
    return cases.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
}
