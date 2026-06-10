'use client';
/**
 * @fileOverview Sovereign Protocol Implementation (SDK v1.1).
 * Handles secure node handshakes for NoorNexus Infrastructure.
 */

import { initializeSovereignGrid } from "@/lib/sovereign-sdk";

// Centralized Architect Config (As specified by Lead Architect)
const masterConfig = {
  hubId: "SH-SIR-42B",
  logicPurity: "100%",
  merkleChain: true,
  authMode: "READ_ONLY" as const // Ensures zero system modification
};

const sdk = initializeSovereignGrid(masterConfig);

/**
 * Executes a one-click secure handshake with the specified node.
 * @param readOnlyApiKey The API key for node authorization.
 */
export const connectNode = async (readOnlyApiKey: string) => {
  try {
    return await sdk.auth.handshake(readOnlyApiKey);
  } catch (error) {
    console.error("[Sovereign-SDK] Handshake Failure:", error);
    throw error;
  }
};
