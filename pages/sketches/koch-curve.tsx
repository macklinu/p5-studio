import * as React from 'react'
import { Layout } from 'src/Layout'
import { useSketch } from 'src/useSketch'

export default function Sketch() {
  const sketchElement = useSketch(import('src/sketches/koch-curve'))

  return <Layout withFrame>{sketchElement}</Layout>
}
