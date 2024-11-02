import Game from '@/components/Game'
import React from 'react'

const page = () => {
  return (
    <div className="mt-9 w-[80%] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Game/>
      </div>
    </div>
  )
}

export default page