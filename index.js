/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import test from './src/test/testOneSignal';
import screen from './src/screen/SettingScreen';
import modal from './src/componentCustom/Modal/Modal_Fitter';

AppRegistry.registerComponent(appName, () => App);
