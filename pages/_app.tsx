import { useEffect } from "react";
import "../styles/globals.css";

import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import theme from "../theme";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { AppLayout } from "../components";
import { ThirdwebProvider, ThirdwebSDKProvider } from "@thirdweb-dev/react";
import { Optimism } from "@thirdweb-dev/chains";
import { useNetworkMismatch } from "@thirdweb-dev/react";
import "../styles/globals.css";

const activeChain = "Optimism";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("preline");
  }, []);

  useEffect(() => {
    const App = () => {
      const isMismatched = useNetworkMismatch();
    };
  });

  return (
    <ThirdwebSDKProvider activeChain={activeChain}>
      <ThirdwebProvider
        activeChain={{
          // === Required information for connecting to the network === \\
          chainId: 10, // Chain ID of the network
          // Array of RPC URLs to use
          rpc: ["https://mainnet.optimism.io"],

          // === Information for adding the network to your wallet (how it will appear for first time users) === \\
          // Information about the chain's native currency (i.e. the currency that is used to pay for gas)
          nativeCurrency: {
            decimals: 18,
            name: " Optimism",
            symbol: "ETH",
          },
          shortName: "OP Mainnet", // Display value shown in the wallet UI
          slug: "OP Mainnet", // Display value shown in the wallet UI
          testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
          chain: "Optimism", // Name of the network
          name: "  Optimism", // Name of the network
        }}
        clientId={`${process.env.NEXT_PUBLIC_THIRDWEB_API_KEY}`}
      >
        <ChakraProvider theme={theme}>
          <Head>
            <title>Title</title>
            <link rel="icon" href="/favicon/favicon.ico" />

            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="theme-color" content="#000000" />
          </Head>
          <DefaultSeo
            openGraph={{
              type: "website",
              locale: "en_US",
              url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/ReadMe.png`,
              site_name: "Title",
              title: "Title",
              description: "description",
              images: [
                {
                  url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/ReadMe.png`,
                  alt: "Title",
                  type: "image/png",
                },
              ],
            }}
            twitter={{
              handle: "@",
              site: "@",
              cardType: "summary_large_image",
            }}
            additionalLinkTags={[
              {
                rel: "icon",
                href: "/favicon/favicon.ico",
              },
            ]}
          />
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </ChakraProvider>
      </ThirdwebProvider>
    </ThirdwebSDKProvider>
  );
}

export default MyApp;
