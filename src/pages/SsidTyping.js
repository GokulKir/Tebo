import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  ScrollView,
  NativeEventEmitter,
  NativeModules ,
  DeviceEventEmitter ,
  Platform
} from 'react-native';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import React, {useEffect, useRef, useState} from 'react';
import useStyle from '../hooks/useStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import {useRecoilState} from 'recoil';
import {Backid, SsidValue, Visible} from '../data/Recoil/atom';
import usePermissions from '../hooks/usePermissions';
import useWifiManager from '../hooks/useWifi';
import {
  Modal,
  Portal,
  Button,
  PaperProvider,
  Snackbar,
} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import Ripple from 'react-native-material-ripple';
import SsidModal from '../components/SsidModal';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import BleManager from 'react-native-ble-manager';
import useBluetooth from '../hooks/useBluetooth';
import DeviceInfo from 'react-native-device-info';




export default function SsidTyping() {
  const [Bid, setBid] = useRecoilState(Backid);
  const [visible, setVisible] = useState(false);
  const {BottomPage} = useStyle();
  const styles = BottomPage;
  const {WifiPermission, requestBluetoothPermissions} = usePermissions();
  const [selectedSSID, setSelectedSSID] = useState('');
  const pickerRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [selectedSSIDValue, setSelectedSSISValue] = useRecoilState(SsidValue);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [show, setShow] = useState(false);
  const [logData , setLogData] = useState(false);
  const [deviceName , setDeviceName] = useState(null);



  useEffect(() => {
    BleManager.start({ showAlert: false });

    return () => {
      BleManager.stopScan();
    };

  }, []);

  useEffect(()=>{
    const scanDevices = () => {
      BleManager.scan([], 5, true).then((results) => {
        console.log('Scanning...', results);
      }).catch((err)=>{
        console.log("Error scanning",err);
      })
    };

    scanDevices()
  },[])

 


  useEffect(()=>{

    DeviceInfo.getDeviceName().then((deviceName) => {
        console.log(deviceName);
        setDeviceName(deviceName);

    });

  },[])



//  useEffect(()=>{

//   console.log("Bluetooth device",device);

//  },[])

 
 //Bluetooth Turn on//


 
 //Bluetooth Turn on//




  const showSnackbar = () => {
    setShow(true);
  };

  const hideSnackbar = () => {
    setShow(false);
  };



  const {
    wifiList,
    selectedWifi,
    scanWifiNetworks,
    setSelectedWifi,
    connectToWifi,
  } = useWifiManager();

  //Wifi permission//

  useEffect(() => {
    // Define a function to conditionally call scanWifiNetworks
    const performScanIfPermissionGranted = async () => {
      const permissionGranted = await WifiPermission();
      if (permissionGranted) {
        scanWifiNetworks();
      }
    };
  
    // Call the conditional function when the component mounts
    performScanIfPermissionGranted();

  }, []);

  //Wifi permission//

  const onSSIDChange = itemValue => {
    setSelectedSSID(itemValue);
  };

  const pickerItems = wifiList.map(({BSSID, SSID}) => (
    <Picker.Item key={BSSID} label={SSID} value={SSID} />
  ));

  const open = () => {
    if (pickerRef.current) {
      pickerRef.current.focus();
    }
  };

  function close() {
    if (pickerRef.current) {
      pickerRef.current.blur();
    }
  }

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  

  //Wifi Level //
  const SignalLevel = ({level}) => {
    if (level >= -30) {
      return <Icon name="signal-wifi-4-bar" size={24} color="green" />;
    } else if (level >= -51) {
      return <Icon name="network-wifi-3-bar" size={24} color="yellow" />;
    } else if (level >= -61) {
      return <Icon name="network-wifi-2-bar" size={24} color="orange" />;
    } else if (level >= -71) {
      return <Icon name="network-wifi-1-bar" size={24} color="red" />;
    } else {
      return <Icon name="signal-wifi-statusbar-null" size={24} color="gray" />;
    }
  };
  //Wifi Level //

  const PickWifi = e => {
    console.log('EEEEEEE' + e);

    setSelected(e.SSID);
    setSelectedSSISValue(e.SSID);
    setSelectedWifi(e.SSID);

    setVisible(false);
    console.log(e);
  };



  //  const WifiPermissionAndroid = async () => {

  //   const granted = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     {
  //       title: 'Location permission is required for WiFi connections',
  //       message:
  //         'This app needs location permission as this is required  ' +
  //         'to scan for wifi networks.',
  //       buttonNegative: 'DENY',
  //       buttonPositive: 'ALLOW',
  //     },
  // );
  // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //      console.log("Permition granted");
  //      scanWifiNetworks(); // Now that permission is granted, scan WiFi networks

  // } else {
  //   console.log("Permition denied");
  // }

  // }

  //  //Wifi permission//
  //  useEffect(() => {
  //   const requestPermissionsAndScan = async () => {
  //     await WifiPermissionAndroid(); // Request location permission before scanning WiFi networks
  //   };

  //   requestPermissionsAndScan();
  // }, []);
  //  //Wifi permission//

  useEffect(() => {
    console.log('Wifi', wifiList);

    const ssids = wifiList.map(({SSID}) => SSID);

    console.log('This ssid', ssids);
  }, []);

  //  useEffect(()=>{

  //   async function requestBluetoothPermissions() {
  //     try {
  //       const granted = await PermissionsAndroid.requestMultiple([
  //         PermissionsAndroid.PERMISSIONS.BLUETOOTH,
  //         PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADMIN,
  //         // Add other Bluetooth-related permissions here
  //       ]);

  //       if (granted['android.permission.BLUETOOTH'] === PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log('BLUETOOTH permission granted');
  //         // Proceed with Bluetooth operations
  //       } else {
  //         console.log('BLUETOOTH permission denied');
  //       }
  //     } catch (error) {
  //       console.warn('Error requesting permissions:', error);
  //     }
  //   }

  //  },[])

  const navigation = useNavigation();

  const passing = 'ROBO_DE%V*L(+E$C@US';

  useEffect(() => {
    setBid(passing);
  }, []);

  const PassingPage = () => {
    if (selected === null) {
      showSnackbar();

      console.log('Not selected');
    } else {
      setSelectedWifi(selected);
      navigation.navigate('Password', {passing});
    }
  };

  const ReloadNetwork = () => {
    setVisible(true);
    scanWifiNetworks();
  };

  return (
    <View style={styles.MainPage}>
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
        please select wifi network
      </Snackbar>

      <View style={styles.centerBox}>
        <View style={styles.centerBoxout}>
          <Text style={styles.Textstyle}>SSID</Text>
        </View>

        <View style={styles.CenterInput}>
          <View style={styles.InputStyle}>
            <Ripple
              onPress={() => setVisible(true)}
              rippleContainerBorderRadius={5}
              style={styles.OrgInput}>
              {selected === null ? (
                <Text style={styles.InputPlaceholder}>Select any</Text>
              ) : (
                <Text style={styles.InputPlaceholder}>{selected}</Text>
              )}
            </Ripple>

            <View style={styles.IconStyle}>
              <TouchableOpacity onPress={() => setVisible(true)}>
                <Icon name="arrow-drop-down" color="grey" size={30} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => PassingPage()}
            style={styles.ButtonStyle}>
            <Text style={styles.ButtonTextstyle}>ENTER</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={visible} transparent>
        <View style={styles.ModalStyle}>
          <ScrollView>
            {wifiList.map((obj, i) => {
              return (
                <View key={i} style={styles.SsidListStyle}>
                  <Ripple
                    onPress={() => PickWifi(obj)}
                    rippleDuration={1200}
                    rippleOpacity={0.2}
                    rippleColor="#000"
                    style={styles.RippleStyle}>
                    <View style={styles.StyleComponent}>
                      <View style={styles.PositionStyle}>
                        <Text style={styles.SSidText}>{obj.SSID}</Text>
                      </View>

                      <View style={styles.WifiIcon}>
                        <SignalLevel level={obj.level} />
                      </View>
                    </View>
                  </Ripple>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
