import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import useStyle from '../hooks/useStyle';
import usePlatform from '../hooks/usePlatform';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  Backid,
  SSidconnectionEstablished,
  SsidValue,
  WifiConnectionEstablished,
} from '../data/Recoil/atom';
import useWifiManager from '../hooks/useWifi';
import WifiManager from 'react-native-wifi-reborn';
import {
  Modal,
  Portal,
  Button,
  PaperProvider,
  Snackbar,
} from 'react-native-paper';
import Ripple from 'react-native-material-ripple';
import DeviceInfo from 'react-native-device-info';
// import BleManager from 'react-native-ble-plx';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import useApi from '../hooks/useApi';
import { BleManager } from 'react-native-ble-plx';

export default function PasswordTyping() {

  //IMEI state//
  //IMEI state//


  
  //Navigation veriable//
  const navigation = useNavigation();
  //Navigation veriable//

  //Recoil states//
  const backId = useRecoilValue(Backid);
  const [WIFI, SETWIFI] = useRecoilState(WifiConnectionEstablished);
  const [SSIDVALUE, SETSSIDVALUE] = useRecoilState(SSidconnectionEstablished);
  const ssid = useRecoilValue(SsidValue);
  //Recoil states//

  //Platform states//
  const {isTablet} = usePlatform();
  //Platform states//

  //Wifi state//
  const [connectionWifi, SetconnectToWifi] = useState(ssid, password);
  const [password, setPassword] = useState(null);
  const [connecting, setConnecting] = useState(false);
  //Wifi state//

  //Style veriable//
  const {BottomPage} = useStyle();
  const styles = BottomPage;
  const {width, height} = Dimensions.get('window');
  //Style veriable//

  // const { wifiList, connectedWifi, scanWifi, connectToWifi, disconnectFromWifi } = useWifiManager();

  const [visible, setVisible] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [secure, setSecure] = useState(false);
  const [show, setShow] = useState(false);
  const [connectionTrue, setConnectionTrue] = useState(false);
  const [connectedDeviceName, setConnectedDeviceName] = useState('');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [manager, setManager] = useState(null);
  const [devices, setDevices] = useState([]);





  // useEffect(() => {
  //   const bleManager = new BleManager();

  //   // Start scanning for devices
  //   bleManager.startDeviceScan(null, null, (error, scannedDevice) => {
  //     if (error) {
  //       console.error('Error scanning:', error);
  //       return;
  //     }
      
  //     // Extract device name and ID from scannedDevice
  //     const { name, id } = scannedDevice;

  //     // Add the device info to the devices array
  //     setDevices(prevDevices => {
  //       const existingDeviceIndex = prevDevices.findIndex(device => device.id === id);
  //       if (existingDeviceIndex !== -1) {
  //         prevDevices[existingDeviceIndex] = { id, name };
  //         return [...prevDevices];
  //       }
  //       return [...prevDevices, { id, name }];
  //     });
  //   });

  //   // Stop scanning when the component unmounts
  //   return () => {
  //     bleManager.stopDeviceScan();
  //   };
  // }, []);





  const {
    wifiList,
    selectedWifi,
    scanWifiNetworks,
    setSelectedWifi,
    connectToWifi,
    // connectionStatus
  } = useWifiManager();

  const BackValue = 'ROBO_DE%V*L(+E$C@US';

  useEffect(() => {
    let version = DeviceInfo.getVersion();
    let deviceId = DeviceInfo.getDeviceId();
    console.log('Version: ' + version);
    console.log('DeviceId: ' + deviceId);
    DeviceInfo.getBatteryLevel().then(batteryLevel => {
      console.log('Battery Level: ' + batteryLevel);
    });
   
  }, []);

  const showSnackbar = () => {
    setShow(true);
  };

  const hideSnackbar = () => {
    setShow(false);
  };

  //  const connectionToWifi = async () => {

  //   const isConnected = await WifiManager.connectToProtectedSSID(
  //     ssid ,
  //     password ,

  //   );

  //     if (isConnected) {
  //       console.log('Connected to WiFi:', ssid);
  //     } else {
  //       console.log('Failed to connect to WiFi:', ssid);
  //     }
  //   };

  //   const connectWifi = async () => {
  //     try {
  //       await WifiManager.connectToProtectedSSID(ssid, password, false);
  //       console.log('Connected to WiFi:', ssid);
  //     } catch (error) {
  //       console.log('Failed to connect to WiFi:', error);
  //     }
  //   };

  // useEffect(() => {
  //   if (isBluetoothEnabled == true) {
  //     console.log('Nully connected');
  //     const connectToDevice = device => {
  //       console.log('Connect');
  //       // BleManager.connect(device.id)
  //       //   .then(() => {
  //       //     console.log('Connected to device:', device.name);
  //       //   })
  //       //   .catch(error => {
  //       //     console.error('Failed to connect to device', error);
  //       //   });
  //     };
  //   }
  // }, []);


 

  

  const connectWifi = async () => {
    console.log('SSSSSSIIIDDD', ssid, 'PPPPAAAAASS', password);
    if (password === null) {
      console.log('No password');
      showSnackbar();
      
    }
    if (ssid && password) {
      try {
        setConnecting(true);
        const isConnected = await WifiManager.connectToProtectedSSID(
          ssid,
          password,
          true,
          false,
        );
        if (isConnected) {
          console.log(`Connected to WiFi network: ${ssid}`);
          navigation.replace('BleList');
          setConnectionTrue(true);
        } else {
          console.log(`Failed to connect to WiFi network: ${ssid}`);
          setConnectionTrue(false);
        }
      } catch (error) {
        console.error('Error connecting to WiFi:', error);
        setConnectionTrue(false);
      } finally {
        setConnecting(false);
      }
    }
  };

  const Show = () => {
    setSecure(!secure);
  };

  const route = useRoute();

  const {passing} = route;

  useEffect(() => {
    console.log('SSID : ', ssid);
  }, []);

  useEffect(() => {
    console.log(isTablet);
    console.log(Platform);

    console.log('This is a backId' + backId);

    if (backId === BackValue) {
      console.log('ID IS CORRECTED');
    }
  }, []);

  const ConnectEnter = () => {
    console.log('Password+++++++SSID' + ssid + ':  ' + password);
    SETWIFI(password);
    SETSSIDVALUE(ssid);

    setSelectedWifi(ssid);
    connectToWifi(password);
    setVisible(true);
    // connectedWifi(SSID , password )
    console.log('PASSSWORD', password);
    // connectToWifi(ssid, password);
  };

  return (
    <View style={styles.MainPage}>
      <View style={styles.centerBox}>
        <View style={styles.centerBoxout}>
          <Text style={styles.Textstyle}>PASSWORD</Text>
        </View>

        <View style={styles.CenterInput}>
          {secure === true ? (
            <View style={styles.InputStyle}>
              <TextInput
                secureTextEntry={false}
                placeholder="Enter password"
                placeholderTextColor={'grey'}
                style={styles.OrgInput}
              />

              <View style={styles.IconSt}>
                <TouchableOpacity onPress={Show}>
                  <Icon1 name="eye" color="grey" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.InputStyle}>
              <TextInput
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
                placeholder="Enter password"
                placeholderTextColor={'grey'}
                style={styles.OrgInput}
              />

              <View style={styles.IconSt}>
                <TouchableOpacity onPress={Show}>
                  <Icon1 name="eye-off" color="grey" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        <View>
          <TouchableOpacity
            onPress={() => connectWifi()}
            style={styles.ButtonStyle}>
            <Text style={styles.ButtonTextstyle}>ENTER</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal></Modal>

      <Snackbar
        style={{backgroundColor: 'red', color: '#fff'}}
        visible={show}
        onDismiss={hideSnackbar}
        action={{
          label: 'Ok',
          onPress: () => {
            setShow(false); // Do something
          },
        }}>
        please enter your wifi password
      </Snackbar>
    </View>
  );
}
