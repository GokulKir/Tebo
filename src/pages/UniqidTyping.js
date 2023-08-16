import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import useStyle from '../hooks/useStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import {Modal, Portal, Button, PaperProvider} from 'react-native-paper';
import Ripple from 'react-native-material-ripple';

export default function UniqidTyping() {
  const [visible, setVisible] = useState(false);
  const {BottomPage} = useStyle();



  const styles = BottomPage;

  return (
    <View style={styles.MainPage}>
      <View style={styles.centerBox}>
        <View style={styles.centerBoxout}>
          <Text style={styles.Textstyle}>UNIQUE ID</Text>
        </View>

        <View style={styles.CenterInput}>
          <View style={styles.InputStyle}>
            <TextInput
              placeholder="Unique id"
              placeholderTextColor={'grey'}
              style={styles.OrgInput}
            />
          </View>
        </View>

        <View>
          {/* <TouchableOpacity onPress={() => setVisible(true)}  style={styles.ButtonStyle}>

<Text style={styles.ButtonTextstyle}>SUBMIT</Text>

</TouchableOpacity> */}
        </View>
      </View>

      <Modal visible={visible} transparent>
        <View style={styles.UIDModal}>
          <View style={styles.centerBoxText}>
            <Text style={styles.PopUpText}>
              John Doe wants to connect to Robot Black Heart!
            </Text>
          </View>

          <View style={styles.ModalButtonView}>
            <Ripple style={styles.ModalButton}>
              <Text>ACCEPT</Text>
            </Ripple>

            <Ripple style={styles.ModalButtonRed}>
              <Text>REJECT</Text>
            </Ripple>
          </View>
        </View>
      </Modal>
    </View>
  );
}
