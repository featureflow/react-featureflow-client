import FeatureflowProvider from './FeatureflowProvider';
import Evaluate from './Evaluate';
import Variant from './Variant';
import withClient from './withClient';

export { FeatureflowProvider, Evaluate, Variant, withClient }

if(window.VERSION !== undefined) {
  module.exports.version = window.VERSION;
}