import { useEffect } from 'react';
import { StyleSheet } from 'react-native'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
  import usePlatform from './usePlatform';
  import Ripple from 'react-native-material-ripple';



const useStyle = () => {

    const {isTablet} = usePlatform()


    useEffect(()=>{
  
      if(isTablet) { 
          console.log("This is a tablet");
      } else {
          console.log("This is a mobile device");
      }
  
    })  


   const HeaderStyle = StyleSheet.create({
    container : {

        flex : 1 ,
        justifyContent : "space-around",
    

    },
    Fullspace : {
        flexDirection :'row' ,
        flex:1

    },
    LogoSize : {
        width : responsiveWidth(19) ,
        height: responsiveHeight(5) ,
        top:10,
        left:5


    },

    backButtonStyle : {

        width : 50 ,
        height : 50 ,
        top:3



    }

   
   
   })

   const BottomPage = StyleSheet.create({

    MainPage : {
        flex: 1 ,
        alignItems:'center' ,
        justifyContent : "center"
    } ,
    centerBox : {
        width : isTablet ?  responsiveWidth(25) : responsiveWidth(30) ,
        height : isTablet ? responsiveHeight(24) : responsiveHeight(35) ,
        elevation :10 ,
        backgroundColor:'#fff' ,
        borderRadius:20

    },

    centerBoxout : {
        width : responsiveWidth(20) ,
        height : responsiveHeight(5) ,
        marginLeft: isTablet ?  responsiveWidth(2.5) : responsiveHeight(4.5) ,
        marginTop:responsiveHeight(3)
        
    


    } ,
    Textstyle : {
         color : "#000" ,
         fontStyle:'italic',
         

    } ,
    CenterInput : {
        alignItems:'center',
    } ,
     
    rowcomplete : {
        flexDirection:'row'
    } ,

    InputStyle : {

        width : isTablet ? responsiveWidth(20) : responsiveWidth(25) ,
        height : isTablet ? responsiveHeight(5) : responsiveHeight(8) ,
        backgroundColor:'#fff' ,
        elevation : 5,
        borderRadius:5 ,
        flexDirection:'row',
        marginTop: isTablet ? null : responsiveHeight(2.5)
        
    

    } ,
    OrgInput : {
        width : '80%' ,
        height: "100%",
        borderRadius:5,
        color:'#000' ,
        fontSize:10 ,
        left:8
    } ,
    IconStyle : {
        left:10
    } ,
    ButtonStyle : {
      width : isTablet ? responsiveWidth(8) : responsiveWidth(12) ,
      height : isTablet ? responsiveHeight(5.4) : responsiveHeight(8) ,
      borderWidth : 1 ,
      borderColor:'#ddd',
      borderRadius:5 ,
      marginLeft: isTablet ? 29 : 20 ,
      marginTop:17 ,
      alignItems:'center' ,
      justifyContent:'center'

    } ,
    ButtonTextstyle : {
        color:'#000' ,
        fontSize:13
    },
    IconSt : {
        top:5 ,
        left:15
    }
    
   })

   return {
    HeaderStyle,
    BottomPage
   }

}

export default useStyle