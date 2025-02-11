import { del, get, patch, post, put, update, useFetch, useFetchUpdate } from "./apiMethod"

export const crud = (url) => ({
  get: (option) => get(url, option),
  post: (data, option) => post(url, data, option),
  update: (id, data, option) => update(`${url}/${id}`, data, option),
  put: (data, option) => put(url, data, option),
  patch: (data, option) => patch(url, data, option),
  del: (id, option) => del(`${url}/${id}`, option),
  // removeMultiple: (ids) => post(`${url}/delete`, { ids }),
  useFetch: (id, options) => useFetch(`${url}${id ? `/${id}` : ""}`, options),
  useFetchById: (id, options) => useFetch(`${url}/${id}`, { enabled: !!id, ...options }),
  useFetchUpdate: (customUrl) => useFetchUpdate(customUrl ?? url),
})

export const authApi = {
  login: (data) => post('/api/login', data),
  signup: (data) => post('/api/signup', data),
  useProfile: () => useFetch('/api/user/profile'),
  useMutateProfile: () => useFetchUpdate('/api/user/profile'),
  updateProfile: (data) => update('/api/user/profile', data)
}

export const userApi = {
  ...crud('/api/user'),
  usePagination: (pagenumber=1, limit=50) => useFetch(`/api/user?pagenumber=${pagenumber}&limit=${limit}`)
}

export const artistApi = {
  ...crud('/api/artist')
}

export const musicApi = {
  ...crud('/api/music')
}