import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export class AuditLogger {
  constructor(logDir = './data/audit-logs') {
    this.logDir = logDir;
    this.initializeLogDir();
  }

  async initializeLogDir() {
    try {
      await fs.mkdir(this.logDir, { recursive: true });
    } catch (error) {
      console.error('Failed to create audit log directory:', error);
    }
  }

  async log(event) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      eventId: crypto.randomUUID(),
      ...event,
      hash: this.hashEntry({ timestamp, ...event })
    };

    const logFile = path.join(
      this.logDir,
      `audit-${new Date().toISOString().split('T')[0]}.jsonl`
    );

    try {
      await fs.appendFile(
        logFile,
        JSON.stringify(logEntry) + '\n',
        'utf8'
      );
    } catch (error) {
      console.error('Failed to write audit log:', error);
    }

    return logEntry;
  }

  hashEntry(entry) {
    const data = JSON.stringify(entry);
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  async logAccess(userId, resource, action, result) {
    return this.log({
      type: 'access',
      userId,
      resource,
      action,
      result,
      ip: 'localhost' // Would be real IP in production
    });
  }

  async logSecurity(event, severity, details) {
    return this.log({
      type: 'security',
      event,
      severity,
      details
    });
  }

  async logDataAccess(userId, dataType, operation) {
    return this.log({
      type: 'data_access',
      userId,
      dataType,
      operation
    });
  }
}
