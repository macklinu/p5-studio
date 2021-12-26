import * as React from 'react'
import type { default as p5 } from 'p5'

type SketchFunction = (p: p5) => void

export function useSketch(sketchImport: Promise<{ default: SketchFunction }>) {
  const sketchRef = React.useRef<p5 | undefined>()

  React.useEffect(() => {
    Promise.all([
      import('p5').then((mod) => mod.default),
      sketchImport.then((mod) => mod.default),
    ]).then(([p5, sketch]) => {
      const sketchEl = document.getElementById('sketch')

      if (sketchEl) {
        sketchRef.current = new p5(sketch, sketchEl)
      }
    })

    return () => {
      sketchRef.current?.remove()
    }
  }, [])

  return <div id='sketch' />
}
