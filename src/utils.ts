export function times(count: number, fn: (value: number) => void) {
  for (let i = 0; i < count; i++) {
    fn(i)
  }
}

export function map<TValue>(
  count: number,
  fn: (value: number) => TValue
): TValue[] {
  const values: TValue[] = []
  times(count, (i) => {
    values.push(fn(i))
  })
  return values
}
