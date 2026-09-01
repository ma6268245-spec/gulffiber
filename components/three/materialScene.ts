/**
 * Parametric material visualisation used by the subpages.
 *
 * One scene, one draw call for the filaments, layout/motion variants:
 *   bundle    /products        - a staple-fiber bundle that opens to show cross-sections
 *   extrusion /services        - filaments drawn down from a spinneret
 *   circular  /sustainability  - flake -> chip -> aligned filament transformation
 *   cross     /quality         - a fiber cross-section under measurement
 *   loft      /products wadding     - layered high-loft sheets that loft apart on scroll
 *   felt      /products felts       - chaotic fibers compacting into a needle-punched mat
 *   weave     /products interlining - loose strands interlacing into a woven grid
 *   process   /products process     - flake -> extrusion -> crimp -> bale, swept by scroll
 *
 * `three` is already a project dependency; nothing new is installed. The module
 * is imported dynamically by MaterialCanvas so it never enters the initial
 * bundle, and it draws nothing until the canvas is actually on screen.
 *
 * It is a visualisation of material behaviour, not a measured rendering of a
 * specific Gulf Fiber grade, and the pages label it as such.
 */
import type * as THREE_NS from 'three'

export type SceneVariant =
  | 'bundle'
  | 'extrusion'
  | 'circular'
  | 'cross'
  | 'loft'
  | 'felt'
  | 'weave'
  | 'process'

export interface MaterialSceneHandle {
  setProgress(p: number): void
  resize(): void
  dispose(): void
  render(): void
}

const COUNT: Record<SceneVariant, number> = {
  bundle: 150,
  extrusion: 132,
  circular: 190,
  cross: 168,
  loft: 180,
  felt: 200,
  weave: 196,
  process: 200,
}

function hash(i: number, seed = 1) {
  const x = Math.sin(i * 127.1 + seed * 311.7) * 43758.5453
  return x - Math.floor(x)
}

