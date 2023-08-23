import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Modal,
  Portal,
  Button,
  PaperProvider,
  Snackbar,
} from 'react-native-paper';
import useStyle from '../hooks/useStyle';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import useApi from '../hooks/useApi';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import apiInstance from '../api/apiInstance';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { UIDSTORING } from '../Recoil/recoilState';

export default function ApiCheckingpage() {

  //Recoil hook//
  //Recoil hook//



  //Recoil state//
  const [UniqId , setUniqId] = useRecoilState(UIDSTORING)
  //Recoil state//

  
  //Api module//
  const {fetchData, data, isLoading, error} = useApi();
  //Api module//

//Navigation veriable//
const navigation = useNavigation()
//Navigation veriable//


  const [visible, setVisible] = useState(true);
  const [uid , setUid] = useState(null)
  const [loading , setLoading] = useState(false)
  const [serialNumber , setSerialNumber] = useState(null)


useEffect(()=>{

  DeviceInfo.getUniqueId().then((uniqueId) => {
      console.log("DeviceInfo.getUniqueId", uniqueId);

      setUniqId(uniqueId)
      setUid(uniqueId)
    });

},[])




  useEffect(() => {
    if (uid) {
      console.log("Device's Unique Id: " + uid);

      const postData = {
        device_id: uid,
      };

      const fetchRobotUUID = async () => {
        setLoading(true); // Set loading to true before the API call
        try {
          const response = await apiInstance.post('/api/v1/robot-uuid', postData);
          
          console.log('Success:', response.data);
           setUniqId(response.data)
           setTimeout(() => {

            navigation.navigate("UID")
            
           }, 2500);
        } catch (error) {
          console.error('Network error:', error);
          if (error.isAxiosError && !error.response) {
            console.error('Network connection issue');
          } else if (error.response) {
            console.error('Response data:', error.response.data);
          }
        } finally {
          setLoading(false); // Set loading to false after the API call (both success and failure)
        }
      };

      fetchRobotUUID();
    }
  }, [uid]);

  //Styled veriables//
  const {ApiStyle} = useStyle();
  const styles = ApiStyle;
  //Styled veriables//

  return (
    <View style={styles.container}>
      <Modal visible={visible} transparent>
        <View style={styles.ModalStyle}>
          <BallIndicator color="red" size={50} />

          <View>
            <Text style={styles.Textdetail}>Loading...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}
