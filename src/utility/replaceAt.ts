export const replaceAt = <T>(array: T[], item: T, index: number) =>
  array.map((q, i) => {
    if (index == i) {
      return item
    }
    return q
  })