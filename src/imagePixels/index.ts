import p5 from 'p5'
import { useSeed } from '../useSeed'

export default function sketch(p: p5) {
  let img: p5.Image

  let size: number
  let seed: number

  const wobble = 5

  p.preload = () => {
    img = p.loadImage('/src/imagePixels/mackie-car.jpg')
  }

  p.setup = () => {
    p.createCanvas(img.width, img.height)
    p.noLoop()

    img.loadPixels()
    size = img.height / 256
  }

  p.draw = () => {
    seed = useSeed(p)

    p.background(40)

    for (let y = 0; y < img.height; y += size) {
      for (let x = 0; x < img.width; x += size) {
        const pixelsAtPosition = img.get(
          p.random(x - wobble, x + wobble),
          p.random(y - wobble, y + wobble)
        )

        const r = p.red(pixelsAtPosition)
        const g = p.green(pixelsAtPosition)
        const b = p.blue(pixelsAtPosition)

        const outputColor = p.color(r, g, b, 255)

        p.stroke(outputColor)

        p.rect(x, y + size / 2, size / 4, size)
        p.stroke(outputColor)
        p.fill(outputColor)

        new Triangle(x, y, size / 4).draw(p.random(triangleQuadrants))
        new Triangle(x + p.noise(x), y - p.noise(y), size / 4).draw(
          p.random(triangleQuadrants)
        )
      }
    }
  }

  p.keyPressed = () => {
    if (p.key === 's') {
      p.saveCanvas(`imagePixels-${seed}`, 'png')
    }

    if (p.key === 'r') {
      p.redraw()
    }
  }

  type TriangleQuadrant =
    | 'bottom-right'
    | 'bottom-left'
    | 'top-right'
    | 'top-left'

  const triangleQuadrants: TriangleQuadrant[] = [
    'bottom-right',
    'bottom-left',
    'top-right',
    'top-left',
  ]

  class Triangle {
    constructor(
      private readonly x: number,
      private readonly y: number,
      private readonly size: number
    ) {}

    draw(quadrant: TriangleQuadrant) {
      switch (quadrant) {
        case 'top-left':
          p.triangle(
            this.x,
            this.y,
            this.x + this.size,
            this.y,
            this.x,
            this.y + this.size
          )
          break
        case 'top-right':
          p.triangle(
            this.x,
            this.y,
            this.x + this.size,
            this.y + this.size,
            this.x + this.size,
            this.y
          )
          break
        case 'bottom-left':
          p.triangle(
            this.x,
            this.y,
            this.x + this.size,
            this.y,
            this.x,
            this.y - this.size
          )
          break
        case 'bottom-right':
          p.triangle(
            this.x,
            this.y,
            this.x - this.size,
            this.y,
            this.x,
            this.y - this.size
          )
          break
      }
    }
  }
}
