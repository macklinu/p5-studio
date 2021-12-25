import p5 from 'p5'
import { useSeed } from '../useSeed'

export default function sketch(p: p5) {
  let times: number
  let seed: number

  function setupEnvironment() {
    seed = useSeed(p)
    times = 50
    p.background(255)
  }

  p.setup = () => {
    p.createCanvas(400, 400)
    p.noLoop()

    setupEnvironment()
  }

  p.draw = () => {
    while (times-- > 0) {
      p.beginShape()
      for (let i = p.random(-10, 10); i < p.width; i += 25) {
        p.fill(0, 0)
        p.strokeWeight(1)
        p.stroke(0, 180)

        p.vertex(i, p.noise(i) * p.height)
        p.bezierVertex(
          i,
          p.noise(i) * p.height,
          i + 10,
          p.noise(i) * p.height,
          i + 20,
          p.noise(i) * p.height
        )
      }
      p.endShape()
    }
  }

  p.keyPressed = () => {
    if (p.key === 's') {
      p.saveCanvas(`lines001-${seed}`, 'png')
    }

    if (p.key === 'r') {
      setupEnvironment()
      p.redraw()
    }
  }
}
