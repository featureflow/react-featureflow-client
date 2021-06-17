import { createContext } from 'react';

const context = createContext({
    featureflowClient: undefined,
    featureflowConfig: undefined
});
const {
    Provider,
    Consumer,
} = context;
export { Provider, Consumer };
export default context;
