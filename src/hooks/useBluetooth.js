import { useEffect, useState } from 'react';
import BluetoothClassic from 'react-native-bluetooth-classic';

const useBluetooth = () => {
  const [connectedDevices, setConnectedDevices] = useState([]);

  useEffect(() => {
    getConnectedDevices();
  }, []);

  const getConnectedDevices = async () => {
    try {
      const devices = await BluetoothClassic.getBondedDevices();
      setConnectedDevices(devices);
    } catch (error) {
      console.error('Error getting connected devices:', error);
    }
  };

  const sendDataToDevice = async (data) => {
    try {
      if (connectedDevices.length === 0) {
        console.log('No connected devices found.');
        return;
      }

      const device = connectedDevices[0]; // Assuming you want to send to the first connected device
      const result = await BluetoothClassic.writeToDevice(device, data);

      if (result) {
        console.log('Data sent successfully.');
      } else {
        console.log('Failed to send data.');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return { connectedDevices, getConnectedDevices, sendDataToDevice };
};

export default useBluetooth;
