import { StyleSheet, Text, View , TextInput , TouchableOpacity } from 'react-native'
import React from 'react'
import useStyle from '../hooks/useStyle'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';



export default function SsidTyping() {
  const {  BottomPage  } = useStyle()
  const styles = BottomPage

  const navigation = useNavigation()

  return (
    <View  style={styles.MainPage}>

      <View style={styles.centerBox} >

        <View style={styles.centerBoxout}>

          <Text style={styles.Textstyle}>SSID</Text>

        </View>


        <View style={styles.CenterInput}>

         

          <View style={styles.InputStyle} >

       

            <TextInput placeholder='Select any' placeholderTextColor={"grey"}  style={styles.OrgInput}/>

            <View style={styles.IconStyle}>
              <TouchableOpacity>
            <Icon name="arrow-drop-down" color="grey" size={30}/>
             </TouchableOpacity>
       

          </View>


      

          </View>


        




        </View>


        <View>

<TouchableOpacity onPress={()=> navigation.navigate("Password")} style={styles.ButtonStyle}>

  <Text style={styles.ButtonTextstyle}>ENTER</Text>

</TouchableOpacity>



</View>

      </View>

    </View>
  )
}

