import { useEffect } from "react";
import {
  ChainId,
  useNetworkMismatch,
  useChainId,
  ConnectWallet,
  useAddress,
  useChain,
} from "@thirdweb-dev/react";
import { useSwitchChain } from "@thirdweb-dev/react";

export const AutoConnect = () => {
  const address = useAddress(); // Get connected wallet address
  const switchChain = useSwitchChain();

  const isMismatched = useNetworkMismatch(); // Detect if user is connected to the wrong network
  const chain = useChain();

  useEffect(() => {
    // Check if the user is connected to the wrong network
    if (isMismatched) {
      // Prompt their wallet to switch networks
      switchChain(ChainId.Optimism); // the chain you want here
    }
  }, [address]); // This above block gets run every time "address" changes (e.g. when the user connects)

  return <ConnectWallet />;
};
