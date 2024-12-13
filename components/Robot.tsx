import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export function Robot(props) {
  const { nodes, materials } = useGLTF('/utility_robot.glb')
  const robotRef = useRef()

  // Use the useFrame hook to update rotation every frame
  useFrame(() => {
    if (robotRef.current) {
      robotRef.current.rotation.y += 0.01 // Rotate around the Y-axis
    }
  })

  return (
    <group {...props} dispose={null} ref={robotRef}>
      <group scale={0.08}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_2.geometry}
            material={materials.Box001_mtl}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_3.geometry}
            material={materials.Box001_mtl}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/utility_robot.glb')

// import React, { useState, useEffect, useRef } from 'react'
// import { useFrame } from '@react-three/fiber'
// import { useGLTF } from '@react-three/drei'

// export function Robot(props) {
//   const { nodes, materials } = useGLTF('/utility_robot.glb')
//   const robotRef = useRef()
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

//   // Event listener to track mouse position
//   useEffect(() => {
//     const onMouseMove = (event) => {
//       // Normalize mouse position to [-1, 1] for Three.js
//       setMousePosition({
//         x: (event.clientX / window.innerWidth) * 2 - 1,
//         y: -(event.clientY / window.innerHeight) * 2 + 1,
//       })
//     }

//     window.addEventListener('mousemove', onMouseMove)

//     // Cleanup the event listener on unmount
//     return () => {
//       window.removeEventListener('mousemove', onMouseMove)
//     }
//   }, [])

//   // Update the robot's position based on the mouse position
//   useFrame(() => {
//     if (robotRef.current) {
//       robotRef.current.position.x = mousePosition.x * 5 // Scale for more noticeable movement
//       robotRef.current.position.y = mousePosition.y * 5 // Scale for more noticeable movement
//     }
//   })

//   return (
//     <group {...props} dispose={null} ref={robotRef}>
//       <group scale={0.08}>
//         <group rotation={[-Math.PI / 2, 0, 0]}>
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_2.geometry}
//             material={materials.Box001_mtl}
//           />
//           <mesh
//             castShadow
//             receiveShadow
//             geometry={nodes.Object_3.geometry}
//             material={materials.Box001_mtl}
//           />
//         </group>
//       </group>
//     </group>
//   )
// }

// useGLTF.preload('/utility_robot.glb')

