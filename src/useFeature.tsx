import { useContext, useMemo } from 'react'
import context from './context'
import type { Evaluate } from './types'

/**
 * Evaluate a single feature by key, returning the full Evaluate object
 * (value()/is()/isOn()/isOff()/jsonValue()). Re-evaluates whenever the
 * provider's features state updates (INIT/UPDATED_FEATURE/user change).
 */
const useFeature = (key: string): Evaluate => {
  const { featureflow, features } = useContext(context)
  // `features` is a new object reference each time the provider updates (see
  // FeatureflowProvider), so it doubles as the re-evaluation trigger here.
  return useMemo(() => featureflow.evaluate(key), [featureflow, key, features])
}

export default useFeature
