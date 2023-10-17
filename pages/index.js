import Link from "next/link";

export default function Home() {
  return (
    <main className="main">
      <Link href="/lend"><button className="button">Împrumută</button></Link>
      <Link href="/bringBack"><button className="button">Returnează</button></Link>
      <Link href="/search"><button className="button">Caută</button></Link>
    </main>
  )
}