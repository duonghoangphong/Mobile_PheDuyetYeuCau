/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import test from './src/test/testSignalr';

AppRegistry.registerComponent(appName, () => App);
