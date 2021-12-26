import p5 from 'p5'

export default function sketch(p: p5) {
  let sentenceLength = 1
  let length = 12

  let rules = {
    '0': '1[0]0',
    '1': '11',
  } as const

  let drawRules = {
    0: () => {
      p.line(0, 0, 0, -length)
      p.translate(0, -length)
    },
    1: () => {
      p.line(0, 0, 0, -length)
      p.translate(0, -length)
    },
    '[': () => {
      p.push()
      p.rotate(p.radians(-45))
    },
    ']': () => {
      p.pop()
      p.rotate(p.radians(45))
    },
  }

  function nextSentence(sentence: string): string {
    let next = ''

    if (!sentence) {
      return '0'
    }

    for (let char of sentence) {
      // @ts-ignore
      let rule = rules[char]
      if (rule) {
        next += rule
      } else {
        next += char
      }
    }

    return next
  }

  p.setup = () => {
    p.createCanvas(600, 600)
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

    p.translate(p.width / 2, p.height)

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
