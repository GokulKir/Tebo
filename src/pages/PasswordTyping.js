import { StyleSheet, Text, View  , TextInput , TouchableOpacity} from 'react-native'
import React,{useState} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import useStyle from '../hooks/useStyle';


export default function PasswordTyping() {
    const {  BottomPage  } = useStyle()
    const styles = BottomPage

    const [secure , setSecure] = useState(false)

   const Show = () => {
     setSecure(!secure)
   }


  return (
    <View  style={styles.MainPage}>

    <View style={styles.centerBox} >

      <View style={styles.centerBoxout}>

        <Text style={styles.Textstyle}>PASSWORD</Text>

      </View>


      <View style={styles.CenterInput}>

       {secure === true ?

        <View style={styles.InputStyle} >

     

          <TextInput secureTextEntry={false} placeholder='Enter password' placeholderTextColor={"grey"}  style={styles.OrgInput}/>

          <View style={styles.IconSt}>
            <TouchableOpacity onPress={Show}>
          <Icon1 name="eye" color="grey" size={20}/>
          </TouchableOpacity>
     

        </View>


       

        </View>

        :

        <View style={styles.InputStyle} >

     

          <TextInput secureTextEntry={true} placeholder='Enter password' placeholderTextColor={"grey"}  style={styles.OrgInput}/>

          <View style={styles.IconSt}>
            <TouchableOpacity onPress={Show}>
          <Icon1 name="eye-off" color="grey" size={20}/>
          </TouchableOpacity>
     

        </View>


       

        </View>

      


       }




      </View>

      
      <View>

<TouchableOpacity  style={styles.ButtonStyle}>

<Text style={styles.ButtonTextstyle}>ENTER</Text>

</TouchableOpacity>



</View>

    </View>

  </View>
  )
}

