import FeatureflowProvider from './FeatureflowProvider';
import withFeatureflow from './withFeatureflow';

export { FeatureflowProvider, withFeatureflow }

if(window.VERSION !== undefined) {
  module.exports.version = window.VERSION;
}