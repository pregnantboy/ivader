'use client'

import { useCallback, useEffect, useRef, useState } from "react"
import dynamic from 'next/dynamic';
const Crosshair = dynamic(() => import('./Crosshair'), { ssr: false });

import { Direction, DIRECTIONS } from "../constants"
import { useRouter, useSearchParams } from "next/navigation";

const loops = 4
const intervals = [2000, 4000, 6000, 8000, 10000]

function getRandomDirection(directions?: Direction[]): Direction {
  const directionsToChooseFrom = directions ?? DIRECTIONS
  return directionsToChooseFrom[Math.floor(Math.random() * directionsToChooseFrom.length)]
}

function logMean(numbers: number[]) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
      throw new Error('Input must be a non-empty array of numbers');
  }

  // Check if all numbers are positive
  if (numbers.some(num => typeof num !== 'number' || num <= 0)) {
      throw new Error('All numbers must be positive');
  }

  // Calculate sum of natural logarithms
  const sumOfLogs = numbers.reduce((sum, num) => sum + Math.log(num), 0);
  
  // Calculate geometric mean
  return Math.exp(sumOfLogs / numbers.length);
}

export default function Start() {
  const loops = Number(useSearchParams().get('loops') ?? 4)
  const allIntervals = Array(loops).fill(intervals).flat()
  const randomIntervalsRef = useRef(allIntervals.sort(() => Math.random() - 0.5))
  const router = useRouter()
  const totalReactionTimeRef = useRef<number[]>([])
  const lastShownTimestampRef = useRef(0)
  // randomize the intervals
  const [correctDirection, setCorrectDirection] = useState<Direction| null>(null)
  const correctDirectionRef = useRef<Direction | null>(correctDirection)
  const [redDirection, setRedDirection] = useState<Direction| null>(null)
  const [shouldShowCrosshair, setShouldShowCrosshair] = useState(false)
  const currentIndexRef = useRef(-1)
  const shouldShowCrosshairRef = useRef(shouldShowCrosshair)
  const numberOfCorrectResponsesRef = useRef(0)

  useEffect(() => {
      nextRound()
  }, [])

  const nextRound = useCallback(() => {
    if (currentIndexRef.current === randomIntervalsRef.current.length - 1 ) {
      // go somewhere else
      console.log(totalReactionTimeRef.current)
      const mean = logMean(totalReactionTimeRef.current)
      const accuracy = numberOfCorrectResponsesRef.current / totalReactionTimeRef.current.length * 100
      router.push(`/results?total=${mean}&accuracy=${accuracy}`)
      return
    }
    currentIndexRef.current += 1
    const correctDirection = getRandomDirection()
    const remainingDirections = DIRECTIONS.filter(direction => direction !== correctDirection)
    const redDirection = getRandomDirection(remainingDirections)
    setCorrectDirection(correctDirection)
    correctDirectionRef.current = correctDirection
    setRedDirection(redDirection)
    setShouldShowCrosshair(false)
    shouldShowCrosshairRef.current = false
    const currentInterval = randomIntervalsRef.current[currentIndexRef.current]
    setTimeout(() => {
      setShouldShowCrosshair(true)
      shouldShowCrosshairRef.current = true
      lastShownTimestampRef.current = Date.now()
    }, currentInterval)
  }, [])

  const handleDirection = useCallback((direction: Direction) => {
    if (!shouldShowCrosshairRef.current) {
      return
    }
    if (direction === correctDirectionRef.current) {
      numberOfCorrectResponsesRef.current += 1
    }
    const responseTime = Date.now() - lastShownTimestampRef.current
    console.log(`Round ${currentIndexRef.current + 1} took ${responseTime}ms`)
    totalReactionTimeRef.current.push(responseTime)
    nextRound()
  }, [])

  // handle keydown events
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key.toLowerCase().startsWith('arrow')) {
      handleDirection(event.key.toLowerCase().slice(5) as Direction)
    }
  }, [handleDirection])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  if (!correctDirection || !redDirection) {
    return null
  }


  return (
    <div className="flex flex-col items-center justify-center h-screen transition-none gap-2">
      <div className={`max-h-[90vw] h-[800px] ${shouldShowCrosshair ? 'opacity-1' : 'opacity-0'}`}>
        <Crosshair correctDirection={correctDirection} redDirection={redDirection} />
      </div>
      {/* Create up down left right buttons , following keyboard arrow positioning*/}
      <div className="flex flex-col justify-center items-center gap-2">
        {/* up icon */}
        <button className="bg-black text-3xl text-white flex justify-center items-center w-20 h-20 rounded-md" onClick={() => handleDirection('up')}>↑</button>
        <div className="flex gap-20 justify-center items-center">
          <button className="bg-black text-3xl text-white flex justify-center items-center w-20 h-20 rounded-md" onClick={() => handleDirection('left')}>←</button>
          <button className="bg-black text-3xl text-white flex justify-center items-center w-20 h-20 rounded-md" onClick={() => handleDirection('right')}>→</button>
        </div>
        <button className="bg-black text-3xl text-white flex justify-center items-center w-20 h-20 rounded-md" onClick={() => handleDirection('down')}>↓</button>
      </div>
    </div>
  )
}
