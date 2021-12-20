import type { default as p5 } from 'p5'

export function sketch(p: p5) {
  const widthIncrement = 10
  const heightIncrement = 20
  const probability = 0.66

  const randomRgbValue = (): number => p.random(0, 255)

  class Triangle {
    private readonly randomOffsets: [number, number, number]

    constructor(
      private readonly x: number,
      private readonly y: number,
      private readonly color: [number, number, number, number]
    ) {
      this.randomOffsets = [
        p.randomGaussian(0, 1),
        p.randomGaussian(0, 1),
        p.randomGaussian(0, 1),
      ]
    }

    draw() {
      p.fill(...this.color)
      p.stroke(255, 50)
      p.triangle(
        this.x,
        this.y,
        this.x + this.randomOffsets[0] * p.random(6, 13),
        this.y + 20,
        this.x + 40 + this.randomOffsets[1] * p.random(-7, 4),
        this.y + 20 + this.randomOffsets[2] * p.random(14, 22)
      )
    }
  }

  p.setup = setup
  p.draw = draw
  p.keyTyped = keyTyped

  function setup() {
    p.createCanvas(600, 600)

    p.textFont('Helvetica')
    p.noLoop()
  }

  function draw() {
    p.background(255)

    for (let i = 0; i < p.width; i += widthIncrement) {
      for (let j = 0; j < p.height; j += heightIncrement) {
        if (p.random() > probability) {
          continue
        }
        const triangle = new Triangle(i, j, [
          randomRgbValue(),
          randomRgbValue(),
          randomRgbValue(),
          p.random(40, 255),
        ])
        triangle.draw()
      }
    }
  }

  function keyTyped() {
    if (p.key === 's') {
      p.saveCanvas(`triangles-${new Date().toISOString()}`, 'png')
    }
    if (p.key === ' ') {
      p.redraw()
    }
  }
}
