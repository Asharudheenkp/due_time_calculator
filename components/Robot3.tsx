import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Robot3(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/gunner_robot.glb')
  const { actions, names } = useAnimations(animations, group)
  useEffect(() => {
    actions[names[0]]?.fadeIn(0.5).play()
  
  }, [])
  
  return (
    <group ref={group} {...props} dispose={null} scale={0.08}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="5f759a720ab64bb09c5aa91ff90f3f0afbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Robot">
                  <group name="Object_5">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_8"
                      geometry={nodes.Object_8.geometry}
                      material={materials.metal_mat01}
                      skeleton={nodes.Object_8.skeleton}
                    />
                    <skinnedMesh
                      name="Object_10"
                      geometry={nodes.Object_10.geometry}
                      material={materials.metal_mat01}
                      skeleton={nodes.Object_10.skeleton}
                    />
                    <skinnedMesh
                      name="Object_11"
                      geometry={nodes.Object_11.geometry}
                      material={materials.cell_mat}
                      skeleton={nodes.Object_11.skeleton}
                    />
                    <skinnedMesh
                      name="Object_13"
                      geometry={nodes.Object_13.geometry}
                      material={materials.metal_mat01}
                      skeleton={nodes.Object_13.skeleton}
                    />
                    <skinnedMesh
                      name="Object_15"
                      geometry={nodes.Object_15.geometry}
                      material={materials.metal_mat01}
                      skeleton={nodes.Object_15.skeleton}
                    />
                    <skinnedMesh
                      name="Object_17"
                      geometry={nodes.Object_17.geometry}
                      material={materials.metal_mat01}
                      skeleton={nodes.Object_17.skeleton}
                    />
                    <skinnedMesh
                      name="Object_19"
                      geometry={nodes.Object_19.geometry}
                      material={materials.metal_mat01}
                      skeleton={nodes.Object_19.skeleton}
                    />
                    <skinnedMesh
                      name="Object_21"
                      geometry={nodes.Object_21.geometry}
                      material={materials.mask_mat}
                      skeleton={nodes.Object_21.skeleton}
                    />
                    <skinnedMesh
                      name="Object_23"
                      geometry={nodes.Object_23.geometry}
                      material={materials.mask_mat}
                      skeleton={nodes.Object_23.skeleton}
                    />
                    <skinnedMesh
                      name="Object_25"
                      geometry={nodes.Object_25.geometry}
                      material={materials.mask_mat}
                      skeleton={nodes.Object_25.skeleton}
                    />
                    <skinnedMesh
                      name="Object_27"
                      geometry={nodes.Object_27.geometry}
                      material={materials.mask_mat}
                      skeleton={nodes.Object_27.skeleton}
                    />
                    <skinnedMesh
                      name="Object_29"
                      geometry={nodes.Object_29.geometry}
                      material={materials.cable}
                      skeleton={nodes.Object_29.skeleton}
                    />
                    <skinnedMesh
                      name="Object_31"
                      geometry={nodes.Object_31.geometry}
                      material={materials.inside}
                      skeleton={nodes.Object_31.skeleton}
                    />
                    <skinnedMesh
                      name="Object_33"
                      geometry={nodes.Object_33.geometry}
                      material={materials.metal_mat01}
                      skeleton={nodes.Object_33.skeleton}
                    />
                    <skinnedMesh
                      name="Object_34"
                      geometry={nodes.Object_34.geometry}
                      material={materials.mask_mat}
                      skeleton={nodes.Object_34.skeleton}
                    />
                    <skinnedMesh
                      name="Object_35"
                      geometry={nodes.Object_35.geometry}
                      material={materials.cell_mat}
                      skeleton={nodes.Object_35.skeleton}
                    />
                    <skinnedMesh
                      name="Object_36"
                      geometry={nodes.Object_36.geometry}
                      material={materials.eyes_mat}
                      skeleton={nodes.Object_36.skeleton}
                    />
                    <skinnedMesh
                      name="Object_37"
                      geometry={nodes.Object_37.geometry}
                      material={materials.red_mat}
                      skeleton={nodes.Object_37.skeleton}
                    />
                    <group name="Object_7" />
                    <group name="Object_9" />
                    <group name="Object_12" />
                    <group name="Object_14" />
                    <group name="Object_16" />
                    <group name="Object_18" />
                    <group name="Object_20" />
                    <group name="Object_22" />
                    <group name="Object_24" />
                    <group name="Object_26" />
                    <group name="Object_28" />
                    <group name="Object_30" />
                    <group name="Object_32" />
                    <group name="geo_gr">
                      <group name="arm_geo" />
                      <group name="canon_geo" />
                      <group name="foot_R_back_geo" />
                      <group name="foot_L_back_geo" />
                      <group name="foot_L_front_geo" />
                      <group name="foot_R_front_geo" />
                      <group name="leg_R_front_geo" />
                      <group name="leg_L_front_geo" />
                      <group name="leg_L_back_geo" />
                      <group name="leg_R_back_geo" />
                      <group name="cable_geo" />
                      <group name="insideBlack" />
                      <group name="centre_geo" />
                    </group>
                    <group name="allmodel_ctl">
                      <group
                        name="main_ctl6"
                        position={[-1.442, 51.74, 0.106]}
                        rotation={[0.045, 0, 0.009]}
                      />
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/gunner_robot.glb')