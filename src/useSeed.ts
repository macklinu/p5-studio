import p5 from 'p5'

export function useSeed(p: p5, seed: number = Date.now()): number {
  p.randomSeed(seed)
  console.log(`Seed: ${seed}`)
  return seed
}
