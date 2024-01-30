import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import color from "../constants/color";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';


const ReplyTo=props=>{
  const {text,user,onCancel}=props;
  const name=`${user.firstname} ${user.lastname}`;


  return <View style={styles.container}>
    <View style={styles.textContainer}>
      <Text numberOfLines={1} style={styles.name}>{name}</Text>
      <Text numberOfLines={1}style={{color:'#000'}} >{text}</Text>
    </View>


   <TouchableOpacity onPress={onCancel}>
   <FontAwesome6 name={'circle-xmark'} size={22} color={color.blue}  />

   </TouchableOpacity>


  </View>

}

const styles=StyleSheet.create({
    container:{
      backgroundColor:color.extraLightGrey,
      padding:8,
      flexDirection:"row",
      alignItems:"center",
      borderLeftColor:color.blue,
      borderLeftWidth:4,
    },
    textContainer:{
      flex:1,
      marginRight:5,

    },
    name:{
        color:color.blue,
        letterSpacing:0.3
    }
})
export default ReplyTo;