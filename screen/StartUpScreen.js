import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import color from "../constants/color";
import commonstyle from "../constants/commonstyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { SetDidTryAutoLogin, authenticate } from "../store/authSlice";
import { getUserData } from "../utlis/userAction";


const Startscreen=()=>{
    const dispatch=useDispatch()
useEffect(()=>{
    const trytologin=async()=>{
        const storedAuthInfo= await AsyncStorage.getItem("useData")
        if (!storedAuthInfo){
            dispatch(SetDidTryAutoLogin());
            return;
        }
       const parseData=JSON.parse(storedAuthInfo)
       const {token,userId,expiryDate:expiryDateString}=parseData;

       const expiryDate=new Date(expiryDateString)
       if(expiryDate<=new Date()||!token||!userId ){
       dispatch(SetDidTryAutoLogin());
       return;
    }
    const userdata=await getUserData(userId)
    dispatch(authenticate({token:token,userdata}))
    }
    trytologin()
},[dispatch]);

    return <View  style={commonstyle.center} >
    <ActivityIndicator size="large" color={color.primry}/>

    </View>
}


export default Startscreen;
