import * as React from 'react'
import { Layout } from 'src/Layout'
import { useSketch } from 'src/useSketch'

export default function Sketch() {
  const sketchElement = useSketch(import('src/lines001'))

  return <Layout withFrame>{sketchElement}</Layout>
}