import React from 'react'
import { render } from '@testing-library/react'
import context from './context'
import useJsonValue from './useJsonValue'
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
  const value = useJsonValue<{ color: string }>(featureKey)
  return <div data-testid='json-value'>{value ? value.color : 'none'}</div>
}

describe('useJsonValue', () => {
  it("returns the resolved variant's JSON config payload", () => {
    const contextValue: FeatureflowContext = {
      features: { 'my-feature': 'on' },
      featureflow: {
        evaluate: () => makeEvaluate('on', { color: '#0066cc' })
      } as any
    }

    const { getByTestId } = render(
      <context.Provider value={contextValue}>
        <TestComponent featureKey='my-feature' />
      </context.Provider>
    )

    expect(getByTestId('json-value').textContent).toBe('#0066cc')
  })

  it('returns undefined when the resolved variant has no JSON value', () => {
    const contextValue: FeatureflowContext = {
      features: { 'my-feature': 'off' },
      featureflow: { evaluate: () => makeEvaluate('off', undefined) } as any
    }

    const { getByTestId } = render(
      <context.Provider value={contextValue}>
        <TestComponent featureKey='my-feature' />
      </context.Provider>
    )

    expect(getByTestId('json-value').textContent).toBe('none')
  })
})
