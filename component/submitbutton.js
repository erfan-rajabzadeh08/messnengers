import React from "react";
import { StyleSheet,Text, TouchableOpacity } from "react-native";
import color from '../constants/color'

const Submitbutton= props=>{
    const enabledbgcolor =props.color || color.primry;
    const disabledbgcolor=color.lightGray;
    const bgcolor=props.disabled ? disabledbgcolor :enabledbgcolor;
return(
    <TouchableOpacity
       onPress={props.disabled ? ()=>{""} : props.onPress }
    style={{...styles.button,...{backgroundColor:bgcolor,margin:props}}}>
   <Text style={{color: props.disabled ? color.gray : 'white'}}>{props.titel}</Text>

    </TouchableOpacity>
 )
};

const styles=StyleSheet.create({
    button:{
        backgroundColor:color.primry,
        paddingHorizontal:8,
        paddingVertical:10,
        borderRadius:30,
        alignItems:'center',
        justifyContent:"center",
        marginTop:15,
        width:"100%"
    },
})

export default Submitbutton;