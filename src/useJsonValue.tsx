import useFeature from './useFeature'

/**
 * Ergonomic sugar for reading a variant's JSON config payload directly.
 * Returns undefined if the resolved variant has no value.
 */
function useJsonValue<T = unknown>(key: string): T | undefined {
  const evaluate = useFeature(key)
  return evaluate.jsonValue<T>()
}

export default useJsonValue
