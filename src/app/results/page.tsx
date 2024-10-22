'use client'

import { useSearchParams } from "next/navigation"

export default function Results() {
  const searchParams = useSearchParams()
  const totalReactionTime = Number(searchParams.get('total'))?? 0
  const accuracy = Number(searchParams.get('accuracy'))?? 0
  return <div className="flex flex-col items-center justify-center h-screen gap-2">
    <h1 className="text-4xl font-bold">Too slow 🐢</h1>
    <h1 className="text-4xl font-bold">{totalReactionTime.toFixed(3)}ms</h1>
    <h1 className="text-4xl font-bold">{accuracy.toFixed(0)}%</h1>
  </div>
}
