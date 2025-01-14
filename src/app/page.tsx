import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-screen">
      <Link href="/start?loops=1"><button className="bg-black text-white text-3xl w-[300px] h-[100px] px-4 py-2 rounded-md">5 Rounds</button></Link>
      <Link href="/start?loops=2"><button className="bg-black text-white text-3xl w-[300px] h-[100px] px-4 py-2 rounded-md">10 Rounds</button></Link>
      <Link href="/start?loops=3"><button className="bg-black text-white text-3xl w-[300px] h-[100px] px-4 py-2 rounded-md">15 Rounds</button></Link>
      <Link href="/start?loops=4"><button className="bg-black text-white text-3xl w-[300px] h-[100px] px-4 py-2 rounded-md">20 Rounds</button></Link>
    </div>
  )
}
