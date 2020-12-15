# react-featureflow-client

[![][npm-img]][npm-url]

[![][dependency-img]][dependency-url]

> Official React bindings for [Featureflow Javascript Client](https://github.com/featureflow/featureflow-javascript-sdk)

Get your Featureflow account at [featureflow.io](http://www.featureflow.io)

## Prerequisites

```bash
nvm use
```

## Install

```bash
npm install
```

## Test
```
npm test
```

## Build
```
npm run build
```

## Deploy
Update the version details and then:
```
./deploy_npm.sh
```


## Example
There is a very simple example in this repository. Add your JS Client Environment SDK Key to example/src/index.js
 
```const FF_KEY = 'sdk-js-env-yourkeyhere';```

And 
```java
npm run example
```

## License

Apache-2.0

[npm-url]: https://nodei.co/npm/react-featureflow-client
[npm-img]: https://nodei.co/npm/react-featureflow-client.png

[dependency-url]: https://www.featureflow.io
[dependency-img]: https://www.featureflow.io/wp-content/uploads/2016/12/featureflow-web.png