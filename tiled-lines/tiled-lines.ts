import type { default as p5 } from 'p5'
import { createCycle } from '../src/createCycle'

export function sketch(p: p5) {
  const step = 20

  let paletteIndex = 0

  const palettes = [
    ['#FFF', '#000'],
    ['#F4EAD5', '#E94E77', '#D68189', '#C6A49A', '#C6E5D9'],
    ['#FFFFFF', '#CBE86B', '#F2E9E1', '#1C140D'],
  ]

  p.setup = () => {
    p.createCanvas(600, 600)
    p.noLoop()
  }

  p.draw = () => {
    const [backgroundColor, ...lineColors] = p.shuffle(
      palettes[paletteIndex % palettes.length]
    )
    p.background(backgroundColor)
    p.strokeWeight(4)
    p.strokeCap('round')

    const getLineColor = createCycle<string>(lineColors)

    for (let x = 0; x < p.width; x += step) {
      for (let y = 0; y < p.height; y += step) {
        p.stroke(getLineColor())
        if (p.random() > 0.5) {
          p.line(x, y, x + step, y + step)
        } else {
          p.line(x + step, y, x, y + step)
        }
      }
    }
  }

  p.keyPressed = () => {
    if (p.key === 's') {
      p.saveCanvas(`tiled-lines-${new Date().toISOString()}`, 'png')
    }
    if (p.keyCode === p.LEFT_ARROW) {
      paletteIndex--
      p.redraw()
    }
    if (p.keyCode === p.RIGHT_ARROW) {
      paletteIndex++
      p.redraw()
    }
    if (p.key === ' ') {
      p.redraw()
    }
  }
}
