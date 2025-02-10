const prod = import.meta.env.VITE_APP_PROD
let dev = import.meta.env.VITE_APP_DEV
// dev = 'http://localhost:5001'

export const BASE_URL = import.meta.env.MODE === 'production' ? prod : dev;
export const PREV_PATH = 'prevPath'
