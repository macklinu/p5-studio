import p5 from 'p5'

export default function sketch(p: p5) {
  let sentenceLength = 1
  let length = 10

  let rules = {
    F: 'F+F−F−F+F',
  } as const

  let drawRules = {
    F: () => {
      p.stroke(0, 100)
      p.line(
        0,
        p.noise(p.random(0, 1), p.random(0, 1)) * 2,
        0,
        -length + p.noise(0) * 2
      )
      p.translate(0, -length)
    },
    '+': () => {
      p.rotate(p.radians(-90))
    },
    '-': () => {
      p.rotate(p.radians(90))
    },
  }

  function nextSentence(sentence: string): string {
    if (!sentence) {
      return 'F'
    }

    return sentence
      .split('')
      .map((char) => rules[char] ?? char)
      .join('')
  }

  p.setup = () => {
    p.createCanvas(300, 400)
    p.noLoop()
  }

  p.draw = () => {
    let sentence = ''
    for (let i = 0; i < sentenceLength; i++) {
      sentence = nextSentence(sentence)
    }

    p.background(255)
    p.stroke(0)
    p.strokeWeight(2)
    p.strokeCap(p.PROJECT)

    p.translate(p.width, p.height / 2)

    for (let char of sentence) {
      // @ts-ignore
      drawRules[char]?.()
    }
  }

  p.mousePressed = () => {
    sentenceLength++
    p.redraw()
  }
}
