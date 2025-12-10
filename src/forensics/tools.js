import fs from 'fs/promises';
import path from 'path';

export class ForensicTools {
  
  // Extract wallet data from file
  async extractWalletData(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      const walletPatterns = {
        mnemonic: /\b([a-z]+\s){11,23}[a-z]+\b/gi,
        privateKey: /0x[a-fA-F0-9]{64}/g,
        ethereumAddress: /0x[a-fA-F0-9]{40}/g,
        bitcoinAddress: /[13][a-km-zA-HJ-NP-Z1-9]{25,34}|bc1[a-z0-9]{39,59}/g
      };
      
      const findings = {};
      for (const [type, pattern] of Object.entries(walletPatterns)) {
        const matches = content.match(pattern);
        if (matches) {
          findings[type] = [...new Set(matches)];
        }
      }
      
      return findings;
    } catch (error) {
      throw new Error(`Failed to extract wallet data: ${error.message}`);
    }
  }

  // Create forensic timeline
  createTimeline(events) {
    return events
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      .map((event, index) => ({
        index,
        timestamp: event.timestamp,
        type: event.type,
        description: event.description,
        data: event.data
      }));
  }

  // Generate forensic report
  async generateReport(caseData, outputPath) {
    const report = {
      caseId: caseData.caseId,
      timestamp: new Date().toISOString(),
      investigator: caseData.investigator,
      summary: caseData.summary,
      findings: caseData.findings,
      evidence: caseData.evidence,
      conclusion: caseData.conclusion
    };
    
    await fs.writeFile(
      outputPath,
      JSON.stringify(report, null, 2),
      'utf8'
    );
    
    return report;
  }

  // Hash file for evidence integrity
  async hashFile(filePath) {
    const crypto = await import('crypto');
    const content = await fs.readFile(filePath);
    return crypto.createHash('sha256').update(content).digest('hex');
  }

  // Search for patterns in directory
  async searchDirectory(dirPath, pattern) {
    const results = [];
    
    async function scan(currentPath) {
      const entries = await fs.readdir(currentPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);
        
        if (entry.isDirectory()) {
          await scan(fullPath);
        } else if (entry.isFile()) {
          try {
            const content = await fs.readFile(fullPath, 'utf8');
            if (pattern.test(content)) {
              results.push({
                file: fullPath,
                matches: content.match(pattern)
              });
            }
          } catch (error) {
            // Skip files that can't be read as text
          }
        }
      }
    }
    
    await scan(dirPath);
    return results;
  }
}
