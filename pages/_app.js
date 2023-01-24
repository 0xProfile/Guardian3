import "../styles/globals.css"
import { publicProvider } from "wagmi/providers/public"
import { lightTheme } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { chain, configureChains, createClient, useSigner, WagmiConfig } from "wagmi"
import { hyperspaceChain } from "../constants/WallabyChain"
import { Layout } from "../components/Layout"
import theme from "../src/theme"
import createEmotionCache from "../src/createEmotionCache"
import PropTypes from "prop-types"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { useContext } from "react"

const clientSideEmotionCache = createEmotionCache()

const { chains, provider } = configureChains([hyperspaceChain], [publicProvider()])

const { connectors } = getDefaultWallets({
    appName: "Project",
    chains,
})

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
})

function MyApp(props) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains} theme={lightTheme()}>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, 
                  consistent, and simple baseline to
                  build upon. */}
                    <CssBaseline />
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>{" "}
                </ThemeProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    )
}
MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
}

export default MyApp
