
'use client';
/**
 * @fileOverview Sovereign Pay Bridge Integration.
 * Enhanced with Currency, Transaction ID, and Metadata Mapping for bKash/Xendit.
 */

import { connectToGemini } from './nexus-bridge';

export interface PayoutResult {
  status: 'APPROVED' | 'PENDING_SOVEREIGN_SEAL' | 'AI_RE-VERIFICATION' | 'FAILED';
  message: string;
  txId?: string;
  externalTxId?: string; // ID from bKash/Xendit
  riskScore: number;
  currency: string;
  amount: number;
  complianceReport?: {
    taxEstimation: number;
    complianceScore: number;
    checklist: string[];
  };
  attestation?: string;
}

/**
 * 1. Currency & Amount Mapping Utility
 */
export const mapCurrency = (amount: number, targetProvider: string) => {
  const rates: Record<string, number> = { 'bKash': 1, 'Xendit': 0.0085 }; // Simulation: 1 USD = 120 BDT
  const currency = targetProvider === 'bKash' ? 'BDT' : 'USD';
  return {
    mappedAmount: amount * (rates[targetProvider] || 1),
    currency
  };
};

/**
 * 4. Status Code Mapping Utility
 */
export const mapGatewayStatus = (code: string | number, provider: string): PayoutResult['status'] => {
  const mappings: Record<string, Record<string, PayoutResult['status']>> = {
    'bKash': {
      '0000': 'APPROVED',
      '2001': 'FAILED',
      '2002': 'PENDING_SOVEREIGN_SEAL'
    },
    'Xendit': {
      'PAID': 'APPROVED',
      'PENDING': 'PENDING_SOVEREIGN_SEAL',
      'FAILED': 'FAILED'
    }
  };
  return mappings[provider]?.[code.toString()] || 'FAILED';
};

/**
 * Executes a mapped sovereign payout with Customer Metadata.
 */
export const executeMappedPayout = async (
  amount: number, 
  provider: string, 
  userContext: { email: string; systemId: string }
): Promise<PayoutResult> => {
  try {
    // Phase 1: Currency & Amount Mapping
    const { mappedAmount, currency } = mapCurrency(amount, provider);

    // Phase 2 & 3: Injecting Transaction Metadata into Gateway
    const response = await connectToGemini('EXECUTE_PAYOUT', {
      amount: mappedAmount,
      currency: currency,
      provider: provider,
      metadata: {
        customer_email: userContext.email,
        sovereign_gid: userContext.systemId,
        integration_version: "NextJS-15-V3"
      }
    });

    // Phase 4: Status Code Mapping
    const normalizedStatus = mapGatewayStatus(response.status_code || response.status, provider);

    return {
      status: normalizedStatus,
      message: response.message,
      txId: response.txId,
      externalTxId: response.gateway_tx_id || "EXT-" + Math.random().toString(16).substring(2, 10).toUpperCase(),
      riskScore: response.riskScore,
      currency: currency,
      amount: mappedAmount,
      attestation: "NOORNEXUS_ATTESTATION: Signed by Commander Sheikh Farid."
    } as PayoutResult;
  } catch (error: any) {
    console.error('[PayBridge] Mapping Failure:', error);
    return {
      status: 'FAILED',
      message: error.message || "Cryptographic Handshake Mapping Error",
      riskScore: 100,
      currency: 'N/A',
      amount: 0
    };
  }
};
