import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import context from './context'
import useTrack from './useTrack'
import type { FeatureflowContext } from './types'

function TestComponent() {
  const track = useTrack()
  return (
    <button
      data-testid='buy'
      onClick={() => track('purchase', { value: 49.95, plan: 'pro' })}
    >
      buy
    </button>
  )
}

describe('useTrack', () => {
  it('forwards goal key and details to featureflow.track', () => {
    const trackSpy = jest.fn()
    const contextValue: FeatureflowContext = {
      features: {},
      featureflow: { track: trackSpy } as any
    }

    const { getByTestId } = render(
      <context.Provider value={contextValue}>
        <TestComponent />
      </context.Provider>
    )

    fireEvent.click(getByTestId('buy'))
    expect(trackSpy).toHaveBeenCalledWith('purchase', {
      value: 49.95,
      plan: 'pro'
    })
  })
})
