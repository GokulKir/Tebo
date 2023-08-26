// import { StyleSheet, Text, View , ScrollView , TouchableOpacity, PermissionsAndroid } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import useBluetooth from '../hooks/useBluetooth';
// import BleManager from 'react-native-ble-manager';

// export default function BluetoothList() {
//   const [scanning, setScanning] = useState(false);
//   const [devices, setDevices] = useState([]);
//   const [connectedDevice , setConnectedDevice] = useState(null)



// const { connectedDevices, getConnectedDevices, sendDataToDevice } = useBluetooth()





//   useEffect(() => {
//     // Function to scan for BLE devices
//     const scanForDevices = () => {
//       BleManager.scan([], 5, true) // Scans for 5 seconds, auto-connects to devices
//         .then(results => {
//           const scannedDevices = results.map(device => ({
//             id: device.id,
//             name: device.name || 'Unknown Device',
//           }));
//           setDevices(scannedDevices);
//         })
//         .catch(error => {
//           console.error('Scan error:', error);
//         });
//     };

//     // Start scanning for devices when the component mounts
//     scanForDevices();

//     // Clean up resources when the component unmounts
//     return () => {
//       BleManager.stopScan();
//       if (connectedDevice) {
//         BleManager.disconnect(connectedDevice.id)
//           .then(() => {
//             console.log('Disconnected from connected device');
//           })
//           .catch(error => {
//             console.error('Disconnection error:', error);
//           });
//       }
//     };
//   }, []);

//   const connectToDevice = (device) => {
//     BleManager.connect(device.id)
//       .then(() => {
//         console.log('Connected to device:', device.name);
//         setConnectedDevice(device);
//       })
//       .catch(error => {
//         console.error('Connection error:', error);
//       });
//   };

//   const disconnectFromDevice = () => {
//     if (connectedDevice) {
//       BleManager.disconnect(connectedDevice.id)
//         .then(() => {
//           console.log('Disconnected from device:', connectedDevice.name);
//           setConnectedDevice(null);
//         })
//         .catch(error => {
//           console.error('Disconnection error:', error);
//         });
//     }
//   };





//   return (
//     <View style={styles.container}>

//       <View style={styles.SecContainer}>

//         <Icon name="bluetooth" color="blue" size={60}/>

//       </View>

//       <ScrollView>


//         <TouchableOpacity  style={styles.ConnectioStyle}>

//         </TouchableOpacity>

//       </ScrollView>



//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container : {
//     flex : 1,
//     backgroundColor:'#fff' ,
//     alignItems:'center' , 
//     marginTop:responsiveHeight(3)
//   } ,
//   SecContainer  : {
//     width : responsiveWidth(15) , 
//     height : responsiveWidth(12) ,
//     backgroundColor:'#fff' ,
//     borderRadius:5 , 
//     elevation:5 , 
//     alignItems:'center' ,
//     justifyContent:'center'
  

//   } ,
//   ConnectioStyle : {
//     width : responsiveWidth(96) ,
//     height : 60 ,
//     backgroundColor:"#fff" ,
//     borderRadius:3 , 
//     elevation:10 ,
//     marginTop:10 ,
//   }
// })





// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, Button, PermissionsAndroid } from 'react-native';
// import { BleManager } from 'react-native-ble-plx';



// export const manager = new BleManager();

// const requestPermission = async () => {
//   const granted = await PermissionsAndroid.request(
//     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
//       title: "Request for Location Permission",
//       message: "Bluetooth Scanner requires access to Fine Location Permission",
//       buttonNeutral: "Ask Me Later",
//       buttonNegative: "Cancel",
//       buttonPositive: "OK"
//     }
//   );
//   return (granted === PermissionsAndroid.RESULTS.GRANTED);
// }

// // BlueetoothScanner does:
// // - access/enable bluetooth module
// // - scan bluetooth devices in the area
// // - list the scanned devices
// const BluetoothScanner = () => {
//   const [logData, setLogData] = useState([]);
//   const [logCount, setLogCount] = useState(0);
//   const [scannedDevices, setScannedDevices] = useState({});
//   const [deviceCount, setDeviceCount] = useState(0);

//   useEffect(() => {
//     manager.onStateChange((state) => {
//       const subscription = manager.onStateChange(async (state) => {
//         console.log(state);
//         const newLogData = logData;
//         newLogData.push(state);
//         await setLogCount(newLogData.length);
//         await setLogData(newLogData);
//         subscription.remove();
//       }, true);
//       return () => subscription.remove();
//     });
//   }, [manager]);

