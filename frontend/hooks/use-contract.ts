import { useCallback } from "react";
import { ethers } from "ethers";
import { useWallet } from "./use-wallet";
import { useToast } from "./use-toast";

const CONTRACT_ADDRESS = "0x7Dc762E8f629DA84F9bB9D8D45A5E5b421DfdF54";
const KITE_CHAIN_ID = "0x940"; // 2368 in hex

// ABI for the mint1000 function
const CONTRACT_ABI = [
  {
    inputs: [],
    name: "mint1000",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export function useContract() {
  const { user } = useWallet();
  const { toast } = useToast();

  const mintTokens = useCallback(async () => {
    if (!user?.wallet) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first to mint tokens",
        variant: "destructive",
      });
      return;
    }

    if (!window.ethereum) {
      toast({
        title: "No Wallet Found",
        description:
          "Please install MetaMask or another Web3 wallet to continue",
        variant: "destructive",
      });
      return;
    }

    try {
      // Get the provider from window.ethereum
      const provider = new ethers.BrowserProvider(window.ethereum);

      // Check if we're on the correct network
      const network = await provider.getNetwork();
      if (network.chainId.toString() !== KITE_CHAIN_ID) {
        toast({
          title: "Switching Network",
          description: "Please switch to KiteAI Testnet to continue",
        });

        // Request network switch
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: KITE_CHAIN_ID }],
        });

        toast({
          title: "Network Switched",
          description: "Successfully connected to KiteAI Testnet",
        });

        // Wait for network switch to complete
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // Get the signer
      const signer = await provider.getSigner();

      // Create contract instance
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      // Set up network change handler
      const handleNetworkChange = async (chainId: string) => {
        if (chainId === KITE_CHAIN_ID) {
          toast({
            title: "Network Connected",
            description: "Successfully connected to KiteAI Testnet",
          });

          // Network is correct, retry the transaction
          try {
            const tx = await contract.mint1000();
            toast({
              title: "Minting Started",
              description: "Your transaction is being processed on the network",
            });
            await tx.wait();
            toast({
              title: "Minting Successful! 🎉",
              description: "You have successfully minted 1000 Garlic tokens!",
            });
          } catch (error: any) {
            console.error("Retry error:", error);
            toast({
              title: "Minting Failed",
              description:
                error.message || "Failed to mint tokens. Please try again.",
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Wrong Network",
            description: "Please switch to KiteAI Testnet to mint tokens",
            variant: "destructive",
          });
        }
      };

      // Add network change listener
      window.ethereum.on("chainChanged", handleNetworkChange);

      try {
        // Call mint function
        const tx = await contract.mint1000();

        toast({
          title: "Minting Started",
          description: "Your transaction is being processed on the network",
        });

        // Wait for transaction to be mined
        await tx.wait();

        toast({
          title: "Minting Successful! 🎉",
          description: "You have successfully minted 1000 Garlic tokens!",
        });
      } catch (error: any) {
        // If the error is not a network change error, show it
        if (!error.message?.includes("network changed")) {
          throw error;
        }
      } finally {
        // Remove network change listener
        window.ethereum.removeListener("chainChanged", handleNetworkChange);
      }
    } catch (error: any) {
      console.error("Minting error:", error);
      toast({
        title: "Minting Failed",
        description:
          error.message || "Failed to mint tokens. Please try again.",
        variant: "destructive",
      });
    }
  }, [user, toast]);

  return {
    mintTokens,
  };
}
