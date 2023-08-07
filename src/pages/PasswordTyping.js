import { StyleSheet, Text, View  , TextInput , TouchableOpacity , Platform , Dimensions} from 'react-native'
import React,{useState , useEffect} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import useStyle from '../hooks/useStyle';
import usePlatform from '../hooks/usePlatform';
import { useRoute } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { Backid } from '../data/Recoil/atom';

export default function PasswordTyping() {

    const {  BottomPage  } = useStyle()
    const backId = useRecoilValue(Backid)
    const styles = BottomPage
    const { width, height } = Dimensions.get('window');
    const { isTablet } = usePlatform()
  

    const [secure , setSecure] = useState(false)

    const BackValue = 'ROBO_DE%V*L(+E$C@US'
    
    

   const Show = () => {
     setSecure(!secure)
   }

   const route = useRoute()
   
   const {passing} = route


   useEffect(() => {
    
   console.log(isTablet);
   console.log(Platform);

   console.log("This is a backId"+backId);

   if(backId === BackValue) {
    console.log("ID IS CORRECTED");
   } 


   }, [])
   


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

