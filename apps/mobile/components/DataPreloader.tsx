import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CachedApi } from '../lib/cached-api';

/**
 * Component that preloads critical data for offline use
 * Should be mounted at the app level to ensure data is available
 */
export function DataPreloader() {
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Preload critical data in the background
      CachedApi.preloadCriticalData(user.id).catch(error => {
        console.warn('Failed to preload critical data:', error);
      });
    }
  }, [isAuthenticated, user]);

  // This component doesn't render anything
  return null;
}

/**
 * Hook to trigger data preloading manually
 */
export function useDataPreloader() {
  const { user } = useAuth();

  const preloadData = async () => {
    if (user) {
      await CachedApi.preloadCriticalData(user.id);
    }
  };

  const clearCache = async () => {
    await CachedApi.clearCache();
  };

  return {
    preloadData,
    clearCache,
  };
}