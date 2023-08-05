import { StyleSheet, Text, View , Image, TouchableOpacity } from 'react-native'
import React from 'react'
import useStyle from '../hooks/useStyle'
import Icon from 'react-native-vector-icons/Entypo';


export default function Header() {

  const { HeaderStyle } = useStyle()

  const styles = HeaderStyle

  return (
    <View  style={styles.container}>
     <View style={styles.Fullspace}>

    <Image style={styles.LogoSize} 
     source={require('../assets/Robo.png')}/>

     <TouchableOpacity style={{}}>

     {/* <Icon style={{marginLeft:'73%'}} name="menu" size={24} color="#000" /> */}


     </TouchableOpacity>

 

     </View>
    </View>
  )
}

