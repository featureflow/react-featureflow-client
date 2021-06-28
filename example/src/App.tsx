import React from 'react'

import { withFeatureflowProvider } from 'react-featureflow-client'
import './index.css'
import HocExample from "./HocExample";
import HooksExample from "./HooksExample";

type Props = {
  feature: string
}

const App: React.FC<Props> = () => {

  return  <div>
    <h1>An example of using the featureflow client in a react js </h1>

    <h2>This one uses hooks</h2>
    <HocExample feature="example-feature"/>
    <h2>This one uses the withFeatureflow hoc</h2>
    <HooksExample feature="example-feature"/>
  </div>
}

const FF_KEY = 'js-env-bbb659960a3344c5a31681282c0c4bdf';
const user = {
  attributes: {
    tier: 'gold',
    country: 'australia',
    roles: ['role1', 'role2']
  }
};

export default (withFeatureflowProvider({
  apiKey: FF_KEY,
  config: {
    offline: false,
    streaming: true,
  },
  user
})(App))
