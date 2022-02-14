// e.g. [1,2,3] -> /^((1|2|3)-?)*$/
export const createHyphonRegexp = (valid: any[] | string = []) => {
  const validList = valid instanceof Array ? valid : [valid]
  return new RegExp(`^((${validList.join('|')})-?)*$`, 'i')
}
export const rangeRegexp = /^(\d+)?-?(\d+)?$/
