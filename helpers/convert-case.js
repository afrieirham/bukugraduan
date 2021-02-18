// ========================
// Case Conversion Utilities
// Note: All case conversion functions require `toKebab` to work.
// ------------------------
export const convertCase = {
  toKebab: function (string) {
    return string
      .split('')
      .map((letter, index) => {
        if (/[A-Z]/.test(letter)) {
          return ` ${letter.toLowerCase()}`
        }
        return letter
      })
      .join('')
      .trim()
      .replace(/[_\s]+/g, '-')
  },
  toCamel: function (string) {
    return this.toKebab(string)
      .split('-')
      .map((word, index) => {
        if (index === 0) return word
        return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase()
      })
      .join('')
  },
  toTitle: function (string) {
    return this.toKebab(string)
      .split('-')
      .map((word) => {
        return word.slice(0, 1).toUpperCase() + word.slice(1)
      })
      .join(' ')
  },
  toSentence: function (string) {
    const interim = this.toKebab(string).replace(/-/g, ' ')
    return interim.slice(0, 1).toUpperCase() + interim.slice(1)
  },
}
