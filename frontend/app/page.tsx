"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GlowingStars } from "@/components/glowing-stars";
import { ParticleBackground } from "@/components/particle-background";
import { TokenCounter } from "@/components/token-counter";
import { GarlicIcon } from "@/components/garlic-icon";
import { useWallet } from "@/hooks/use-wallet";
import { useContract } from "@/hooks/use-contract";

export default function Home() {
  const { connectWallet, disconnectWallet, isConnected, walletAddress } =
    useWallet();
  const { mintTokens } = useContract();

  const handleMint = async () => {
    await mintTokens();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Particle background */}
      <ParticleBackground />
      <GlowingStars />

      {/* Garlic Icon as faint background */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <GarlicIcon className="w-[400px] h-[400px] opacity-10" />
      </div>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex items-center"
        >
          <GarlicIcon className="mr-2 h-10 w-10 text-purple-300" />
          <h1 className="bg-gradient-to-r from-purple-300 via-white to-purple-200 bg-clip-text text-4xl font-extrabold tracking-tighter text-transparent sm:text-6xl">
            GARLIC TOKEN
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-12 max-w-md text-center"
        >
          <p className="text-xl font-light text-purple-200">
            The first decentralized token with a flavor that never fades
          </p>
          <div className="mt-6 flex justify-center">
            <div className="relative rounded-xl border border-purple-500/30 bg-black/40 p-6 backdrop-blur-lg">
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 opacity-20 blur-sm"></div>
              <div className="relative">
                <TokenCounter />
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-purple-300">Price</span>
                    <span className="text-xl font-bold">FREE</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-purple-300">Supply</span>
                    <span className="text-xl font-bold">1,000,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          {!isConnected ? (
            <Button
              onClick={connectWallet}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-8 py-6 text-lg font-medium text-white transition-all hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]"
            >
              <span className="relative z-10">Connect Wallet</span>
              <span className="absolute inset-0 z-0 bg-gradient-to-r from-purple-700 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100"></span>
            </Button>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="text-sm text-purple-300">
                Connected: {walletAddress?.slice(0, 6)}...
                {walletAddress?.slice(-4)}
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={handleMint}
                  className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-8 py-6 text-lg font-medium text-white transition-all hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]"
                >
                  <span className="relative z-10">Mint Now</span>
                  <span className="absolute inset-0 z-0 bg-gradient-to-r from-purple-700 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100"></span>
                </Button>
                <Button
                  onClick={disconnectWallet}
                  variant="outline"
                  className="group relative overflow-hidden rounded-full border-purple-500/30 px-8 py-6 text-lg font-medium text-white transition-all hover:border-purple-500/50 hover:bg-purple-500/10"
                >
                  <span className="relative z-10">Disconnect</span>
                </Button>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3"
        >
          <FeatureCard
            title="Decentralized"
            description="Fully decentralized token running on Ethereum"
            icon="🔗"
          />
          <FeatureCard
            title="Community Driven"
            description="Governed by holders for maximum transparency"
            icon="👥"
          />
          <FeatureCard
            title="Deflationary"
            description="Limited supply with burn mechanism"
            icon="🔥"
          />
        </motion.div>
      </main>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="group rounded-xl border border-purple-500/20 bg-black/40 p-6 backdrop-blur-md transition-all hover:border-purple-500/40 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-2xl">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
      <p className="text-sm text-gray-300">{description}</p>
    </motion.div>
  );
}
