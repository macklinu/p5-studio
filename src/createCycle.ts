export function createCycle<T>(array: T[]) {
  let index = 0
  return (): T => {
    const value = array[index % array.length]
    index++
    return value
  }
}
