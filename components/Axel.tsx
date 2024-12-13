/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: satchii_ (https://sketchfab.com/stachiii_)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/free-axe-textured-game-ready-6b1dbd9a49cf4faea18b8c1c4e9357b4
Title: free_axe_textured_game_ready
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Axel(props) {
  const { nodes, materials } = useGLTF('/free_axe_textured_game_ready.glb')
  return (
    <group {...props} dispose={null}>
      <group scale={0.05}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.hache_low_Material_0.geometry}
          material={materials.Material}
          position={[-2.034, -0.82, 0.614]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={35.616}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/free_axe_textured_game_ready.glb')