//   return (
//     <View style={{flex:1, padding:10}}>
//       <View style={{flex:1, padding:10}}>
//         <Text style={{fontWeight: "bold"}}>Bluetooth Log ({logCount})</Text>
//         <FlatList
//           data={logData}
//           renderItem={({item}) => {
//             return (<Text>{item}</Text>)
//           }}
//         />
//         <Button
//           title="Turn On Bluetooth"
//           onPress={async () => {
//             const btState = await manager.state()
//             // test is bluetooth is supported
//             if (btState==="Unsupported") {
//               alert("Bluetooth is not supported");
//               return (false);
//             }
//             // enable if it is not powered on
//             if (btState!=="PoweredOn") {
//               await manager.enable();
//             } else {
//               await manager.disable();
//             }
//             return (true);
//           }}
//         />
//       </View>

//       <View style={{flex:2, padding:10}}>
//         <Text style={{fontWeight: "bold"}}>Scanned Devices ({deviceCount})</Text>
//         <FlatList
//           data={Object.values(scannedDevices)}
//           renderItem={({item}) => {
//             return (<Text>{`${item.name} (${item.id})`}</Text>)
//           }}
//         />
//         <Button
//           title="Scan Devices"
//           onPress={async () => {
//             const btState = await manager.state()
//             // test if bluetooth is powered on
//             if (btState!=="PoweredOn") {
//               alert("Bluetooth is not powered on");
//               return (false);
//             }
//             // explicitly ask for user's permission
//             const permission = await requestPermission();
//             if (permission) {
//               manager.startDeviceScan(null, null, async (error, device) => {
//                   // error handling
//                   if (error) {
//                     console.log(error);
//                     return
//                   }
//                   // found a bluetooth device
//                   if (device) {
//                     console.log(`${device.name} (${device.id})}`);
//                     const newScannedDevices = scannedDevices;
//                     newScannedDevices[device.id] = device;
//                     await setDeviceCount(Object.keys(newScannedDevices).length);
//                     await setScannedDevices(scannedDevices);
//                   }
//               });
//             }
//             return (true);
//           }}
//         />
//       </View>
//     </View>
//   );
// };

// export default BluetoothScanner;













import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, PermissionsAndroid } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

export const manager = new BleManager();

const requestPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
      title: "Request for Location Permission",
      message: "Bluetooth Scanner requires access to Fine Location Permission",
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK"
    }
  );
  return (granted === PermissionsAndroid.RESULTS.GRANTED);
}

// BlueetoothScanner does:
// - access/enable bluetooth module
// - scan bluetooth devices in the area
// - list the scanned devices
const BluetoothScanner = () => {
  const [logData, setLogData] = useState([]);
  const [logCount, setLogCount] = useState(0);
  const [scannedDevices, setScannedDevices] = useState({});
  const [deviceCount, setDeviceCount] = useState(0);

  useEffect(() => {
    manager.onStateChange((state) => {
      const subscription = manager.onStateChange(async (state) => {
        console.log(state);
        const newLogData = logData;
        newLogData.push(state);
        await setLogCount(newLogData.length);
        await setLogData(newLogData);
        subscription.remove();
      }, true);
      return () => subscription.remove();
    });
  }, [manager]);

  return (
    <View style={{flex:1, padding:10}}>
      <View style={{flex:1, padding:10}}>
        <Text style={{fontWeight: "bold"}}>Bluetooth Log ({logCount})</Text>
        <FlatList
          data={logData}
          renderItem={({item}) => {
            return (<Text>{item}</Text>)
          }}
        />
        <Button
          title="Turn On Bluetooth"
          onPress={async () => {
            const btState = await manager.state()
            // test is bluetooth is supported
            if (btState==="Unsupported") {
              alert("Bluetooth is not supported");
              return (false);
            }
            // enable if it is not powered on
            if (btState!=="PoweredOn") {
              await manager.enable();
            } else {
              await manager.disable();
            }
            return (true);
          }}
        />
      </View>

      <View style={{flex:2, padding:10}}>
        <Text style={{fontWeight: "bold"}}>Scanned Devices ({deviceCount})</Text>
        <FlatList
          data={Object.values(scannedDevices)}
          renderItem={({item}) => {
            return (<Text>{`${item.name} (${item.id})`}</Text>)
          }}
        />
        <Button
          title="Scan Devices"
          onPress={async () => {
            const btState = await manager.state()
            // test if bluetooth is powered on
            if (btState!=="PoweredOn") {
              alert("Bluetooth is not powered on");
              return (false);
            }
            // explicitly ask for user's permission
            const permission = await requestPermission();
            if (permission) {
              manager.startDeviceScan(null, null, async (error, device) => {
                  // error handling
                  if (error) {
                    console.log(error);
                    return
                  }
                  // found a bluetooth device
                  if (device) {
                    console.log(`${device.name} (${device.id})}`);
                    const newScannedDevices = scannedDevices;
                    newScannedDevices[device.id] = device;
                    await setDeviceCount(Object.keys(newScannedDevices).length);
                    await setScannedDevices(scannedDevices);
                  }
              });
            }
            return (true);
          }}
        />
      </View>
    </View>
  );
};

export default BluetoothScanner;