import * as React from 'react'
import { Layout } from 'src/Layout'
import { useSketch } from 'src/useSketch'

export default function Sketch() {
  const sketchElement = useSketch(import('src/sketches/fractal-tree'))

  return <Layout withFrame>{sketchElement}</Layout>
}
