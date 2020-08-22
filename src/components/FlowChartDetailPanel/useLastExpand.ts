import { useEffect, useState } from 'react'
import { ExpandLevel } from 'enums'

export default function useLastExpand(expandLevel: ExpandLevel) {
  const [lastExpand, setLastExpand] = useState<ExpandLevel>(ExpandLevel.NONE)
  useEffect(() => {
    if (expandLevel > 0 && expandLevel < 3) {
      setLastExpand(expandLevel)
    }
  }, [expandLevel])
  return lastExpand
}
