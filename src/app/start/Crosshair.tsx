'use client'
import { Direction } from "../constants"

const getRandomWidth = () => {
  const values = ['w-[5%]', 'w-[10%]', 'w-[15%]', 'w-[20%]', 'w-[25%]']
  return values[Math.floor(Math.random() * values.length)]
}

const getRandomHeight = () => {
  const values = ['h-[5%]', 'h-[10%]', 'h-[15%]', 'h-[20%]', 'h-[25%]']
  return values[Math.floor(Math.random() * values.length)]
}

export default function Crosshair({ redDirection = 'down', correctDirection = 'up' }: { redDirection: Direction, correctDirection: Direction }) {

  const getClassNames = (direction: Direction) => {
    let classNames = ''
    if (direction === redDirection) {
      classNames += 'bg-red-600'
    } else {
      classNames +=  "bg-black"
    }
    return classNames
  }


  const getPadding = (direction: Direction) => {
    if (direction === correctDirection) {
      if (direction === 'left' || direction === 'right') {
        return 'w-[35%]'
      } else {
        return 'h-[35%]'
      }
    } else {
      if (direction === 'left' || direction === 'right') {
        return getRandomWidth()
      } else {
        return getRandomHeight()
      }
    }
  }

  return (
    <div className="flex justify-center items-center w-[90vw] h-[90vw] max-w-[800px] max-h-[800px] bg-white relative">
      {/* generate a cross with varying length per side using css */}
      <div className={`w-2 h-[50%] top-0 absolute ${getClassNames('up')}`}></div>
      <div className={`w-2 h-[50%] bottom-0 absolute ${getClassNames('down')}`}></div>
      <div className={`h-2 w-[50%] left-0 absolute ${getClassNames('left')}`}></div>
      <div className={`h-2 w-[50%] right-0 absolute ${getClassNames('right')}`}></div>
      <div className={`w-full bg-white top-0 absolute ${getPadding('up')}`}></div>
      <div className={`w-full bg-white bottom-0 absolute ${getPadding('down')}`}></div>
      <div className={`h-full bg-white left-0 absolute ${getPadding('left')}`}></div>
      <div className={`h-full bg-white right-0 absolute ${getPadding('right')}`}></div>
      <div className="absolute w-2 h-2 bg-black z-2"></div>
    </div>
  )
}
