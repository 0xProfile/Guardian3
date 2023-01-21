import * as React from "react"
import OptinForm from "../../components/OptinForm"
import { useAccount, useConnect } from "wagmi"

export default function Reporter() {
    const { connector: activeConnector, isConnected } = useAccount()
    return isConnected ? <h1>{activeConnector.name}</h1> : <OptinForm></OptinForm>
}
