import Link from "next/link"

export default function Home() {
  return (
   <div className="flex flex-col gap-2 justify-center items-center h-screen">
    <button className="bg-black text-white text-3xl w-[300px] h-[100px] px-4 py-2 rounded-md"><Link href="/start?loops=1">5 Rounds</Link></button>
    <button className="bg-black text-white text-3xl w-[300px] h-[100px] px-4 py-2 rounded-md"><Link href="/start?loops=2">10 Rounds</Link></button>
    <button className="bg-black text-white text-3xl w-[300px] h-[100px] px-4 py-2 rounded-md"><Link href="/start?loops=3">15 Rounds</Link></button>
    <button className="bg-black text-white text-3xl w-[300px] h-[100px] px-4 py-2 rounded-md"><Link href="/start?loops=4">20 Rounds</Link></button>
   </div>
  )
}
