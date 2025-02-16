import type { default as p5 } from 'p5'
import { createCycle } from '../createCycle'
import { useSeed } from '../useSeed'

export default function sketch(p: p5) {
  const step = 20

  let seed: number
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
    seed = useSeed(p)
    const [backgroundColor, ...lineColors] = p.shuffle(
      palettes[p.abs(paletteIndex - palettes.length) % palettes.length]
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
      p.saveCanvas(`tiled-lines-${seed}`, 'png')
    }
    if (p.key === 'j') {
      paletteIndex--
      p.redraw()
    }
    if (p.key === 'k') {
      paletteIndex++
      p.redraw()
    }
    if (p.key === 'r') {
      p.redraw()
    }
  }
}
