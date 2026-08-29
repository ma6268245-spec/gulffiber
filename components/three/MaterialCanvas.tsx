'use client'

import { useEffect, useRef, useState } from 'react'
import type { MaterialSceneHandle, SceneVariant } from './materialScene'

/**
 * Lazy host for the three.js material visualisation.
 *
 * Deliberate constraints:
 * - Nothing is imported until the canvas scrolls into view (IntersectionObserver).
 * - The RAF loop stops when the canvas leaves the viewport or the tab is hidden.
 * - Skipped entirely on `prefers-reduced-motion` and on narrow viewports, where
 *   the `fallback` node renders instead. The fallback is always real content,
 *   never a blank box.
 * - Scroll progress is optional: pass `progress` to drive the sequence from a
 *   ScrollTrigger, or leave it out for an ambient loop.
 */
export function MaterialCanvas({
  variant,
  progress,
  label,
  fallback,
  height = '100%',
  mobileEnabled = false,
}: {
  variant: SceneVariant
  progress?: number
  label: string
  fallback?: React.ReactNode
  height?: string
  mobileEnabled?: boolean
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<MaterialSceneHandle | null>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const narrow = window.matchMedia('(max-width: 767px)').matches
    const lowPower = window.matchMedia('(max-width: 1023px)').matches
    if (reduce || (narrow && !mobileEnabled)) return

    let disposed = false
    let raf = 0
    let visible = false
    let scene: MaterialSceneHandle | null = null

    const tick = () => {
      if (disposed || !scene) return
      if (visible && !document.hidden) scene.render()
      raf = requestAnimationFrame(tick)
    }

    const boot = async () => {
      try {
        const { createMaterialScene } = await import('./materialScene')
        if (disposed) return
        scene = await createMaterialScene(canvas, variant, { lowPower })
        if (disposed) {
          scene.dispose()
          return
        }
        sceneRef.current = scene
        setActive(true)
        raf = requestAnimationFrame(tick)
      } catch {
        // WebGL unavailable or blocked: the fallback stays visible.
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        const isIn = entries.some((e) => e.isIntersecting)
        visible = isIn
        if (isIn && !scene && !disposed) boot()
      },
      { rootMargin: '200px 0px' }
    )
    io.observe(wrap)

    const onResize = () => scene?.resize()
    window.addEventListener('resize', onResize)

    return () => {
      disposed = true
      io.disconnect()
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
      scene?.dispose()
      sceneRef.current = null
    }
  }, [variant, mobileEnabled])

  useEffect(() => {
    if (typeof progress === 'number') sceneRef.current?.setProgress(progress)
  }, [progress])

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: '100%', height }} role="img" aria-label={label}>
      {!active && fallback}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          opacity: active ? 1 : 0,
          transition: 'opacity 0.9s var(--ease-out)',
        }}
      />
    </div>
  )
}
