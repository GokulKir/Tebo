import { StyleSheet } from 'react-native'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";


const useStyle = () => {


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

   
   
   })

   const BottomPage = StyleSheet.create({

    MainPage : {
        flex: 1 ,
        alignItems:'center' ,
        justifyContent : "center"
    } ,
    centerBox : {
        width : responsiveWidth(25) ,
        height : responsiveHeight(24) ,
        elevation :10 ,
        backgroundColor:'#fff' ,
        borderRadius:20

    },

    centerBoxout : {
        width : responsiveWidth(20) ,
        height : responsiveHeight(5) ,
        marginLeft:responsiveWidth(2) ,
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

        width : responsiveWidth(20) ,
        height : responsiveHeight(5) ,
        backgroundColor:'#fff' ,
        elevation : 5,
        borderRadius:5 ,
        flexDirection:'row',
        
    

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
      width : responsiveWidth(8) ,
      height : responsiveHeight(5.4) ,
      borderWidth : 1 ,
      borderColor:'#ddd',
      borderRadius:5 ,
      marginLeft:29 ,
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