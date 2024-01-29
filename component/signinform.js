import React, {  Callback, useCallback, useEffect, useReducer, useState } from "react";
import Input  from '../component/input';
import Submitbutton from '../component/submitbutton';
import { View ,Text, Alert, ActivityIndicator} from "react-native";
import { validateInput } from "../utlis/formAction";
import { reducer } from "../utlis/reducer/reducerform";
import { signIn } from "../utlis/authAction";
import { useDispatch } from "react-redux";
import color from "../constants/color";
const isTestMode=true
const initialState={
  inputValues:{
    email:isTestMode ? "erfan@erfan.com": "",
    password: isTestMode ? "123456": "",
  },
  inputValidities:{
    email:isTestMode,
    password:isTestMode
  },
  formisvalid:isTestMode
  };
const inputChangeHandeler=(inputid,inputvalue)=>{
  console.log(validateInput(inputid,inputvalue));

}
const SignInform= props => {
  const dispach=useDispatch();
  const [error,setError]=useState();
  const [isloading,setisLoding]=useState(false);
  const [formState,dispatchFormstate]=useReducer(reducer,initialState);

  const inputChangeHandeler=useCallback( (inputid,inputvalue)=>{
    const result=validateInput(inputid,inputvalue);
    dispatchFormstate({inputid, validationresulte: result ,inputvalue})
      },[dispatchFormstate])


      useEffect(() =>{
        if (error){
         Alert.alert("An erorr occured",error,[{text:'Ookey'}]);
        }
     },[error])

      const authHandeler=useCallback(async()=>{
        try {
          setisLoding(true)
          const action= signIn(

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
    <Input id="email"   autoFocus={true} label="Email"  icon='envelope'
      onInputchange={inputChangeHandeler}
      texterorr={formState.inputValidities["email"]}
      initailValue={formState.inputValues.email}
 />
    <Input id="password" label="Password"  icon='lock'
      onInputchange={inputChangeHandeler}
      texterorr={formState.inputValidities["password"]}
      initailValue={formState.inputValues.password}
 />
{
   isloading ?
   <ActivityIndicator size={'small'} color={color.blue}/>  :
 <Submitbutton
   titel="Sign In"
   onPress={authHandeler}
   disabled={!formState.formisvalid}/>
}
</>
)

}



export default SignInform;