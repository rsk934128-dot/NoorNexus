import { NextResponse } from 'next/server';

/**
 * @fileOverview Sovereign Gateway API Simulation (Hardened).
 * Features: Idempotency checking and standard state mapping.
 */

const AUTHORIZED_KEY = 'sk_sov_nexus_alpha_v3';
const IDEMPOTENCY_CACHE = new Set<string>();

export async function POST(request: Request) {
  const key = request.headers.get('X-Imperial-Key');
  const signature = request.headers.get('X-R-Signature');
  
  if (key !== AUTHORIZED_KEY && !signature) {
    return NextResponse.json({ error: 'UNAUTHORIZED_ACCESS', msg: 'Imperial Seal Mismatch' }, { status: 403 });
  }

  const body = await request.json();
  const { action, payload, idempotencyKey } = body;

  // 1. Idempotency Check
  const effectiveKey = idempotencyKey || payload?.idempotencyKey;
  if (effectiveKey && IDEMPOTENCY_CACHE.has(effectiveKey)) {
    return NextResponse.json({
      status: 'ALREADY_PROCESSED',
      message: 'Idempotency Shield: Transaction already recorded.',
      idempotencyKey: effectiveKey,
      cached: true
    });
  }
  if (effectiveKey) IDEMPOTENCY_CACHE.add(effectiveKey);

  switch (action) {
    case 'EXECUTE_PAYOUT':
      const provider = payload?.provider || 'Sovereign';
      const amount = payload?.amount || 0;
      
      let response_status = 'APPROVED';
      let status_code = '0000';
      
      if (provider === 'bKash') {
        status_code = amount > 100000 ? '2001' : '0000'; 
      } else if (provider === 'Xendit') {
        response_status = amount > 50000 ? 'FAILED' : 'PAID';
      }

      return NextResponse.json({
        status: response_status,
        status_code: status_code,
        message: 'Fintech Reliability Handshake Successful',
        txId: 'SOV-TX-' + Math.random().toString(36).substring(2, 12).toUpperCase(),
        gateway_tx_id: provider.toUpperCase() + '-' + Math.random().toString(16).substring(2, 10).toUpperCase(),
        timestamp: Date.now(),
        riskScore: amount > 50000 ? 85 : 5,
        idempotencyKey: effectiveKey
      });

    case 'GET_DAILY_SUMMARY':
      return NextResponse.json({
        date: new Date().toLocaleDateString(),
        totalTransactions: 15420,
        volume24h: 12560000,
        agentStatus: "ALL_ACTIVE",
        legalSovereignty: "SOVEREIGN_TIN_ACTIVE",
        reconciliationStatus: "MATCHED_100%"
      });

    default:
      return NextResponse.json({ error: 'INVALID_ACTION' }, { status: 400 });
  }
}
