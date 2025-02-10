import { useMemo } from "react"

const useSelected = (list, option, value) => {
  const active = useMemo(() => {
    if((value && Array.isArray(list)) || value === 0) {
      const { label: key1, value: key2 } = option ?? { label: "label", value: "value" }
      const activeSelect = list.find(i => isNaN(i[key2]) ? i[key2] === value : +i[key2] === +value)
      if(activeSelect) return [activeSelect[key1], activeSelect[key2]]
    }
    return ["--", ""]
  }, [list, option, value])


  return active
}

export default useSelected