import React, {useState} from 'react'
import { Consumer } from './context'
import {Evaluate, EvaluateSet, FeatureflowContext } from './types'

const withFeatureflow = () => {
  return function hoc<P>(WrappedComponent: React.ComponentType<P>) {
    return (props: P) => (
      <Consumer>
        {({ featureflow, features }: FeatureflowContext) => {
          const [evaluated, setEvaluated] = useState<EvaluateSet>({});
          const evaluate = (feature: string): Evaluate | undefined=> {
            if(evaluated[feature] === undefined){
              const evaluatedFeature = featureflow?.evaluate(feature);
              if(evaluatedFeature){
                setEvaluated({...evaluated, ...{[feature]:evaluatedFeature}});
              }
              return evaluatedFeature || undefined;
            } else {
              return evaluated[feature]
            }
          }

          const goal = (goalKey: string) => {
            featureflow?.goal(goalKey);
          }

          return (
            <WrappedComponent
              featureflow={featureflow}
              evaluate={evaluate}
              goal={goal}
              features={features}
              {...props}
            />
          )
        }}
      </Consumer>
    )
  }
}

export default withFeatureflow
