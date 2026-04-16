export function capitalize(string: string) {
  const words = string.split(" ")
  const newArr = words.map(word => word.substring(0, 1).toUpperCase() + word.substring(1))
  return newArr.join(" ")
}