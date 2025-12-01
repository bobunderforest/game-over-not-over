const GAME_OVER_PATTERN = `
11111 11111 1   1 11111
1     1   1 11 11 1
1  11 11111 1 1 1 11111
1   1 1   1 1   1 1
11111 1   1 1   1 11111

11111 1   1 11111 11111
1   1 1   1 1     1   1
1   1 1   1 11111 1111
1   1  1 1  1     1   1
11111   1   11111 1   1
`

const translateStringToArrays = (str: string): boolean[][] => {
  return str.split('\n').map((line) => {
    return line.split('').map((symb) => (symb === '1' ? true : false))
  })
}

export const GAME_OVER_ARRAYS = translateStringToArrays(GAME_OVER_PATTERN)
