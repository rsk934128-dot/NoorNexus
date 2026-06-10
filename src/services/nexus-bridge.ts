'use client';

/**
 * @fileOverview NexusBridge Implementation - Final Synthesis Edition.
 * Bridges the collaboration between Gemini and NoorNexus Mainframe.
 */

export interface HealthReport {
  status: 'OPTIMAL' | 'DEGRADED' | 'CRITICAL';
  vaultIntegrity: number;
  activeNodes: number;
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'LOCKDOWN';
  timestamp: number;
  reasoning: string;
}

export interface DailySummary {
  date: string;
  totalTransactions: number;
  volume24h: number;
  revenue: {
    levy: number;
    sdkFees: number;
    total: number;
  };
  networkGrowth: string;
  agentStatus: string;
  topNode: string;
  legalSovereignty: string; // New: To show the legal standing
}

const SIMULATED_SK = 'sk_sov_nexus_alpha_v3';

export const connectToGemini = async (action: string, payload: any = {}): Promise<any> => {
  try {
    const response = await fetch('/api/gateway', {
      method: 'POST',
      headers: {
        'X-Imperial-Key': SIMULATED_SK,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        action: action, 
        payload: payload,
        timestamp: Date.now(),
        origin: 'Gemini-Collaboration-Bridge'
      })
    });
    
    if (!response.ok) throw new Error('GATEWAY_ACCESS_DENIED');
    return await response.json();
  } catch (error) {
    console.error('[NexusBridge] Collaboration Failure:', error);
    throw error;
  }
};

/**
 * Fetches the daily summary of the empire.
 */
export const getDailyImperialSummary = async (): Promise<DailySummary> => {
  return await connectToGemini('GET_DAILY_SUMMARY');
};

/**
 * Broadcasts the Imperial Proclamation to the mesh nodes.
 */
export const broadcastProclamation = async (content: string): Promise<any> => {
  return await connectToGemini('BROADCAST_PROCLAMATION', { proclamation: content });
};

/**
 * Generates a full system health report via the bridge.
 */
export const getSystemHealthReport = async (): Promise<HealthReport> => {
  const data = await connectToGemini('GET_VAULT_STATUS');
  return {
    status: data.integrity > 95 ? 'OPTIMAL' : data.integrity > 80 ? 'DEGRADED' : 'CRITICAL',
    vaultIntegrity: data.integrity,
    activeNodes: data.activeNodes,
    threatLevel: data.threatLevel,
    timestamp: Date.now(),
    reasoning: data.reasoning || "All systems operating within sovereign parameters."
  };
};
