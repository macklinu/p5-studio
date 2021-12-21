import type { default as p5 } from 'p5'

interface Line {
  x: number
  y: number
}

export default function sketch(p: p5) {
  const step = 10

  function createLines(): Line[][] {
    const size = p.width

    const lines: Line[][] = []

    for (let i = step; i <= size - step; i += step) {
      const line = []

      for (let j = step; j <= size - step; j += step) {
        const distanceToCenter = p.abs(j - size / 2)
        const variance = p.max(size / 2 - 200 - distanceToCenter, 0)
        const random = ((p.random() * variance) / 2) * -1

        const point = { x: j, y: i + random }

        line.push(point)
      }

      lines.push(line)
    }

    return lines
  }

  p.setup = () => {
    p.createCanvas(600, 600)
    p.noLoop()
  }

  p.draw = () => {
    p.background(255)
    p.stroke(0)
    p.strokeWeight(2)

    const lines = createLines()

    for (let i = 5; i < lines.length; i++) {
      p.beginShape()

      p.curveVertex(lines[i][0].x, lines[i][0].y)
      for (let j = 0; j < lines[i].length; j++) {
        p.curveVertex(lines[i][j].x, lines[i][j].y)
      }

      p.endShape()
    }
  }

  p.keyPressed = () => {
    if (p.key === 's') {
      p.saveCanvas(`joy-division-${new Date().toISOString()}`, 'png')
    }

    if (p.key === ' ') {
      p.redraw()
    }
  }
}
