import { useState, useEffect } from 'react';
import { BleManager } from 'react-native-ble-plx';




const useBleManager = () => {
  const [bleManager, setBleManager] = useState(new BleManager());
  const [connectedDevices, setConnectedDevices] = useState([]);



  const startScanning = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      console.log("Scanning devices : "+ " Device serviceUUID " +  device.serviceUUIDs + "Device name" + device.name + "Device ID" + device.id);
      if (error) {
        console.error('Error scanning:', error);


        return;
      }

      if (device.name === 'YourDeviceName') {
        bleManager.stopDeviceScan();
        connectToDevice(device.id);
      }
    });
  };

  const connectToDevice = async (deviceId) => {
    const device = await bleManager.connectToDevice(deviceId);


    if (!connectedDevices.some(dev => dev.id === deviceId)) {
      setConnectedDevices([...connectedDevices, device]);
      console.log('Device connected:', device.name);
    }

    // Rest of your code...
  };

  const listConnectedDevices = () => {
    console.log('Connected devices:', connectedDevices);
  };

  useEffect(() => {
    return () => {
      // Clean up resources when the component unmounts
      bleManager.destroy();
    };
  }, []);



  const sendDataToDevice = async (deviceId, serviceUUID, characteristicUUID, data) => {
    const device = connectedDevices.find(dev => dev.id === deviceId);
    console.log(device);

    if (device) {
      const service = await device.discoverAllServicesAndCharacteristics();
      const characteristic = service.characteristics.find(
        char => char.uuid === characteristicUUID
      );

      if (characteristic) {
        await characteristic.writeWithResponse(data);
        console.log('Data sent successfully:', data);
      } else {
        console.error('Characteristic not found.');
      }
    } else {
      console.error('Device not found.');
    }
  };

  return {
    startScanning,
    connectToDevice,
    listConnectedDevices,
    sendDataToDevice
  };
};

export default useBleManager;