export async function createMaterialScene(
  canvas: HTMLCanvasElement,
  variant: SceneVariant,
  opts: { accent?: string; base?: string; lowPower?: boolean } = {}
): Promise<MaterialSceneHandle> {
  const THREE = (await import('three')) as typeof THREE_NS

  const count = opts.lowPower ? Math.round(COUNT[variant] * 0.55) : COUNT[variant]
  const accent = new THREE.Color(opts.accent ?? '#0A4BB8')
  const base = new THREE.Color(opts.base ?? '#7FA6DE')

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !opts.lowPower,
    powerPreference: 'low-power',
  })
  renderer.setClearAlpha(0)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
  camera.position.set(0, 0, 13)

  scene.add(new THREE.HemisphereLight(0xffffff, 0x2a3a5c, 1.15))
  const key = new THREE.DirectionalLight(0xffffff, 1.4)
  key.position.set(4, 6, 8)
  scene.add(key)
  const rim = new THREE.DirectionalLight(0x8fb8ff, 0.8)
  rim.position.set(-6, -3, 4)
  scene.add(rim)

  const geometry = new THREE.CapsuleGeometry(0.055, 1, 2, 8)
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.42,
    metalness: 0.12,
  })
  const mesh = new THREE.InstancedMesh(geometry, material, count)
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  const colors = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const c = base.clone().lerp(accent, hash(i, 7))
    colors[i * 3] = c.r
    colors[i * 3 + 1] = c.g
    colors[i * 3 + 2] = c.b
  }
  mesh.instanceColor = new THREE.InstancedBufferAttribute(colors, 3)

  const group = new THREE.Group()
  group.add(mesh)
  scene.add(group)

  const dummy = new THREE.Object3D()
  let progress = 0
  let t = 0

  /** Per-variant instance layout. Called every frame; keeps allocation at zero. */
  const layout = (i: number) => {
    const r1 = hash(i, 1)
    const r2 = hash(i, 2)
    const r3 = hash(i, 3)
    const p = progress

    if (variant === 'bundle') {
      // Filaments packed on a disc, opening outward as progress rises.
      const a = r1 * Math.PI * 2
      const rad = Math.sqrt(r2) * (1.5 + p * 2.6)
      dummy.position.set(Math.cos(a) * rad, Math.sin(a) * rad, (r3 - 0.5) * 1.2)
      dummy.rotation.set(
        Math.PI / 2 + (r3 - 0.5) * 0.5 * (1 - p) + p * (r1 - 0.5) * 1.6,
        Math.sin(t * 0.35 + i) * 0.09,
        (r2 - 0.5) * 0.28
      )
      dummy.scale.set(1, 5.4 - p * 3.2, 1)
      return
    }

    if (variant === 'extrusion') {
      // Spinneret ring at the top; filaments extend and thin as they draw down.
      const ring = Math.floor(r1 * 4)
      const a = r2 * Math.PI * 2 + ring * 0.4
      const rad = 0.7 + ring * 0.52
      const draw = 0.35 + p * 0.65
      dummy.position.set(Math.cos(a) * rad * (1 - p * 0.42), -1.6 - draw * 2.4, Math.sin(a) * rad * (1 - p * 0.42))
      dummy.rotation.set(Math.sin(t * 0.6 + i * 0.4) * 0.03, 0, Math.cos(t * 0.5 + i * 0.3) * 0.03)
      dummy.scale.set(1 - p * 0.4, 4.2 + draw * 4.6, 1 - p * 0.4)
      return
    }

    if (variant === 'circular') {
      // Three states: chaotic flake -> compacted chip -> aligned filament.
      const s1 = Math.min(1, p / 0.45)
      const s2 = Math.max(0, Math.min(1, (p - 0.45) / 0.3))
      const s3 = Math.max(0, (p - 0.75) / 0.25)
      const a = r1 * Math.PI * 2
      const chaosR = 2.4 + r2 * 1.6
      const cx = Math.cos(a) * chaosR
      const cy = Math.sin(a) * chaosR * 0.72
      const cz = (r3 - 0.5) * 3
      const bx = ((i % 12) - 5.5) * 0.34
      const by = (Math.floor(i / 12) % 12 - 5.5) * 0.3
      const lx = ((i % 22) - 10.5) * 0.28
      const ly = (r2 - 0.5) * 4.6
      dummy.position.set(
        cx * (1 - s1) + bx * s1 * (1 - s3) + lx * s3,
        cy * (1 - s1) + by * s1 * (1 - s3) + ly * s3,
        cz * (1 - s1) * (1 - s2)
      )
      dummy.rotation.set(
        (r1 - 0.5) * 6 * (1 - s2) + s3 * Math.PI * 0.5,
        (r2 - 0.5) * 6 * (1 - s2),
        (r3 - 0.5) * 6 * (1 - s2)
      )
      const len = 0.9 + s1 * 0.5 + s3 * 5.2
      dummy.scale.set(1 - s3 * 0.35, len, 1 - s3 * 0.35)
      return
    }

    if (variant === 'loft') {
      // Thermal wadding: horizontal fiber layers that separate and gain volume
      // as progress rises - the sheet lofts under scroll.
      const LAYERS = 9
      const layer = i % LAYERS
      const sep = 0.22 + p * 0.72
      const spread = 1 + p * 0.18
      dummy.position.set(
        (r1 - 0.5) * 6.6 * spread,
        (layer - (LAYERS - 1) / 2) * sep,
        (r2 - 0.5) * 3.2
      )
      // Lie flat in-plane, each filament at its own in-plane angle.
      dummy.rotation.set(
        Math.PI / 2,
        r3 * Math.PI,
        (r2 - 0.5) * 0.35 + Math.sin(t * 0.3 + i) * 0.04
      )
      dummy.scale.set(1, 1.4 + p * 1.1, 1)
      return
    }

    if (variant === 'felt') {
      // Needle-punched felt: chaotic fiber cloud that compacts into a dense,
      // interlocked plane as progress rises.
      const order = p * p * (3 - 2 * p) // smoothstep compaction
      const cx2 = (r1 - 0.5) * 5.6
      const cy2 = (r2 - 0.5) * 5.2
      const cz2 = (r3 - 0.5) * 4.6
      const fx = (r1 - 0.5) * 7.4
      const fz = (r2 - 0.5) * 4.2
      const fy = (r3 - 0.5) * (1.15 - p * 0.8)
      dummy.position.set(
        cx2 * (1 - order) + fx * order,
        cy2 * (1 - order) + fy * order,
        cz2 * (1 - order) + fz * order
      )
      // From fully random orientation to flat in-plane interlock.
      dummy.rotation.set(
        r1 * Math.PI * (1 - order) + Math.PI / 2 * order,
        r2 * Math.PI * (1 - order) + r3 * Math.PI * order,
        (r3 - 0.5) * Math.PI * (1 - order)
      )
      dummy.scale.set(1, 0.9 + order * 0.8, 1)
      return
    }

    if (variant === 'weave') {
      // Interlining: half the filaments are warp columns, half are weft rows.
      // Progress pulls them from loose scattered strands into an interlaced
      // lattice with alternating over-under depth.
      const order = p * p * (3 - 2 * p)
      const COLS = 14
      const ROWS = 14
      const warp = i % 2 === 0
      const k = Math.floor(i / 2) % (warp ? COLS : ROWS)
      const lattice = warp
        ? { x: (k - (COLS - 1) / 2) * 0.46, y: (r2 - 0.5) * 5.4, z: 0.07 }
        : { x: (r1 - 0.5) * 6.2, y: (k - (ROWS - 1) / 2) * 0.38, z: -0.07 }
      const loose = { x: (r1 - 0.5) * 5.8, y: (r2 - 0.5) * 5.4, z: (r3 - 0.5) * 2.6 }
      dummy.position.set(
        loose.x * (1 - order) + lattice.x * order,
        loose.y * (1 - order) + lattice.y * order,
        loose.z * (1 - order) + lattice.z * order
      )
      dummy.rotation.set(
        Math.PI / 2,
        warp ? 0 : Math.PI / 2,
        (r3 - 0.5) * 0.9 * (1 - order) + Math.sin(t * 0.25 + i) * 0.03
      )
      dummy.scale.set(1, 0.55 + order * 0.5, 1)
      return
    }

    if (variant === 'process') {
      // How it is made: each filament sweeps through four anchor states -
      // flake cloud -> extruded strands -> crimped zigzag -> banded bale -
      // as scroll progress advances. Sequential interpolation, eased per leg.
      const seg = Math.min(0.9999, p) * 3
      const leg = Math.floor(seg)
      const f = seg - leg
      const e = f * f * (3 - 2 * f)

      // Anchor transforms per instance.
      const lane = i % 14
      const row = Math.floor(i / 14) % 14
      // A: flake - chaotic cloud, left.
      const ax = (r1 - 0.5) * 3.4 - 4.4
      const ay = (r2 - 0.5) * 3.4
      const az = (r3 - 0.5) * 3.2
      const aRot: [number, number, number] = [r1 * Math.PI, r2 * Math.PI, r3 * Math.PI]
      // B: extruded strands - vertical columns, centre-left.
      const bx = (lane - 6.5) * 0.4
      const by = (r2 - 0.5) * 6.4
      const bz = 0
      const bRot: [number, number, number] = [0, 0, 0]
      // C: crimped - alternating short diagonal segments, centre-right.
      const cx3 = 1.4 + (lane - 6.5) * 0.34
      const cy3 = (r2 - 0.5) * 5.2
      const cz3 = (row - 6.5) * 0.22
      const cRot: [number, number, number] = [0, 0, (i % 2 === 0 ? 0.7 : -0.7)]
      // D: bale - compact banded block, right.
      const dx = 4.6 + (r1 - 0.5) * 1.9
      const dy = (r2 - 0.5) * 2.4
      const dz = (r3 - 0.5) * 1.7
      const dRot: [number, number, number] = [0, 0, (r1 - 0.5) * 0.3]

      const anchors: [number, number, number][] = [
        [ax, ay, az],
        [bx, by, bz],
        [cx3, cy3, cz3],
        [dx, dy, dz],
      ]
      const rots: [number, number, number][] = [aRot, bRot, cRot, dRot]
      const lens = [0.7, 2.6, 0.85, 1.5]

      const from = anchors[leg]
      const to = anchors[leg + 1]
      const rFrom = rots[leg]
      const rTo = rots[leg + 1]
      const lerp = (a: number, b: number) => a + (b - a) * e

      dummy.position.set(lerp(from[0], to[0]), lerp(from[1], to[1]), lerp(from[2], to[2]))
      dummy.rotation.set(
        lerp(rFrom[0], rTo[0]),
        lerp(rFrom[1], rTo[1]),
        lerp(rFrom[2], rTo[2]) + Math.sin(t * 0.4 + i) * 0.05
      )
      const len = lerp(lens[leg], lens[leg + 1])
      dummy.scale.set(1, len, 1)
      return
    }

    // cross: concentric rings viewed head-on; one wedge lifts for measurement.
    const rings = 6
    const ring = i % rings
    const perRing = Math.ceil(count / rings)
    const idx = Math.floor(i / rings)
    const a = (idx / perRing) * Math.PI * 2
    const rad = 0.55 + ring * 0.42
    const wedge = a > Math.PI * 0.15 && a < Math.PI * 0.55 ? 1 : 0
    const lift = wedge * p * 2.2
    dummy.position.set(Math.cos(a) * (rad + lift * 0.45), Math.sin(a) * (rad + lift * 0.45), lift)
    dummy.rotation.set(Math.PI / 2, 0, Math.sin(t * 0.3 + i) * 0.05)
    dummy.scale.set(0.85, 0.5 + ring * 0.05, 0.85)
  }

  const update = () => {
    for (let i = 0; i < count; i++) {
      layout(i)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true

    if (variant === 'bundle') {
      group.rotation.y = t * 0.16 + progress * 0.7
      group.rotation.x = -0.18 + progress * 0.28
    } else if (variant === 'extrusion') {
      group.rotation.y = t * 0.22
      group.position.y = 1.4
    } else if (variant === 'circular') {
      group.rotation.y = Math.sin(t * 0.18) * 0.35 + progress * 0.5
    } else if (variant === 'loft') {
      group.rotation.x = -0.62 + progress * 0.2
      group.rotation.y = Math.sin(t * 0.1) * 0.16
    } else if (variant === 'felt') {
      group.rotation.x = -0.5 + progress * 0.18
      group.rotation.y = Math.sin(t * 0.12) * 0.2
    } else if (variant === 'weave') {
      group.rotation.x = -0.22 - progress * 0.14
      group.rotation.y = progress * 0.3 + Math.sin(t * 0.1) * 0.1
    } else if (variant === 'process') {
      group.rotation.x = -0.32
      group.rotation.y = 0.18 + progress * 0.35
      camera.position.set(0, 0, 14.5)
    } else {
      group.rotation.z = t * 0.08
      group.rotation.x = -0.5 + progress * 0.45
      group.rotation.y = progress * 0.5
    }
  }

  const resize = () => {
    const parent = canvas.parentElement
    if (!parent) return
    const w = Math.max(1, parent.clientWidth)
    const h = Math.max(1, parent.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, opts.lowPower ? 1.25 : 1.75))
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.fov = w < 640 ? 48 : 38
    camera.updateProjectionMatrix()
  }

  resize()
  update()
  renderer.render(scene, camera)

  return {
    setProgress(p: number) {
      progress = Math.max(0, Math.min(1, p))
    },
    resize,
    render() {
      t += 0.016
      update()
      renderer.render(scene, camera)
    },
    dispose() {
      geometry.dispose()
      material.dispose()
      mesh.dispose()
      renderer.dispose()
      scene.clear()
    },
  }
}
