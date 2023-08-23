import { useState, useEffect } from 'react';
// import { BleManager } from 'react-native-ble-plx';

const useBluetooth = (deviceName) => {
  const [device, setDevice] = useState(null);
  const [error, setError] = useState(null);
  const bleManager = new BleManager();

  useEffect(() => {
    const scanAndConnect = async () => {
      try {
        // Start scanning for nearby BLE devices
        // const subscription = bleManager.onStateChange((state) => {
        //   if (state === 'PoweredOn') {
        //     bleManager.startDeviceScan(null, null, (error, scannedDevice) => {
        //       if (error) {
        //         setError(error.message);
        //         return;
        //       }

        //       // Filter devices by name or other criteria if needed
        //       if (scannedDevice.name === deviceName) {
        //         bleManager.stopDeviceScan(); // Stop scanning

        //         // Connect to the selected device
        //         scannedDevice.connect()
        //           .then((connectedDevice) => {
        //             setDevice(connectedDevice);
        //           })
        //           .catch((error) => {
        //             setError(error.message);
        //           });
        //       }
        //     });
        //   }
        // }, true);

        // // Clean up subscription and manager when component unmounts
        // return () => {
        //   subscription.remove();
        //   bleManager.destroy();
        // };
      } catch (error) {
        setError(error.message);
      }
    };

    scanAndConnect();
  }, [deviceName]);

  return { device, error };
};

export default useBluetooth;
