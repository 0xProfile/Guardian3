import * as React from "react"
import dynamic from "next/dynamic"
import {reporterAddr} from '../../constants'
import reporterABI from '../../constants/abis/reporter.json'
const OptinForm = dynamic(() => import("../../components/OptinForm"), { ssr: false })
const OptinCard = dynamic(() => import("../../components/OptinCard"), { ssr: false })
const Inbox = dynamic(() => import("../../components/Inbox"), { ssr: false })
const ConnectButton = dynamic(() => import("@rainbow-me/rainbowkit"), { ssr: false })

import { useAccount, useSigner, useContractRead } from "wagmi"

export default function Reporter() {
    const { connector, isConnected, address } = useAccount()

    const { data: isOptin=false } = useContractRead({
        address: reporterAddr,
        abi: reporterABI,
        functionName: "isOptedIn",
        args: [address]
    })

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
