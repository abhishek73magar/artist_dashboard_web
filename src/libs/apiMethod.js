import axios from "./axios";
import { checkError } from "./getError";
import { AUTH_TOKEN } from "./jwtToken";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";

export const get = (url, option={}, headers={}) => {
  return axios.get(url, { headers: { Authorization: `Bearer ${AUTH_TOKEN()}`, ...headers }, ...option }).then(res => res.data).catch(checkError);
}

export const post = (url, data, option={}, headers={}) => {
  return axios.post(url, data, { headers: { Authorization: `Bearer ${AUTH_TOKEN()}`, ...headers }, ...option }).catch(checkError);
}
export const update = (url, data, option={}, headers={}) => {
  return axios.patch(url, data, { headers: { Authorization: `Bearer ${AUTH_TOKEN()}`, ...headers }, ...option }).catch(checkError);
}

export const put = (url, data, option={}, headers={}) => {
  return axios.put(url, data, { headers: { Authorization: `Bearer ${AUTH_TOKEN()}`, ...headers }, ...option }).catch(checkError);
}

export const patch = (url, data, option={}, headers) => {
  return axios.patch(url, data, { headers: { Authorization: `Bearer ${AUTH_TOKEN()}`, ...headers }, ...option }).catch(checkError);
}

export const del = (url, option={}, headers={}) => {
  return axios.delete(url, { headers: { Authorization: `Bearer ${AUTH_TOKEN()}`, ...headers }, ...option }).catch(checkError);
}

export const useFetch = (url, options={}) => {
  return useQuery({
    queryKey: [url],
    queryFn: () => get(url),
    ...options,
  })
}

export const useFetchMultiple = (urls, options) => {
  return useQueries({
    queries: Array.isArray(urls) ? urls.map(url => ({ queryKey: [url], queryFn: () => get(url), ...options })) : [],
    combine: (results) => {
      return {
        data: results.map((res) => res.data),
        isLoading: results.some((res) => res.isLoading),
      }
    }
  })
}


export const useFetchUpdate = (url) => {
  const queryClient = useQueryClient()

  return {
    add: (dd) => {
      return queryClient.setQueryData([url], (prev) => {
        if(Array.isArray(prev)) return [...prev, dd]
        return prev;
      })
    },
    update: (id, dd) => {
      queryClient.setQueryData([url], (prev) => {
        if(Array.isArray(prev)){
          return prev.map((item) => {
            if(+item.id === +id) return { ...item, ...dd }
            return item
          })
        } else if(typeof prev === 'object'){
          return { ...prev, ...dd }
        }
        // return old data if not array
        return prev;
      })
      
    },
    updateById: (id, dd, is_new=false) => {
      return queryClient.setQueryData([`${url}/${id}`], (prev) => {
        if(is_new) return dd
        if(Array.isArray(prev)) return [...prev, dd]
        else if(typeof prev === 'object') return { ...prev, ...dd }
        return dd ?? prev;
      })
    },
    remove: (id) => {
      const is_array = Array.isArray(id)
      return queryClient.setQueryData([url], (prev) => {
        if(Array.isArray(prev)){
          return prev.filter((item) => {
            if(is_array) return !id.some((i) => +i === +item.id)
            return +item.id !== +id
          })
        }
        return prev
      })
    },
    // paginateted data update
    addPagination: (dd, pagenumber, limit=50) => {
      console.log(url)
      return queryClient.setQueryData([`${url}?pagenumber=${pagenumber || sessionStorage.getItem('pagenumber') || 1}&limit=${limit}`], (prev) => {
        
        if(!prev) return { pagenumber: 1, total: 1, data: [dd] } 
        if(prev && Array.isArray(prev.data)) {
          if(Array.isArray(dd)) return { ...prev, data: [...dd, ...prev.data]}
          const data = [dd, ...prev.data]
          return { ...prev, data }
        }
        return prev; 
      })
    },
    updatePagination: (id, dd, pagenumber, limit=50) => {
      return queryClient.setQueryData([`${url}?pagenumber=${pagenumber || sessionStorage.getItem('pagenumber') || 1}&limit=${limit}`], (prev) => {
        if(prev && Array.isArray(prev.data)) {
          const data = prev.data.map((item) => +item.id === +id ? ({ ...item, ...dd }) : item)
          return { ...prev, data }
        }
        return prev; 
      })
    },
    removePagination: (id, pagenumber, limit=50) => {
      return queryClient.setQueryData([`${url}?pagenumber=${pagenumber || sessionStorage.getItem('pagenumber') || 1}&limit=${limit}`], (prev) => {
        if(prev && Array.isArray(prev.data)) {
          const data = prev.data.filter((item) => +item.id !== +id)
          return { ...prev, data }
        }
        return prev; 
      })
    },
    // add, update and, remove sub data items
    addSub: (id, subKey, dd, is_new) => {
      return queryClient.setQueryData([url], (prev) => {
        if(Array.isArray(prev)){
          return prev.map((item) => {
            if(+item.id === +id){
              // add sub item
              if(is_new) return { ...item, [subKey]: dd }
              // add sub item if is_new is false
              let ddList = Array.isArray(item[subKey]) ? item[subKey] : []
              if(Array.isArray(dd)) ddList = [...ddList, ...dd]
              else ddList = [...ddList, dd]
              return { ...item, [subKey]: ddList }
            }
            return item
          })
        }
        return prev;
      })
    },
    updateSub: (id, subKey, subId, dd) => {
      return queryClient.setQueryData([url], (prev) => {
        if(Array.isArray(prev)){
          return prev.map((item) => {
            if(+item.id === +id){
              if(Array.isArray(item[subKey])){
                // update sub item
                const filterDD = item[subKey].map((subItem) => {
                  if(+subItem.id === +subId) return { ...subItem, ...dd }
                  return subItem
                })
                return { ...item, [subKey]: filterDD }
              } else return { ...item, [subKey]: [dd] }
            }
            return item
          })
        }
        return prev;
      })
    },
    removeSub: (id, subKey, subId) => {
      return queryClient.setQueryData([url], (prev) => {
        if(Array.isArray(prev)){
          return prev.map((item) => {
            if(+item.id === +id){
              // remove sub item
              if(Array.isArray(item[subKey])){
                const filterDD = item[subKey].filter((subItem) => +subItem.id !== +subId)
                return { ...item, [subKey]: filterDD }
              }
              return item
            }
            return item
          })
        }
        return prev;
      })
    }
  } 
}
