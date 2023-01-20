import "@rainbow-me/rainbowkit/styles.css"
import { useRouter } from "next/router"
import Head from "next/head"
import styles from "../styles/Home.module.css"

export default function Home() {
    const router = useRouter()

    const handleClick = (e) => {
        e.preventDefault()
        router.push("/contributor")
    }

    return (
        <div>
            <Head>
                <title>FCloud</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href="https://nextjs.org">Next.js!</a> integrated with{" "}
                    <a href="https://mui.com/">Material-UI!</a>
                </h1>
                <p className={styles.description}>
                    Get started by editing <code className={styles.code}>pages/index.js</code>
                </p>
                <button type="button" onClick={handleClick}>
                    This is contributor link
                </button>
                <button type="button" onClick={handleClick}>
                    This is reporter link
                </button>
            </main>
        </div>
    )
}
