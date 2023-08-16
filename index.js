/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Main from './Main';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import BleManager from 'react-native-ble-manager';

BleManager.start({ showAlert: false }).then((res)=>{
    console.log("BluetoothManager started"+res);
})

AppRegistry.registerComponent(appName, () => Main);
