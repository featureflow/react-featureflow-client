import React from 'react'
import { render } from '@testing-library/react'
import context from './context'
import useFeature from './useFeature'
import type { FeatureflowContext } from './types'

function makeEvaluate(value: string, jsonValue?: unknown) {
  return {
    value: () => value,
    is: (v: string) => v === value,
    isOn: () => value === 'on',
    isOff: () => value === 'off',
    jsonValue: () => jsonValue
  }
}

function TestComponent({ featureKey }: { featureKey: string }) {
  const evaluate = useFeature(featureKey)
  return <div data-testid='value'>{evaluate.value()}</div>
}

describe('useFeature', () => {
  it('returns the Evaluate object produced by featureflow.evaluate(key)', () => {
    const evaluateSpy = jest.fn(() => makeEvaluate('on'))
    const contextValue: FeatureflowContext = {
      features: { 'my-feature': 'on' },
      featureflow: { evaluate: evaluateSpy } as any
    }

    const { getByTestId } = render(
      <context.Provider value={contextValue}>
        <TestComponent featureKey='my-feature' />
      </context.Provider>
    )

    expect(getByTestId('value').textContent).toBe('on')
    expect(evaluateSpy).toHaveBeenCalledWith('my-feature')
  })

  it('re-evaluates when the context features value changes reference', () => {
    let currentVariant = 'off'
    const evaluateSpy = jest.fn(() => makeEvaluate(currentVariant))
    const contextValue1: FeatureflowContext = {
      features: { 'my-feature': 'off' },
      featureflow: { evaluate: evaluateSpy } as any
    }

    const { getByTestId, rerender } = render(
      <context.Provider value={contextValue1}>
        <TestComponent featureKey='my-feature' />
      </context.Provider>
    )
    expect(getByTestId('value').textContent).toBe('off')

    currentVariant = 'on'
    const contextValue2: FeatureflowContext = {
      features: { 'my-feature': 'on' }, // new object reference, as FeatureflowProvider produces
      featureflow: contextValue1.featureflow
    }
    rerender(
      <context.Provider value={contextValue2}>
        <TestComponent featureKey='my-feature' />
      </context.Provider>
    )

    expect(getByTestId('value').textContent).toBe('on')
    expect(evaluateSpy).toHaveBeenCalledTimes(2)
  })
})
