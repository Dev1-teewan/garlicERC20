"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useCallback } from "react";

export function useWallet() {
  const {
    login,
    logout,
    authenticated,
    ready,
    user,
    linkWallet,
    unlinkWallet,
  } = usePrivy();

  const connectWallet = useCallback(async () => {
    try {
      await login();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  }, [login]);

  const disconnectWallet = useCallback(async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  }, [logout]);

  const getWalletAddress = useCallback(() => {
    if (!user?.wallet) return null;
    return user.wallet.address;
  }, [user?.wallet]);

  return {
    connectWallet,
    disconnectWallet,
    isConnected: authenticated,
    isReady: ready,
    walletAddress: getWalletAddress(),
    user,
    linkWallet,
    unlinkWallet,
  };
}
