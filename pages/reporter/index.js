import * as React from "react"
import dynamic from "next/dynamic"
const OptinForm = dynamic(() => import("../../components/OptinForm"), { ssr: false })
const OptinCard = dynamic(() => import("../../components/OptinCard"), { ssr: false })
const Inbox = dynamic(() => import("../../components/Inbox"), { ssr: false })
const ConnectButton = dynamic(() => import("@rainbow-me/rainbowkit"), { ssr: false })

import { useAccount, useConnect } from "wagmi"

export default function Reporter() {
    const { connector: activeConnector, isConnected } = useAccount()

    const isOptin = false // need to write a function determine whether user optin yet.

    return isConnected ? (
        isOptin ? (
            <div>
                <OptinCard></OptinCard>
                <Inbox></Inbox>
            </div>
        ) : (
            <OptinForm></OptinForm>
        )
    ) : (
        <ConnectButton label="Please Connect Wallet to start!"></ConnectButton>
    )
}
