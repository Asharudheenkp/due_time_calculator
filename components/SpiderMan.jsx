
"use client"
import React, { useEffect } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export  function SpiderMan(props) {
  const group = React.useRef()
  const { scene, animations } = useGLTF('/spiderman.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions, names } = useAnimations(animations, group)

  useEffect(() => {
    actions[names[0]].reset().play();
  }, [])
  
  return (
    <group ref={group} {...props} dispose={null} scale={0.9}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={173.78}>
          <group name="8f5c8f610f17473b93ee6a4b4a5cd1c3fbx" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <group name="unamed" />
                  <skinnedMesh name="Object_6" geometry={nodes.Object_6.geometry} material={materials['Scene_-_Root']} skeleton={nodes.Object_6.skeleton} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/spiderman.glb')
