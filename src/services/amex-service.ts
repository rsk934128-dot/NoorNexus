
'use client';
/**
 * @fileOverview American Express Card on-demand Service Layer.
 * Interacts with AMEX Sandbox endpoints for Buyer, Account, and Card management.
 */

const AMEX_SANDBOX_BASE = 'https://api.qasb2s.americanexpress.com/commercial/v1/card_on_demand/';

export interface AmexBuyer {
  buyerId?: string;
  name: string;
  doingBusinessAsName?: string;
  governmentId: string;
  phone: Array<{ countryCode: string; number: string; type: 'BUSINESS' | 'MOBILE' }>;
  email: Array<{ type: 'BUSINESS'; emailAddress: string }>;
  address: Array<{
    type: 'BUSINESS' | 'RESIDENCE';
    purpose: 'PRIMARY';
    line1: string;
    line2?: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  }>;
}

export interface AmexCardRequest {
  accountId: string;
  cardUserId?: string;
  reloadable: boolean;
  spendControls: {
    spendType: 'SINGLE_USE' | 'MULTI_USE';
    currentAmount: string;
    validFromDate: string;
    validToDate: string;
    timeZone: string;
    allowedMerchantIndustries?: string[];
  };
  cardDetails: {
    formFactor: 'VIRTUAL';
    cardReferenceId: string;
  };
  deliveryMethod: 'API_RESPONSE';
  userDetails: any;
}

/**
 * Simulates a call to AMEX to create a Buyer.
 */
export const enrollAmexBuyer = async (buyerData: AmexBuyer): Promise<any> => {
  // In a real environment, this would use fetch with mTLS/OAuth2
  console.log('[AMEX] Enrolling Buyer:', buyerData.name);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        buyerId: 'OBpB' + Math.random().toString(36).substring(2, 12).toUpperCase(),
        ...buyerData,
        status: 'ACTIVE'
      });
    }, 1500);
  });
};

/**
 * Simulates generating a Virtual Card.
 */
export const createAmexVirtualCard = async (request: AmexCardRequest): Promise<any> => {
  console.log('[AMEX] Generating Virtual Card from Account:', request.accountId);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        cardId: 'CAEQ' + Math.random().toString(36).substring(2, 12).toUpperCase(),
        status: 'ACTIVE',
        cardDetails: {
          cardLastFive: Math.floor(Math.random() * 90000) + 10000,
          expiryDate: '12/30',
          formFactor: 'VIRTUAL',
          status: 'ACTIVE'
        }
      });
    }, 2000);
  });
};

/**
 * Simulates fetching transactions for an account.
 */
export const getAmexTransactions = async (accountId: string): Promise<any[]> => {
  return [
    {
      referenceNumber: "AMX-" + Math.random().toString(16).substring(2, 10).toUpperCase(),
      accountId: accountId,
      transactionAmount: { value: "450.00", currency: "USD" },
      transactionDate: new Date().toISOString().split('T')[0],
      merchant: { name: "Cloud Infrastructure Node", city: "Phoenix", state: "AZ" },
      transactionType: "CHARGE"
    },
    {
      referenceNumber: "AMX-" + Math.random().toString(16).substring(2, 10).toUpperCase(),
      accountId: accountId,
      transactionAmount: { value: "1200.00", currency: "USD" },
      transactionDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      merchant: { name: "Sovereign Logistics Hub", city: "Dubai", state: "UAE" },
      transactionType: "CHARGE"
    }
  ];
};
