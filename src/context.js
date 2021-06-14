import { createContext } from 'react';

const context = createContext({featureflowClient: undefined});
const {
    Provider,
    Consumer,
} = context;
export { Provider, Consumer };
export default context;