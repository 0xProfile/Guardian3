import "@rainbow-me/rainbowkit/styles.css"
import { useRouter } from "next/router"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import { Button } from "@mui/material"

export default function Home() {
    const router = useRouter()

    const handleClick = (e) => {
        e.preventDefault()
        router.push("/contributor")
    }

    return (
        <div className={styles.main}>
            <Head>
                <title>FCloud</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.circle}>
                <div className={styles.circletitle}>title</div>
                <div className={styles.circlesubtitle}>Description</div>
                <Button variant="contained" href="#contained-buttons" onClick={handleClick}>
                    This is contributor link
                </Button>
                <Button variant="contained" href="#contained-buttons" onClick={handleClick}>
                    This is reporter link
                </Button>
            </div>
        </div>
    )
}
