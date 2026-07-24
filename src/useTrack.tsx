import { useCallback } from 'react'
import useFeatureflow from './useFeatureflow'
import type { GoalDetails } from './types'

/**
 * Returns a stable track function for goal events on the current user.
 * `details` is a number (the metric value) or an object `{ value?, ...custom }` —
 * congruent with the OpenFeature tracking API.
 *
 * ```tsx
 * const track = useTrack();
 * track('purchase', { value: 49.95, plan: 'pro' });
 * ```
 */
const useTrack = (): ((goalKey: string, details?: GoalDetails) => void) => {
  const featureflow = useFeatureflow()
  return useCallback(
    (goalKey: string, details?: GoalDetails) =>
      featureflow.track(goalKey, details),
    [featureflow]
  )
}

export default useTrack
