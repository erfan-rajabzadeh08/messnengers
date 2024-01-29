import React, { useCallback, useEffect, useReducer, useState } from "react";
import Input  from '../component/input';
import Submitbutton from '../component/submitbutton';
import { View ,Text,TextInput, Alert, ActivityIndicator,KeyboardAvoidingView} from "react-native";
import { validateInput } from "../utlis/formAction";
import { reducer } from "../utlis/reducer/reducerform";
import { signUp } from "../utlis/authAction";
import color from "../constants/color";
import { useDispatch, useSelector } from "react-redux";
 const initialState={
  inputValues:{
    firstname:"",
    lastname:"",
    email:"",
    password:""
  },
inputValidities:{
  firstname:false,
  lastname:false,
  email:false,
  password:false
},
formisvalid:false
};
const Signupform = props => {
  const dispach=useDispatch();
const [error,setError]=useState();
const [isloading,setisLoding]=useState(false);
const [formState,dispatchFormstate]=useReducer(reducer,initialState);

const inputChangeHandeler=useCallback( (inputid,inputvalue)=>{
const result=validateInput(inputid,inputvalue);
dispatchFormstate({inputid, validationresulte: result,inputvalue})
  },[dispatchFormstate]);

useEffect(() =>{
   if (error){
    Alert.alert("An erorr occured",error,[{text:'Ookey'}]);
   }
},[error])
  const authHandeler=useCallback(async()=>{
    try {
      setisLoding(true)
      const action= signUp(
        formState.inputValues.firstname,
        formState.inputValues.lastname,
        formState.inputValues.email,
        formState.inputValues.password,
        )
     setError(null);
     await dispach(action);
     } catch (error) {
    setisLoding(false),
    setError(error.message)
  }
  },[dispach,formState])

return(
<>
    <Input label="firstname"   autoFocus={true}  icon='user' id="firstname"
    onInputchange={inputChangeHandeler}
    texterorr={formState.inputValidities["firstname"]}

    />
    <Input label="lastname"  icon='user' id="lastname"
     onInputchange={inputChangeHandeler}
     texterorr={formState.inputValidities["lastname"]}

    />
    <Input label="email"  icon='envelope' id="email"
     onInputchange={inputChangeHandeler}
     texterorr={formState.inputValidities["email"]}

    />
    <Input label="password"  icon='lock' id="password"
     onInputchange={inputChangeHandeler}
     texterorr={formState.inputValidities["password"]}

    />
   {
    isloading ?
    <ActivityIndicator size={'small'} color={color.blue}/>  :
    <Submitbutton
   titel="Sign Up"
   onPress={authHandeler}
   disabled={!formState.formisvalid}
  />
  }
</>
)};



export default Signupform;