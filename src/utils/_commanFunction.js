export const _sortByName = (key) => (a, b) => {
  if(!a[key]) return -1
  if(!b[key]) return -1
  return a[key].trim().localeCompare(b[key].trim(), 'en', { sensitivity: 'base' })
}
