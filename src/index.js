import FeatureflowProvider from './FeatureflowProvider';
import Evaluate from './Evaluate';
import Variant from './Variant';


export { FeatureflowProvider, Evaluate, Variant }

if(window.VERSION !== undefined) {
  module.exports.version = window.VERSION;
}