"use client"
import Interactive3d from '@/components/Interactive3d'
import { Robot } from '@/components/Robot'
import { Robot2 } from '@/components/Robot2'
import { Robot3 } from '@/components/Robot3'
import React from 'react'

const page = () => {
  return (
    <div className="mt-9 w-[80%] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Interactive3d model={<Robot3/>}/>
        <Interactive3d model={<Robot2/>}/>
        <Interactive3d model={<Robot/>}/>
      </div>
    </div>
  )
}

export default page