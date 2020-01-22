# Stryber React Native UI Components (Matterhorn)

## Description

UI library for React Native

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

## Using the library within other projects

Projects that would use this package have two options
of how to install and import this _private_ library
within our organization:

a) Install as an NPM package from GitHub registry
(THE RIGHT WAY).

1. Create an '.npmrc' file at the
   root of the project that will be using
   Matterhorn library.

'.npmrc' file contents:

```text
@stryberventures:registry=https://npm.pkg.github.com/stryberventures
```

2. Authorize to your GitHub account and create a new
   'Personal Access Token' (https://github.com/settings/tokens).
   This token should have _read:packages_ permission checked.

3. Copy the created TOKEN and use it to create an
   '~/.npmrc' file located in the '~' (home) folder
   of your user:

```text
//npm.pkg.github.com/:_authToken=TOKEN
```

4. After this The package can be installed by typing
   the following command in the terminal:

```shell script
npm install @stryberventures/stryber-react-native-ui-components@0.0.3
```

b) Install directly from the git repository's
URL by typing the following command in the
terminal (THE EASIER WAY):

```shell script
npm i git+ssh://git@github.com/stryberventures/stryber-react-native-ui-components.git#0.0.3
```

5. Then you need to create `react-native.config.js` in project root dir with code:

```javascript
module.exports = {
  assets: [
    './node_modules/@stryberventures/stryber-react-native-ui-components/src/static/fonts',
  ],
};
```

And run `react-native link` to link fonts that we use in package.

6. Add following packages to your project package.json file(if project haven't them already):

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

## How to publish library to GitHub npm registry (Beta)

1) Create a personal access token in the
"Developer settings" page on GitHub
(https://github.com/settings/tokens)

_Note: Your account must have appropriate GitHub
permissions for you to be able to publish it_

2) Create '~/.npmrc' file:

```text
//npm.pkg.github.com/:_authToken=TOKEN
```

_Note: Full guide can be found here
https://help.github.com/en/github/managing-packages-with-github-package-registry/configuring-npm-for-use-with-github-package-registry_

3) Publish this package to GitHub npm registry by
running following command(s) in the terminal:

```shell script
npm publish
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
