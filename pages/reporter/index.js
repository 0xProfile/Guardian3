import * as React from "react"
import OptinForm from "../../components/OptinForm"
import OptinCard from "../../components/OptinCard"
import InboxBox from "../../components/Inbox"

import { useAccount, useConnect } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function Reporter() {
    const { connector: activeConnector, isConnected } = useAccount()

    const isOptin = false // need to write a function determine whether user optin yet.

    return isConnected ? (
        isOptin ? (
            <div>
                <OptinCard></OptinCard>
                <InboxBox></InboxBox>
            </div>
        ) : (
            <OptinForm></OptinForm>
        )
    ) : (
        <ConnectButton label="Please Connect Wallet to start!"></ConnectButton>
    )
}
