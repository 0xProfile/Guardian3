import "@rainbow-me/rainbowkit/styles.css"
import { useRouter } from "next/router"

export default function Home() {
    const router = useRouter()

    const handleClick = (e) => {
        e.preventDefault()
        router.push("/contributor")
    }

    return (
        <div>
            <button type="button" onClick={handleClick}>
                This is contributor link
            </button>
            <button type="button" onClick={handleClick}>
                This is reporter link
            </button>
        </div>
    )
}
