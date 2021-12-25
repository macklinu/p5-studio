import p5 from 'p5'
import { map, times } from '../utils'

// Followed along with https://www.youtube.com/watch?v=S1TQCi9axzg
export default function sketch(p: p5) {
  const randomY = () => p.random(-1000, 0)
  const randomCharacterValue = () =>
    String.fromCharCode(0x30a0 + p.round(p.random(0, 96)))

  const symbolSize = 24

  class CharacterStream {
    private characters: Character[]

    constructor(x: number) {
      const totalCharacters = p.round(p.random(5, 30))
      const speed = p.round(p.random(5, 7))
      const y = randomY()
      const bright = p.random() > 0.75

      this.characters = map(
        totalCharacters,
        (i) => new Character(x, -i * symbolSize + y, speed, bright)
      )
    }

    render() {
      this.characters.forEach((character, index) => {
        character.update()
        character.show(index)
      })
    }
  }

  class Character {
    private value: string
    private switchInterval: number

    constructor(
      private x: number,
      private y: number,
      private speed: number,
      private bright: boolean
    ) {
      this.value = randomCharacterValue()
      this.switchInterval = p.round(p.random(2, 20))
    }

    update() {
      this.y += this.speed
      if (this.y > p.height) {
        this.y = randomY()
      }
      this.setToRandomSymbol()
    }

    show(index: number) {
      const opacity = this.y < 0 ? 100 : p.map(this.y, 0, p.height, 100, 255)

      const fillColor =
        this.bright && index === 0 ? this.brightText : this.standardText
      fillColor.setAlpha(opacity)

      p.fill(fillColor)
      p.textSize(symbolSize)
      p.text(this.value, this.x, this.y)
    }

    private setToRandomSymbol() {
      if (p.frameCount % this.switchInterval === 0) {
        this.value = randomCharacterValue()
      }
    }

    private get brightText(): p5.Color {
      return p.color(180, 255, 180)
    }

    private get standardText(): p5.Color {
      return p.color(0, 255, 70)
    }
  }

  const streams: CharacterStream[] = []

  p.setup = () => {
    p.createCanvas(500, 500)
    p.textFont('Consolas')

    times(p.width / symbolSize, (i) => {
      streams.push(new CharacterStream(i * symbolSize))
    })
  }

  p.draw = () => {
    p.background(0, 150)

    streams.forEach((stream) => {
      stream.render()
    })
  }

  p.keyPressed = () => {
    if (p.key === 'p') {
      toggleLoop()
    }
  }

  function toggleLoop() {
    if (p.isLooping()) {
      p.noLoop()
    } else {
      p.loop()
    }
  }
}
