import AsyncStorage from '@react-native-community/async-storage';
// Quieting AsyncStorage warnings!
// Per https://github.com/storybookjs/storybook/issues/6078#issuecomment-510167432
const ReactNative = require('react-native');
Object.defineProperty(ReactNative, 'AsyncStorage', {
  get(): any {
    return require('react-native').default;
  },
});
/**
 * Export AsyncStorage so it's usable elsewhere.
 */
export const Storage = AsyncStorage;
export async function loadString(key) {
  try {
    return await Storage.getItem(key);
  } catch {
    return null;
  }
}
export async function saveString(key, value) {
  try {
    await Storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}
