import React, { useCallback, useReducer, useState } from 'react';
import { View,Text,StyleSheet ,Button, ActivityIndicator,TouchableOpacity } from 'react-native';
 import Pagetitel from '../component/pagetitel';
import PageContuinear from '../component/PageContinear';
import Input from '../component/input';
import { validateInput } from '../utlis/formAction';
import { reducer } from '../utlis/reducer/reducerform';
import { ScrollView } from 'react-native-gesture-handler';
import {useDispatch, useSelector, } from 'react-redux'
import Submitbutton from '../component/submitbutton';
import color from '../constants/color';
import { updatesignedInUserData, userlogout } from '../utlis/authAction';
import { updateLoggedInUserData } from '../store/authSlice';
import ProrileImage from '../component/profileImage';

const Setting = (props) => {
 const dispatch=useDispatch()
 const userdata= useSelector(state=>state.auth.userdata)
 const [isloading,setisLoding]=useState(false);
 const [showsuccessmessage,setshowsuccessmessage]=useState(false);

const firstname=userdata.firstname || ""
const lastname=userdata.lastname || ""
const email=userdata.email || ""
const about=userdata.about || ""
 const initialStats={
inputValues:{
    firstname ,
    lastname,
    email,
    about
},
inputValidities:{
    firstname:undefined,
    lastname:undefined,
    email:undefined,
    about:undefined
},
formisvalid:false
};
const [formState,dispatchFormstate]=useReducer(reducer,initialStats);
 const saveHandeler=useCallback(async()=>{
     const updateValues=formState.inputValues
    try {
    setisLoding(true)
    await updatesignedInUserData(userdata.userId,updateValues)
    dispatch(updateLoggedInUserData({newData:updateValues}))
    setshowsuccessmessage(true)
    setTimeout(() => {
        setshowsuccessmessage(false)
    }, 3000);
    } catch (error) {
     console.log(error);
    }
    finally{
    setisLoding(false)
    }
 },[formState,dispatch])
    const inputChangeHandeler=useCallback( (inputid,inputvalue)=>{
    const result=validateInput(inputid,inputvalue);
    dispatchFormstate({inputid, validationresulte: result,inputvalue})
    },[formState,dispatch]);

    const hasChanges=()=>{
    const currentValues=formState.inputValues;
    return( currentValues.firstname!=firstname ||
    currentValues.lastname!=lastname||
    currentValues.email!=email||
    currentValues.about!=about
    )}


 return (

    <PageContuinear style={styles.container}>
    <Pagetitel text="Settings"/>

   <ScrollView contentContainerStyle={styles.formContiner}>

    <ProrileImage size={80} userId={userdata.userId} uri={userdata.profilePicture} showeditbutton={true} />
    <Input label="firstname"   autoFocus={true}  icon='user' id="firstname"
    onInputchange={inputChangeHandeler}
    texterorr={formState.inputValidities["firstname"]}
     initailValue={userdata.firstname} />

    <Input label="lastname"  icon='user' id="lastname"
     onInputchange={inputChangeHandeler}
     texterorr={formState.inputValidities["lastname"]}
     initailValue={userdata.lastname} />

    <Input label="email"  icon='envelope' id="email"
     onInputchange={inputChangeHandeler}
     texterorr={formState.inputValidities["email"]}
     initailValue={userdata.email} />

    <Input label="about"  icon='lock' id="about"
     onInputchange={inputChangeHandeler}
     texterorr={formState.inputValidities["about"]}
     initailValue={userdata.about}/>
     {
     showsuccessmessage && <Text style={styles.message} >Saved!</Text>
     }
    {
   isloading ?
   <ActivityIndicator size={'small'} color={color.blue}/>:
   hasChanges() && <Submitbutton
   titel="Save"
   onPress={saveHandeler}
   disabled={!formState.formisvalid}/>
    }

   <Submitbutton
   titel="LogOut"
   onPress={()=>dispatch(userlogout()) }
   color={color.red}
   />
</ScrollView>
</PageContuinear>
);
};

const styles=StyleSheet.create({
container:{
flex: 1,
},
message:{
alignItems:"center",
justifyContent:"center"
},
formContiner:{
alignItems:"center",

}
})

export default Setting;