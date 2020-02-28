# Stryber React Native UI Components (Matterhorn)

## Docs

[Go to the Docs](https://matterhorn.stryber.com/native/components)

In the docs you can find all components preview and usage 

## Getting started

### Installation

1. Install package to RN project by typing
   the following command in the terminal:

```shell script
npm install @stryberventures/stryber-react-native-ui-components
```

2. Then you need to create `react-native.config.js` in project root dir with code:

```javascript
module.exports = {
  assets: [
    './node_modules/@stryberventures/stryber-react-native-ui-components/src/static/fonts',
  ],
};
```

And run `react-native link` to link fonts that we use in package.

3. Add following packages to your project package.json file(if project haven't them already):

```json
    "@react-native-community/async-storage": "1.6.3",
    "@react-native-community/datetimepicker": "2.1.0",
    "react-native-linear-gradient": "2.5.6",
    "react-native-reanimated": "1.3.0",
    "react-native-svg": "9.13.2",
    "rn-fetch-blob": "0.11.2",
    "react-native-gesture-handler": "^1.5.2",
```

Then run in terminal:

```shell script
rm -rf node_modules && npm i
```

and

```shell script
cd ios && pod install
```

### Integration(optional)

Check our docs for the best integration process: [Integration Docs](https://matterhorn.stryber.com/native/components/theme)

## How to Run in Storybook Server mode (for demo and development purposes)

Run following commands in the terminal:

```shell script
yarn install
yarn storybook
```

### To run on iOS simulator:

- you must have xCode
- you must have Cocoapods

Run following command in the terminal:

```shell script
cd ios
pod install
cd ..
react-native run-ios
```

To run iPhone simulator use:

```
react-native run-ios
```

or (to specify simulator)

```
react-native run-ios --simulator=“iPhone 11”
```

### To run on Android:

- open Android simulator

Run following command in the terminal:

```shell script
react-native run-android
```

## How to test library locally before publish

We will test package in `/examples` folder that will be in package root dir:

1) Run in terminal:

```shell script
react-native init examples
```

2) After that is finished, run the `npm pack` command to generate a file that will have a naming convention similar to `stryberventures-stryber-react-native-ui-components-0.0.3.tgz`

3) Then, go into the `/examples` folder and install your component by running
 
```shell script
npm i ../stryberventures-stryber-react-native-ui-components-0.0.3.tgz
``` 
or 
```
yarn add ../stryberventures-stryber-react-native-ui-components-0.0.3.tgz
```

in the terminal. Remember to replace 0.0.3 respectively.
