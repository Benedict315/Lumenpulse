import { apiClient, ApiResponse } from './api-client';

/**
 * Auth API Types
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  createdAt: string;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
}

/**
 * Portfolio API Types
 */
export interface AssetBalance {
  assetCode: string;
  assetIssuer: string | null;
  amount: string;
  valueUsd: number;
}

export interface PortfolioSummary {
  totalValueUsd: string;
  assets: AssetBalance[];
  lastUpdated: string | null;
  hasLinkedAccount: boolean;
}

export interface SnapshotResponse {
  success: boolean;
  snapshot: {
    id: string;
    createdAt: string;
    totalValueUsd: string;
  };
}

/**
 * Auth API Service
 * Uses the shared API client for all requests
 */
export const authApi = {
  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> {
    return apiClient.post<LoginResponse>('/auth/login', credentials);
  },

  /**
   * Register new user
   */
  async register(credentials: RegisterCredentials): Promise<ApiResponse<RegisterResponse>> {
    return apiClient.post<RegisterResponse>('/auth/register', credentials);
  },
};

/**
 * Health Check API
 */
export const healthApi = {
  /**
   * Check backend health
   */
  async check(): Promise<ApiResponse<HealthResponse>> {
    return apiClient.get<HealthResponse>('/health');
  },
};

/**
 * Portfolio API Service
 */
export const portfolioApi = {
  /**
   * Get latest portfolio summary (total USD + asset list)
   */
  async getSummary(): Promise<ApiResponse<PortfolioSummary>> {
    return apiClient.get<PortfolioSummary>('/portfolio/summary');
  },

  /**
   * Trigger a fresh snapshot for the authenticated user
   * Used by pull-to-refresh to get live Stellar balances
   */
  async createSnapshot(): Promise<ApiResponse<SnapshotResponse>> {
    return apiClient.post<SnapshotResponse>('/portfolio/snapshot');
  },
};

// Re-export the client for direct use if needed
export { apiClient };