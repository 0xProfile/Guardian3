import "../styles/globals.css"
import { publicProvider } from "wagmi/providers/public"
import { lightTheme } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { chain, configureChains, createClient, useSigner, WagmiConfig } from "wagmi"
import { wallabyChain } from "../constants/WallabyChain"
import { Layout } from "../components/Layout"
import Link from "next/link"

const { chains, provider } = configureChains([wallabyChain], [publicProvider()])

const { connectors } = getDefaultWallets({
    appName: "Project",
    chains,
})

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
})

function MyApp({ Component, pageProps }) {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains} theme={lightTheme()}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </RainbowKitProvider>
        </WagmiConfig>
    )
}

export default MyApp
